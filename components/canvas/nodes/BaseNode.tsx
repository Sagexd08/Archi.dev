import React from "react";
import { clsx } from "clsx";

interface BaseNodeProps {
  selected?: boolean;
  type: string;
  label: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  color?: string;
}

export function BaseNode({
  selected,
  type,
  label,
  children,
  footer,
  className,
  color = "#00F0FF"
}: BaseNodeProps) {
  return (
    <div 
      className={clsx(
        "cyber-glass overflow-hidden transition-all duration-200 min-w-[200px] text-white",
        selected && "ring-2 shadow-[0_0_20px_rgba(0,240,255,0.2)]",
        className
      )}
      style={{
        borderTop: \2px solid \\,
        ...(selected ? { ringColor: color } : {})
      }}
    >
      <div className="flex flex-col p-3 border-b border-white/[0.05] bg-black/20">
        {type && (
          <span 
            className="text-[9px] uppercase tracking-[0.2em] font-mono font-bold mb-1"
            style={{ color }}
          >
            {type}
          </span>
        )}
        <div className="text-sm font-semibold tracking-tight text-white/90">{label}</div>
      </div>
      {(children || footer) && (
        <div className="p-3 bg-[#050505]/40 text-xs text-white/60 space-y-2">
          {children}
          {footer && <div>{footer}</div>}
        </div>
      )}
    </div>
  );
}
