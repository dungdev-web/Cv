"use client"

import * as motion from "motion/react-client"

const Path = (props: any) => (
  <motion.path
    fill="transparent"
    strokeWidth="2"
    stroke="currentColor"
    strokeLinecap="round"
    {...props}
  />
)

export default function MenuToggle({
  toggle,
  isOpen,
}: {
  toggle: () => void
  isOpen: boolean
}) {
  return (
    <button
      onClick={toggle}
      className="relative z-50 flex h-10 w-10 items-center justify-center rounded-full "
    >
      <motion.svg
        width="23"
        height="23"
        viewBox="0 0 23 23"
        animate={isOpen ? "open" : "closed"}
      >
        <Path
          variants={{
            closed: { d: "M 2 2.5 L 20 2.5" },
            open: { d: "M 3 16.5 L 17 2.5" },
          }}
        />
        <Path
          d="M 2 9.423 L 20 9.423"
          variants={{
            closed: { opacity: 1 },
            open: { opacity: 0 },
          }}
          transition={{ duration: 0.15 }}
        />
        <Path
          variants={{
            closed: { d: "M 2 16.346 L 20 16.346" },
            open: { d: "M 3 2.5 L 17 16.346" },
          }}
        />
      </motion.svg>
    </button>
  )
}
