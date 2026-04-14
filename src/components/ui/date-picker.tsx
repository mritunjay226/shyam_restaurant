"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import { motion, AnimatePresence } from "motion/react"

interface DatePickerProps {
    date?: Date
    setDate: (date?: Date) => void
    label?: string
    disabled?: any
    min?: Date
    align?: "left" | "right"
}

export function DatePicker({ date, setDate, label, disabled, min, align = "left" }: DatePickerProps) {
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
            "group flex h-12 w-full items-center justify-between rounded-full border border-brand-brown/10 bg-brand-cream/80 backdrop-blur-sm px-5 py-2 text-sm cursor-pointer shadow-sm hover:shadow-md hover:border-brand-brown/30 transition-all duration-300",
            !date && "text-brand-brown/40",
            isOpen && "ring-2 ring-brand-brown/10 border-brand-brown/40"
        )}
      >
        <div className="flex items-center gap-3 overflow-hidden text-brand-brown">
            <CalendarIcon className={cn(
                "h-4 w-4 shrink-0 transition-transform duration-300",
                isOpen ? "scale-110 text-brand-red" : "text-brand-brown/40 group-hover:text-brand-brown"
            )} />
            <span className="truncate font-medium">
                {date ? format(date, "PPP") : (label || "Pick a date")}
            </span>
        </div>
        
        {date && (
            <button 
                onClick={(e) => {
                    e.stopPropagation()
                    setDate(undefined)
                }}
                className="p-1 hover:bg-brand-red/10 rounded-full transition-colors text-brand-brown/40 hover:text-brand-red"
            >
                <X size={14} />
            </button>
        )}
      </div>

      <AnimatePresence>
        {isOpen && (
            <motion.div 
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 4, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ type: "spring", damping: 20, stiffness: 300 }}
                className={cn(
                    "absolute top-14 z-100 min-w-max",
                    align === "left" ? "left-0 origin-top-left" : "right-0 origin-top-right",
                    "max-w-[95vw] sm:max-w-none"
                )}
            >
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
                    className="w-min border shadow-2xl"
                />
            </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
