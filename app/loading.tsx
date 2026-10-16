export default function Loading() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6">
      <div className="w-16 h-16 relative flex items-center justify-center">
        <div className="absolute inset-0 rounded-full border-4 border-slate-100 border-t-blue-700 animate-spin" />
        <span className="w-3 h-3 rounded-full bg-blue-700 animate-ping" />
      </div>
      <div className="mt-6 text-center space-y-2">
        <p className="text-xs uppercase tracking-widest font-semibold text-slate-500">
          Sri Aurobindo School, Bhopal
        </p>
        <p className="text-sm font-medium text-slate-800">
          Loading Institutional Campus...
        </p>
      </div>
    </div>
  );
}
