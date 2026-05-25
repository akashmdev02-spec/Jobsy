import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PageWrap from '../components/PageWrap.jsx'
import { jobsApi } from '../services/api'
import { useAuth } from '../context/AuthContext.jsx'
import toast from 'react-hot-toast'

const JOB_TYPES = [
  { value: 'FULL_TIME', label: 'Full time' },
  { value: 'PART_TIME', label: 'Part time' },
  { value: 'CONTRACT', label: 'Contract' },
  { value: 'REMOTE', label: 'Remote' },
  { value: 'HYBRID', label: 'Hybrid' },
  { value: 'INTERNSHIP', label: 'Internship' },
]

const CATEGORIES = [
  'Software Engineering', 'Data & Analytics', 'Product Management',
  'Design & UX', 'Sales & BD', 'Marketing', 'Finance & Accounts',
  'HR & Recruitment', 'Operations', 'Customer Support', 'Legal', 'Other',
]

const LOCATIONS = [
  'Pan India (Remote)',
  // Metro cities
  'Bengaluru', 'Mumbai', 'Delhi', 'Hyderabad', 'Chennai', 'Kolkata', 'Pune', 'Ahmedabad',
  // Tier 2 tech hubs
  'Noida', 'Gurugram', 'Navi Mumbai', 'Thane', 'Faridabad', 'Ghaziabad',
  'Chandigarh', 'Jaipur', 'Lucknow', 'Indore', 'Bhopal', 'Nagpur',
  'Coimbatore', 'Madurai', 'Kochi', 'Thiruvananthapuram', 'Visakhapatnam',
  'Vijayawada', 'Bhubaneswar', 'Patna', 'Ranchi', 'Raipur',
  // Emerging tech cities
  'Mysuru', 'Mangaluru', 'Hubballi', 'Belagavi',
  'Surat', 'Vadodara', 'Rajkot', 'Gandhinagar',
  'Nashik', 'Aurangabad', 'Kolhapur',
  'Dehradun', 'Guwahati', 'Shillong', 'Imphal',
  'Amritsar', 'Ludhiana', 'Jalandhar',
  'Agra', 'Varanasi', 'Allahabad', 'Kanpur', 'Meerut',
  'Jodhpur', 'Udaipur', 'Kota', 'Ajmer',
  'Bhopal', 'Jabalpur', 'Gwalior',
  'Vijayawada', 'Tirupati', 'Guntur',
  'Tiruchirappalli', 'Salem', 'Vellore', 'Erode',
  'Thrissur', 'Kozhikode',
  'Puducherry', 'Port Blair',
]

function Field({ label, required, hint, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
        {hint && <span className="font-normal text-gray-400 ml-1.5">{hint}</span>}
      </label>
      {children}
    </div>
  )
}

function SectionCard({ step, title, children }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 space-y-5">
      <div className="flex items-center gap-2.5">
        <div className="w-6 h-6 rounded-full bg-indigo-50 text-indigo-600 text-xs font-semibold flex items-center justify-center shrink-0">
          {step}
        </div>
        <span className="text-sm font-semibold text-gray-800">{title}</span>
      </div>
      {children}
    </div>
  )
}

