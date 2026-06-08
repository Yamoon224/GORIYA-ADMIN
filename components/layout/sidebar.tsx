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
        <aside className={cn("w-64 bg-[#4a4854] text-white flex flex-col min-h-0", className)}>
            <div className="flex-shrink-0 h-12 bg-[#f4f4f7] flex items-center justify-center border-b border-[#d6d6de]">
                <AppLogo width={96} />
            </div>

            <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-5 scrollbar-overlay">
                {menuGroups.map((group, groupIndex) => (
                    <div key={groupIndex}>
                        <h3 className="mb-2 text-[10px] font-medium text-[#8d8a98]">
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
                                            "flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-[12px] transition-colors",
                                            isActive
                                                ? "bg-[#1166ff] text-white"
                                                : "text-[#ebecf0] hover:bg-[#5a5865] hover:text-white"
                                        )}
                                    >
                                        <Icon className="w-3.5 h-3.5" />
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