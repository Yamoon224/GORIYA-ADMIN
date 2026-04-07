"use client"

import { useState, useEffect, useRef } from "react"
import { Bell, Search, Menu, ChevronDown, LogOut, Settings, User } from "lucide-react"
import { IUser } from "@/lib/@types/entities"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { authService } from "@/lib/services/auth.service"
import { useRouter } from "next/navigation"
import { Sidebar } from "./sidebar"
import { mockStudents, mockCompanies, mockJobs } from "@/lib/mock-data"

export function Header() {
    const router = useRouter()
    const [user, setUser] = useState<IUser | null>(null)
    const [menuOpen, setMenuOpen] = useState(false)
    const menuRef = useRef<HTMLDivElement>(null)
    const triggerRef = useRef<HTMLButtonElement>(null)
    const [menuPos, setMenuPos] = useState({ top: 0, right: 0 })
    const [searchTerm, setSearchTerm] = useState("")
    const [searchResults, setSearchResults] = useState<any[]>([])
    const [showResults, setShowResults] = useState(false)

    const handleLogout = async () => {
        try {
            await authService.logout()
            router.push("/login")
        } catch (error) {
            console.error("Logout error:", error)
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
        ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
        : "GA"

    const handleSearch = async (value: string) => {
        setSearchTerm(value)
        if (value.length > 2) {
            const allResults = [
                ...mockStudents.map((student) => ({
                    type: "student",
                    id: student.id,
                    name: student.name,
                    description: student.field,
                    route: "/students",
                })),
                ...mockCompanies.map((company) => ({
                    type: "company",
                    id: company.id,
                    name: company.name,
                    description: company.description,
                    route: "/entreprises-partenaires",
                })),
                ...mockJobs.map((job) => ({
                    type: "job",
                    id: job.id,
                    name: job.title,
                    description: `${job.company} - ${job.location}`,
                    route: "/offres-emploi",
                })),
            ]

            const filteredResults = allResults
                .filter(
                    (item) =>
                        item?.name?.toLowerCase().includes(value.toLowerCase()) ||
                        item?.description?.toLowerCase().includes(value.toLowerCase()),
                )
                .slice(0, 8) // Limit to 8 results

            setSearchResults(filteredResults)
            setShowResults(true)
        } else {
            setShowResults(false)
        }
    }

    const handleResultClick = (result: any) => {
        router.push(result.route)
        setShowResults(false)
        setSearchTerm("")
    }

    return (
        <header className="bg-white border-b border-gray-200 px-4 py-3">
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
                        <h1 className="text-lg font-semibold text-gray-900">Goriya Back Office</h1>
                        {/* <span className="text-sm text-gray-500">Plateforme Goriya IA</span> */}
                    </div>
                </div>

                <div className="flex items-center gap-2 lg:gap-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                            placeholder="Rechercher candidats, entreprises, offres..."
                            className="pl-10 w-48 lg:w-80"
                            value={searchTerm}
                            onChange={(e) => handleSearch(e.target.value)}
                            onBlur={() => setTimeout(() => setShowResults(false), 200)}
                            onFocus={() => searchTerm.length > 2 && setShowResults(true)}
                        />
                        {showResults && searchResults.length > 0 && (
                            <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-md shadow-lg z-50 mt-1 max-h-96 overflow-y-auto">
                                {searchResults.map((result, index) => (
                                    <div
                                        key={index}
                                        className="p-3 hover:bg-gray-50 cursor-pointer border-b last:border-b-0"
                                        onClick={() => handleResultClick(result)}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div
                                                className={`w-2 h-2 rounded-full ${result.type === "student"
                                                        ? "bg-blue-500"
                                                        : result.type === "company"
                                                            ? "bg-green-500"
                                                            : "bg-purple-500"
                                                    }`}
                                            />
                                            <div className="flex-1">
                                                <div className="font-medium text-sm">{result.name}</div>
                                                <div className="text-xs text-gray-500">{result.description}</div>
                                                <div className="text-xs text-gray-400 capitalize">{result.type}</div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <Button variant="ghost" size="icon">
                        <Bell className="w-5 h-5" />
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
                                <AvatarFallback>{userInitials}</AvatarFallback>
                            </Avatar>
                            <span className="text-sm hidden lg:block">{user?.name ?? "Goriya Admin"}</span>
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
                                    <Settings className="w-4 h-4" /> Paramètres
                                </button>
                                <hr className="my-1 border-gray-100" />
                                <button
                                    onClick={handleLogout}
                                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                                >
                                    <LogOut className="w-4 h-4" /> Déconnexion
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    )
}
