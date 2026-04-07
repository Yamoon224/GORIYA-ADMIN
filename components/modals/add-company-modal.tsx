"use client"

import type React from "react"

import { useState } from "react"
import { Modal } from "@/components/ui/modal"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface AddCompanyModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: any) => void
}

export function AddCompanyModal({ isOpen, onClose, onSubmit }: AddCompanyModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    sector: "",
    employees: "",
    location: "",
    website: "",
    description: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
    setFormData({
      name: "",
      email: "",
      phone: "",
      sector: "",
      employees: "",
      location: "",
      website: "",
      description: "",
    })
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Ajouter une nouvelle entreprise" size="lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="name">Nom de l'entreprise *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          <div>
            <Label htmlFor="email">Email de contact *</Label>
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
            <Label htmlFor="website">Site web</Label>
            <Input
              id="website"
              value={formData.website}
              onChange={(e) => setFormData({ ...formData, website: e.target.value })}
              placeholder="https://example.com"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="sector">Secteur</Label>
            <Select onValueChange={(value) => setFormData({ ...formData, sector: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner un secteur" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="technologie">Technologie</SelectItem>
                <SelectItem value="finance">Finance</SelectItem>
                <SelectItem value="sante">Santé</SelectItem>
                <SelectItem value="education">Éducation</SelectItem>
                <SelectItem value="commerce">Commerce</SelectItem>
                <SelectItem value="industrie">Industrie</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="employees">Nombre d'employés</Label>
            <Select onValueChange={(value) => setFormData({ ...formData, employees: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Taille de l'entreprise" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1-10">1-10 employés</SelectItem>
                <SelectItem value="11-50">11-50 employés</SelectItem>
                <SelectItem value="51-200">51-200 employés</SelectItem>
                <SelectItem value="201-500">201-500 employés</SelectItem>
                <SelectItem value="500+">500+ employés</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label htmlFor="location">Localisation</Label>
          <Input
            id="location"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            placeholder="Paris, France"
          />
        </div>

        <div>
          <Label htmlFor="description">Description de l'entreprise</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Description de l'activité de l'entreprise..."
            rows={3}
          />
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>
            Annuler
          </Button>
          <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
            Ajouter l'entreprise
          </Button>
        </div>
      </form>
    </Modal>
  )
}
