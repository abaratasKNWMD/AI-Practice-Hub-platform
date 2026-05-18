'use client'

import { motion } from 'framer-motion'
import { CheckCircle2, Clock3, Coins, Database, GitPullRequest, ShieldCheck, Sparkles } from 'lucide-react'

interface TitleContent {
  title: string
  subtitle: string
  tag: string
}

interface TitleSceneProps {
  content: TitleContent
  progress: number
}

const routeItems = [
  { label: 'Contexto', icon: Database },
  { label: 'Modelo', icon: Sparkles },
  { label: 'Coste', icon: Coins },
  { label: 'Permisos', icon: ShieldCheck },
  { label: 'Evidencia', icon: GitPullRequest },
]

function MiniStat({ label, value, icon: Icon, active }: { label: string; value: string; icon: React.ElementType; active: boolean }) {
  return (
    <motion.div
      animate={{ opacity: active ? 1 : 0.3, y: active ? 0 : 6 }}
      transition={{ duration: 0.35 }}
      className="rounded-lg border border-white/10 bg-white/[0.055] p-4"
    >
      <div className="mb-3 flex items-center justify-between">
        <Icon className="h-4 w-4 text-white/55" />
        <CheckCircle2 className={`h-4 w-4 ${active ? 'text-emerald-300' : 'text-white/20'}`} />
      </div>
      <p className="text-xs uppercase tracking-[0.16em] text-white/40">{label}</p>
      <p className="mt-2 text-sm font-semibold leading-5 text-white">{value}</p>
    </motion.div>
  )
}

export function TitleScene({ content, progress }: TitleSceneProps) {
  const activeRoute = Math.min(routeItems.length, Math.floor((progress / 100) * (routeItems.length + 1)))
  const showSubtitle = progress > 28
  const showBoard = progress > 45

  return (
    <div className="relative h-full overflow-hidden bg-zinc-950 text-white">
      <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.06)_1px,transparent_1px)] [background-size:52px_52px]" />
      <div className="absolute inset-x-0 top-0 h-96 bg-gradient-to-b from-white/10 via-cyan-300/5 to-transparent" />

      <div className="relative grid h-full grid-rows-[1fr_auto] px-5 pb-24 pt-6 md:px-12 md:pb-28 md:pt-7">
        <main className="grid min-h-0 items-center gap-8 xl:grid-cols-[minmax(0,1fr)_28rem]">
          <section>
            <motion.p
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="text-xs font-mono uppercase tracking-[0.26em] text-white/45"
            >
              {content.tag}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="mt-5 max-w-6xl text-4xl font-bold leading-[0.95] tracking-tight text-white md:text-7xl xl:text-8xl"
            >
              {content.title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: showSubtitle ? 1 : 0, y: showSubtitle ? 0 : 10 }}
              transition={{ duration: 0.5 }}
              className="mt-6 max-w-3xl text-base leading-7 text-white/62 md:text-xl md:leading-8"
            >
              {content.subtitle}
            </motion.p>
          </section>

          <motion.aside
            initial={{ opacity: 0, x: 18 }}
            animate={{ opacity: showBoard ? 1 : 0, x: showBoard ? 0 : 18 }}
            transition={{ duration: 0.55 }}
            className="hidden gap-4 md:grid"
          >
            <div className="rounded-lg border border-white/10 bg-white/[0.055] p-5">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-xs font-mono uppercase tracking-[0.2em] text-white/40">ruta de aprendizaje</p>
                  <p className="mt-2 text-lg font-semibold text-white">De demo a criterio operativo</p>
                </div>
                <Clock3 className="h-5 w-5 text-white/45" />
              </div>
              <div className="space-y-3">
                {routeItems.map((item, index) => {
                  const Icon = item.icon
                  const active = index < activeRoute
                  return (
                    <div key={item.label} className="flex items-center gap-3">
                      <span className={`flex h-8 w-8 items-center justify-center rounded-full border ${active ? 'border-emerald-300/50 bg-emerald-300/10 text-emerald-100' : 'border-white/10 text-white/25'}`}>
                        <Icon className="h-4 w-4" />
                      </span>
                      <div className={`h-px flex-1 ${active ? 'bg-emerald-300/40' : 'bg-white/10'}`} />
                      <span className={`w-24 text-right text-sm ${active ? 'text-white' : 'text-white/35'}`}>{item.label}</span>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <MiniStat label="Pantallas" value="alta cadencia" icon={Clock3} active={progress > 52} />
              <MiniStat label="Coste" value="visible" icon={Coins} active={progress > 60} />
              <MiniStat label="Riesgo" value="controlado" icon={ShieldCheck} active={progress > 68} />
              <MiniStat label="Salida" value="revisable" icon={GitPullRequest} active={progress > 76} />
            </div>
          </motion.aside>
        </main>
      </div>
    </div>
  )
}
