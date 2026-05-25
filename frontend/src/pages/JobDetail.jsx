import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { jobsApi, appsApi, uploadsApi } from '../services/api'
import { useAuth } from '../context/AuthContext.jsx'
import PageWrap from '../components/PageWrap.jsx'
import Spinner from '../components/Spinner.jsx'
import toast from 'react-hot-toast'

export default function JobDetail() {
  const { id } = useParams()
  const nav = useNavigate()
  const { isAuthenticated, user } = useAuth()

  // State Management
  const [job, setJob] = useState(null)
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false)
  const [coverLetter, setCoverLetter] = useState('')
  const [resumeUrl, setResumeUrl] = useState('')
  const [resumeName, setResumeName] = useState('')
  const [uploading, setUploading] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  // Fetch Job Details
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const data = await jobsApi.getPublic(id)
        setJob(data)
      } catch (e) {
        toast.error(e?.response?.data?.error || 'Job not found')
        nav('/jobs')
      } finally {
        setLoading(false)
      }
    }
    fetchJob()
  }, [id, nav])

  // File Upload Handler
  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    try {
      const res = await uploadsApi.resume(file)
      setResumeUrl(res.url)
      setResumeName(res.originalName || file.name)
      toast.success('Resume uploaded successfully')
    } catch (err) {
      toast.error(err?.response?.data?.error || 'Upload failed')
    } finally {
      setUploading(false)
    }
  }

  // Application Submission
  const apply = async (e) => {
    e.preventDefault()
    
    if (!isAuthenticated) {
      toast.error('Please sign in to apply')
      nav('/login', { state: { from: { pathname: `/jobs/${id}` } } })
      return
    }
    if (user?.role !== 'JOB_SEEKER') {
      toast.error('Only job seekers can apply')
      return
    }

    setSubmitting(true)
    try {
      await appsApi.apply({ jobId: Number(id), coverLetter, resumeUrl })
      toast.success('Application submitted!')
      setOpen(false)
      setCoverLetter('')
      setResumeUrl('')
      setResumeName('')
      nav('/my-applications')
    } catch (e) {
      toast.error(e?.response?.data?.error || 'Failed to apply')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <PageWrap>
        <div className="flex h-[60vh] items-center justify-center">
          <Spinner label="Loading job details..." />
        </div>
      </PageWrap>
    )
  }

  if (!job) return null

  // Helpers for Formatting
  const formatLPA = (value) => {
    if (!value) return null
    return (value / 100000).toFixed(1) + ' LPA'
  }

  const salaryDisplay = job.salaryMin && job.salaryMax
    ? `₹${formatLPA(job.salaryMin)} – ₹${formatLPA(job.salaryMax)}`
    : 'Competitive Salary'

  return (
    <PageWrap>
      {/* Breadcrumb navigation */}
      <div className="mb-6">
        <Link to="/jobs" className="group text-sm font-medium text-brand-600 hover:text-brand-700 inline-flex items-center gap-1 transition-colors">
          <span className="transition-transform group-hover:-translate-x-1">←</span> Back to all jobs
        </Link>
      </div>

      <div className="grid gap-8 lg:grid-cols-3 items-start">
        {/* Left Column: Job Specifications */}
        <div className="lg:col-span-2 space-y-6">
          <div className="p-6 bg-white border border-slate-100 rounded-2xl shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div>
                <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">{job.title}</h1>
                <p className="text-lg font-medium text-slate-500 mt-2">
                  {job.company} <span className="text-slate-300">·</span> {job.location}
                </p>
              </div>
              <span className="inline-flex items-center self-start px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-brand-50 text-brand-700 border border-brand-100">
                {job.type.replace('_', ' ')}
              </span>
            </div>

            <hr className="my-6 border-slate-100" />

            <div className="prose max-w-none space-y-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">Job Description</h3>
                <p className="text-slate-600 leading-relaxed whitespace-pre-line">{job.description}</p>
              </div>

              {job.requirements && (
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-3">Requirements</h3>
                  <p className="text-slate-600 leading-relaxed whitespace-pre-line">{job.requirements}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Sticky Metadata Actions Card */}
        <aside className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm lg:sticky lg:top-24 space-y-5">
          <div className="p-4 bg-slate-50 rounded-xl space-y-4">
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Salary Range</p>
              <p className="text-xl font-bold text-slate-800 mt-0.5">{salaryDisplay}</p>
            </div>
            <div className="border-t border-slate-200/60 pt-3">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Category</p>
              <p className="text-base font-semibold text-slate-700 mt-0.5">{job.category}</p>
            </div>
          </div>

          <button onClick={() => setOpen(true)} className="btn-primary w-full py-3 font-semibold shadow-lg shadow-brand-600/10 hover:shadow-brand-600/20 transition-all duration-200">
            Apply Now
          </button>
          
          {!isAuthenticated && (
            <p className="text-xs text-slate-400 text-center leading-normal">
              You will be requested to sign in during submission.
            </p>
          )}
        </aside>
      </div>

      {/* Modal View implementation */}
      <AnimatePresence>
        {open && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 grid place-items-center bg-slate-900/50 backdrop-blur-sm p-4" 
            onClick={() => setOpen(false)}
          >
            <motion.form 
              onSubmit={apply} 
              onClick={e => e.stopPropagation()}
              initial={{ scale: 0.95, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", duration: 0.3 }}
              className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto"
            >
              <div>
                <h2 className="text-xl font-bold text-slate-900">Apply to {job.title}</h2>
                <p className="text-sm text-slate-500 mt-0.5">at {job.company}</p>
              </div>

              <div className="mt-5 space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Cover Letter *</label>
                  <textarea 
                    required 
                    value={coverLetter} 
                    onChange={e => setCoverLetter(e.target.value)} 
                    rows={5} 
                    className="input w-full rounded-xl border-slate-200 focus:border-brand-500 focus:ring-brand-500 text-sm" 
                    placeholder="Tell the hiring manager why you're a great fit..." 
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Resume</label>
                  <div className="p-4 border-2 border-dashed border-slate-200 rounded-xl hover:border-brand-400 transition-colors bg-slate-50/50 relative">
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                      onChange={handleFileUpload}
                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    />
                    <div className="text-center pointer-events-none">
                      <p className="text-sm font-medium text-brand-600">Click to upload file</p>
                      <p className="text-xs text-slate-400 mt-1">PDF, DOC, DOCX (Max 5MB)</p>
                    </div>
                  </div>

                  {/* Status Indicator Alerts */}
                  {uploading && <p className="text-xs text-amber-600 font-medium mt-2 animate-pulse">Uploading file...</p>}
                  {resumeUrl && !uploading && (
                    <p className="text-xs text-emerald-600 font-medium mt-2 flex items-center gap-1">
                      ✓ Linked: {resumeName || 'Resume File'}
                    </p>
                  )}
                </div>

                <div className="relative flex py-2 items-center">
                  <div className="flex-grow border-t border-slate-200"></div>
                  <span className="flex-shrink mx-3 text-xs text-slate-400 font-medium uppercase tracking-wider">Or</span>
                  <div className="flex-grow border-t border-slate-200"></div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Paste Resume URL</label>
                  <input 
                    type="url" 
                    value={resumeUrl} 
                    onChange={e => { setResumeUrl(e.target.value); setResumeName('') }} 
                    className="input w-full rounded-xl border-slate-200 focus:border-brand-500 focus:ring-brand-500 text-sm" 
                    placeholder="https://drive.google.com/..." 
                  />
                </div>
              </div>

              <div className="mt-8 flex justify-end gap-3 border-t border-slate-100 pt-4">
                <button type="button" onClick={() => setOpen(false)} className="btn-ghost px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-xl transition-colors">
                  Cancel
                </button>
                <button 
                  disabled={submitting || uploading} 
                  className="btn-primary px-5 py-2 text-sm font-semibold rounded-xl shadow-md disabled:opacity-50"
                >
                  {submitting ? 'Submitting Application...' : 'Submit Application'}
                </button>
              </div>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>
    </PageWrap>
  )
}