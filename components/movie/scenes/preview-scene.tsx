'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, ShoppingCart, CreditCard, Target, AlertCircle, RefreshCw } from 'lucide-react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface PreviewSceneProps {
  content?: { tag?: string }
  progress: number
}

// ── Mock data for the ECI dashboard ──────────────────────
const CHART_DATA = [
  { date: '1 Feb', value: 124000 }, { date: '5 Feb', value: 138000 },
  { date: '10 Feb', value: 119000 }, { date: '15 Feb', value: 154000 },
  { date: '20 Feb', value: 162000 }, { date: '25 Feb', value: 148000 },
  { date: '1 Mar', value: 171000 }, { date: '5 Mar', value: 184000 },
  { date: '10 Mar', value: 179000 }, { date: '15 Mar', value: 203000 },
]

const PRODUCTS = [
  { name: 'Zara — Blazer Structured', units: 2341, revenue: 187280, pct: 14.2 },
  { name: 'Pull&Bear — Cargo Pants', units: 3102, revenue: 155100, pct: 11.8 },
  { name: 'Massimo Dutti — Trench', units: 891, revenue: 142560, pct: 10.8 },
  { name: 'Bershka — Oversized Hoodie', units: 4210, revenue: 126300, pct: 9.6 },
  { name: 'Stradivarius — Midi Dress', units: 2890, revenue: 115600, pct: 8.8 },
]

const PERIODS = ['Hoy', '7 días', '30 días', '90 días'] as const
type Period = typeof PERIODS[number]

function KpiCard({ title, value, sub, icon: Icon }: {
  title: string; value: string; sub: string; icon: React.ElementType
}) {
  return (
    <Card className="bg-card border-border">
      <CardContent className="pt-5 pb-4">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs text-muted-foreground">{title}</span>
          <Icon className="w-3.5 h-3.5 text-muted-foreground" />
        </div>
        <p className="text-xl font-bold text-foreground">{value}</p>
        <p className="text-xs text-green-500 mt-0.5">{sub}</p>
      </CardContent>
    </Card>
  )
}

export function PreviewScene({ content }: PreviewSceneProps) {
  const [period, setPeriod] = useState<Period>('30 días')
  const fmt = (n: number) =>
    new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n)

  return (
    <div className="flex flex-col h-full overflow-hidden bg-background">
      {content?.tag && (
        <div className="shrink-0 px-6 pt-5 pb-2">
          <span className="text-xs font-mono tracking-widest text-muted-foreground uppercase">
            {content.tag}
          </span>
        </div>
      )}

      {/* Browser chrome */}
      <div className="shrink-0 mx-4 md:mx-8 mt-2 rounded-t-xl border border-b-0 border-border overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-2 bg-zinc-900">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
          </div>
          <div className="flex-1 flex justify-center">
            <div className="px-3 py-0.5 bg-zinc-800 rounded text-xs text-muted-foreground font-mono">
              localhost:3000/dashboard/ventas
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="flex-1 overflow-y-auto mx-4 md:mx-8 mb-24 border border-border rounded-b-xl bg-background p-4 md:p-6 space-y-5"
      >
        {/* Page header + period filter */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-lg font-bold text-foreground">Dashboard de Ventas</h1>
            <p className="text-xs text-muted-foreground mt-0.5">Analitica en tiempo real — ECI Platform</p>
          </div>
          <div className="flex gap-0.5 bg-secondary rounded-lg p-1">
            {PERIODS.map(p => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`px-2.5 py-1 text-xs rounded-md transition-colors font-medium ${
                  period === p
                    ? 'bg-background text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* KPI row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <KpiCard title="Total ventas" value={fmt(1_318_000)} sub="+12.4% vs anterior" icon={TrendingUp} />
          <KpiCard title="Transacciones" value="24.810" sub="+8.1% vs anterior" icon={ShoppingCart} />
          <KpiCard title="Ticket medio" value={fmt(53)} sub="-2.3% vs anterior" icon={CreditCard} />
          <KpiCard title="Conversion" value="3.8%" sub="+0.5pp vs anterior" icon={Target} />
        </div>

        {/* Chart */}
        <Card>
          <CardHeader className="pb-2 pt-4 px-5">
            <CardTitle className="text-sm font-medium">Evolucion de ventas</CardTitle>
          </CardHeader>
          <CardContent className="px-2 pb-4">
            <ResponsiveContainer width="100%" height={180}>
              <AreaChart data={CHART_DATA} margin={{ top: 4, right: 8, bottom: 0, left: 0 }}>
                <defs>
                  <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(250 60% 60%)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(250 60% 60%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border) / 0.5)" />
                <XAxis dataKey="date" tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }} tickLine={false} axisLine={false} />
                <YAxis tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }} tickLine={false} axisLine={false} tickFormatter={v => `${(v / 1000).toFixed(0)}k`} />
                <Tooltip
                  contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 8, fontSize: 12 }}
                  formatter={(v: number) => [fmt(v), 'Ventas']}
                />
                <Area type="monotone" dataKey="value" stroke="hsl(250 60% 60%)" strokeWidth={2} fill="url(#g)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Products table */}
        <Card>
          <CardHeader className="pb-2 pt-4 px-5">
            <CardTitle className="text-sm font-medium">Top productos por revenue</CardTitle>
          </CardHeader>
          <CardContent className="px-5 pb-4 overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-border text-muted-foreground">
                  <th className="text-left pb-2 font-medium">#</th>
                  <th className="text-left pb-2 font-medium">Producto</th>
                  <th className="text-right pb-2 font-medium">Uds.</th>
                  <th className="text-right pb-2 font-medium">Revenue</th>
                  <th className="text-right pb-2 font-medium">% total</th>
                </tr>
              </thead>
              <tbody>
                {PRODUCTS.map((p, i) => (
                  <tr key={p.name} className="border-b border-border/50 last:border-0">
                    <td className="py-2 text-muted-foreground font-mono">{i + 1}</td>
                    <td className="py-2 font-medium pr-4">{p.name}</td>
                    <td className="py-2 text-right text-muted-foreground">{p.units.toLocaleString('es-ES')}</td>
                    <td className="py-2 text-right font-mono">{fmt(p.revenue)}</td>
                    <td className="py-2 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <div className="h-1 w-12 bg-secondary rounded-full overflow-hidden">
                          <div className="h-full bg-accent rounded-full" style={{ width: `${p.pct * 4}%` }} />
                        </div>
                        <span className="text-muted-foreground w-8 text-right">{p.pct}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>

        {/* Empty/error states callout */}
        <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-3 flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-destructive">Estado de error — ejemplo</p>
            <p className="text-xs text-muted-foreground mt-0.5">El Spec definio este banner. Aparece cuando la API falla.</p>
          </div>
          <Button variant="outline" size="sm" className="text-xs h-7 shrink-0">
            <RefreshCw className="w-3 h-3 mr-1" />
            Reintentar
          </Button>
        </div>
      </motion.div>
    </div>
  )
}
