import { Card, CardContent } from "@/components/ui/card"
import type { LucideIcon } from "lucide-react"

interface StatsCardProps {
    title: string
    value: string
    subtitle: string
    growth?: string
    icon: LucideIcon
    accentClass?: string
    iconClass?: string
    color?: string
}

export function StatsCard({ title, value, subtitle, growth, icon: Icon, accentClass, iconClass, color }: StatsCardProps) {
    const borderClass = accentClass ?? "border-[#d9dce6]"
    const iconBgClass = iconClass ?? color ?? "bg-blue-500"

    return (
        <Card className={`rounded-[10px] border bg-white px-1 py-0 shadow-none ${borderClass}`}>
            <CardContent className="px-4 py-4">
                <div className="flex items-start justify-between gap-3">
                    <div>
                        <p className="text-[11px] text-[#838a99]">{title}</p>
                        <p className="mt-2 text-[31px] leading-none font-semibold text-[#222a37]">{value}</p>
                        <p className="mt-2 text-[10px] text-[#8f95a3]">{subtitle}</p>
                        {growth ? <p className="text-[10px] text-[#21b26d]">{growth}</p> : null}
                    </div>
                    <div className={`mt-1 flex h-7 w-7 items-center justify-center rounded-lg ${iconBgClass}`}>
                        <Icon className="h-4 w-4 text-white" />
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
