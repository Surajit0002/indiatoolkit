"use client";

import React from "react";
import * as Icons from "lucide-react";

interface IconRendererProps {
  icon: string;
  className?: string;
}

export default function IconRenderer({ icon, className = "h-5 w-5" }: IconRendererProps) {
  // Try to find the icon in lucide-react
  const IconsRecord = Icons as unknown as Record<string, React.ComponentType<{ className?: string }>>;
  const IconComponent = IconsRecord[icon] || Icons.HelpCircle;
  return <IconComponent className={className} />
}
