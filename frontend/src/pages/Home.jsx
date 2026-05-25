import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useState } from 'react'
import {
  Search,
  Building2,
  Handshake,
} from 'lucide-react'

import PageWrap from '../components/PageWrap.jsx'

export default function Home() {
  const [q, setQ] = useState('')
  const nav = useNavigate()

  const submit = (e) => {
    e.preventDefault()
    nav(`/jobs?q=${encodeURIComponent(q)}`)
  }

  return (
    <div className="bg-gradient-mesh overflow-hidden">
      <PageWrap className="!py-20">
        
        {/* HERO SECTION */}
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          
          {/* LEFT CONTENT */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="badge bg-white/70 backdrop-blur text-brand-700 border border-brand-100">
              🚀 Trusted by 10k+ companies
            </span>

            <h1 className="mt-5 text-5xl md:text-6xl font-bold tracking-tight leading-tight">
              Find your{' '}
              <span className="bg-gradient-to-r from-brand-600 to-indigo-600 bg-clip-text text-transparent">
                dream job
              </span>{' '}
              with confidence.
            </h1>

            <p className="mt-5 text-lg text-slate-600 max-w-xl">
              Browse thousands of opportunities from top companies,
              apply instantly, and manage your career journey all in one place.
            </p>

            {/* SEARCH BAR */}
            <form
              onSubmit={submit}
              className="glass mt-8 flex items-center gap-2 rounded-2xl p-2 shadow-lg bg-white/80 backdrop-blur"
            >
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search jobs, companies, locations..."
                className="flex-1 bg-transparent px-4 py-3 outline-none text-slate-700"
              />

              <button className="btn-primary px-6 py-3 rounded-xl">
                Search
              </button>
            </form>

            {/* BUTTONS */}
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <Link to="/jobs" className="btn-ghost">
                Browse all jobs
              </Link>
            </div>
          </motion.div>

          {/* RIGHT IMAGE SECTION */}
<motion.div
  initial={{ opacity: 0, x: 40 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.6 }}
  className="relative flex justify-center"
>

  {/* GLOW EFFECTS */}
  <div className="absolute -top-16 left-0 h-52 w-52 rounded-full bg-pink-300 blur-3xl opacity-30"></div>

  <div className="absolute bottom-0 right-0 h-52 w-52 rounded-full bg-indigo-300 blur-3xl opacity-30"></div>

  {/* MAIN LARGE IMAGE */}
  <motion.img
    whileHover={{ scale: 1.02 }}
      src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80"
  alt="Office Team"
    className="relative z-10 h-[520px] w-[420px] rounded-[2rem] object-cover shadow-2xl border-4 border-white"
  />

  {/* TOP SMALL IMAGE */}
  <motion.img
    animate={{ y: [0, -10, 0] }}
    transition={{ repeat: Infinity, duration: 4 }}
    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=700&auto=format&fit=crop"
    alt="Meeting"
    className="absolute -left-10 top-8 z-20 h-44 w-44 rounded-3xl border-4 border-white object-cover shadow-2xl"
  />

  {/* BOTTOM SMALL IMAGE */}
  <motion.img
    animate={{ y: [0, 10, 0] }}
    transition={{ repeat: Infinity, duration: 5 }}
    src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=700&auto=format&fit=crop"
    alt="Office"
    className="absolute -right-10 bottom-10 z-20 h-48 w-48 rounded-3xl border-4 border-white object-cover shadow-2xl"
  />

  {/* FLOATING SUCCESS CARD */}
  <motion.div
    animate={{ y: [0, -8, 0] }}
    transition={{ repeat: Infinity, duration: 3 }}
    className="absolute top-16 right-0 z-30 rounded-2xl bg-white/90 backdrop-blur p-5 shadow-2xl"
  >
    <h3 className="text-2xl font-bold text-slate-900">
      2K+
    </h3>

    <p className="text-sm text-slate-500">
      Jobs Posted Daily
    </p>
  </motion.div>

  {/* USERS CARD */}
  <motion.div
    animate={{ x: [0, 8, 0] }}
    transition={{ repeat: Infinity, duration: 4 }}
    className="absolute bottom-24 left-0 z-30 rounded-2xl bg-white p-5 shadow-2xl"
  >
    <div className="flex items-center gap-3">

      <div className="flex -space-x-3">

        <img
          src="https://randomuser.me/api/portraits/women/44.jpg"
          alt=""
          className="h-10 w-10 rounded-full border-2 border-white"
        />

        <img
          src="https://randomuser.me/api/portraits/men/32.jpg"
          alt=""
          className="h-10 w-10 rounded-full border-2 border-white"
        />

        <img
          src="https://randomuser.me/api/portraits/women/68.jpg"
          alt=""
          className="h-10 w-10 rounded-full border-2 border-white"
        />
      </div>

      <div>
        <h4 className="font-bold text-slate-900">
          40K+
        </h4>

        <p className="text-sm text-slate-500">
          Active Candidates
        </p>
      </div>
    </div>
  </motion.div>
</motion.div>
        </div>

        {/* FEATURES */}
        <div className="mt-24 grid md:grid-cols-3 gap-6">
          {[
            {
              icon: Search,
              t: 'For Job Seekers',
              d: 'Discover jobs that fit your skills and track every application seamlessly.',
              color: 'from-blue-500 to-indigo-500',
              bg: 'bg-blue-50',
            },
            {
              icon: Building2,
              t: 'For Employers',
              d: 'Post openings, manage applicants, and streamline your hiring workflow.',
              color: 'from-violet-500 to-purple-500',
              bg: 'bg-violet-50',
            },
            {
              icon: Handshake,
              t: 'Connecting Talent',
              d: 'Jobsy bridges ambitious professionals with industry-leading companies.',
              color: 'from-emerald-500 to-teal-500',
              bg: 'bg-emerald-50',
            },
          ].map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{
                y: -6,
                transition: { duration: 0.2 },
              }}
              className="group relative overflow-hidden rounded-2xl border border-slate-100 bg-white p-7 shadow-sm hover:shadow-xl transition-all duration-300"
            >
              
              <div className={`mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl ${f.bg}`}>
                <f.icon className={`h-5 w-5 bg-gradient-to-br ${f.color} bg-clip-text`} strokeWidth={1.8} />
              </div>

              <h3 className="text-xl font-semibold text-slate-900">
                {f.t}
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-slate-500">
                {f.d}
              </p>
            </motion.div>
          ))}
        </div>
      </PageWrap>
    </div>
  )
}