// This file exists solely to hold code strings that contain
// JSX-like content, keeping them out of movie-script.ts which
// is a plain TypeScript file the parser must handle.
// String.raw preserves backslashes so \n, \` etc. are literal.

export const DASHBOARD_CODE_STRING = String.raw`'use client'

import { useState } from 'react'
import useSWR from 'swr'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { TrendingUp, ShoppingCart, CreditCard, Target, AlertCircle, RefreshCw } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

// ─── Types ────────────────────────────────────────────────
interface KPIs {
  totalRevenue: number
  transactions: number
  avgTicket: number
  conversionRate: number
}
interface ChartPoint { date: string; value: number }
interface Product { name: string; units: number; revenue: number; pct: number }
interface SalesData { kpis: KPIs; chart: ChartPoint[]; products: Product[] }

// ─── Fetcher ──────────────────────────────────────────────
const fetcher = (url: string) => fetch(url).then(r => r.json())

// ─── Periods ──────────────────────────────────────────────
const PERIODS = [
  { label: 'Hoy',     value: '1d'  },
  { label: '7 días',  value: '7d'  },
  { label: '30 días', value: '30d' },
  { label: '90 días', value: '90d' },
] as const
type Period = typeof PERIODS[number]['value']

// ─── KPI Card ─────────────────────────────────────────────
function KpiCard({ title, value, icon: Icon, trend }: {
  title: string; value: string; icon: React.ElementType; trend?: number
}) {
  const trendClass = trend !== undefined && trend >= 0 ? 'text-green-500' : 'text-red-500'
  return (
    <Card className="bg-card border-border">
      <CardContent className="pt-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground">{title}</span>
          <Icon className="w-4 h-4 text-muted-foreground" />
        </div>
        <div className="text-2xl font-bold text-foreground">{value}</div>
        {trend !== undefined && (
          <p className={'text-xs mt-1 ' + trendClass}>
            {trend >= 0 ? '+' : ''}{trend}% vs periodo anterior
          </p>
        )}
      </CardContent>
    </Card>
  )
}

// ─── Skeleton ─────────────────────────────────────────────
function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i}><CardContent className="pt-6 space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-3 w-20" />
          </CardContent></Card>
        ))}
      </div>
      <Skeleton className="h-64 w-full rounded-lg" />
      <Skeleton className="h-96 w-full rounded-lg" />
    </div>
  )
}

// ─── Error Banner ─────────────────────────────────────────
function ErrorBanner({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="flex items-center gap-3 p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive">
      <AlertCircle className="w-5 h-5 shrink-0" />
      <span className="text-sm flex-1">Error cargando datos. Intentalo de nuevo.</span>
      <Button variant="outline" size="sm" onClick={onRetry} className="gap-1.5">
        <RefreshCw className="w-3 h-3" /> Reintentar
      </Button>
    </div>
  )
}

// ─── Pagina principal ──────────────────────────────────────
export default function VentasDashboard() {
  const [period, setPeriod] = useState<Period>('30d')
  const [page, setPage] = useState(1)
  const PER_PAGE = 10

  const { data, error, isLoading, mutate } = useSWR<SalesData>(
    '/api/analytics/sales?period=' + period,
    fetcher
  )

  const fmt = (n: number) =>
    new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n)

  const paginatedProducts = data?.products.slice((page - 1) * PER_PAGE, page * PER_PAGE) ?? []
  const totalPages = Math.ceil((data?.products.length ?? 0) / PER_PAGE)

  return (
    <main className="p-4 md:p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Dashboard de Ventas</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Analitica en tiempo real — ECI Platform</p>
        </div>
        <div className="flex gap-1 bg-secondary rounded-lg p-1">
          {PERIODS.map(p => (
            <button key={p.value} onClick={() => { setPeriod(p.value); setPage(1) }}
              className={'px-3 py-1.5 text-sm rounded-md transition-colors font-medium '
                + (period === p.value ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground')}>
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {isLoading && <DashboardSkeleton />}
      {error && !isLoading && <ErrorBanner onRetry={() => mutate()} />}

      {data && !isLoading && (
        <>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <KpiCard title="Total ventas"   value={fmt(data.kpis?.totalRevenue ?? 0)}           icon={TrendingUp}  trend={12.4} />
            <KpiCard title="Transacciones"  value={(data.kpis?.transactions ?? 0).toLocaleString('es-ES')} icon={ShoppingCart} trend={8.1} />
            <KpiCard title="Ticket medio"   value={fmt(data.kpis?.avgTicket ?? 0)}               icon={CreditCard}  trend={-2.3} />
            <KpiCard title="Conversion"     value={(data.kpis?.conversionRate ?? 0) + '%'}       icon={Target}      trend={0.5} />
          </div>

          <Card>
            <CardHeader><CardTitle className="text-base">Evolucion de ventas</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={240}>
                <AreaChart data={data.chart}>
                  <defs>
                    <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%"  stopColor="var(--accent)" stopOpacity={0.25} />
                      <stop offset="95%" stopColor="var(--accent)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="date" tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }} tickLine={false} axisLine={false} />
                  <YAxis  tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }} tickLine={false} axisLine={false}
                    tickFormatter={v => (v / 1000).toFixed(0) + 'k'} />
                  <Tooltip formatter={(v: number) => [fmt(v), 'Ventas']} />
                  <Area type="monotone" dataKey="value" stroke="var(--accent)" strokeWidth={2} fill="url(#grad)" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="text-base">Top productos por revenue</CardTitle></CardHeader>
            <CardContent className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>#</TableHead>
                    <TableHead>Producto</TableHead>
                    <TableHead className="text-right">Unidades</TableHead>
                    <TableHead className="text-right">Revenue</TableHead>
                    <TableHead className="text-right">% total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedProducts.map((product, i) => (
                    <TableRow key={product.name}>
                      <TableCell className="font-mono text-sm text-muted-foreground">
                        {(page - 1) * PER_PAGE + i + 1}
                      </TableCell>
                      <TableCell className="font-medium">{product.name}</TableCell>
                      <TableCell className="text-right text-muted-foreground">
                        {product.units.toLocaleString('es-ES')}
                      </TableCell>
                      <TableCell className="text-right font-mono">{fmt(product.revenue)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <div className="h-1.5 w-16 bg-secondary rounded-full overflow-hidden">
                            <div className="h-full bg-accent rounded-full" style={{ width: product.pct + '%' }} />
                          </div>
                          <span className="text-muted-foreground text-sm">{product.pct.toFixed(1)}%</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {totalPages > 1 && (
                <div className="flex items-center justify-between mt-4">
                  <span className="text-sm text-muted-foreground">{data.products.length} productos</span>
                  <div className="flex gap-1">
                    <Button variant="outline" size="sm" disabled={page === 1} onClick={() => setPage(p => p - 1)}>Anterior</Button>
                    <Button variant="outline" size="sm" disabled={page === totalPages} onClick={() => setPage(p => p + 1)}>Siguiente</Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </>
      )}
    </main>
  )
}`
