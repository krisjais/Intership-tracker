import InternshipForm from "@/components/InternshipForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NewInternshipPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center gap-4">
        <Link href="/internships" className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-200 rounded-full transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Add New Application</h1>
          <p className="text-slate-500 mt-1">Track a new internship opportunity.</p>
        </div>
      </div>
      
      <InternshipForm />
    </div>
  );
}
