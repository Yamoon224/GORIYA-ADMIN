"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { settingsService, type ISystemSettings } from "@/lib/services/settings.service"
import { Settings, User, Bell, Shield, Users, Database, Globe, Save } from "lucide-react"

export default function Page() {
    const [settings, setSettings] = useState<ISystemSettings>({
        platformName: "Goriya",
        mainUrl: "https://goriya.com",
        supportEmail: "support@goriya.com",
        timezone: "Europe/Paris",
        description:
            "Plateforme d'emploi intelligente utilisant l'IA pour optimiser le matching candidats-entreprises et améliorer de CV.",
    })
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const data = await settingsService.getSettings()
                setSettings(data)
            } catch (error) {
                console.error("Erreur lors du chargement des paramètres:", error)
            } finally {
                setLoading(false)
            }
        }

        fetchSettings()
    }, [])

    const handleSave = async () => {
        setSaving(true)
        try {
            await settingsService.updateSettings(settings)
            // Show success message
        } catch (error) {
            console.error("Erreur lors de la sauvegarde:", error)
        } finally {
            setSaving(false)
        }
    }

    const handleInputChange = (field: keyof SystemSettings, value: string) => {
        setSettings((prev) => ({ ...prev, [field]: value }))
    }

    if (loading) {
        return <div className="flex items-center justify-center h-64">Chargement...</div>
    }

    return (
        <div className="p-2 space-y-2">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Paramètres Système</h1>
                <p className="text-gray-600">Configuration générale de la plateforme Goriya</p>
            </div>

            <Tabs defaultValue="general" className="space-y-2">
                <TabsList className="grid w-full grid-cols-7">
                    <TabsTrigger value="general" className="flex items-center gap-2">
                        <Settings className="w-4 h-4" />
                        Général
                    </TabsTrigger>
                    <TabsTrigger value="profile" className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        Profil
                    </TabsTrigger>
                    <TabsTrigger value="notifications" className="flex items-center gap-2">
                        <Bell className="w-4 h-4" />
                        Notifications
                    </TabsTrigger>
                    <TabsTrigger value="preferences" className="flex items-center gap-2">
                        <Globe className="w-4 h-4" />
                        Préférences
                    </TabsTrigger>
                    <TabsTrigger value="team" className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        Équipe
                    </TabsTrigger>
                    <TabsTrigger value="database" className="flex items-center gap-2">
                        <Database className="w-4 h-4" />
                        Base de données
                    </TabsTrigger>
                    <TabsTrigger value="security" className="flex items-center gap-2">
                        <Shield className="w-4 h-4" />
                        Sécurité
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="general" className="space-y-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Configuration Générale</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="platformName">Nom de la plateforme</Label>
                                    <Input
                                        id="platformName"
                                        value={settings.platformName}
                                        onChange={(e) => handleInputChange("platformName", e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="mainUrl">URL principale</Label>
                                    <Input
                                        id="mainUrl"
                                        value={settings.mainUrl}
                                        onChange={(e) => handleInputChange("mainUrl", e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="supportEmail">Email support</Label>
                                    <Input
                                        id="supportEmail"
                                        type="email"
                                        value={settings.supportEmail}
                                        onChange={(e) => handleInputChange("supportEmail", e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="timezone">Fuseau horaire</Label>
                                    <Input
                                        id="timezone"
                                        value={settings.timezone}
                                        onChange={(e) => handleInputChange("timezone", e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description">Description de la plateforme</Label>
                                <Textarea
                                    id="description"
                                    rows={4}
                                    value={settings.description}
                                    onChange={(e) => handleInputChange("description", e.target.value)}
                                    placeholder="Plateforme d'emploi intelligente utilisant l'IA pour optimiser le matching candidats-entreprises et améliorer de CV."
                                />
                            </div>

                            <Button onClick={handleSave} disabled={saving} className="bg-blue-600 hover:bg-blue-700">
                                <Save className="w-4 h-4 mr-2" />
                                {saving ? "Enregistrement..." : "Enregistrer les Modifications"}
                            </Button>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="profile" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Profil Administrateur</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-600">Configuration du profil administrateur en cours de développement...</p>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="notifications" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Paramètres de Notifications</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-600">Configuration des notifications en cours de développement...</p>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="preferences" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Préférences Système</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-600">Configuration des préférences en cours de développement...</p>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="team" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Gestion d'Équipe</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-600">Gestion d'équipe en cours de développement...</p>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="database" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Configuration Base de Données</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-600">Configuration de la base de données en cours de développement...</p>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="security" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Paramètres de Sécurité</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-600">Configuration de sécurité en cours de développement...</p>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
