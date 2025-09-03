"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { ChevronDownIcon } from "lucide-react";

export function Calendar22({ date, setDate }) {
  const [open, setOpen] = useState(false);

  const today = new Date();
  today.setHours(0, 0, 0, 0); // ensure time is 00:00

  const handleSelect = (d) => {
    if (d < today) {
      // prevent past date selection
      return;
    }
    setDate(d);
    setOpen(false);
  };

  return (
    <div className="flex flex-col gap-3">
      <Label htmlFor="date" className="px-1">
        Expected Return Date
      </Label>
      <Popover open={open} onOpenChange={setOpen} modal={true}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date"
            className="w-56 justify-between font-normal"
          >
            {date ? date.toLocaleDateString() : "Select date"}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          align="start"
          side="bottom"
          className="w-72 p-0"
          style={{ position: "fixed", top: "auto", left: "auto" }}
        >
          <div className="max-h-[400px] overflow-auto">
            <Calendar
              mode="single"
              selected={date}
              captionLayout="dropdown"
              onSelect={handleSelect}
              fromYear={today.getFullYear()}
              toYear={today.getFullYear() + 5}
            />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
