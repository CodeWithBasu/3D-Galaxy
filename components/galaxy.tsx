"use client"

import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

interface GalaxyProps {
  count: number
  size: number
  radius: number
  branches: number
  spin: number
  randomness: number
  randomnessPower: number
  insideColor: string
  outsideColor: string

}

export function Galaxy({
  count,
  size,
  radius,
  branches,
  spin,
  randomness,
  randomnessPower,
  insideColor,
  outsideColor,

}: GalaxyProps) {
  const pointsRef = useRef<THREE.Points>(null)

  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)

    const colorInside = new THREE.Color(insideColor)
    const colorOutside = new THREE.Color(outsideColor)

    for (let i = 0; i < count; i++) {
      const i3 = i * 3

      // Position
      const radiusRandom = Math.random() * radius
      const spinAngle = radiusRandom * spin
      const branchAngle = ((i % branches) / branches) * Math.PI * 2

      const randomX =
        Math.pow(Math.random(), randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * randomness * radiusRandom
      const randomY =
        Math.pow(Math.random(), randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * randomness * radiusRandom
      const randomZ =
        Math.pow(Math.random(), randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * randomness * radiusRandom

      positions[i3] = Math.cos(branchAngle + spinAngle) * radiusRandom + randomX
      positions[i3 + 1] = randomY
      positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radiusRandom + randomZ

      // Color
      const mixedColor = colorInside.clone()
      mixedColor.lerp(colorOutside, radiusRandom / radius)

      colors[i3] = mixedColor.r
      colors[i3 + 1] = mixedColor.g
      colors[i3 + 2] = mixedColor.b
    }

    return [positions, colors]
  }, [count, radius, branches, spin, randomness, randomnessPower, insideColor, outsideColor])

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" count={count} array={colors} itemSize={3} args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={size}
        sizeAttenuation={true}
        depthWrite={false}
        vertexColors={true}
        blending={THREE.AdditiveBlending}

      />
    </points>
  )
}
