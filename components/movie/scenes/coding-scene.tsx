'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { FileCode, Circle } from 'lucide-react'

interface Commentary {
  atLine: number
  text: string
}

interface CodingContent {
  tag?: string
  filename: string
  code: string
  commentary?: Commentary[]
}

interface CodingSceneProps {
  content: CodingContent
  progress: number
}

// Token types for syntax highlighting
type TokenType = 'keyword' | 'component' | 'string' | 'number' | 'comment' | 'jsx-attr' | 'type' | 'default'

const KEYWORDS = new Set([
  'import', 'export', 'default', 'const', 'let', 'var', 'function', 'return',
  'from', 'if', 'else', 'true', 'false', 'null', 'undefined', 'type', 'interface',
  'extends', 'implements', 'class', 'new', 'async', 'await', 'of', 'in', 'for',
  'while', 'switch', 'case', 'break', 'typeof', 'as',
])

const JSX_ATTRS = new Set([
  'className', 'onClick', 'onChange', 'key', 'style', 'checked', 'onCheckedChange',
  'variant', 'size', 'disabled', 'placeholder', 'href', 'src', 'alt', 'ref',
  'onRetry', 'width', 'height', 'dataKey', 'stroke', 'strokeWidth', 'fill',
  'type', 'data', 'margin', 'tick', 'tickLine', 'axisLine', 'tickFormatter',
  'contentStyle', 'labelStyle', 'formatter', 'stopColor', 'stopOpacity',
  'offset', 'id', 'x1', 'y1', 'x2', 'y2',
])

