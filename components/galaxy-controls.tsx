"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Settings, X, RotateCcw } from "lucide-react"

interface GalaxyControlsProps {
  params: {
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
  onChange: (params: any) => void
}

export function GalaxyControls({ params, onChange }: GalaxyControlsProps) {
  const [isOpen, setIsOpen] = useState(false)

  const updateParam = (key: string, value: number | string) => {
    onChange({ ...params, [key]: value })
  }

  const resetToDefaults = () => {
    onChange({
      count: 100000,
      size: 0.01,
      radius: 5,
      branches: 4,
      spin: 1,
      randomness: 0.2,
      randomnessPower: 3,
      insideColor: "#ff6030",
      outsideColor: "#1b3984",
    })
  }

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 rounded-full w-12 h-12 p-0"
        variant="secondary"
      >
        <Settings className="w-5 h-5" />
      </Button>
    )
  }

  return (
    <Card className="fixed bottom-4 right-4 w-80 max-h-[80vh] overflow-y-auto bg-black/80 backdrop-blur-sm border-gray-700">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-white text-sm">Galaxy Controls</CardTitle>
        <div className="flex gap-2">
          <Button
            onClick={resetToDefaults}
            size="sm"
            variant="ghost"
            className="h-8 w-8 p-0 text-gray-400 hover:text-white"
          >
            <RotateCcw className="w-4 h-4" />
          </Button>
          <Button
            onClick={() => setIsOpen(false)}
            size="sm"
            variant="ghost"
            className="h-8 w-8 p-0 text-gray-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label className="text-white text-xs">Stars Count: {params.count.toLocaleString()}</Label>
          <Slider
            value={[params.count]}
            onValueChange={([value]) => updateParam("count", value)}
            min={10000}
            max={200000}
            step={10000}
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-white text-xs">Star Size: {params.size.toFixed(3)}</Label>
          <Slider
            value={[params.size]}
            onValueChange={([value]) => updateParam("size", value)}
            min={0.001}
            max={0.1}
            step={0.001}
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-white text-xs">Galaxy Radius: {params.radius}</Label>
          <Slider
            value={[params.radius]}
            onValueChange={([value]) => updateParam("radius", value)}
            min={1}
            max={20}
            step={0.1}
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-white text-xs">Spiral Arms: {params.branches}</Label>
          <Slider
            value={[params.branches]}
            onValueChange={([value]) => updateParam("branches", value)}
            min={2}
            max={8}
            step={1}
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-white text-xs">Spiral Intensity: {params.spin.toFixed(1)}</Label>
          <Slider
            value={[params.spin]}
            onValueChange={([value]) => updateParam("spin", value)}
            min={-5}
            max={5}
            step={0.1}
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-white text-xs">Randomness: {params.randomness.toFixed(2)}</Label>
          <Slider
            value={[params.randomness]}
            onValueChange={([value]) => updateParam("randomness", value)}
            min={0}
            max={2}
            step={0.01}
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-white text-xs">Randomness Power: {params.randomnessPower}</Label>
          <Slider
            value={[params.randomnessPower]}
            onValueChange={([value]) => updateParam("randomnessPower", value)}
            min={1}
            max={10}
            step={0.1}
            className="w-full"
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-2">
            <Label className="text-white text-xs">Core Color</Label>
            <input
              type="color"
              value={params.insideColor}
              onChange={(e) => updateParam("insideColor", e.target.value)}
              className="w-full h-8 rounded border-gray-600 bg-transparent"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-white text-xs">Edge Color</Label>
            <input
              type="color"
              value={params.outsideColor}
              onChange={(e) => updateParam("outsideColor", e.target.value)}
              className="w-full h-8 rounded border-gray-600 bg-transparent"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
