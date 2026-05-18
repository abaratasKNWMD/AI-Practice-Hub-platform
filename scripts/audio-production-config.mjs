export const audioProductionVersion = 'audio-prod-v2-2026-05-18'

export const allowedVoices = [
  'es-ES-AlvaroNeural',
  'es-ES-ElviraNeural',
]

export const voiceProfiles = {
  codexNarrator: {
    id: 'codexNarrator',
    vendor: 'codex',
    label: 'Codex tecnico',
    voice: 'es-ES-AlvaroNeural',
    rate: '+8%',
    pitch: '+0Hz',
    energy: 'precisa',
    emphasis: 'plan, patch, test y coste',
    pauseMs: 180,
  },
  codexReflection: {
    id: 'codexReflection',
    vendor: 'codex',
    label: 'Codex pausa de criterio',
    voice: 'es-ES-AlvaroNeural',
    rate: '+3%',
    pitch: '+0Hz',
    energy: 'reflexiva',
    emphasis: 'riesgo, permiso y evidencia',
    pauseMs: 260,
  },
  copilotNarrator: {
    id: 'copilotNarrator',
    vendor: 'copilot',
    label: 'Copilot workstation',
    voice: 'es-ES-AlvaroNeural',
    rate: '+7%',
    pitch: '+0Hz',
    energy: 'practica',
    emphasis: 'modo, contexto y PR',
    pauseMs: 180,
  },
  copilotReview: {
    id: 'copilotReview',
    vendor: 'copilot',
    label: 'Copilot revision',
    voice: 'es-ES-AlvaroNeural',
    rate: '+4%',
    pitch: '+0Hz',
    energy: 'critica',
    emphasis: 'finding, severidad y prueba',
    pauseMs: 240,
  },
  claudeNarrator: {
    id: 'claudeNarrator',
    vendor: 'claude',
    label: 'Claude arquitectura',
    voice: 'es-ES-AlvaroNeural',
    rate: '+5%',
    pitch: '+0Hz',
    energy: 'calmada',
    emphasis: 'memoria, skill, hook y MCP',
    pauseMs: 220,
  },
  claudeSafety: {
    id: 'claudeSafety',
    vendor: 'claude',
    label: 'Claude guardrail',
    voice: 'es-ES-AlvaroNeural',
    rate: '+2%',
    pitch: '+0Hz',
    energy: 'deliberada',
    emphasis: 'permiso, bloqueo y rollback',
    pauseMs: 300,
  },
  hubNarrator: {
    id: 'hubNarrator',
    vendor: 'hub',
    label: 'Hub estrategia',
    voice: 'es-ES-AlvaroNeural',
    rate: '+6%',
    pitch: '+0Hz',
    energy: 'ejecutiva',
    emphasis: 'ruta, metrica y tutoria',
    pauseMs: 200,
  },
  hubInstructor: {
    id: 'hubInstructor',
    vendor: 'hub',
    label: 'Hub instructor',
    voice: 'es-ES-AlvaroNeural',
    rate: '+3%',
    pitch: '+0Hz',
    energy: 'cercana',
    emphasis: 'pregunta, decision y siguiente paso',
    pauseMs: 280,
  },
}

const roleByType = {
  title: 'narrator',
  concept: 'narrator',
  compare: 'narrator',
  linear: 'narrator',
  prompt: 'narrator',
  streaming: 'narrator',
  coding: 'narrator',
  terminal: 'narrator',
  diff: 'narrator',
  preview: 'narrator',
  branch: 'narrator',
  finale: 'reflection',
  thinking: 'reflection',
  'media-break': 'reflection',
  pause: 'reflection',
  quiz: 'reflection',
  decision: 'reflection',
  risk: 'safety',
  cost: 'safety',
  error: 'safety',
  'pr-review': 'review',
}

const profileByVendorRole = {
  codex: {
    narrator: 'codexNarrator',
    reflection: 'codexReflection',
    safety: 'codexReflection',
    review: 'codexReflection',
  },
  copilot: {
    narrator: 'copilotNarrator',
    reflection: 'copilotReview',
    safety: 'copilotReview',
    review: 'copilotReview',
  },
  claude: {
    narrator: 'claudeNarrator',
    reflection: 'claudeSafety',
    safety: 'claudeSafety',
    review: 'claudeSafety',
  },
  hub: {
    narrator: 'hubNarrator',
    reflection: 'hubInstructor',
    safety: 'hubInstructor',
    review: 'hubInstructor',
  },
  other: {
    narrator: 'hubNarrator',
    reflection: 'hubInstructor',
    safety: 'hubInstructor',
    review: 'hubInstructor',
  },
}

export function vendorFromId(id = '') {
  if (id.startsWith('cx-')) return 'codex'
  if (id.startsWith('cp-')) return 'copilot'
  if (id.startsWith('cl-')) return 'claude'
  if (id.startsWith('hub-')) return 'hub'
  return 'other'
}

export function roleForSceneType(type = 'concept') {
  return roleByType[type] ?? 'narrator'
}

export function resolveVoiceProfile(course, scene, env = process.env) {
  const vendor = vendorFromId(course?.id ?? '')
  const role = roleForSceneType(scene?.type)
  const profileId = scene?.production?.voiceProfileId ?? profileByVendorRole[vendor]?.[role] ?? profileByVendorRole.other.narrator
  const base = voiceProfiles[profileId] ?? voiceProfiles.hubNarrator
  const forcedVoice = env.COURSE_VOICE
  const forcedRate = env.COURSE_VOICE_RATE
  return {
    ...base,
    role,
    vendor,
    voice: forcedVoice || base.voice,
    rate: forcedRate || base.rate,
    pitch: base.pitch,
  }
}

export function publicVoiceProfileCatalog() {
  return Object.values(voiceProfiles).map(profile => ({
    id: profile.id,
    vendor: profile.vendor,
    label: profile.label,
    voice: profile.voice,
    rate: profile.rate,
    pitch: profile.pitch,
    energy: profile.energy,
    emphasis: profile.emphasis,
    pauseMs: profile.pauseMs,
  }))
}
