"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar } from "@/components/ui/avatar"
import { Bot, User, Send, Mic, Paperclip } from "lucide-react"

interface Message {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
}

export default function AIChatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm your Ayurvedic AI Health Assistant. How can I help you today?",
      role: "assistant",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [healthData, setHealthData] = useState({})
  const messagesEndRef = useRef<HTMLDivElement>(null)

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
      }
    }
    fetchHealthData()
  }, [])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async () => {
    if (input.trim() === "") return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    try {
      const response = await fetch("http://localhost:3001/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: `User's health details: ${JSON.stringify(healthData)}\nUser query: ${input}`,
        }),
      })

      const result = await response.json()
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: result.response,
        role: "assistant",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, aiMessage])
    } catch (error) {
      console.error("Error communicating with AI service:", error)
    } finally {
      setIsTyping(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <Card className="health-card border-green-500/30 bg-black/40 h-[600px] flex flex-col">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"} mb-4`}>
            {message.role === "assistant" && (
              <Avatar className="h-8 w-8 mr-2">
                <Bot className="h-5 w-5" />
              </Avatar>
            )}

            <div
              className={`max-w-[80%] px-4 py-2 rounded-lg ${
                message.role === "user" ? "chat-bubble-user text-white" : "chat-bubble-ai text-white"
              }`}
            >
              <p>{message.content}</p>
              <div className="text-xs opacity-70 mt-1">
                {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </div>
            </div>

            {message.role === "user" && (
              <Avatar className="h-8 w-8 ml-2">
                <User className="h-5 w-5" />
              </Avatar>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start mb-4">
            <Avatar className="h-8 w-8 mr-2">
              <Bot className="h-5 w-5" />
            </Avatar>
            <div className="chat-bubble-ai px-4 py-2 rounded-lg">
              <div className="flex space-x-1">
                <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "600ms" }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t border-green-500/30">
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon" className="rounded-full">
            <Paperclip className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" className="rounded-full">
            <Mic className="h-4 w-4" />
          </Button>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about your health..."
            className="flex-1 bg-background/50 border-green-500/30 focus-visible:ring-green-500/30"
          />
          <Button onClick={handleSend} size="icon" className="rounded-full bg-green-500 hover:bg-green-600">
            <Send className="h-4 w-4" />
          </Button>
        </div>
        <div className="mt-2 text-xs text-gray-400 text-center">Your conversations are private and secure</div>
      </div>
    </Card>
  )
}
