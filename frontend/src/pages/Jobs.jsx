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
  const [jobs, setJobs] = useState([]) 
  const [loading, setLoading] = useState(true)

  const load = async (search) => {
    setLoading(true)
    try { 
      const res = await jobsApi.listPublic(search || '')
      // Safety check: Ensure what we save into state is always an array
      setJobs(Array.isArray(res) ? res : [])
    } 
    catch (e) { 
      setJobs([]) // Reset to safe empty array on backend crash
      toast.error(e?.response?.data?.error || 'Failed to load jobs') 
    }
    finally { setLoading(false) }
  }

  useEffect(() => { load(params.get('q') || '') }, [params])

  const submit = e => { 
    e.preventDefault()
    setParams(q ? { q } : {}) 
  }

  // Calculate safe length display text
  const positionsCount = Array.isArray(jobs) ? jobs.length : 0

  return (
    <PageWrap>
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">Browse Jobs</h1>
          <p className="text-slate-500 mt-1">
            {loading ? 'Loading…' : `${positionsCount} open positions`}
          </p>
        </div>
        <form onSubmit={submit} className="flex gap-2 w-full md:w-auto">
          <input 
            value={q} 
            onChange={e => setQ(e.target.value)} 
            placeholder="Search…" 
            className="border px-4 py-2 rounded-lg md:w-80" 
          />
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">Search</button>
        </form>
      </div>

      {loading ? (
        <Spinner />
      ) : Array.isArray(jobs) && jobs.length > 0 ? (
        <div className="grid gap-4">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      ) : (
        <p className="text-slate-500 text-center py-6">No jobs available at the moment.</p>
      )}
    </PageWrap>
  )
}
