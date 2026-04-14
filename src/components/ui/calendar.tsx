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
    <div className={cn("p-2 bg-brand-cream border border-brand-brown/10 rounded-xl shadow-xl backdrop-blur-md", className)}>
        <style>{`
            .rdp {
                margin: 0;
                --rdp-cell-size: 32px;
                --rdp-accent-color: #3A1C1A;
                --rdp-background-color: transparent;
                --rdp-accent-color-foreground: #F8F3E9;
            }
            .rdp-day {
                font-family: var(--font-sans);
            }
            /* Map to the custom classes we defined in classNames */
            .selected {
                background-color: #3A1C1A !important;
                color: #F8F3E9 !important;
                border-radius: 9999px;
                font-weight: 700;
            }
            .today:not(.selected):not(.day-disabled) {
                font-weight: 800;
                color: #C44536;
            }
            .today:not(.selected):not(.day-disabled)::after {
                content: '';
                position: absolute;
                bottom: 3px;
                left: 50%;
                transform: translateX(-50%);
                width: 2px;
                height: 2px;
                background-color: #C44536;
                border-radius: 50%;
            }
            .rdp-button:hover:not([disabled]):not(.selected) {
                background-color: rgba(58, 28, 26, 0.05);
                border-radius: 9999px;
            }
            /* Style for Occupied/Disabled Dates */
            .day-disabled {
                background-color: #C44536 !important;
                color: white !important;
                opacity: 0.8 !important;
                border-radius: 9999px;
                cursor: not-allowed !important;
                pointer-events: none;
            }
            .day-disabled .rdp-day_button {
                color: white !important;
                cursor: not-allowed !important;
            }
        `}</style>
      <DayPicker
        showOutsideDays={showOutsideDays}
        className={className}
        classNames={{
          months: "flex flex-col space-y-4",
          month: "space-y-4",
          month_caption: "flex justify-center pt-1 relative items-center mb-2",
          caption_label: "text-sm font-serif font-bold text-brand-brown tracking-tight",
          nav: "flex items-center justify-between absolute w-full left-0 px-2 top-2 z-10",
          button_previous: cn(
            "h-6 w-6 bg-brand-cream-dark/50 p-0 hover:bg-brand-brown hover:text-white rounded-full transition-all flex items-center justify-center"
          ),
          button_next: cn(
            "h-6 w-6 bg-brand-cream-dark/50 p-0 hover:bg-brand-brown hover:text-white rounded-full transition-all flex items-center justify-center"
          ),
          month_grid: "w-full border-collapse",
          weekdays: "flex mb-1",
          weekday: "text-brand-brown/40 rounded-md w-8 font-normal text-[0.7rem] uppercase text-center",
          week: "flex w-full mt-0",
          day: cn(
            "h-8 w-8 p-0 font-medium aria-selected:opacity-100 transition-all flex items-center justify-center text-sm"
          ),
          day_button: "h-8 w-8 p-0 hover:bg-brand-brown/5 rounded-full",
          selected: "scale-90",
          today: "today",
          outside: "opacity-20",
          disabled: "day-disabled",
          hidden: "invisible",
          ...classNames,
        }}
        components={{
           Chevron: ({ orientation }) => {
             const Icon = orientation === "left" ? ChevronLeft : ChevronRight;
             return <Icon className="h-4 w-4" />;
           }
        }}
        {...props}
      />
    </div>
  )
}
Calendar.displayName = "Calendar"

export { Calendar }
