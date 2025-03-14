"use client"

import { useRef, useState, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, useGLTF, Environment, Html } from "@react-three/drei"
import { Badge } from "@/components/ui/badge"
import { Heart, Brain, Zap } from "lucide-react"
import type * as THREE from "three"

function Model({ setHoveredPart }: { setHoveredPart: (part: string | null) => void }) {
  const group = useRef<THREE.Group>(null)
  const { scene } = useGLTF("/assets/3d/duck.glb")

  // Use the duck model as a placeholder for the human body model
  useFrame(() => {
    if (group.current) {
      group.current.rotation.y += 0.005
    }
  })

  return (
    <group ref={group} dispose={null} scale={2}>
      <primitive
        object={scene}
        onPointerOver={() => setHoveredPart("heart")}
        onPointerOut={() => setHoveredPart(null)}
      />

      {/* Health indicators positioned around the model */}
      <Html position={[1, 0.5, 0]} distanceFactor={10}>
        <div className="bg-black/80 p-2 rounded-lg border border-green-500/30 w-24">
          <div className="flex items-center text-red-500 mb-1">
            <Heart className="h-3 w-3 mr-1" />
            <span className="text-xs">Heart</span>
          </div>
          <div className="text-xs text-white">98% optimal</div>
        </div>
      </Html>

      <Html position={[-1, 0.8, 0]} distanceFactor={10}>
        <div className="bg-black/80 p-2 rounded-lg border border-green-500/30 w-24">
          <div className="flex items-center text-purple-500 mb-1">
            <Brain className="h-3 w-3 mr-1" />
            <span className="text-xs">Brain</span>
          </div>
          <div className="text-xs text-white">92% optimal</div>
        </div>
      </Html>

      <Html position={[0, -1, 0]} distanceFactor={10}>
        <div className="bg-black/80 p-2 rounded-lg border border-green-500/30 w-24">
          <div className="flex items-center text-yellow-500 mb-1">
            <Zap className="h-3 w-3 mr-1" />
            <span className="text-xs">Energy</span>
          </div>
          <div className="text-xs text-white">85% optimal</div>
        </div>
      </Html>
    </group>
  )
}

export default function HealthModel() {
  const [hoveredPart, setHoveredPart] = useState<string | null>(null)
  const [pulseEffects, setPulseEffects] = useState<boolean>(true)

  useEffect(() => {
    // Toggle pulse effects every 5 seconds for visual interest
    const interval = setInterval(() => {
      setPulseEffects((prev) => !prev)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative w-full h-full">
      {/* Scanning effect overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className={`absolute inset-0 bg-gradient-to-b from-green-500/5 to-transparent ${pulseEffects ? "animate-pulse-slow" : ""}`}
        ></div>
        <div className="absolute inset-0 border-2 border-green-500/20 rounded-lg"></div>
      </div>

      {/* Information badge */}
      {hoveredPart && (
        <Badge className="absolute top-4 right-4 bg-green-500/20 text-green-400 border-green-500/30">
          Analyzing {hoveredPart}...
        </Badge>
      )}

      {/* 3D Model */}
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />
        <Model setHoveredPart={setHoveredPart} />
        <OrbitControls enableZoom={false} enablePan={false} />
        <Environment preset="studio" />
      </Canvas>
    </div>
  )
}

