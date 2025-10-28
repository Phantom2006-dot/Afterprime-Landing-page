"use client"

import { useEffect, useRef, useState } from "react"
import { Chart } from "chart.js/auto"

const AfterprimeProfitCalculator = () => {
  const chartRef = useRef(null)
  const chartInstance = useRef(null)

  // State for all inputs
  const [inputs, setInputs] = useState({
    start: 100000,
    b1: "Industry Average",
    b2: "Tickmill UK (Raw)",
    b3: "FXCM",
    months: 60,
    lots: 100,
    ret: 2,
  })

  // State for KPIs
  const [kpis, setKpis] = useState({
    kAdv: "$0",
    kAdvPct: "—",
    kAP: "$0",
    kAPRet: "—",
    kB1: "$0",
    kB1Ret: "—",
    b1NameA: "Broker 1",
    b1NameB: "Broker 1",
  })

  // Cost data
  const cost = {
    Afterprime: 4.2,
    FusionMarkets: 7.5,
    "IC Markets (cTrader)": 9.7,
    "IC Markets (Raw)": 9.7,
    "Vantage FX (RAW ECN)": 9.7,
    "Interactive Brokers": 10.4,
    "FXOpen (TickTrader)": 10.8,
    "Global Prime": 11.3,
    FXPIG: 11.5,
    "Tickmill UK (Raw)": 11.6,
    "Yadix (Scalper)": 11.9,
    TopFX: 12.1,
    "ATFX (.ins)": 12.2,
    FXCM: 12.3,
    CFH: 13.0,
    "FXOpen UK (ECN)": 13.6,
    "Advanced Markets (.a)": 13.7,
    "Axiory (MT5)": 13.9,
    "TaurexUK (.fi)": 14.0,
    "Pepperstone UK (.r)": 14.2,
    Axiory: 14.3,
    "RannForex (ECN)": 14.5,
    Swissquote: 14.5,
    "Tradersway (ECN)": 14.6,
    "9x Markets": 14.7,
    "FXCM (FT)": 14.8,
    "FTD Limited (.i)": 15.1,
    "Mt.Cook (ECN2)": 15.4,
    "Direct Trading Tech": 15.5,
    "FXPIG (cTrader)": 15.5,
    "Axiory (Zero)": 15.6,
    Darwinex: 15.7,
    "BlackBull Markets (ECN Prime)": 15.9,
    "Doo Prime (.uk)": 16.8,
    "BlackBull Markets (i)": 16.9,
    "Cara Markets (.c)": 17.1,
    "Equiti (.p)": 17.5,
    "Scope Markets": 17.6,
    AAAFX: 18.1,
    "CPTMarketsUK (c)": 18.4,
    "GO Markets (cTrader)": 18.4,
    Tier1FX: 18.6,
    "VARIANSE (x)": 19.1,
    "CPTMarketsUK (t)": 19.4,
    "Honor Capital Markets": 19.4,
    "VARIANSE (cTrader)": 19.4,
    "Pacific Financial Derivatives": 20.0,
    "Traders Trust": 20.2,
    "BidX Markets": 20.5,
    "Skilling (cTrader)": 20.5,
    "FIBO Group (.I)": 21.9,
    "Admiral Markets UK (Prime)": 22.8,
    Skilling: 23.1,
    Dukascopy: 24.6,
    OctaFX: 25.5,
    "Rakuten Australia": 25.9,
    "Bernstein Bank": 27.5,
    "GKFX (Professional)": 29.0,
    "Markets.com": 32.1,
    "FXChoice (Pro)": 35.3,
    "VARIANSE (ECNpro)": 36.2,
    "Amana Capital (Classic)": 40.0,
    "BlackBull Markets (cTrader)": 59.0,
    "Top 10": 10.2,
    "Industry Average": 18.4,
  }

  // Helper functions
  const USD = (v) =>
    v.toLocaleString(undefined, {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    })
  const clamp = (v, min, max) => Math.min(Math.max(v, min), max)

  // Build select options
  const buildOptions = (allowNone = false) => {
    const keys = Object.keys(cost)
      .filter((k) => k !== "Industry Average" && k !== "Top 10")
      .sort()
    const order = ["Industry Average", "Top 10", ...keys]

    return order.map((n, index) => {
      if (n === "Top 10" && index === 1) {
        return <optgroup key="divider" label="────────" className="divider" />
      }

      if (allowNone && index === 0) {
        return (
          <option key="none" value="">
            None
          </option>
        )
      }

      return (
        <option key={n} value={n}>
          {n}
        </option>
      )
    })
  }

  // Sync inputs
  const syncInput = (field, value, min, max, step) => {
    let numValue = Number.parseFloat(value)
    if (isNaN(numValue)) numValue = min
    numValue = clamp(numValue, min, max)

    const decimals = step.toString().split(".")[1]?.length || 0
    numValue = Math.round(numValue / step) * step
    numValue = Number.parseFloat(numValue.toFixed(decimals))

    setInputs((prev) => ({ ...prev, [field]: numValue }))
  }

  // RightLabels plugin
  const RightLabels = {
    id: "RightLabels",
    afterDatasetsDraw: (chart) => {
      try {
        const ctx = chart.ctx
        const chartArea = chart.chartArea
        if (!chartArea) return

        const x = chartArea.right + 10
        const top = chartArea.top
        const bottom = chartArea.bottom
        const h = 30
        const step = 6
        const used = []

        ctx.save()
        ctx.font = "12px sans-serif"
        ctx.textBaseline = "top"
        ctx.fillStyle = "#cbd5e1"

        const startBase = window.__calcStart || 1

        chart.data.datasets.forEach((dataset, i) => {
          const meta = chart.getDatasetMeta(i)
          if (!meta || !meta.data || !meta.data.length) return

          const point = meta.data[meta.data.length - 1]
          const endValue = dataset.data[dataset.data.length - 1]
          const percentage = startBase ? (endValue / startBase) * 100 : 0

          let y = point.y - 14
          let tries = 0

          const clash = (a, b) => !(y + h < a || y > b)

          while (tries < 200 && used.some((range) => clash(range[0], range[1]))) {
            const dir = tries % 2 === 0 ? 1 : -1
            y += dir * step * Math.ceil((tries + 1) / 2)
            y = Math.max(top, Math.min(y, bottom - h))
            tries++
          }

          used.push([y, y + h])

          ctx.fillText(dataset.label, x, y)
          ctx.fillText(`${USD(endValue)} (${percentage.toFixed(1)}%)`, x, y + 16)

          ctx.beginPath()
          ctx.arc(point.x, point.y, 3, 0, Math.PI * 2)
          ctx.fill()
        })

        ctx.restore()
      } catch (error) {
        console.error("Error in RightLabels plugin:", error)
      }
    },
  }

  // Compute profit series
  const compute = () => {
    const { months, lots, ret, start, b1, b2, b3 } = inputs
    const r = ret / 100
    const selOrder = [b1, b2, b3]
    const selColors = ["#38bdf8", "#a78bfa", "#f59e0b"]

    const defs = [
      { label: "Afterprime", color: "#22c55e", c: cost["Afterprime"] },
      { label: "Industry Average", color: "#94a3b8", c: cost["Industry Average"] },
    ]

    selOrder.forEach((broker, idx) => {
      if (!broker || broker === "None" || broker === "Afterprime") return
      if (cost[broker] == null) return
      if (defs.some((x) => x.label === broker)) return

      defs.push({
        label: broker,
        color: selColors[idx] || "#ef4444",
        c: cost[broker],
      })
    })

    const labels = []
    for (let i = 0; i <= months; i++) labels.push(i)

    const series = defs.map((d) => {
      let equity = start
      const data = [0]

      for (let m = 1; m <= months; m++) {
        equity = equity * (1 + r) - d.c * lots
        equity = Math.max(0, equity)
        data.push(equity - start)
      }

      return { d, data }
    })

    return { labels, series, start }
  }

  // Draw chart
  const drawChart = (calc) => {
    if (chartInstance.current) {
      chartInstance.current.destroy()
    }

    if (!chartRef.current) return

    window.__calcStart = calc.start

    const datasets = calc.series.map((s) => ({
      label: s.d.label,
      data: s.data,
      borderColor: s.d.color,
      pointBackgroundColor: s.d.color,
      borderWidth: 2,
      tension: 0.2,
      fill: false,
    }))

    chartInstance.current = new Chart(chartRef.current, {
      type: "line",
      data: {
        labels: calc.labels,
        datasets: datasets,
      },
      plugins: [RightLabels],
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: false,
        layout: {
          padding: { right: 200 },
        },
        plugins: {
          legend: {
            labels: {
              color: "#cbd5e1",
              boxWidth: 12,
              usePointStyle: true,
              pointStyle: "line",
            },
          },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: "Months",
              color: "#94a3b8",
            },
            ticks: { color: "#cbd5e1" },
            grid: { color: "rgba(148,163,184,.15)" },
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: "Profit (USD)",
              color: "#94a3b8",
            },
            ticks: {
              color: "#cbd5e1",
              callback: (v) => "$" + v.toLocaleString(),
            },
            grid: { color: "rgba(148,163,184,.15)" },
          },
        },
        elements: {
          point: {
            radius: 0,
            hitRadius: 10,
          },
        },
      },
    })
  }

  // Update KPIs
  const updateKpis = (calc) => {
    const b1Name = inputs.b1 || "Broker 1"
    const apSeries = calc.series.find((s) => s.d.label === "Afterprime")
    const indSeries = calc.series.find((s) => s.d.label === "Industry Average")
    const b1Series = calc.series.find((s) => s.d.label === b1Name)

    const apProfit = apSeries ? apSeries.data.slice(-1)[0] : 0
    const indProfit = indSeries ? indSeries.data.slice(-1)[0] : 0
    const b1Profit = b1Series ? b1Series.data.slice(-1)[0] : indProfit

    const apRet = (apProfit / calc.start) * 100
    const b1Ret = (b1Profit / calc.start) * 100

    setKpis({
      kAdv: USD(Math.max(0, apProfit - b1Profit)),
      kAdvPct: `${(((apProfit - b1Profit) / Math.abs(calc.start)) * 100).toFixed(1)}%`,
      kAP: USD(apProfit),
      kAPRet: `${apRet.toFixed(1)}% / ${calc.labels.length - 1}m`,
      kB1: USD(b1Profit),
      kB1Ret: `${b1Ret.toFixed(1)}% / ${calc.labels.length - 1}m`,
      b1NameA: b1Name,
      b1NameB: b1Name,
    })
  }

  // Update everything
  const updateAll = () => {
    const calc = compute()
    drawChart(calc)
    updateKpis(calc)
  }

  // Reset function
  const reset = () => {
    setInputs({
      start: 100000,
      b1: "Industry Average",
      b2: "Tickmill UK (Raw)",
      b3: "FXCM",
      months: 60,
      lots: 100,
      ret: 2,
    })
  }

  // Initialize on mount and update when inputs change
  useEffect(() => {
    updateAll()
  }, [inputs])

  // Cleanup chart on unmount
  useEffect(() => {
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [])

  return (
     <section
      id="costs"
      ref={sectionRef}
      className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-brand-navy-light"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">See Your Cost Advantage</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Interactive calculator showing real profit differences. Adjust your parameters and watch the advantage
            compound.
          </p>
        </div>
    <div className="w-full space-y-6 rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900/50 to-slate-800/30 p-6 md:p-8 backdrop-blur-sm">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white md:text-3xl">Your Cost Advantage</h2>
          <p className="mt-2 text-sm text-slate-400">
            Adjust balance, months, lots, and monthly return. Broker costs use ForexBenchmark 7‑day averages.
          </p>
        </div>
        <button
          onClick={reset}
          className="w-full rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 px-4 py-2 font-semibold text-white transition-all hover:shadow-lg hover:shadow-orange-500/50 sm:w-auto"
        >
          Reset
        </button>
      </div>

      {/* Inputs Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Starting Balance (USD)
          </label>
          <input
            type="number"
            min="100"
            step="100"
            value={inputs.start}
            onChange={(e) => setInputs((prev) => ({ ...prev, start: Number.parseFloat(e.target.value) }))}
            className="w-full rounded-lg border border-white/10 bg-slate-800/50 px-3 py-2 text-white placeholder-slate-500 transition-colors focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">Broker 1 (Primary)</label>
          <select
            value={inputs.b1}
            onChange={(e) => setInputs((prev) => ({ ...prev, b1: e.target.value }))}
            className="w-full rounded-lg border border-white/10 bg-slate-800/50 px-3 py-2 text-white transition-colors focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
          >
            {buildOptions(false)}
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">Broker 2</label>
          <select
            value={inputs.b2}
            onChange={(e) => setInputs((prev) => ({ ...prev, b2: e.target.value }))}
            className="w-full rounded-lg border border-white/10 bg-slate-800/50 px-3 py-2 text-white transition-colors focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
          >
            {buildOptions(true)}
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">Broker 3</label>
          <select
            value={inputs.b3}
            onChange={(e) => setInputs((prev) => ({ ...prev, b3: e.target.value }))}
            className="w-full rounded-lg border border-white/10 bg-slate-800/50 px-3 py-2 text-white transition-colors focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
          >
            {buildOptions(true)}
          </select>
        </div>
      </div>

      {/* Sliders */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="space-y-3 rounded-lg border border-white/10 bg-slate-800/30 p-4">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Lots per Month (1–1000)
          </label>
          <div className="flex items-center gap-3">
            <input
              type="range"
              min="1"
              max="1000"
              step="1"
              value={inputs.lots}
              onChange={(e) => syncInput("lots", e.target.value, 1, 1000, 1)}
              className="h-2 w-full cursor-pointer rounded-full bg-gradient-to-r from-amber-500 to-pink-500 accent-amber-500"
            />
            <input
              type="number"
              min="1"
              max="1000"
              step="1"
              value={inputs.lots}
              onChange={(e) => syncInput("lots", e.target.value, 1, 1000, 1)}
              className="w-20 rounded-lg border border-white/10 bg-slate-800/50 px-2 py-1 text-center text-white focus:border-amber-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="space-y-3 rounded-lg border border-white/10 bg-slate-800/30 p-4">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">Monthly Return (%)</label>
          <div className="flex items-center gap-3">
            <input
              type="range"
              min="-10"
              max="10"
              step="0.1"
              value={inputs.ret}
              onChange={(e) => syncInput("ret", e.target.value, -10, 10, 0.1)}
              className="h-2 w-full cursor-pointer rounded-full bg-gradient-to-r from-pink-500 to-purple-500 accent-pink-500"
            />
            <input
              type="number"
              min="-10"
              max="10"
              step="0.1"
              value={inputs.ret}
              onChange={(e) => syncInput("ret", e.target.value, -10, 10, 0.1)}
              className="w-20 rounded-lg border border-white/10 bg-slate-800/50 px-2 py-1 text-center text-white focus:border-pink-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="space-y-3 rounded-lg border border-white/10 bg-slate-800/30 p-4">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">Months (1–60)</label>
          <div className="flex items-center gap-3">
            <input
              type="range"
              min="1"
              max="60"
              step="1"
              value={inputs.months}
              onChange={(e) => syncInput("months", e.target.value, 1, 60, 1)}
              className="h-2 w-full cursor-pointer rounded-full bg-gradient-to-r from-purple-500 to-amber-500 accent-purple-500"
            />
            <input
              type="number"
              min="1"
              max="60"
              step="1"
              value={inputs.months}
              onChange={(e) => syncInput("months", e.target.value, 1, 60, 1)}
              className="w-20 rounded-lg border border-white/10 bg-slate-800/50 px-2 py-1 text-center text-white focus:border-purple-500 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-lg border border-green-500/30 bg-gradient-to-br from-green-500/10 to-emerald-500/5 p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Afterprime Profit</p>
          <p className="mt-2 text-2xl font-bold text-green-400">{kpis.kAP}</p>
          <p className="mt-1 text-xs text-slate-500">{kpis.kAPRet}</p>
        </div>

        <div className="rounded-lg border border-blue-500/30 bg-gradient-to-br from-blue-500/10 to-cyan-500/5 p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">{kpis.b1NameB} Profit</p>
          <p className="mt-2 text-2xl font-bold text-blue-400">{kpis.kB1}</p>
          <p className="mt-1 text-xs text-slate-500">{kpis.kB1Ret}</p>
        </div>

        <div className="rounded-lg border border-amber-500/30 bg-gradient-to-br from-amber-500/10 to-orange-500/5 p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Afterprime Advantage</p>
          <p className="mt-2 text-2xl font-bold text-amber-400">{kpis.kAdv}</p>
          <p className="mt-1 text-xs text-slate-500">{kpis.kAdvPct}</p>
        </div>
      </div>

      {/* Chart */}
      <div className="overflow-x-auto rounded-lg border border-white/10 bg-slate-800/30 p-4">
        <div className="relative" style={{ height: "400px", minWidth: "600px" }}>
          <canvas ref={chartRef} />
        </div>
        <p className="mt-3 text-xs text-slate-500">
          Source: ForexBenchmark. Day session 04:00–22:00. Past averages don't guarantee future outcomes. Equity floored
          at $0.
        </p>
      </div>
    </div>
           </div>
    </section>
  )
}

export default AfterprimeProfitCalculator
