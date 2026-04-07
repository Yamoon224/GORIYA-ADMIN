"use client"

import type React from "react"

import { useState } from "react"
import { Modal } from "@/components/ui/modal"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface AddStudentModalProps {
    isOpen: boolean
    onClose: () => void
    onSubmit: (data: any) => void
}

export function AddStudentModal({ isOpen, onClose, onSubmit }: AddStudentModalProps) {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        field: "",
        experience: "",
        location: "",
        skills: "",
        bio: "",
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSubmit(formData)
        setFormData({
            name: "",
            email: "",
            phone: "",
            field: "",
            experience: "",
            location: "",
            skills: "",
            bio: "",
        })
        onClose()
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Ajouter un nouveau candidat" size="lg">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="name">Nom complet *</Label>
                        <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="email">Email *</Label>
                        <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="phone">Téléphone</Label>
                        <Input
                            id="phone"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                    </div>
                    <div>
                        <Label htmlFor="location">Localisation</Label>
                        <Input
                            id="location"
                            value={formData.location}
                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="field">Domaine</Label>
                        <Select onValueChange={(value) => setFormData({ ...formData, field: value })}>
                            <SelectTrigger>
                                <SelectValue placeholder="Sélectionner un domaine" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="technologie">Technologie</SelectItem>
                                <SelectItem value="marketing">Marketing</SelectItem>
                                <SelectItem value="design">Design</SelectItem>
                                <SelectItem value="finance">Finance</SelectItem>
                                <SelectItem value="rh">Ressources Humaines</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <Label htmlFor="experience">Expérience</Label>
                        <Select onValueChange={(value) => setFormData({ ...formData, experience: value })}>
                            <SelectTrigger>
                                <SelectValue placeholder="Années d'expérience" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="0-1">0-1 an</SelectItem>
                                <SelectItem value="2-3">2-3 ans</SelectItem>
                                <SelectItem value="4-5">4-5 ans</SelectItem>
                                <SelectItem value="6+">6+ ans</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div>
                    <Label htmlFor="skills">Compétences (séparées par des virgules)</Label>
                    <Input
                        id="skills"
                        value={formData.skills}
                        onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                        placeholder="React, TypeScript, Node.js"
                    />
                </div>

                <div>
                    <Label htmlFor="bio">Biographie</Label>
                    <Textarea
                        id="bio"
                        value={formData.bio}
                        onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                        placeholder="Description du profil du candidat..."
                        rows={3}
                    />
                </div>

                <div className="flex justify-end gap-2 pt-4">
                    <Button type="button" variant="outline" onClick={onClose}>
                        Annuler
                    </Button>
                    <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                        Ajouter le candidat
                    </Button>
                </div>
            </form>
        </Modal>
    )
}
