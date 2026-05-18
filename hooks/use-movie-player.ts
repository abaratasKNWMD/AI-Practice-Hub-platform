'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { MOVIE_SCRIPT, TOTAL_DURATION_MS, type Scene, type Subtitle } from '@/lib/movie-script'
import { audioEntryKey, type CourseAudioEntry, type CourseAudioManifest } from '@/lib/audio-manifest'

interface UseMoviePlayerOptions {
  script?: Scene[]
  totalDurationMs?: number
  audioManifest?: CourseAudioManifest | null
}

interface LocatedSubtitle {
  subtitle: Subtitle
  index: number
}

export function useMoviePlayer(options: UseMoviePlayerOptions = {}) {
  const script = options.script?.length ? options.script : MOVIE_SCRIPT
  const totalDurationMs = options.totalDurationMs ?? TOTAL_DURATION_MS

  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTimeMs, setCurrentTimeMs] = useState(0)
  const [currentScene, setCurrentScene] = useState<Scene>(script[0])
  const [currentSubtitle, setCurrentSubtitle] = useState<Subtitle | null>(null)
  const [voiceEnabled, setVoiceEnabled] = useState(true)

  // Refs — no stale closures inside setInterval
  const isPlayingRef = useRef(false)
  const startTimeRef = useRef(0)
  const pausedAtRef = useRef(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const currentSubtitleRef = useRef<Subtitle | null>(null)
  const voiceEnabledRef = useRef(true)
  const spokenSubtitleRef = useRef<string | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  // Pre-fetch cache: voice/rate/text -> blob URL
  const audioCacheRef = useRef<Map<string, string>>(new Map())
  const scriptRef = useRef(script)
  const totalDurationRef = useRef(totalDurationMs)
  const audioEntriesRef = useRef<Map<string, CourseAudioEntry>>(new Map())

  useEffect(() => {
    scriptRef.current = script
    totalDurationRef.current = totalDurationMs
    audioEntriesRef.current = new Map((options.audioManifest?.entries ?? []).map(entry => [
      audioEntryKey(entry.sceneId, entry.subtitleIndex),
      entry,
    ]))
    pausedAtRef.current = 0
    startTimeRef.current = Date.now()
    spokenSubtitleRef.current = null
    currentSubtitleRef.current = null
    setCurrentTimeMs(0)
    setCurrentScene(script[0])
    setCurrentSubtitle(null)
  }, [script, totalDurationMs, options.audioManifest])

  const runtimeTtsUrl = useCallback((text: string, entry?: CourseAudioEntry) => {
    const params = new URLSearchParams({ text })
    if (entry?.voice) params.set('voice', entry.voice)
    if (entry?.rate) params.set('rate', entry.rate)
    if (entry?.pitch) params.set('pitch', entry.pitch)
    return `/api/tts?${params.toString()}`
  }, [])

  const runtimeCacheKey = useCallback((text: string, entry?: CourseAudioEntry) => (
    `${entry?.voice ?? 'default'}|${entry?.rate ?? '+5%'}|${entry?.pitch ?? '+0Hz'}|${text}`
  ), [])

  // Pre-fetch audio for a subtitle text in the background
  const prefetch = useCallback((text: string) => {
    const cacheKey = runtimeCacheKey(text)
    if (!text || audioCacheRef.current.has(cacheKey)) return
    // Mark as in-flight immediately to avoid duplicate fetches
    audioCacheRef.current.set(cacheKey, '')
    fetch(runtimeTtsUrl(text))
      .then(r => r.blob())
      .then(blob => {
        audioCacheRef.current.set(cacheKey, URL.createObjectURL(blob))
      })
      .catch(() => audioCacheRef.current.delete(cacheKey))
  }, [runtimeCacheKey, runtimeTtsUrl])

  // Pre-fetch the next N subtitles ahead of current time
  const prefetchAhead = useCallback((timeMs: number) => {
    let count = 0
    for (const scene of scriptRef.current) {
      for (const sub of scene.subtitles) {
        // Prefetch subtitles that start within the next 8 seconds
        if (sub.startMs > timeMs && sub.startMs < timeMs + 8000) {
          prefetch(sub.text)
          count++
          if (count >= 3) return
        }
      }
    }
  }, [prefetch])

  const stopVoice = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
    }
    spokenSubtitleRef.current = null
  }, [])

  const speakWithRuntimeTts = useCallback((text: string, entry?: CourseAudioEntry) => {
    const cacheKey = runtimeCacheKey(text, entry)
    const cached = audioCacheRef.current.get(cacheKey)
    if (cached) {
      if (!audioRef.current) {
        audioRef.current = new Audio()
      }
      audioRef.current.src = cached
      audioRef.current.play().catch(() => {})
      return
    }

    fetch(runtimeTtsUrl(text, entry))
      .then(r => r.blob())
      .then(blob => {
        const url = URL.createObjectURL(blob)
        audioCacheRef.current.set(cacheKey, url)
        if (spokenSubtitleRef.current?.endsWith(`::${text}`) && voiceEnabledRef.current) {
          if (!audioRef.current) audioRef.current = new Audio()
          audioRef.current.src = url
          audioRef.current.play().catch(() => {})
        }
      })
      .catch(() => {})
  }, [runtimeCacheKey, runtimeTtsUrl])

  const speakSubtitle = useCallback((scene: Scene, located: LocatedSubtitle) => {
    if (!voiceEnabledRef.current) return
    const text = located.subtitle.text
    const key = `${scene.id}::${located.index}::${text}`
    if (spokenSubtitleRef.current === key) return
    spokenSubtitleRef.current = key

    stopVoice()

    const manifestEntry = audioEntriesRef.current.get(audioEntryKey(scene.id, located.index))
    if (manifestEntry?.audioUrl) {
      if (!audioRef.current) {
        audioRef.current = new Audio()
      }
      audioRef.current.onerror = () => {
        if (spokenSubtitleRef.current === key && voiceEnabledRef.current) speakWithRuntimeTts(text, manifestEntry)
      }
      audioRef.current.src = manifestEntry.audioUrl
      audioRef.current.preload = 'auto'
      audioRef.current.play().catch(() => {})
      return
    }

    speakWithRuntimeTts(text)
  }, [speakWithRuntimeTts, stopVoice])

  const findCurrentScene = useCallback((timeMs: number): Scene => {
    const currentScript = scriptRef.current
    for (let i = currentScript.length - 1; i >= 0; i--) {
      if (timeMs >= currentScript[i].startMs) return currentScript[i]
    }
    return currentScript[0]
  }, [])

  const findCurrentSubtitle = useCallback((scene: Scene, timeMs: number): LocatedSubtitle | null => {
    for (let index = 0; index < scene.subtitles.length; index += 1) {
      const sub = scene.subtitles[index]
      if (timeMs >= sub.startMs && timeMs <= sub.endMs) return { subtitle: sub, index }
    }
    return null
  }, [])

  const updateState = useCallback((timeMs: number) => {
    const scene = findCurrentScene(timeMs)
    const locatedSubtitle = findCurrentSubtitle(scene, timeMs)
    const sub = locatedSubtitle?.subtitle ?? null

    setCurrentScene(scene)
    setCurrentTimeMs(timeMs)
    prefetchAhead(timeMs)

    if (sub?.text !== currentSubtitleRef.current?.text) {
      currentSubtitleRef.current = sub
      setCurrentSubtitle(sub)
      if (sub && locatedSubtitle) speakSubtitle(scene, locatedSubtitle)
      else stopVoice()
    }
  }, [findCurrentScene, findCurrentSubtitle, prefetchAhead, speakSubtitle, stopVoice])

  const stopInterval = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  const startInterval = useCallback(() => {
    stopInterval()
    intervalRef.current = setInterval(() => {
      if (!isPlayingRef.current) return
      const elapsed = Date.now() - startTimeRef.current
      if (elapsed >= totalDurationRef.current) {
        stopInterval()
        isPlayingRef.current = false
        setIsPlaying(false)
        stopVoice()
        updateState(totalDurationRef.current)
        return
      }
      updateState(elapsed)
    }, 50)
  }, [stopInterval, updateState, stopVoice])

  // PLAY
  const play = useCallback(() => {
    if (isPlayingRef.current) return
    isPlayingRef.current = true
    setIsPlaying(true)
    startTimeRef.current = Date.now() - pausedAtRef.current
    startInterval()
  }, [startInterval])

  // PAUSE — reads from refs so no stale closures
  const pause = useCallback(() => {
    if (!isPlayingRef.current) return
    isPlayingRef.current = false
    setIsPlaying(false)
    // Snapshot current time into pausedAt via the interval state
    pausedAtRef.current = Date.now() - startTimeRef.current
    stopInterval()
    stopVoice()
  }, [stopInterval, stopVoice])

  // TOGGLE
  const toggle = useCallback(() => {
    if (isPlayingRef.current) pause()
    else play()
  }, [play, pause])

  // SEEK
  const seek = useCallback((timeMs: number) => {
    const t = Math.max(0, Math.min(timeMs, totalDurationRef.current))
    pausedAtRef.current = t
    if (isPlayingRef.current) {
      startTimeRef.current = Date.now() - t
    }
    spokenSubtitleRef.current = null
    stopVoice()
    updateState(t)
  }, [updateState, stopVoice])

  // RESTART
  const restart = useCallback(() => {
    pausedAtRef.current = 0
    spokenSubtitleRef.current = null
    stopVoice()
    updateState(0)
    if (!isPlayingRef.current) play()
    else {
      startTimeRef.current = Date.now()
    }
  }, [play, updateState, stopVoice])

  // TOGGLE VOICE
  const toggleVoice = useCallback(() => {
    setVoiceEnabled(v => {
      const next = !v
      voiceEnabledRef.current = next
      if (!next) stopVoice()
      return next
    })
  }, [stopVoice])

  // Cleanup
  useEffect(() => {
    const audioCache = audioCacheRef.current
    return () => {
      stopInterval()
      stopVoice()
      // Revoke all cached blob URLs
      audioCache.forEach(url => { if (url) URL.revokeObjectURL(url) })
      audioCache.clear()
    }
  }, [stopInterval, stopVoice])

  const progress = totalDurationMs > 0 ? (currentTimeMs / totalDurationMs) * 100 : 0
  const sceneProgress = currentScene
    ? ((currentTimeMs - currentScene.startMs) / (currentScene.endMs - currentScene.startMs)) * 100
    : 0

  return {
    isPlaying,
    currentTimeMs,
    currentScene,
    currentSubtitle,
    voiceEnabled,
    progress,
    sceneProgress: Math.max(0, Math.min(100, sceneProgress)),
    totalDuration: totalDurationMs,
    play,
    pause,
    toggle,
    seek,
    restart,
    toggleVoice,
  }
}
