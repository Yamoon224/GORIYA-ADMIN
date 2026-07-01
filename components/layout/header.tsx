"use client"

import { useState, useEffect, useRef } from "react"
import { Bell, Menu, ChevronDown, LogOut, Settings, User } from "lucide-react"
import { IUser } from "@/lib/@types/entities"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useRouter } from "next/navigation"
import { Sidebar } from "./sidebar"

export function Header() {
    const router = useRouter()
    const [user, setUser] = useState<IUser | null>(null)
    const [menuOpen, setMenuOpen] = useState(false)
    const menuRef = useRef<HTMLDivElement>(null)
    const triggerRef = useRef<HTMLButtonElement>(null)
    const [menuPos, setMenuPos] = useState({ top: 0, right: 0 })

    const handleLogout = async () => {
        try {
            await fetch("/api/session", { method: "DELETE" })
        } catch (error) {
            console.error("Logout error:", error)
        } finally {
            localStorage.removeItem("goriya_user")
            router.push("/login")
        }
    }

    useEffect(() => {
        const stored = localStorage.getItem("goriya_user")
        if (stored) {
            try {
                setUser(JSON.parse(stored))
            } catch {
                // ignore parse errors
            }
        }
    }, [])

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setMenuOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    const userInitials = user?.name
        ? user.name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
            .slice(0, 2)
        : "GA"

    return (
        <header className="bg-[#f3f3f7] border-b border-[#d9d9df] px-4 py-2.5">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="lg:hidden">
                                <Menu className="w-5 h-5" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="p-0 w-64">
                            <Sidebar />
                        </SheetContent>
                    </Sheet>

                    <div className="hidden lg:block">
                        <h1 className="text-[27px] leading-tight font-semibold text-[#252a34]">Goriya Back Office</h1>
                        <span className="text-[15px] text-[#808692]">Plateforme d'emploi IA</span>
                    </div>
                </div>

                <div className="flex items-center gap-4 lg:gap-5">
                    <Button variant="ghost" size="icon">
                        <Bell className="w-5 h-5 text-[#495061]" />
                    </Button>

                    <div ref={menuRef}>
                        <button
                            ref={triggerRef}
                            onClick={() => {
                                if (triggerRef.current) {
                                    const rect = triggerRef.current.getBoundingClientRect()
                                    setMenuPos({ top: rect.bottom + 4, right: window.innerWidth - rect.right })
                                }
                                setMenuOpen((v) => !v)
                            }}
                            className="flex items-center gap-2 rounded-md px-2 py-1.5 hover:bg-gray-100 transition-colors"
                        >
                            <Avatar className="w-8 h-8">
                                <AvatarImage src={user?.avatar ?? "/placeholder.svg"} />
                                <AvatarFallback className="bg-[#5865f2] text-white">{userInitials}</AvatarFallback>
                            </Avatar>
                            <div className="hidden lg:block text-left leading-tight">
                                <p className="text-sm text-[#2b3140]">{user?.name ?? "Goriya Admin"}</p>
                                <p className="text-xs text-[#8b92a3]">admin@goriya.com</p>
                            </div>
                            <ChevronDown className="w-4 h-4 text-gray-500 hidden lg:block" />
                        </button>

                        {menuOpen && (
                            <div
                                style={{ position: "fixed", top: menuPos.top, right: menuPos.right, zIndex: 9999 }}
                                className="w-44 bg-white border border-gray-200 rounded-md shadow-lg py-1"
                            >
                                <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                                    <User className="w-4 h-4" /> Profil
                                </button>
                                <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                                    <Settings className="w-4 h-4" /> Parametres
                                </button>
                                <hr className="my-1 border-gray-100" />
                                <button
                                    onClick={handleLogout}
                                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                                >
                                    <LogOut className="w-4 h-4" /> Deconnexion
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    )
}
