"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Play, Pause, Settings, TrendingUp, Clock, Star, Users, Brain, BarChart3 } from "lucide-react"
import type { IInterviewSession } from "@/lib/@types/entities"

export default function Page() {
  const [stats, setStats] = useState<{
    todaySessions: number
    averageScore: number
    averageDuration: string
    satisfaction: number
  } | null>(null)
  const [activeSessions, setActiveSessions] = useState<IInterviewSession[]>([])
  const [sessionHistory, setSessionHistory] = useState<IInterviewSession[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      // Données de démonstration
      setStats({
        todaySessions: 47,
        averageScore: 84.2,
        averageDuration: "32min",
        satisfaction: 4.7,
      })

      setActiveSessions([
        {
          id: "1",
          candidateName: "Sophie Laurent",
          candidateEmail: "sophie.laurent@email.com",
          position: "Développeur Frontend",
          duration: 25,
          score: 0,
          status: "active",
          startTime: "2024-01-16T14:30:00Z",
          avatar: "/placeholder.svg?height=40&width=40",
        },
        {
          id: "2",
          candidateName: "Jules Martin",
          candidateEmail: "jules.martin@email.com",
          position: "Data Scientist",
          duration: 18,
          score: 0,
          status: "active",
          startTime: "2024-01-16T15:00:00Z",
          avatar: "/placeholder.svg?height=40&width=40",
        },
      ])

      setSessionHistory([
        {
          id: "3",
          candidateName: "Marie Dubois",
          candidateEmail: "marie.dubois@email.com",
          position: "UX Designer",
          duration: 35,
          score: 87,
          status: "completed",
          startTime: "2024-01-16T10:00:00Z",
          feedback: "Excellente présentation, bonnes compétences techniques",
          avatar: "/placeholder.svg?height=40&width=40",
        },
        {
          id: "4",
          candidateName: "Pierre Martin",
          candidateEmail: "pierre.martin@email.com",
          position: "Marketing Digital",
          duration: 28,
          score: 92,
          status: "completed",
          startTime: "2024-01-16T11:30:00Z",
          feedback: "Très bon candidat, expérience solide",
          avatar: "/placeholder.svg?height=40&width=40",
        },
        {
          id: "5",
          candidateName: "Sophie Laurent",
          candidateEmail: "sophie.laurent@email.com",
          position: "UX/UI Designer",
          duration: 42,
          score: 76,
          status: "completed",
          startTime: "2024-01-16T09:00:00Z",
          feedback: "Bon potentiel, à développer",
          avatar: "/placeholder.svg?height=40&width=40",
        },
      ])
    } catch (error) {
      console.error("Erreur lors du chargement:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="p-6">Chargement...</div>
  }

  return (
    <div className="p-2 space-y-2">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Simulation d'Entretiens</h1>
          <p className="text-gray-600">Gérer et analyser des entretiens IA avec des professionnels IA</p>
        </div>
        <Button>
          <Play className="w-4 h-4 mr-2" />
          Nouvelle Session
        </Button>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Sessions Aujourd'hui</p>
                <p className="text-2xl font-bold text-blue-600">{stats?.todaySessions}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-sm flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Score Moyen</p>
                <p className="text-2xl font-bold text-green-600">{stats?.averageScore}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-sm flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Durée Moyenne</p>
                <p className="text-2xl font-bold text-purple-600">{stats?.averageDuration}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-sm flex items-center justify-center">
                <Clock className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Satisfaction</p>
                <p className="text-2xl font-bold text-orange-600">{stats?.satisfaction}/5</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-sm flex items-center justify-center">
                <Star className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Configuration IA */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="w-5 h-5" />
              Configuration IA
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Chatbot IA Avancé</label>
              <p className="text-sm text-gray-600 mb-3">Questions automatiques basées sur le profil</p>
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Configurer
              </Button>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Analyse IA</label>
              <p className="text-sm text-gray-600 mb-3">Évaluation automatique des réponses</p>
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Paramètres
              </Button>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Mode Premium RH</label>
              <p className="text-sm text-gray-600 mb-3">Simulation avec professionnels RH</p>
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Activer
              </Button>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Rapport IA</label>
              <p className="text-sm text-gray-600 mb-3">Génération automatique de rapports</p>
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Configurer Scenarios
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Performances */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Performances
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Questions Entretiens</span>
                <span className="text-sm text-gray-600">78%</span>
              </div>
              <Progress value={78} className="h-2" />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Satisfaction Candidats</span>
                <span className="text-sm text-gray-600">92%</span>
              </div>
              <Progress value={92} className="h-2" />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Taux de Completion</span>
                <span className="text-sm text-gray-600">85%</span>
              </div>
              <Progress value={85} className="h-2" />
            </div>

            <div className="pt-4 border-t">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-lg font-bold text-blue-600">Management</p>
                  <p className="text-xs text-gray-600">Marketing</p>
                </div>
                <div>
                  <p className="text-lg font-bold text-green-600">Marketing</p>
                  <p className="text-xs text-gray-600">Design</p>
                </div>
                <div>
                  <p className="text-lg font-bold text-purple-600">Design</p>
                  <p className="text-xs text-gray-600">Développement</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sessions Actives */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Sessions Actives
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {activeSessions.map((session) => (
              <div key={session.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-sm">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={session.avatar || "/placeholder.svg"} />
                  <AvatarFallback>
                    {session.candidateName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-medium text-sm">{session.candidateName}</p>
                  <p className="text-xs text-gray-600">{session.position}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="default" className="text-xs">
                      En cours
                    </Badge>
                    <span className="text-xs text-gray-500">{session.duration}min</span>
                  </div>
                </div>
                <Button size="sm" variant="outline">
                  <Pause className="w-3 h-3" />
                </Button>
              </div>
            ))}

            <Button variant="outline" className="w-full bg-transparent">
              Voir Planning
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Historique des Sessions */}
      <Card>
        <CardHeader>
          <CardTitle>Historique des Sessions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {sessionHistory.map((session) => (
              <div key={session.id} className="flex items-center justify-between p-4 border rounded-sm">
                <div className="flex items-center gap-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={session.avatar || "/placeholder.svg"} />
                    <AvatarFallback>
                      {session.candidateName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">{session.candidateName}</h3>
                    <p className="text-sm text-gray-600">{session.position}</p>
                    <p className="text-xs text-gray-500">{new Date(session.startTime).toLocaleDateString("fr-FR")}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <p className="text-lg font-bold text-blue-600">{session.score}/100</p>
                    <p className="text-xs text-gray-600">Score final</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium">{session.duration}min</p>
                    <p className="text-xs text-gray-600">Durée</p>
                  </div>
                  <Badge variant="default" className="bg-green-100 text-green-800">
                    Terminé
                  </Badge>
                  <Button size="sm" variant="outline">
                    Voir Détails
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
