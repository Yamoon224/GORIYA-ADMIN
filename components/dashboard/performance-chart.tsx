"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Sparkles } from "lucide-react"

const performanceData = [
    { name: "Analyse CV", value: 94 },
    { name: "Matching Emploi", value: 87 },
    { name: "Simulation Entretien", value: 91 },
    { name: "Recommandations Formation", value: 78 },
]

export function PerformanceChart() {
    return (
        <Card className="rounded-[10px] border border-[#d9dce6] bg-white py-2 shadow-none">
            <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-[31px] font-semibold text-[#242a38]">
                    <Sparkles className="h-4 w-4 text-[#6f52ff]" />
                    Performance des Outils IA
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 px-4 pb-5">
                {performanceData.map((item) => (
                    <div key={item.name} className="space-y-1">
                        <div className="flex items-center justify-between text-[11px]">
                            <span className="text-[#4c5362]">{item.name}</span>
                            <span className="text-[#8b92a3]">{item.value}%</span>
                        </div>
                        <Progress value={item.value} className="h-2 bg-[#e8ebf2] [&_[data-slot=progress-indicator]]:bg-[#4285ff]" />
                    </div>
                ))}
            </CardContent>
        </Card>
    )
}
