"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchInternship } from "@/lib/api";
import InternshipForm from "@/components/InternshipForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function EditInternshipPage() {
  const params = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!params?.id) return;
    
    fetchInternship(params.id)
      .then((res) => {
        setData(res);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(true);
        setLoading(false);
      });
  }, [params?.id]);

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center gap-4">
        <Link href="/internships" className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-200 rounded-full transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Edit Application</h1>
          <p className="text-slate-500 mt-1">Update details for this internship.</p>
        </div>
      </div>
      
      {loading ? (
        <div className="flex flex-col items-center justify-center p-20 bg-white rounded-2xl border border-slate-200 shadow-sm">
          <div className="animate-spin rounded-full h-10 w-10 border-4 border-indigo-200 border-t-indigo-600 mb-4"></div>
          <p className="text-slate-500">Loading details...</p>
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center p-20 text-center bg-white rounded-2xl border border-slate-200 shadow-sm">
          <div className="w-16 h-16 bg-red-50 text-red-500 rounded-lg flex items-center justify-center mb-4"><span className="text-3xl font-bold">!</span></div>
          <p className="text-slate-900 font-semibold mb-1">Failed to load data</p>
          <p className="text-slate-500">Could not find internship or connect to the server.</p>
        </div>
      ) : data ? (
        <InternshipForm initialData={data} />
      ) : null}
    </div>
  );
}
