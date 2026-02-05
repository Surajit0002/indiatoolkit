"use client";

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useHistory } from './useUserData';

// Hook to track tool page visits
export function useToolTracking(toolData: {
  toolId: string;
  toolSlug: string;
  toolName: string;
  toolIcon: string;
  toolCategory: string;
}) {
  const pathname = usePathname();
  const { addToHistory } = useHistory();

  useEffect(() => {
    // Only track if we're on a tool page
    if (pathname.startsWith('/tool/')) {
      // Add to history
      addToHistory({
        toolId: toolData.toolId,
        toolSlug: toolData.toolSlug,
        toolName: toolData.toolName,
        toolIcon: toolData.toolIcon,
        toolCategory: toolData.toolCategory,
      });
    }
  }, [pathname, toolData, addToHistory]);
}
