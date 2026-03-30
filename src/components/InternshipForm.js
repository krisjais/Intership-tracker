"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createInternship, updateInternship } from "@/lib/api";
import toast from "react-hot-toast";
import Link from "next/link";
import { Save, X, Building2, Briefcase, Calendar, Link as LinkIcon, FileText } from "lucide-react";

export default function InternshipForm({ initialData = null }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const isEditing = !!initialData;

  const [formData, setFormData] = useState({
    company: initialData?.company || "",
    role: initialData?.role || "",
    status: initialData?.status || "Applied",
    dateApplied: initialData?.dateApplied ? new Date(initialData.dateApplied).toISOString().substring(0, 10) : "",
    deadline: initialData?.deadline ? new Date(initialData.deadline).toISOString().substring(0, 10) : "",
    url: initialData?.url || "",
    notes: initialData?.notes || "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.company.trim()) newErrors.company = "Company name is required";
    if (!formData.role.trim()) newErrors.role = "Role is required";
    if (formData.url && !/^https?:\/\/.+/.test(formData.url)) {
      newErrors.url = "Please enter a valid URL (e.g. https://example.com)";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      if (isEditing) {
        await updateInternship(initialData._id, formData);
        toast.success("Internship updated successfully");
      } else {
        await createInternship(formData);
        toast.success("Internship application added");
      }
      router.push("/internships");
      router.refresh();
    } catch (err) {
      console.error("Form submit error", err);
      toast.error(isEditing ? "Failed to update internship" : "Failed to add internship");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="p-6 sm:p-8 space-y-6">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-slate-400" />
              Company Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="e.g. Google, Apple"
              className={`w-full px-4 py-2.5 rounded-xl border ${errors.company ? 'border-red-300 focus:ring-red-500/20 focus:border-red-500' : 'border-slate-300 focus:ring-indigo-500/20 focus:border-indigo-500'} bg-slate-50 focus:bg-white transition-colors outline-none focus:ring-2`}
            />
            {errors.company && <p className="text-xs text-red-500 mt-1">{errors.company}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-slate-400" />
              Role / Position <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="role"
              value={formData.role}
              onChange={handleChange}
              placeholder="e.g. Frontend Engineer Intern"
              className={`w-full px-4 py-2.5 rounded-xl border ${errors.role ? 'border-red-300 focus:ring-red-500/20 focus:border-red-500' : 'border-slate-300 focus:ring-indigo-500/20 focus:border-indigo-500'} bg-slate-50 focus:bg-white transition-colors outline-none focus:ring-2`}
            />
            {errors.role && <p className="text-xs text-red-500 mt-1">{errors.role}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2 relative">
            <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
              Status <span className="text-red-500">*</span>
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-indigo-500/20 focus:border-indigo-500 bg-slate-50 focus:bg-white transition-colors outline-none focus:ring-2 appearance-none"
            >
              <option value="Applied">Applied</option>
              <option value="Interview">Interview</option>
              <option value="Offer">Offer</option>
              <option value="Rejected">Rejected</option>
            </select>
            <div className="absolute right-4 top-10 pointer-events-none text-slate-400">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-slate-400" />
              Date Applied
            </label>
            <input
              type="date"
              name="dateApplied"
              value={formData.dateApplied}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-indigo-500/20 focus:border-indigo-500 bg-slate-50 focus:bg-white transition-colors outline-none focus:ring-2 text-slate-700"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-slate-400" />
              Application Deadline
            </label>
            <input
              type="date"
              name="deadline"
              value={formData.deadline}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-indigo-500/20 focus:border-indigo-500 bg-slate-50 focus:bg-white transition-colors outline-none focus:ring-2 text-slate-700"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
            <LinkIcon className="w-4 h-4 text-slate-400" />
            Job Posting URL
          </label>
          <input
            type="url"
            name="url"
            value={formData.url}
            onChange={handleChange}
            placeholder="https://..."
            className={`w-full px-4 py-2.5 rounded-xl border ${errors.url ? 'border-red-300 focus:ring-red-500/20 focus:border-red-500' : 'border-slate-300 focus:ring-indigo-500/20 focus:border-indigo-500'} bg-slate-50 focus:bg-white transition-colors outline-none focus:ring-2`}
          />
          {errors.url && <p className="text-xs text-red-500 mt-1">{errors.url}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
            <FileText className="w-4 h-4 text-slate-400" />
            Notes
          </label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows={4}
            placeholder="Any additional details, interview notes, etc..."
            className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-indigo-500/20 focus:border-indigo-500 bg-slate-50 focus:bg-white transition-colors outline-none focus:ring-2 resize-y"
          ></textarea>
        </div>
      </div>
      
      <div className="bg-slate-50 border-t border-slate-200 p-6 flex items-center justify-end gap-3">
        <Link href="/internships" className="px-5 py-2.5 rounded-xl font-medium text-slate-600 hover:bg-slate-200 transition-colors flex items-center gap-2 border border-transparent">
          <X className="w-4 h-4" /> Cancel
        </Link>
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2.5 rounded-xl font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-sm shadow-indigo-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {loading ? (
            <div className="w-4 h-4 border-2 border-white/50 border-t-white rounded-full animate-spin"></div>
          ) : (
            <Save className="w-4 h-4" />
          )}
          {isEditing ? "Save Changes" : "Save Application"}
        </button>
      </div>
    </form>
  );
}