function tokenizeLine(line: string): Array<{ text: string; type: TokenType }> {
  const tokens: Array<{ text: string; type: TokenType }> = []

  // Full line comment
  const trimmed = line.trimStart()
  if (trimmed.startsWith('//') || trimmed.startsWith('*') || trimmed.startsWith('/*')) {
    tokens.push({ text: line, type: 'comment' })
    return tokens
  }

  // Simple split keeping delimiters
  const parts = line.split(/(\s+|[{}()[\],;:<>/`!@#$%^&*=+|?~\\]|"[^"]*"|'[^']*')/g)

  for (const part of parts) {
    if (!part) continue

    let type: TokenType = 'default'

    if (part.startsWith('"') || part.startsWith("'") || part.startsWith('`')) {
      type = 'string'
    } else if (/^\d+(\.\d+)?$/.test(part)) {
      type = 'number'
    } else if (KEYWORDS.has(part)) {
      type = 'keyword'
    } else if (JSX_ATTRS.has(part)) {
      type = 'jsx-attr'
    } else if (/^[A-Z][A-Za-z0-9]*$/.test(part)) {
      type = 'component'
    } else if (part.endsWith(':') && !part.includes('//')) {
      type = 'type'
    }

    tokens.push({ text: part, type })
  }

  return tokens
}

const TOKEN_COLORS: Record<TokenType, string> = {
  keyword:   'text-pink-400',
  component: 'text-yellow-300',
  string:    'text-emerald-400',
  number:    'text-orange-400',
  comment:   'text-zinc-500 italic',
  'jsx-attr':'text-cyan-400',
  type:      'text-blue-400',
  default:   'text-zinc-200',
}

function CodeLine({ line, lineNumber }: { line: string; lineNumber: number }) {
  const tokens = tokenizeLine(line)
  return (
    <div className="flex group">
      <span className="select-none text-zinc-600 text-right pr-4 shrink-0 w-10 leading-relaxed group-hover:text-zinc-400 transition-colors">
        {lineNumber}
      </span>
      <span className="leading-relaxed whitespace-pre">
        {tokens.map((token, i) => (
          <span key={i} className={TOKEN_COLORS[token.type]}>
            {token.text}
          </span>
        ))}
      </span>
    </div>
  )
}

export function CodingScene({ content, progress }: CodingSceneProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const allLines = content.code.split('\n')
  const totalLines = allLines.length
  
  // How many lines to show — progress drives it, leaving a tiny cursor delay
  const visibleCount = Math.min(totalLines, Math.max(1, Math.floor((progress / 100) * totalLines * 1.05)))
  const visibleLines = allLines.slice(0, visibleCount)
  const isTyping = visibleCount < totalLines

  // Find active commentary
  const activeComment = content.commentary?.findLast(c => c.atLine <= visibleCount)

  // Auto-scroll to follow new lines
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    // Smoothly scroll to bottom whenever new lines appear
    el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' })
  }, [visibleCount])

  return (
    <div className="flex flex-col h-full overflow-hidden bg-background">
      {/* Tag */}
      {content.tag && (
        <div className="shrink-0 px-6 pt-5 pb-2">
          <span className="text-xs font-mono tracking-widest text-muted-foreground uppercase">
            {content.tag}
          </span>
        </div>
      )}

      {/* Editor window — takes all available height */}
      <div className="flex-1 flex flex-col mx-4 md:mx-8 mb-24 min-h-0 rounded-lg border border-border overflow-hidden">
        {/* Title bar */}
        <div className="shrink-0 flex items-center gap-2 px-4 py-2.5 bg-zinc-900 border-b border-border">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <div className="flex-1 flex items-center justify-center gap-1.5">
            <FileCode className="w-3.5 h-3.5 text-muted-foreground" />
            <span className="text-xs font-mono text-muted-foreground">{content.filename}</span>
          </div>
          <div className="flex items-center gap-1.5">
            {isTyping ? (
              <>
                <Circle className="w-1.5 h-1.5 fill-green-500 text-green-500 animate-pulse" />
                <span className="text-xs font-mono text-muted-foreground">Generando...</span>
              </>
            ) : (
              <>
                <Circle className="w-1.5 h-1.5 fill-accent text-accent" />
                <span className="text-xs font-mono text-muted-foreground">Listo</span>
              </>
            )}
          </div>
        </div>

        {/* Split: code | commentary */}
        <div className="flex-1 flex min-h-0 bg-zinc-950">
          {/* Code area — scrollable, follows typing */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto overflow-x-auto p-4 font-mono text-[13px] scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent"
          >
            {visibleLines.map((line, i) => (
              <CodeLine key={i} line={line} lineNumber={i + 1} />
            ))}
            {/* Blinking cursor at end */}
            {isTyping && (
              <div className="flex">
                <span className="select-none text-zinc-600 text-right pr-4 shrink-0 w-10">
                  {visibleCount + 1}
                </span>
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.7, repeat: Infinity }}
                  className="inline-block w-2 h-4 bg-accent align-middle"
                />
              </div>
            )}
          </div>

          {/* Commentary sidebar */}
          {content.commentary && content.commentary.length > 0 && (
            <div className="w-52 shrink-0 border-l border-border p-3 hidden lg:flex flex-col gap-2 overflow-y-auto">
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-mono mb-1">
                Notas
              </p>
              {content.commentary.map((c, i) => (
                <motion.div
                  key={i}
                  animate={{
                    opacity: visibleCount >= c.atLine ? 1 : 0.2,
                    x: visibleCount >= c.atLine ? 0 : 4,
                  }}
                  transition={{ duration: 0.4 }}
                  className={`text-xs rounded p-2 border transition-colors ${
                    activeComment?.atLine === c.atLine
                      ? 'border-accent/40 bg-accent/10 text-foreground'
                      : 'border-border text-muted-foreground'
                  }`}
                >
                  <span className="font-mono text-muted-foreground/60 text-[10px] block mb-0.5">
                    L{c.atLine}
                  </span>
                  {c.text}
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Status bar */}
        <div className="shrink-0 flex items-center justify-between px-4 py-1.5 bg-zinc-900 border-t border-border text-[11px] font-mono text-muted-foreground">
          <span>TypeScript JSX</span>
          <span>{visibleCount} / {totalLines} líneas</span>
        </div>
      </div>
    </div>
  )
}
