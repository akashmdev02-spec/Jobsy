import { Link, NavLink, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  LayoutDashboard,
  Briefcase,
  ShieldCheck,
  LogOut,
  UserCircle,
  PlusCircle
} from 'lucide-react'

import { useAuth } from '../context/AuthContext.jsx'

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth()
  const nav = useNavigate()

  const linkCls = ({ isActive }) =>
    `flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition ${
      isActive
        ? 'bg-brand-50 text-brand-700'
        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
    }`

  const handleLogout = async () => {
    await logout()
    nav('/')
  }

  const navLinks = []

  if (isAuthenticated) {
    navLinks.push({
      to: '/dashboard',
      label: 'Dashboard',
      icon: <LayoutDashboard size={16} />
    })

    // Employer links
    if (user?.role === 'EMPLOYER') {
      navLinks.push({
        to: '/jobs',
        label: 'Browse Jobs',
        icon: <Briefcase size={16} />
      })
    }


    // Admin links
    if (user?.role === 'ADMIN') {
      navLinks.push({
        to: '/admin',
        label: 'Admin Panel',
        icon: <ShieldCheck size={16} />
      })
    }
  }

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/60 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">

        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2"
          aria-label="Go to homepage"
        >
          <motion.div
            whileHover={{ rotate: 8, scale: 1.05 }}
            className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-brand-500 to-indigo-600 font-extrabold tracking-tight text-white shadow-md"
          >
            JS
          </motion.div>

          <span className="text-lg font-bold tracking-tight">
            Jobsy
          </span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              className={linkCls}
            >
              {link.icon}
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-3">

          {isAuthenticated ? (
            <>
              {/* Profile */}
              <div className="hidden sm:flex items-center gap-2">

                {user?.profileImage ? (
                  <img
                    src={user.profileImage}
                    alt={user.fullName}
                    className="h-9 w-9 rounded-full object-cover border border-slate-200"
                  />
                ) : (
                  <div className="grid h-9 w-9 place-items-center rounded-full bg-slate-100 text-slate-600">
                    <UserCircle size={22} />
                  </div>
                )}

                <div className="leading-tight">
                  <p className="text-sm font-medium text-slate-700">
                    {user?.fullName?.split(' ')[0]}
                  </p>

                  <p className="text-xs text-slate-500">
                    {user?.role}
                  </p>
                </div>
              </div>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-red-600"
              >
                <LogOut size={16} />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="btn-ghost text-sm"
              >
                Sign in
              </Link>

              <Link
                to="/register"
                className="btn-primary text-sm"
              >
                Get started
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}