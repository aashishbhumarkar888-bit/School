import Link from "next/link";
import { Compass, ArrowRight } from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] bg-[#FCFBF9] text-slate-900 flex items-center justify-center p-6 text-center">
      <div className="max-w-md space-y-6">
        <div className="w-16 h-16 mx-auto rounded-3xl bg-sky-50 border border-sky-200 text-sky-700 flex items-center justify-center shadow-xs">
          <Compass className="w-8 h-8" />
        </div>

        <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-amber-50 border border-amber-200 text-amber-800">
          Error 404 · Destination Not Found
        </span>

        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900">
          The Path Has Shifted
        </h1>

        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          The requested page or document could not be located on the Sri Aurobindo School server.
          Please check the URL or return to our homepage.
        </p>

        <div className="pt-2">
          <Link href="/">
            <MagneticButton variant="primary" className="px-6 py-3 text-xs font-bold shadow-md">
              <span>Return to Homepage</span>
              <ArrowRight className="w-4 h-4" />
            </MagneticButton>
          </Link>
        </div>
      </div>
    </div>
  );
}
