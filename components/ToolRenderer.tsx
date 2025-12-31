"use client";

import dynamic from "next/dynamic";
import { Tool } from "@/types/tool";

interface ToolRendererProps {
  tool: Tool;
}

export default function ToolRenderer({ tool }: ToolRendererProps) {
  const ToolComponent = dynamic(() => import(`@/components/tools/${tool.componentName}`), {
    loading: () => (
      <div className="flex flex-col items-center justify-center h-96 w-full space-y-4">
        <div className="h-12 w-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-400 font-black uppercase tracking-widest text-xs">Loading {tool.name}...</p>
      </div>
    ),
    ssr: false,
  });

  return <ToolComponent />;
}
