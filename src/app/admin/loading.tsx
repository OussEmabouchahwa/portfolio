export default function AdminLoading() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Title skeleton */}
      <div className="space-y-2">
        <div className="h-8 w-48 bg-neutral-900 rounded-lg" />
        <div className="h-4 w-72 bg-neutral-900/60 rounded" />
      </div>

      {/* Grid skeleton */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-neutral-900/60 border border-neutral-800/60 rounded-xl p-6 space-y-4">
            <div className="flex justify-between items-center">
              <div className="h-3 w-20 bg-neutral-800 rounded" />
              <div className="h-4 w-4 bg-neutral-800 rounded-full" />
            </div>
            <div className="h-8 w-16 bg-neutral-800 rounded-lg" />
          </div>
        ))}
      </div>

      {/* Content skeleton */}
      <div className="bg-neutral-900/40 border border-neutral-800/60 rounded-2xl p-6 h-64 flex flex-col justify-between">
        <div className="space-y-2">
          <div className="h-5 w-40 bg-neutral-800 rounded" />
          <div className="h-3 w-60 bg-neutral-800/60 rounded" />
        </div>
        <div className="h-32 bg-neutral-950/60 rounded-xl border border-neutral-800/40" />
      </div>
    </div>
  )
}