export default function PostJob() {
  const nav = useNavigate()
  const { user } = useAuth()
  const [form, setForm] = useState({
    title: '', company: user?.company || '', location: '',
    type: 'FULL_TIME', category: '', salaryMin: '', salaryMax: '',
    description: '', requirements: '', experience: '',
  })
  const [loading, setLoading] = useState(false)

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await jobsApi.create({
        ...form,
        salaryMin: form.salaryMin ? Number(form.salaryMin) : null,
        salaryMax: form.salaryMax ? Number(form.salaryMax) : null,
      })
      toast.success('Job posted successfully!')
      nav('/manage-jobs')
    } catch (err) {
      toast.error(err?.response?.data?.error || 'Failed to post job')
    } finally {
      setLoading(false)
    }
  }

  return (
    <PageWrap>
      <div className="max-w-4xl mx-auto py-8 px-4">

        {/* Header */}
        <div className="mb-8">
          <p className="text-xs font-semibold text-indigo-600 uppercase tracking-widest mb-1">Employer portal</p>
          <h1 className="text-3xl font-bold text-gray-900">Post a new job</h1>
          <p className="text-sm text-gray-500 mt-1">Your listing goes live instantly across India.</p>
        </div>

        <form onSubmit={submit} className="space-y-4">

          {/* Section 1 — Basic details */}
          <SectionCard step="1" title="Basic details">
            <div className="grid md:grid-cols-2 gap-5">
              <Field label="Job title" required>
                <input required value={form.title} onChange={e => set('title', e.target.value)}
                  placeholder="e.g. Backend Engineer" className="input" />
              </Field>
              <Field label="Company name" required>
                <input required value={form.company} onChange={e => set('company', e.target.value)}
                  placeholder="e.g. Infosys, Zepto, your startup" className="input" />
              </Field>
              <Field label="Location" required>
                <select required value={form.location} onChange={e => set('location', e.target.value)} className="input">
                  <option value="" disabled>Select location</option>
                  <optgroup label="Remote">
                    <option value="Pan India (Remote)">Pan India (Remote)</option>
                  </optgroup>
                  <optgroup label="Metro cities">
                    {['Bengaluru','Mumbai','Delhi','Hyderabad','Chennai','Kolkata','Pune','Ahmedabad'].map(c =>
                      <option key={c} value={c}>{c}</option>)}
                  </optgroup>
                  <optgroup label="NCR & satellite cities">
                    {['Noida','Gurugram','Faridabad','Ghaziabad'].map(c =>
                      <option key={c} value={c}>{c}</option>)}
                  </optgroup>
                  <optgroup label="Maharashtra">
                    {['Navi Mumbai','Thane','Nashik','Nagpur','Aurangabad','Kolhapur'].map(c =>
                      <option key={c} value={c}>{c}</option>)}
                  </optgroup>
                  <optgroup label="Karnataka">
                    {['Mysuru','Mangaluru','Hubballi','Belagavi'].map(c =>
                      <option key={c} value={c}>{c}</option>)}
                  </optgroup>
                  <optgroup label="Tamil Nadu">
                    {['Coimbatore','Madurai','Tiruchirappalli','Salem','Vellore','Erode'].map(c =>
                      <option key={c} value={c}>{c}</option>)}
                  </optgroup>
                  <optgroup label="Kerala">
                    {['Kochi','Thiruvananthapuram','Thrissur','Kozhikode'].map(c =>
                      <option key={c} value={c}>{c}</option>)}
                  </optgroup>
                  <optgroup label="Andhra Pradesh & Telangana">
                    {['Visakhapatnam','Vijayawada','Guntur','Tirupati'].map(c =>
                      <option key={c} value={c}>{c}</option>)}
                  </optgroup>
                  <optgroup label="Gujarat">
                    {['Surat','Vadodara','Rajkot','Gandhinagar'].map(c =>
                      <option key={c} value={c}>{c}</option>)}
                  </optgroup>
                  <optgroup label="Rajasthan">
                    {['Jaipur','Jodhpur','Udaipur','Kota','Ajmer'].map(c =>
                      <option key={c} value={c}>{c}</option>)}
                  </optgroup>
                  <optgroup label="Uttar Pradesh">
                    {['Lucknow','Kanpur','Agra','Varanasi','Allahabad','Meerut'].map(c =>
                      <option key={c} value={c}>{c}</option>)}
                  </optgroup>
                  <optgroup label="Madhya Pradesh">
                    {['Indore','Bhopal','Jabalpur','Gwalior'].map(c =>
                      <option key={c} value={c}>{c}</option>)}
                  </optgroup>
                  <optgroup label="Punjab & Haryana">
                    {['Chandigarh','Amritsar','Ludhiana','Jalandhar'].map(c =>
                      <option key={c} value={c}>{c}</option>)}
                  </optgroup>
                  <optgroup label="East & Northeast">
                    {['Bhubaneswar','Kolkata','Patna','Ranchi','Raipur','Guwahati','Shillong','Imphal'].map(c =>
                      <option key={c} value={c}>{c}</option>)}
                  </optgroup>
                  <optgroup label="Other">
                    {['Dehradun','Puducherry','Port Blair'].map(c =>
                      <option key={c} value={c}>{c}</option>)}
                  </optgroup>
                </select>
              </Field>
              <Field label="Category" required>
                <select required value={form.category} onChange={e => set('category', e.target.value)} className="input">
                  <option value="" disabled>Select category</option>
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </Field>
            </div>
          </SectionCard>

          {/* Section 2 — Work arrangement & pay */}
          <SectionCard step="2" title="Work arrangement & pay">

            <Field label="Work type" required>
              <div className="flex flex-wrap gap-2 mt-0.5">
                {JOB_TYPES.map(({ value, label }) => (
                  <button key={value} type="button" onClick={() => set('type', value)}
                    className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all ${
                      form.type === value
                        ? 'bg-indigo-600 text-white border-indigo-600'
                        : 'bg-white text-gray-600 border-gray-300 hover:border-indigo-400 hover:text-indigo-600'
                    }`}>
                    {label}
                  </button>
                ))}
              </div>
            </Field>

            <Field label="Annual CTC" hint="(₹ LPA, optional)">
              <div className="grid grid-cols-[1fr_auto_1fr] gap-3 items-center">
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">₹</span>
                  <input type="number" value={form.salaryMin} onChange={e => set('salaryMin', e.target.value)}
                    placeholder="Min LPA" className="input pl-7" />
                </div>
                <span className="text-sm text-gray-400 text-center">to</span>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">₹</span>
                  <input type="number" value={form.salaryMax} onChange={e => set('salaryMax', e.target.value)}
                    placeholder="Max LPA" className="input pl-7" />
                </div>
              </div>
            </Field>

            <Field label="Experience required" hint="(e.g. Fresher, 2–5 yrs)">
              <select value={form.experience} onChange={e => set('experience', e.target.value)} className="input">
                <option value="">Select experience level</option>
                <option value="Fresher">Fresher (0 years)</option>
                <option value="0-1 years">0–1 years</option>
                <option value="1-3 years">1–3 years</option>
                <option value="3-5 years">3–5 years</option>
                <option value="5-8 years">5–8 years</option>
                <option value="8-12 years">8–12 years</option>
                <option value="12+ years">12+ years</option>
              </select>
            </Field>

          </SectionCard>

          {/* Section 3 — Role description */}
          <SectionCard step="3" title="Role description">
            <Field label="Job description" required>
              <textarea required rows={6} value={form.description}
                onChange={e => set('description', e.target.value)}
                placeholder="Describe responsibilities, day-to-day work, team structure…"
                className="input resize-none" />
            </Field>
            <Field label="Requirements" hint="(skills, qualifications, tools)">
              <textarea rows={4} value={form.requirements}
                onChange={e => set('requirements', e.target.value)}
                placeholder="Any graduate preferred, React, Node.js, strong communication…"
                className="input resize-none" />
            </Field>
          </SectionCard>

          {/* Footer */}
          <div className="flex justify-between items-center pt-2 pb-8">
            <button type="button" onClick={() => nav(-1)} className="btn-ghost">Cancel</button>
            <div className="flex gap-3">
              
              <button type="submit" disabled={loading} className="btn-primary flex items-center gap-2">
                {loading ? (
                  <>
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" strokeOpacity="0.25" />
                      <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                    </svg>
                    Posting…
                  </>
                ) : 'Post job →'}
              </button>
            </div>
          </div>

        </form>
      </div>
    </PageWrap>
  )
}