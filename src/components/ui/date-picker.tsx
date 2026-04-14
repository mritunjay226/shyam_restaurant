"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"

interface DatePickerProps {
    date?: Date
    setDate: (date?: Date) => void
    label?: string
    disabled?: any
    min?: Date
}

export function DatePicker({ date, setDate, label, disabled, min }: DatePickerProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const containerRef = React.useRef<HTMLDivElement>(null)

  // Close when clicking outside
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className="relative w-full" ref={containerRef}>
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
            "flex h-12 w-full items-center justify-between rounded-full border border-brand-brown/20 bg-brand-cream px-4 py-2 text-sm cursor-pointer hover:border-brand-brown/40 transition-colors",
            !date && "text-brand-brown/40"
        )}
      >
        <span className="truncate">
            {date ? format(date, "PPP") : (label || "Pick a date")}
        </span>
        <CalendarIcon className="h-4 w-4 text-brand-brown/40" />
      </div>

      {isOpen && (
        <div className="absolute top-14 left-0 z-50 animate-in fade-in zoom-in duration-200 origin-top-left">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(d) => {
                setDate(d)
                setIsOpen(false)
            }}
            disabled={disabled}
            fromDate={min}
            initialFocus
          />
        </div>
      )}
    </div>
  )
}
