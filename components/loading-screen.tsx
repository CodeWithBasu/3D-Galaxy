"use client"

export function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
        <p className="text-white text-lg">Loading Galaxy...</p>
        <p className="text-gray-400 text-sm mt-2">Generating stars and cosmic structures</p>
      </div>
    </div>
  )
}
