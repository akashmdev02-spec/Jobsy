import { motion } from 'framer-motion'

export default function PageWrap({
  children,
  className = '',
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 24,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      exit={{
        opacity: 0,
        y: -16,
      }}
      transition={{
        duration: 0.45,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`
        relative
        mx-auto
        w-full
        max-w-7xl
        px-4
        sm:px-6
        lg:px-8
        py-10
        lg:py-14
        ${className}
      `}
    >

      {/* TOP GLOW */}
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 flex justify-center overflow-hidden">
        <div className="h-40 w-[40rem] rounded-full bg-indigo-200 blur-3xl opacity-30"></div>
      </div>

      {/* CONTENT */}
      <div className="relative z-10">
        {children}
      </div>

    </motion.div>
  )
}