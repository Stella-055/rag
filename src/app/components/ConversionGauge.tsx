import { motion } from "motion/react";
import { useEffect, useState } from "react";

interface ConversionGaugeProps {
  value: number;
}

export function ConversionGauge({ value }: ConversionGaugeProps) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDisplayValue(value);
    }, 100);
    return () => clearTimeout(timer);
  }, [value]);

  const getColor = (val: number) => {
    if (val <= 40) return "text-red-500";
    if (val <= 70) return "text-amber-500";
    return "text-emerald-500";
  };

  const getStrokeColor = (val: number) => {
    if (val <= 40) return "#ef4444";
    if (val <= 70) return "#f59e0b";
    return "#10b981";
  };

  const circumference = 2 * Math.PI * 70;
  const strokeDashoffset = circumference - (displayValue / 100) * circumference;

  return (
    <div className="relative w-48 h-48 mx-auto">
      <svg className="w-full h-full transform -rotate-90">
        <circle
          cx="96"
          cy="96"
          r="70"
          stroke="currentColor"
          strokeWidth="12"
          fill="none"
          className="text-muted"
        />
        <motion.circle
          cx="96"
          cy="96"
          r="70"
          stroke={getStrokeColor(value)}
          strokeWidth="12"
          fill="none"
          strokeLinecap="round"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1, ease: "easeOut" }}
          style={{
            strokeDasharray: circumference,
          }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span
          key={value}
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className={`text-4xl font-bold ${getColor(value)}`}
        >
          {displayValue}%
        </motion.span>
        <span className="text-sm text-muted-foreground">Conversion</span>
      </div>
    </div>
  );
}
