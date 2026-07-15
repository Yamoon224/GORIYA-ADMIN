"use client"

import { useEffect, useState } from "react"
import { GraduationCap, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { courseService, type ICourse } from "@/lib/services/course.service"

export default function Page() {
    const [courses, setCourses] = useState<ICourse[]>([])
    const [loading, setLoading] = useState(true)
    const [createOpen, setCreateOpen] = useState(false)
    const [creating, setCreating] = useState(false)
    const [form, setForm] = useState({ title: "", description: "", category: "", provider: "", durationHours: "" })

    const load = async () => {
        setLoading(true)
        try {
            const res = await courseService.paginate({ page: 1, limit: 50 })
            const body = (res as any)?.data !== undefined ? res : { data: [] }
            setCourses(Array.isArray(body.data) ? body.data : [])
        } catch (err) {
            console.error("[formations] load error:", err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        load()
    }, [])

    const handleCreate = async () => {
        if (!form.title.trim()) return
        setCreating(true)
        try {
            await courseService.create({
                title: form.title.trim(),
                description: form.description.trim() || undefined,
                category: form.category.trim() || undefined,
                provider: form.provider.trim() || undefined,
                durationHours: form.durationHours ? Number(form.durationHours) : undefined,
            })
            setCreateOpen(false)
            setForm({ title: "", description: "", category: "", provider: "", durationHours: "" })
            await load()
        } catch (err) {
            console.error("[formations] create error:", err)
        } finally {
            setCreating(false)
        }
    }

    const handleDelete = async (id: string) => {
        try {
            await courseService.remove(id)
            setCourses((prev) => prev.filter((c) => c.id !== id))
        } catch (err) {
            console.error("[formations] delete error:", err)
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center p-16">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#0f56d9] border-t-transparent" />
            </div>
        )
    }

    return (
        <div className="space-y-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-[28px] font-semibold leading-tight text-[#242a38] sm:text-[33px] lg:text-[39px]">Formations</h1>
                    <p className="mt-1 text-[14px] text-[#7f8797]">Catalogue de formations proposées aux candidats (Section Formation)</p>
                </div>
                <Button className="h-9 rounded-full bg-[#0f56d9] px-5 text-[12px] font-semibold text-white hover:bg-[#0a4cc5]" onClick={() => setCreateOpen(true)}>
                    <Plus className="h-3.5 w-3.5" />Nouvelle formation
                </Button>
            </div>

            {courses.length === 0 ? (
                <Card className="rounded-[10px] border border-[#d9dce6] bg-white py-0 shadow-none">
                    <CardContent className="p-12 text-center text-[#8a92a3]">
                        <GraduationCap className="mx-auto mb-3 h-12 w-12 opacity-30" />
                        <p>Aucune formation dans le catalogue.</p>
                    </CardContent>
                </Card>
            ) : (
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
                    {courses.map((course) => (
                        <Card key={course.id} className="rounded-[10px] border border-[#d9dce6] bg-white py-0 shadow-none">
                            <CardContent className="px-4 py-4">
                                <div className="mb-2 flex items-start justify-between gap-2">
                                    <p className="text-[13px] font-semibold text-[#242a38]">{course.title}</p>
                                    <Button variant="ghost" size="icon" className="h-7 w-7 shrink-0 text-red-500 hover:bg-red-50" onClick={() => handleDelete(course.id)}>
                                        <Trash2 className="h-3.5 w-3.5" />
                                    </Button>
                                </div>
                                {course.description && <p className="mb-2 line-clamp-2 text-[11px] text-[#7f8797]">{course.description}</p>}
                                <div className="flex flex-wrap gap-1.5">
                                    {course.category && <Badge className="rounded-full border-0 bg-[#eaf1ff] px-2 py-0.5 text-[10px] text-[#1a5fd9]">{course.category}</Badge>}
                                    {course.provider && <Badge className="rounded-full border-0 bg-[#f1f3f7] px-2 py-0.5 text-[10px] text-[#3d4354]">{course.provider}</Badge>}
                                    {course.durationHours && <Badge className="rounded-full border-0 bg-[#f1f3f7] px-2 py-0.5 text-[10px] text-[#3d4354]">{course.durationHours}h</Badge>}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}

            <Dialog open={createOpen} onOpenChange={setCreateOpen}>
                <DialogContent>
                    <DialogHeader><DialogTitle>Nouvelle formation</DialogTitle></DialogHeader>
                    <div className="space-y-3">
                        <Input value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} placeholder="Titre" />
                        <Textarea value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} placeholder="Description" className="min-h-[70px]" />
                        <div className="grid grid-cols-2 gap-2">
                            <Input value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))} placeholder="Catégorie" />
                            <Input value={form.provider} onChange={(e) => setForm((f) => ({ ...f, provider: e.target.value }))} placeholder="Fournisseur" />
                        </div>
                        <Input type="number" min={1} value={form.durationHours} onChange={(e) => setForm((f) => ({ ...f, durationHours: e.target.value }))} placeholder="Durée (heures)" />
                        <DialogFooter>
                            <Button disabled={creating || !form.title.trim()} onClick={handleCreate} className="w-full bg-[#0f56d9] hover:bg-[#0a4cc5]">
                                {creating ? "Création..." : "Créer"}
                            </Button>
                        </DialogFooter>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}
