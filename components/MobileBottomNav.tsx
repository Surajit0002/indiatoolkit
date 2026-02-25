"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Home, 
  Grid3X3, 
  Heart, 
  Layers
} from "lucide-react";

interface NavItem {
  id: string;
  label: string;
  icon: typeof Home;
  href: string;
  activePattern: RegExp;
  color: string;
  bgColor: string;
}

const navItems: NavItem[] = [
  { 
    id: "home", 
    label: "Home", 
    icon: Home, 
    href: "/",
    activePattern: /^\/$/,
    color: "#10b981",
    bgColor: "bg-emerald-100"
  },
  { 
    id: "tools", 
    label: "Tools", 
    icon: Grid3X3, 
    href: "/tools",
    activePattern: /^\/tools/,
    color: "#3b82f6",
    bgColor: "bg-blue-100"
  },
  { 
    id: "quick", 
    label: "Quick", 
    icon: Layers, 
    href: "/categories",
    activePattern: /^\/categories/,
    color: "#8b5cf6",
    bgColor: "bg-purple-100"
  },
  { 
    id: "saved", 
    label: "Saved", 
    icon: Heart, 
    href: "/saved-tools",
    activePattern: /^\/saved-tools/,
    color: "#ec4899",
    bgColor: "bg-pink-100"
  },
];

export default function MobileBottomNav() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [favoritesCount, setFavoritesCount] = useState(0);

  // Handle scroll visibility
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show nav when scrolling up, hide when scrolling down
      if (currentScrollY < lastScrollY || currentScrollY < 100) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Get favorites count from localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem("tool-favorites");
    if (savedFavorites) {
      const favorites = savedFavorites.split(",").filter(Boolean);
      setFavoritesCount(favorites.length);
    }

    // Listen for storage changes
    const handleStorageChange = () => {
      const updated = localStorage.getItem("tool-favorites");
      if (updated) {
        setFavoritesCount(updated.split(",").filter(Boolean).length);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Check if item is active
  const isActive = (item: NavItem) => {
    return item.activePattern.test(pathname);
  };

  return (
    <>
      {/* Spacer for bottom nav */}
      <div className="h-20 lg:hidden" />
      
      {/* Bottom Navigation */}
      <nav 
        className={`
          fixed bottom-0 left-0 right-0 z-50 lg:hidden
          bg-white/95 backdrop-blur-xl border-t border-slate-200/50
          transition-transform duration-300 ease-out
          ${isVisible ? "translate-y-0" : "translate-y-full"}
        `}
        style={{ 
          paddingBottom: "env(safe-area-inset-bottom)",
          boxShadow: "0 -4px 20px rgba(0, 0, 0, 0.08)"
        }}
        role="navigation"
        aria-label="Mobile bottom navigation"
      >
        <div className="flex items-center justify-around h-16 max-w-lg mx-auto px-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item);
            const showBadge = item.id === "saved" && favoritesCount > 0;

            return (
              <Link
                key={item.id}
                href={item.href}
                className={`
                  relative flex flex-col items-center justify-center
                  min-w-[65px] h-full px-1 py-1.5
                  transition-all duration-200 ease-out
                  ${active 
                    ? "text-green-600" 
                    : "text-slate-400 hover:text-slate-600"
                  }
                `}
                aria-current={active ? "page" : undefined}
                aria-label={item.label}
              >
                {/* Active indicator bar */}
                {active && (
                  <div 
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-1 rounded-b-full"
                    style={{ backgroundColor: item.color }}
                  />
                )}

                {/* Icon container */}
                <div 
                  className={`
                    relative flex items-center justify-center
                    w-11 h-8 rounded-xl transition-all duration-200
                    ${active ? item.bgColor : ""}
                    ${active ? "scale-110" : ""}
                  `}
                  style={active ? {} : {}}
                >
                  <Icon 
                    className={`
                      w-5 h-5 transition-all duration-200
                      ${active ? "stroke-[2.5]" : "stroke-2"}
                    `}
                    style={active ? { color: item.color } : {}}
                  />

                  {/* Badge */}
                  {showBadge && (
                    <span 
                      className="
                        absolute -top-1 -right-1
                        min-w-[18px] h-[18px] px-1
                        bg-red-500 text-white
                        text-[10px] font-bold
                        rounded-full flex items-center justify-center
                        animate-scale-in
                      "
                    >
                      {favoritesCount > 99 ? "99+" : favoritesCount}
                    </span>
                  )}
                </div>

                {/* Label */}
                <span 
                  className={`
                    text-[10px] font-bold mt-0.5
                    transition-all duration-200
                    ${active ? "tracking-wide" : ""}
                  `}
                  style={active ? { color: item.color } : {}}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>

        {/* Home indicator bar (iOS style) */}
        <div className="flex justify-center pb-1">
          <div className="w-32 h-1 bg-slate-300 rounded-full" />
        </div>
      </nav>
    </>
  );
}
