"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker } from "react-day-picker"
import "react-day-picker/dist/style.css"

import { cn } from "@/lib/utils"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <div className={cn("p-4 bg-brand-cream border border-brand-brown/10 rounded-3xl", className)}>
        <style>{`
            .rdp {
                margin: 0;
                --rdp-cell-size: 40px;
                --rdp-accent-color: #8B4513; /* brand-brown */
                --rdp-background-color: #FDFBF7; /* brand-cream */
                --rdp-accent-color-foreground: #FDFBF7;
            }
            .rdp-day_selected {
                background-color: #A52A2A !important; /* brand-red */
                color: white !important;
                border-radius: 9999px;
            }
            .rdp-day_today {
                font-weight: bold;
                color: #A52A2A;
            }
            .rdp-button:hover:not([disabled]) {
                background-color: rgba(139, 69, 19, 0.1);
                border-radius: 9999px;
            }
            .rdp-day_disabled {
                opacity: 0.25;
                text-decoration: line-through;
            }
            .rdp-nav_button {
                color: #8B4513;
            }
            .rdp-head_cell {
                color: #8B4513;
                font-size: 0.75rem;
                font-weight: 600;
                text-transform: uppercase;
                letter-spacing: 0.05em;
            }
        `}</style>
      <DayPicker
        showOutsideDays={showOutsideDays}
        className={className}
        classNames={{
          months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
          month: "space-y-4",
          caption: "flex justify-center pt-1 relative items-center",
          caption_label: "text-sm font-serif font-bold text-brand-brown",
          nav: "space-x-1 flex items-center",
          nav_button: cn(
            "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 transition-opacity"
          ),
          nav_button_previous: "absolute left-1",
          nav_button_next: "absolute right-1",
          table: "w-full border-collapse space-y-1",
          head_row: "flex",
          head_cell: "text-brand-brown/40 rounded-md w-9 font-normal text-[0.8rem]",
          row: "flex w-full mt-2",
          cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
          day: cn(
            "h-9 w-9 p-0 font-normal aria-selected:opacity-100 hover:bg-brand-brown/10 rounded-full transition-colors"
          ),
          day_range_end: "day-range-end",
          day_selected: "bg-brand-red text-white hover:bg-brand-red hover:text-white focus:bg-brand-red focus:text-white",
          day_today: "bg-accent text-accent-foreground",
          day_outside: "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
          day_disabled: "text-muted-foreground opacity-50",
          day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
          day_hidden: "invisible",
          ...classNames,
        }}
        components={{
        //   IconLeft: ({ ...props }) => <ChevronLeft className="h-4 w-4" />,
        //   IconRight: ({ ...props }) => <ChevronRight className="h-4 w-4" />,
        }}
        {...props}
      />
    </div>
  )
}
Calendar.displayName = "Calendar"

export { Calendar }
