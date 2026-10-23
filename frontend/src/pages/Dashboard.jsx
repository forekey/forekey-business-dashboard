import { useCallback, useEffect, useState } from 'react'
import StatCard from '../components/StatCard'
import { fetchDashboardStats, getErrorMessage } from '../services/api'

export default function Dashboard() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const load = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const data = await fetchDashboardStats()
      setStats(data)
    } catch (err) {
      setStats(null)
      setError(getErrorMessage(err, 'Could not load dashboard statistics.'))
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    load()
  }, [load])

  return (
    <div className="page">
      <header className="page-header">
        <div>
          <h1>Dashboard</h1>
          <p className="page-header__subtitle">Overview of your customer base</p>
        </div>
        <button type="button" className="btn btn--secondary" onClick={load}>
          Refresh
        </button>
      </header>

      {loading ? <p className="status-message">Loading statistics…</p> : null}
      {error ? (
        <div className="alert alert--error" role="alert">
          {error}
        </div>
      ) : null}

      {!loading && !error && stats ? (
        <div className="stat-grid">
          <StatCard label="Total customers" value={stats.total_customers} />
          <StatCard label="Active customers" value={stats.active_customers} />
          <StatCard label="Inactive customers" value={stats.inactive_customers} />
          <StatCard
            label="New this month"
            value={stats.new_customers_this_month}
          />
        </div>
      ) : null}
    </div>
  )
}
