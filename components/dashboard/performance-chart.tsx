"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

const performanceData = [
    { name: "Analyse CV", value: 85, color: "bg-blue-500" },
    { name: "Matching Emploi", value: 72, color: "bg-blue-500" },
    { name: "Simulation Entretien", value: 68, color: "bg-blue-500" },
    { name: "Recommandations Formation", value: 90, color: "bg-blue-500" },
]

export function PerformanceChart() {
    return (
        <Card className="px-2 py-7">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    Performance des Outils IA
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {performanceData.map((item) => (
                    <div key={item.name} className="space-y-2">
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-600">{item.name}</span>
                            <span className="font-medium">{item.value}%</span>
                        </div>
                        <Progress value={item.value} className="h-2" />
                    </div>
                ))}
            </CardContent>
        </Card>
    )
}
