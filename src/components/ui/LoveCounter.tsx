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
    <div className="flex flex-col items-center justify-center mt-12 mb-8 animate-in fade-in duration-1000">
      <span className="text-rose-200/60 uppercase tracking-[0.4em] text-xs mb-6 font-light">Every second since we met</span>
      <div className="flex items-center justify-center gap-3 sm:gap-6 text-rose-100">
        <TimeBlock value={time.years} label="Years" />
        <Separator />
        <TimeBlock value={time.months} label="Months" />
        <Separator />
        <TimeBlock value={time.days} label="Days" />
        <Separator />
        <TimeBlock value={time.hours.toString().padStart(2, '0')} label="Hours" />
        <Separator />
        <TimeBlock value={time.minutes.toString().padStart(2, '0')} label="Mins" />
        <Separator />
        <TimeBlock value={time.seconds.toString().padStart(2, '0')} label="Secs" />
      </div>
    </div>
  );
};

const TimeBlock = ({ value, label }: { value: string | number; label: string }) => (
  <div className="flex flex-col items-center min-w-[40px] sm:min-w-[48px] md:min-w-[60px]">
    <span className="text-2xl sm:text-4xl md:text-5xl font-extralight bg-gradient-to-br from-white to-rose-200 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] leading-none mb-1 sm:mb-2">
      {value}
    </span>
    <span className="text-[0.55rem] sm:text-[0.65rem] md:text-[0.75rem] uppercase tracking-[0.1em] sm:tracking-[0.2em] text-rose-300/60">
      {label}
    </span>
  </div>
);

const Separator = () => (
  <span className="text-xl sm:text-3xl md:text-4xl font-extralight text-rose-300/20 -mt-4 sm:-mt-6 animate-pulse">:</span>
);
