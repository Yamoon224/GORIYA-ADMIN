import { Header } from "@/components/layout/header"
import { Sidebar } from "@/components/layout/sidebar"


export default function ProtectedLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex h-full bg-gray-50">
            {/* Sidebar responsive */}
            <Sidebar className="hidden md:flex md:flex-shrink-0" />

            <div className="flex-1 flex flex-col min-h-0">
                {/* Header */}
                <Header />

                {/* Main content scrollable */}
                <main className="flex-1 overflow-auto min-h-0 p-4">
                    {children}
                </main>
            </div>
        </div>
    )
}