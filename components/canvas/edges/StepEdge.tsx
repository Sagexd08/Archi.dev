import React from "react";
import { BaseEdge, EdgeProps, getSmoothStepPath } from "@xyflow/react";
export function StepEdge({
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
  selected,
}: EdgeProps) {
  const [edgePath] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
    borderRadius: 16,
  });
  return (
    <>
      <BaseEdge
        path={edgePath}
        markerEnd={markerEnd}
        style={{
          ...style,
          strokeWidth: selected ? 2.2 : 1.7,
          stroke: selected ? "var(--primary)" : "color-mix(in srgb, var(--muted) 82%, #00f0ff 18%)",
          opacity: selected ? 0.95 : 0.62,
          filter: selected ? "drop-shadow(0 0 6px color-mix(in srgb, var(--primary) 55%, transparent))" : "none",
          transition: "all 0.2s",
        }}
      />
      <BaseEdge
        path={edgePath}
        markerEnd={markerEnd}
        style={{
          ...style,
          strokeWidth: selected ? 1.7 : 1.25,
          stroke: selected ? "#c7e5ff" : "#9ad8ff",
          opacity: selected ? 0.72 : 0.48,
          strokeDasharray: "8 12",
          animation: "edge-flow 1.15s linear infinite",
        }}
      />
    </>
  );
}
