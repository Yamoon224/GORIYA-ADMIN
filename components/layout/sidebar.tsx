"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"
import { AppLogo } from "../app-logo"
import { menuGroups } from "@/lib/items"
import { SidebarProps } from "@/types/props"
import { usePathname } from "next/navigation"

export function Sidebar({ className }: SidebarProps) {
    const pathname = usePathname()

    return (
        <aside className={cn("w-64 bg-slate-800 text-white flex flex-col min-h-0", className)}>
            {/* Header/logo fixe */}
            <div className="flex-shrink-0 p-4 flex items-center justify-center">
                <AppLogo />
            </div>

            {/* Menu scrollable */}
            <nav className="flex-1 overflow-y-auto px-2 py-4 space-y-6
  scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800 scrollbar-thumb-rounded hover:scrollbar-thumb-gray-500">
                {menuGroups.map((group, groupIndex) => (
                    <div key={groupIndex}>
                        <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                            {group.title}
                        </h3>
                        <div className="space-y-1">
                            {group.items.map((item) => {
                                const Icon = item.icon
                                const isActive = pathname === item.href

                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={cn(
                                            "flex items-center gap-3 px-3 py-2 rounded-sm text-sm transition-colors",
                                            isActive
                                                ? "bg-blue-600 text-white"
                                                : "text-slate-300 hover:bg-slate-700 hover:text-white"
                                        )}
                                    >
                                        <Icon className="w-4 h-4" />
                                        {item.title}
                                    </Link>
                                )
                            })}
                        </div>
                    </div>
                ))}
            </nav>
        </aside>
    )
}