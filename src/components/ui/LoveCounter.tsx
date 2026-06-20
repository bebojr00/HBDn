"use client";

import { useState, useEffect } from 'react';

interface TimeElapsed {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const START_DATE = new Date('2022-10-13T04:49:00');

export const LoveCounter = () => {
  const [time, setTime] = useState<TimeElapsed>({ years: 0, months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const calculateTime = () => {
      const now = new Date();
      if (now < START_DATE) return;

      let years = now.getFullYear() - START_DATE.getFullYear();
      let months = now.getMonth() - START_DATE.getMonth();
      let days = now.getDate() - START_DATE.getDate();
      let hours = now.getHours() - START_DATE.getHours();
      let minutes = now.getMinutes() - START_DATE.getMinutes();
      let seconds = now.getSeconds() - START_DATE.getSeconds();

      if (seconds < 0) {
        minutes -= 1;
        seconds += 60;
      }
      if (minutes < 0) {
        hours -= 1;
        minutes += 60;
      }
      if (hours < 0) {
        days -= 1;
        hours += 24;
      }
      if (days < 0) {
        months -= 1;
        const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        days += prevMonth.getDate();
      }
      if (months < 0) {
        years -= 1;
        months += 12;
      }

      setTime({ years, months, days, hours, minutes, seconds });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!mounted) return null; // Prevent hydration mismatch

  return (
    <div className="absolute top-10 left-1/2 -translate-x-1/2 z-[100] pointer-events-none animate-in fade-in duration-1000">
      <div className="bg-rose-950/10 backdrop-blur-md border border-rose-200/10 shadow-[0_8px_32px_rgba(0,0,0,0.2)] rounded-2xl px-6 py-4 flex items-center justify-center gap-2 sm:gap-4 text-rose-100">
        <TimeBlock value={time.years} label="Yrs" />
        <Separator />
        <TimeBlock value={time.months} label="Mos" />
        <Separator />
        <TimeBlock value={time.days} label="Days" />
        <Separator />
        <TimeBlock value={time.hours.toString().padStart(2, '0')} label="Hrs" />
        <Separator />
        <TimeBlock value={time.minutes.toString().padStart(2, '0')} label="Min" />
        <Separator />
        <TimeBlock value={time.seconds.toString().padStart(2, '0')} label="Sec" />
      </div>
    </div>
  );
};

const TimeBlock = ({ value, label }: { value: string | number; label: string }) => (
  <div className="flex flex-col items-center min-w-[36px] sm:min-w-[44px]">
    <span className="text-2xl sm:text-3xl font-light bg-gradient-to-br from-white to-rose-300 bg-clip-text text-transparent drop-shadow-sm leading-none mb-1">
      {value}
    </span>
    <span className="text-[0.6rem] sm:text-xs uppercase tracking-widest text-rose-300/80">
      {label}
    </span>
  </div>
);

const Separator = () => (
  <span className="text-xl sm:text-2xl font-extralight text-rose-300/30 -mt-3">:</span>
);
