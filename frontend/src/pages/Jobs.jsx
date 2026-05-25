import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import PageWrap from '../components/PageWrap.jsx'
import JobCard from '../components/JobCard.jsx'
import Spinner from '../components/Spinner.jsx'
import { jobsApi } from '../services/api'
import toast from 'react-hot-toast'

export default function Jobs() {
  const [params, setParams] = useSearchParams()
  const [q, setQ] = useState(params.get('q') || '')
  const [jobs, setJobs] = useState([]) // Defaults to a safe array
  const [loading, setLoading] = useState(true)

  const load = async (search) => {
    setLoading(true)
    try { 
      const response = await jobsApi.listPublic(search || '')
      
      // Force checking: Make sure what we save into state is actually an array
      if (Array.isArray(response)) {
        setJobs(response)
      } else if (response && Array.isArray(response.data)) {
        setJobs(response.data)
      } else {
        setJobs([]) // Fallback if backend sends an unexpected structure
      }
    } 
    catch (e) { 
      setJobs([]) // If backend returns an explicit HTTP 500 error, reset to safe array
      toast.error(e?.response?.data?.error || 'Failed to load jobs') 
    }
    finally { setLoading(false) }
  }

  useEffect(() => { load(params.get('q') || '') }, [params])

  const submit = e => { e.preventDefault(); setParams(q ? { q } : {}) }

  // Safe length count calculation
  const safeJobsArray = Array.isArray(jobs) ? jobs : []

  return (
    <PageWrap>
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">Browse Jobs</h1>
          <p className="text-slate-500 mt-1">
            {loading ? 'Loading…' : `${safeJobsArray.length} open positions`}
          </p>
        </div>
        <form onSubmit={submit} className="flex gap-2 w-full md:w-auto">
          <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search…" className="input md:w-80" />
          <button className="btn-primary">Search</button>
        </form>
      </div>

      {loading ? (
        <Spinner label="Loading jobs" />
      ) : safeJobsArray.length === 0 ? (
        <div className="card text-center text-slate-500">No jobs found.</div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {safeJobsArray.map(j => (
            <JobCard key={j.id} job={j} />
          ))}
        </div>
      )}
    </PageWrap>
  )
}
