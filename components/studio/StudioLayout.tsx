"use client";
import React from "react";
import { CommandPalette } from "./CommandPalette";
import { CopilotChatPill } from "./CopilotChatPill";
import { StudioFooter } from "@/components/studio/StudioFooter";
type StudioLayoutProps = {
  isCompactViewport: boolean;
  statusText: string;
  creditUsedPercent: number;
  saveState: string;
  commitStatus: string;
  children: React.ReactNode;
};
export function StudioLayout({
  isCompactViewport,
  statusText,
  creditUsedPercent,
  saveState,
  commitStatus,
  children,
}: StudioLayoutProps) {
  return (
    <div
      className="studio-shell relative bg-black"
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        width: "100vw",
        color: "var(--foreground)",
        overflow: "hidden",
      }}
    >
      <div className="absolute inset-0 z-0 bg-architect-grid opacity-30 pointer-events-none" />
      <div className="absolute inset-0 z-0 bg-noise pointer-events-none" />
      
      <div className="relative z-10 flex flex-col h-full w-full">
        {children}
        <CommandPalette />
        <CopilotChatPill />
        <StudioFooter
          isCompactViewport={isCompactViewport}
          statusText={statusText}
          creditUsedPercent={creditUsedPercent}
          saveState={saveState}
          commitStatus={commitStatus}
        />
      </div>
    </div>
  );
}
