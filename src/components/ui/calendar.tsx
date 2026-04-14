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
    <div className={cn("p-4 bg-brand-cream border border-brand-brown/10 rounded-3xl shadow-2xl backdrop-blur-md", className)}>
        <style>{`
            .rdp {
                margin: 0;
                --rdp-cell-size: 44px;
                --rdp-accent-color: #C44536; /* brand-red */
                --rdp-background-color: transparent;
                --rdp-accent-color-foreground: #F8F3E9; /* brand-cream */
            }
            .rdp-day {
                font-family: var(--font-sans);
                font-feature-settings: "tnum";
                font-variant-numeric: tabular-nums;
            }
            .rdp-day_selected {
                background-color: #3A1C1A !important; /* brand-brown for SELECTED */
                color: #F8F3E9 !important;
                border-radius: 9999px;
                box-shadow: 0 4px 12px rgba(58, 28, 26, 0.3);
                font-weight: 800;
            }
            .rdp-day_today:not(.rdp-day_selected):not(.rdp-day_disabled) {
                font-weight: 800;
                color: #C44536;
                position: relative;
            }
            .rdp-day_today:not(.rdp-day_selected):not(.rdp-day_disabled)::after {
                content: '';
                position: absolute;
                bottom: 6px;
                left: 50%;
                transform: translateX(-50%);
                width: 4px;
                height: 4px;
                background-color: #C44536;
                border-radius: 50%;
            }
            .rdp-button:hover:not([disabled]):not(.rdp-day_selected) {
                background-color: rgba(58, 28, 26, 0.08);
                border-radius: 9999px;
            }
            /* OCCUPIED DATES (Disabled) */
            .rdp-day_disabled {
                background-color: #C44536 !important; /* brand-red background */
                color: white !important;
                opacity: 0.8;
                border-radius: 9999px;
                cursor: not-allowed;
                position: relative;
            }
            .rdp-day_disabled::before {
                content: "Reserved";
                position: absolute;
                top: -15px;
                left: 50%;
                transform: translateX(-50%);
                background: #3A1C1A;
                color: white;
                font-size: 8px;
                padding: 1px 4px;
                border-radius: 4px;
                opacity: 0;
                transition: opacity 0.2s;
                pointer-events: none;
                z-index: 50;
            }
            .rdp-day_disabled:hover::before {
                opacity: 1;
            }

            .rdp-nav_button {
                color: #3A1C1A;
            }
            .rdp-head_cell {
                color: #3A1C1A;
                font-size: 0.7rem;
                font-weight: 800;
                text-transform: uppercase;
                letter-spacing: 0.1em;
                opacity: 0.4;
            }
        `}</style>
      <DayPicker
        showOutsideDays={showOutsideDays}
        className={className}
        classNames={{
          months: "flex flex-col sm:flex-row space-y-4 sm:space-x-8 sm:space-y-0",
          month: "space-y-6",
          caption: "flex justify-center pt-2 relative items-center mb-4",
          caption_label: "text-lg font-serif font-bold text-brand-brown tracking-tight",
          nav: "space-x-1 flex items-center",
          nav_button: cn(
            "h-8 w-8 bg-brand-cream-dark/50 p-0 hover:bg-brand-brown hover:text-white rounded-full transition-all duration-300"
          ),
          nav_button_previous: "absolute left-1",
          nav_button_next: "absolute right-1",
          table: "w-full border-collapse",
          head_row: "flex mb-2",
          head_cell: "text-brand-brown/40 rounded-md w-11 font-normal text-[0.8rem]",
          row: "flex w-full mt-1",
          cell: "h-11 w-11 text-center text-sm p-0 relative focus-within:relative focus-within:z-20",
          day: cn(
            "h-11 w-11 p-0 font-medium aria-selected:opacity-100 transition-all duration-200"
          ),
          day_range_end: "day-range-end",
          day_selected: "scale-90",
          day_today: "today",
          day_outside: "day-outside text-muted-foreground opacity-30",
          day_disabled: "day-disabled cursor-not-allowed",
          day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
          day_hidden: "invisible",
          ...classNames,
        }}
        components={{
           IconLeft: ({ ...props }) => <ChevronLeft className="h-4 w-4" />,
           IconRight: ({ ...props }) => <ChevronRight className="h-4 w-4" />,
        }}
        {...props}
      />
    </div>
  )
}
Calendar.displayName = "Calendar"

export { Calendar }
