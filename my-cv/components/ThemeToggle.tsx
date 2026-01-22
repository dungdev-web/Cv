"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Moon,Sun } from 'lucide-react';

export default function ThemeToggle() {
  const { theme, setTheme, systemTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const currentTheme = theme === "system" ? systemTheme : theme

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() =>
        setTheme(currentTheme === "dark" ? "light" : "dark")
      }
      className="rounded-full"
    >
      {currentTheme === "dark" ? <Sun/> : <Moon/>}
    </Button>
  )
}
