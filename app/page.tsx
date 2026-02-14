"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment, Stars } from "@react-three/drei"
import { Suspense, useState } from "react"
import { Galaxy } from "@/components/galaxy"
import { GalaxyControls } from "@/components/galaxy-controls"
import { LoadingScreen } from "@/components/loading-screen"


import { useIsMobile } from "@/hooks/use-mobile"

export default function GalaxyViewer() {
  const isMobile = useIsMobile()
  
  const [galaxyParams, setGalaxyParams] = useState({
    count: isMobile ? 50000 : 100000, // Reduce count for mobile performance
    size: 0.01,
    radius: 5,
    branches: 4,
    spin: 1,
    randomness: 0.2,
    randomnessPower: 3,
    insideColor: "#ff6030",
    outsideColor: "#1b3984",
  })
  
  // Update params if mobile changes (optional, but good for resizing)
  // actually useState initial value only runs once. Let's leave it.

  return (
    <div className="w-full h-screen bg-black relative overflow-hidden">
      <Canvas
        camera={{
          position: isMobile ? [9, 6, 9] : [6, 3, 6], // Further out on mobile
          fov: 75,
          near: 0.1,
          far: 1000,
        }}
        gl={{ antialias: true }}
      >
        <Suspense fallback={null}>
          {/* Lighting */}
          <ambientLight intensity={0.1} />
          <pointLight position={[0, 0, 0]} intensity={0.5} color="#ffffff" />

          {/* Environment */}
          <Environment preset="night" />
          <Stars radius={300} depth={60} count={5000} factor={7} saturation={0} fade />

          {/* Galaxy */}
          <Galaxy {...galaxyParams} />

          {/* Controls */}
          <OrbitControls
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            minDistance={2}
            maxDistance={50}
            autoRotate={false}
            autoRotateSpeed={0.5}
          />
        </Suspense>
      </Canvas>



      {/* UI Controls */}
      <GalaxyControls params={galaxyParams} onChange={setGalaxyParams} />

      {/* Loading Screen */}
      <Suspense fallback={<LoadingScreen />}>
        <div />
      </Suspense>

      {/* Info Panel */}
      <div className="absolute top-4 left-4 text-white bg-black/50 backdrop-blur-sm rounded-lg p-4 max-w-sm border border-white/10 shadow-xl">
        <h1 className="text-xl font-bold mb-2">Milky Way Galaxy Viewer</h1>
        <p className="text-sm text-gray-300 mb-2">
          Explore our galaxy in 3D space with realistic spiral structure and star distribution.
        </p>
        <div className="text-xs text-gray-400">
          <p>• Drag to rotate view</p>
          <p>• Scroll to zoom in/out</p>
          <p>• Right-click + drag to pan</p>
        </div>
      </div>
    </div>
  )
}
