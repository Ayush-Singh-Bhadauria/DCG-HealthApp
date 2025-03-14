"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  FileText,
  Download,
  Share2,
  Calendar,
  TrendingUp,
  TrendingDown,
  Minus,
  ChevronDown,
  ChevronUp,
} from "lucide-react"

interface Report {
  id: number
  title: string
  date: string
  type: string
  metrics: {
    name: string
    value: string
    unit: string
    status: "normal" | "high" | "low"
    change: number
  }[]
}

const reports: Report[] = [
  {
    id: 1,
    title: "Comprehensive Health Assessment",
    date: "March 10, 2025",
    type: "comprehensive",
    metrics: [
      { name: "Vata", value: "40", unit: "%", status: "normal", change: 0 },
      { name: "Pitta", value: "35", unit: "%", status: "normal", change: -5 },
      { name: "Kapha", value: "25", unit: "%", status: "normal", change: 5 },
      { name: "Heart Rate", value: "72", unit: "bpm", status: "normal", change: -2 },
      { name: "Blood Pressure", value: "118/78", unit: "mmHg", status: "normal", change: 0 },
      { name: "Sleep Quality", value: "7.5", unit: "hrs", status: "normal", change: 0.5 },
      { name: "Stress Level", value: "32", unit: "%", status: "normal", change: -8 },
    ],
  },
  {
    id: 2,
    title: "Dosha Balance Analysis",
    date: "February 15, 2025",
    type: "dosha",
    metrics: [
      { name: "Vata", value: "42", unit: "%", status: "normal", change: 2 },
      { name: "Pitta", value: "40", unit: "%", status: "high", change: 8 },
      { name: "Kapha", value: "18", unit: "%", status: "low", change: -10 },
    ],
  },
  {
    id: 3,
    title: "Stress & Sleep Assessment",
    date: "January 20, 2025",
    type: "stress",
    metrics: [
      { name: "Stress Level", value: "40", unit: "%", status: "high", change: 15 },
      { name: "Sleep Quality", value: "6.5", unit: "hrs", status: "low", change: -1 },
      { name: "Recovery Rate", value: "65", unit: "%", status: "low", change: -10 },
      { name: "Meditation Minutes", value: "15", unit: "min/day", status: "low", change: -5 },
    ],
  },
  {
    id: 4,
    title: "Nutritional Analysis",
    date: "December 5, 2024",
    type: "nutrition",
    metrics: [
      { name: "Protein Intake", value: "75", unit: "g/day", status: "normal", change: 5 },
      { name: "Fiber Intake", value: "22", unit: "g/day", status: "low", change: -3 },
      { name: "Hydration", value: "2.1", unit: "L/day", status: "normal", change: 0.3 },
      { name: "Antioxidant Score", value: "78", unit: "%", status: "normal", change: 8 },
    ],
  },
]

export default function HealthReports() {
  const [expandedReport, setExpandedReport] = useState<number | null>(1)
  const [activeTab, setActiveTab] = useState("all")

  const filteredReports = reports.filter((report) => {
    if (activeTab === "all") return true
    return report.type === activeTab
  })

  const toggleReport = (id: number) => {
    if (expandedReport === id) {
      setExpandedReport(null)
    } else {
      setExpandedReport(id)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "normal":
        return "text-green-500"
      case "high":
        return "text-red-500"
      case "low":
        return "text-yellow-500"
      default:
        return "text-gray-400"
    }
  }

  const getChangeIcon = (change: number) => {
    if (change > 0) return <TrendingUp className="h-4 w-4 text-green-500" />
    if (change < 0) return <TrendingDown className="h-4 w-4 text-red-500" />
    return <Minus className="h-4 w-4 text-gray-400" />
  }

  return (
    <div>
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full mb-6">
        <TabsList className="grid grid-cols-5 bg-black/40">
          <TabsTrigger value="all" className="data-[state=active]:bg-green-500/20">
            All Reports
          </TabsTrigger>
          <TabsTrigger value="comprehensive" className="data-[state=active]:bg-green-500/20">
            Comprehensive
          </TabsTrigger>
          <TabsTrigger value="dosha" className="data-[state=active]:bg-green-500/20">
            Dosha Balance
          </TabsTrigger>
          <TabsTrigger value="stress" className="data-[state=active]:bg-green-500/20">
            Stress & Sleep
          </TabsTrigger>
          <TabsTrigger value="nutrition" className="data-[state=active]:bg-green-500/20">
            Nutrition
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="space-y-4">
        {filteredReports.map((report) => (
          <Card key={report.id} className="health-card border-green-500/30 bg-black/40 overflow-hidden">
            <div
              className="p-4 cursor-pointer flex justify-between items-center"
              onClick={() => toggleReport(report.id)}
            >
              <div className="flex items-center">
                <FileText className="h-5 w-5 mr-3 text-green-500" />
                <div>
                  <h3 className="font-medium">{report.title}</h3>
                  <div className="flex items-center text-sm text-gray-400">
                    <Calendar className="h-3 w-3 mr-1" />
                    <span>{report.date}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <Button variant="ghost" size="icon" className="mr-1" onClick={(e) => e.stopPropagation()}>
                  <Download className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="mr-2" onClick={(e) => e.stopPropagation()}>
                  <Share2 className="h-4 w-4" />
                </Button>
                {expandedReport === report.id ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
              </div>
            </div>

            {expandedReport === report.id && (
              <CardContent className="border-t border-green-500/30 pt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {report.metrics.map((metric, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center p-3 rounded-lg bg-black/40 border border-green-500/20"
                    >
                      <div>
                        <h4 className="text-sm font-medium">{metric.name}</h4>
                        <div className="flex items-center mt-1">
                          <span className={`text-lg font-bold ${getStatusColor(metric.status)}`}>{metric.value}</span>
                          <span className="text-xs text-gray-400 ml-1">{metric.unit}</span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className={`text-xs ${getStatusColor(metric.status)}`}>{metric.status}</span>
                        <div className="flex items-center mt-1">
                          {getChangeIcon(metric.change)}
                          <span className="text-xs ml-1">
                            {metric.change > 0 ? "+" : ""}
                            {metric.change}
                            {metric.unit}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 p-4 rounded-lg bg-black/40 border border-green-500/20">
                  <h4 className="font-medium mb-2">Recommendations</h4>
                  <ul className="text-sm text-gray-400 space-y-2">
                    <li className="flex items-start">
                      <span className="h-1.5 w-1.5 rounded-full bg-green-500 mt-1.5 mr-2"></span>
                      <span>Continue with your current Ayurvedic diet plan to maintain dosha balance.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="h-1.5 w-1.5 rounded-full bg-green-500 mt-1.5 mr-2"></span>
                      <span>Increase meditation practice to 20 minutes daily for better stress management.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="h-1.5 w-1.5 rounded-full bg-green-500 mt-1.5 mr-2"></span>
                      <span>Consider adding Ashwagandha supplement to support sleep quality.</span>
                    </li>
                  </ul>
                </div>

                <Button className="mt-4 w-full bg-green-500 hover:bg-green-600">View Full Report</Button>
              </CardContent>
            )}
          </Card>
        ))}
      </div>
    </div>
  )
}

