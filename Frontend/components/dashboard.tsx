"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Heart, Activity, Zap, Brain, Droplet, Flame, ArrowRight, RefreshCw } from "lucide-react"
import HealthModel from "@/components/health-model"

export default function Dashboard() {
  const [scanning, setScanning] = useState(false)
  const [progress, setProgress] = useState(0)
  const [healthScore, setHealthScore] = useState(78)
  const [healthData, setHealthData] = useState({})
  const [error, setError] = useState(null)   

  // Simulate scanning animation
  useEffect(() => {
    async function fetchHealthData() {
      try {
        const response = await fetch("http://localhost:3001/getLatestHealthData")
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`)
        }
        const data = await response.json()
        setHealthData(data || {})
      } catch (error) {
        console.error("Error fetching health data:", error)
        setError("Failed to load health data")
      }
    }
    fetchHealthData()
  }, [])
  

  const startScan = () => {
    setScanning(true)
    setProgress(0)
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col md:flex-row justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Health Dashboard</h1>
          <p className="text-gray-400">Welcome back, John. Here's your health overview.</p>
        </div>
        <Button
          onClick={startScan}
          disabled={scanning}
          className="mt-4 md:mt-0 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white"
        >
          {scanning ? (
            <>
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
              Scanning...
            </>
          ) : (
            <>
              <Activity className="mr-2 h-4 w-4" />
              Run Health Scan
            </>
          )}
        </Button>
      </div>

      {scanning && (
        <Card className="mb-8 border-green-500/30 bg-black/40">
          <CardContent className="pt-6">
            <p className="text-center text-sm text-gray-400 mb-2">Analyzing biometrics...</p>
            <Progress value={progress} className="h-2 bg-gray-800" />
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <Card className="health-card border-green-500/30 bg-black/40 h-full">
            <CardHeader>
              <CardTitle className="flex items-center">
                <span>X-Verse Health Model</span>
                <span className="ml-2 text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full">3D View</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-center p-0 h-[400px]">
              <HealthModel />
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="health-card border-green-500/30 bg-black/40 mb-6">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Heart className="mr-2 h-5 w-5 text-red-500" />
                Overall Health
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center">
                <div className="relative w-32 h-32">
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    <circle
                      className="text-gray-800 stroke-current"
                      strokeWidth="10"
                      cx="50"
                      cy="50"
                      r="40"
                      fill="transparent"
                    ></circle>
                    <circle
                      className="text-green-500 stroke-current"
                      strokeWidth="10"
                      strokeLinecap="round"
                      cx="50"
                      cy="50"
                      r="40"
                      fill="transparent"
                      strokeDasharray={`${2 * Math.PI * 40}`}
                      strokeDashoffset={`${2 * Math.PI * 40 * (1 - healthScore / 100)}`}
                      transform="rotate(-90 50 50)"
                    ></circle>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-3xl font-bold text-white">{healthScore}</span>
                  </div>
                </div>
              </div>
              <p className="text-center text-sm text-gray-400 mt-2">
                Your health score is {healthScore > 75 ? "excellent" : healthScore > 50 ? "good" : "needs attention"}
              </p>
            </CardContent>
          </Card>

          <Card className="health-card border-green-500/30 bg-black/40">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-between hover:bg-green-500/20 hover:text-white">
                  View Full Report <ArrowRight className="h-4 w-4" />
                </Button>
                <Button variant="outline" className="w-full justify-between hover:bg-green-500/20 hover:text-white">
                  Schedule Consultation <ArrowRight className="h-4 w-4" />
                </Button>
                <Button variant="outline" className="w-full justify-between hover:bg-green-500/20 hover:text-white">
                  Personalized Diet Plan <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Tabs defaultValue="vitals" className="w-full">
        <TabsList className="grid grid-cols-4 mb-6 bg-black/40">
          <TabsTrigger value="vitals" className="data-[state=active]:bg-green-500/20">
            Vital Signs
          </TabsTrigger>
          <TabsTrigger value="energy" className="data-[state=active]:bg-green-500/20">
            Energy Balance
          </TabsTrigger>
          <TabsTrigger value="mind" className="data-[state=active]:bg-green-500/20">
            Mind & Stress
          </TabsTrigger>
          <TabsTrigger value="elements" className="data-[state=active]:bg-green-500/20">
            Elemental Balance
          </TabsTrigger>
        </TabsList>

        <TabsContent value="vitals">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <MetricCard
              title="Heart Rate"
              value={healthData.heartrate || "N/A"}
              unit="bpm"
              icon={<Heart className="h-5 w-5 text-red-500" />}
              status="normal"
              description="Your heart rate is within normal range"
            />
            <MetricCard
              title="Blood Pressure"
              value={healthData.bloodpressure || "N/A"}
              unit="mmHg"
              icon={<Activity className="h-5 w-5 text-blue-500" />}
              status="normal"
              description="Your blood pressure is optimal"
            />
            <MetricCard
              title="Oxygen Saturation"
              value={healthData.oxygensaturation || "N/A"}
              unit="%"
              icon={<Droplet className="h-5 w-5 text-cyan-500" />}
              status="excellent"
              description="Your oxygen levels are excellent"
            />
          </div>
        </TabsContent>

        <TabsContent value="energy">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <MetricCard
              title="Energy Level"
              value={healthData.energy || "N/A"}
              unit="%"
              icon={<Zap className="h-5 w-5 text-yellow-500" />}
              status="good"
              description="Your energy levels are above average"
            />
            <MetricCard
              title="Metabolism"
              value={healthData.metabolism || "N/A"}
              unit="cal/day"
              icon={<Flame className="h-5 w-5 text-orange-500" />}
              status="normal"
              description="Your metabolic rate is normal"
            />
            <MetricCard
              title="Sleep Quality"
              value={healthData.sleepquality || "N/A"}
              unit="hrs"
              icon={<Activity className="h-5 w-5 text-indigo-500" />}
              status="good"
              description="Your sleep quality is good"
            />
          </div>
        </TabsContent>

        <TabsContent value="mind">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <MetricCard
              title="Stress Level"
              value={healthData.stresslevel|| "N/A"}
              unit="%"
              icon={<Brain className="h-5 w-5 text-purple-500" />}
              status="low"
              description="Your stress levels are low"
            />
            <MetricCard
              title="Focus"
              value={healthData.focus || "N/A"}
              unit="%"
              icon={<Activity className="h-5 w-5 text-blue-500" />}
              status="good"
              description="Your focus is above average"
            />
            <MetricCard
              title="Mindfulness"
              value={healthData.mindfulness || "N/A"}
              unit="%"
              icon={<Brain className="h-5 w-5 text-teal-500" />}
              status="normal"
              description="Your mindfulness score is normal"
            />
          </div>
        </TabsContent>

        <TabsContent value="elements">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <MetricCard
              title="Vata (Air)"
              value={healthData.vatta || "N/A"}
              unit="%"
              icon={<Activity className="h-5 w-5 text-blue-300" />}
              status="balanced"
              description="Your Vata dosha is balanced"
            />
            <MetricCard
              title="Pitta (Fire)"
              value={healthData.pitta || "N/A"}
              unit="%"
              icon={<Flame className="h-5 w-5 text-orange-500" />}
              status="balanced"
              description="Your Pitta dosha is balanced"
            />
            <MetricCard
              title="Kapha (Earth)"
              value={healthData.kapha || "N/A"}
              unit="%"
              icon={<Droplet className="h-5 w-5 text-green-500" />}
              status="balanced"
              description="Your Kapha dosha is balanced"
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

interface MetricCardProps {
  title: string
  value: string
  unit: string
  icon: React.ReactNode
  status: "excellent" | "good" | "normal" | "low" | "balanced"
  description: string
}

function MetricCard({ title, value, unit, icon, status, description }: MetricCardProps) {
  const getStatusColor = () => {
    switch (status) {
      case "excellent":
        return "text-green-500"
      case "good":
        return "text-blue-500"
      case "normal":
        return "text-gray-400"
      case "low":
        return "text-yellow-500"
      case "balanced":
        return "text-teal-500"
      default:
        return "text-gray-400"
    }
  }

  return (
    <Card className="health-card border-green-500/30 bg-black/40">
      <CardContent className="pt-6">
        <div className="flex justify-between items-start mb-2">
          <div className="flex items-center">
            {icon}
            <h3 className="font-medium ml-2">{title}</h3>
          </div>
          <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor()} bg-opacity-20 bg-current`}>
            {status}
          </span>
        </div>
        <div className="flex items-baseline mt-4">
          <span className="text-3xl font-bold">{value}</span>
          <span className="ml-1 text-sm text-gray-400">{unit}</span>
        </div>
        <p className="text-xs text-gray-400 mt-2">{description}</p>
      </CardContent>
    </Card>
  )
}

