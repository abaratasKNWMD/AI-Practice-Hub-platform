export interface CourseAudioEntry {
  sceneId: string
  sceneIndex: number
  subtitleIndex: number
  text: string
  startMs: number
  endMs: number
  audioUrl: string
  durationMs: number
  bytes: number
  sha256: string
  voice: string
  rate?: string
  pitch?: string
  voiceProfileId?: string
  energy?: string
  emphasis?: string
  pauseMs?: number
  role?: string
}

export interface CourseAudioManifest {
  courseId: string
  generatedAt: string
  audioVersion?: string
  voice: string
  rate?: string
  voiceCount?: number
  voiceProfileCount?: number
  voiceProfiles?: Array<{
    id: string
    vendor?: string
    role?: string
    label?: string
    voice: string
    rate?: string
    pitch?: string
    energy?: string
    emphasis?: string
    pauseMs?: number
  }>
  entryCount: number
  totalAudioMs: number
  entries: CourseAudioEntry[]
}

export function audioEntryKey(sceneId: string, subtitleIndex: number) {
  return `${sceneId}::${subtitleIndex}`
}
