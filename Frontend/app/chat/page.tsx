import AIChatbot from "@/components/ai-chatbot"

export default function ChatPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-white">AI Health Assistant</h1>
      <AIChatbot />
    </div>
  )
}

