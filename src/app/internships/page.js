"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { fetchInternships, deleteInternship } from "@/lib/api";
import toast from "react-hot-toast";
import { Plus, Search, Filter, Edit, Trash2, MailOpen, CalendarIcon, Briefcase } from "lucide-react";

export default function InternshipsPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const loadData = () => {
    setLoading(true);
    fetchInternships()
      .then((res) => {
        setData(res);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(true);
        setLoading(false);
      });
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDelete = async (id, company) => {
    if (confirm(`Are you sure you want to delete the application for ${company}?`)) {
      try {
        await deleteInternship(id);
        toast.success("Internship deleted successfully");
        setData(data.filter((item) => item._id !== id));
      } catch (err) {
        toast.error("Failed to delete internship");
        console.error(err);
      }
    }
  };

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const matchSearch = item.company.toLowerCase().includes(search.toLowerCase()) || 
                          item.role.toLowerCase().includes(search.toLowerCase());
      const matchStatus = statusFilter === "All" || item.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [data, search, statusFilter]);

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Internships</h1>
          <p className="text-slate-500 mt-1">Manage all your internship applications in one place.</p>
        </div>
        <Link href="/internships/new" className="inline-flex items-center gap-2 bg-indigo-600 text-white font-medium px-5 py-2.5 rounded-xl hover:bg-indigo-700 transition-colors shadow-sm shadow-indigo-200">
          <Plus className="w-5 h-5" />
          Add New
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search by company or role..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-slate-900" 
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 pointer-events-none" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-slate-900 appearance-none font-medium text-sm w-full sm:w-auto min-w-[140px]"
            >
              <option value="All">All Statuses</option>
              <option value="Applied">Applied</option>
              <option value="Interview">Interview</option>
              <option value="Offer">Offer</option>
              <option value="Rejected">Rejected</option>
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg className="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-4 border-indigo-200 border-t-indigo-600 mb-4"></div>
            <p className="text-slate-500">Loading internships...</p>
          </div>
        ) : error ? (
           <div className="flex flex-col items-center justify-center p-20 text-center">
             <div className="w-16 h-16 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center mb-4"><span className="text-3xl font-bold">!</span></div>
             <p className="text-slate-900 font-semibold mb-1">Failed to load data</p>
             <p className="text-slate-500">Could not connect to the backend server.</p>
           </div>
        ) : filteredData.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-20 text-center">
            <div className="w-16 h-16 bg-indigo-50 text-indigo-500 rounded-full flex items-center justify-center mb-4">
              <MailOpen className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">No applications found</h3>
            <p className="text-slate-500 max-w-sm mb-6">
              {data.length === 0 
                ? "You haven't tracked any internships yet. Start applying and add them here!"
                : "No internships match your current search and filter criteria."}
            </p>
            {data.length === 0 && (
              <Link href="/internships/new" className="inline-flex items-center gap-2 bg-white text-indigo-600 border border-indigo-200 font-medium px-4 py-2 rounded-xl hover:bg-indigo-50 transition-colors shadow-sm">
                <Plus className="w-4 h-4" />
                Add Your First Application
              </Link>
            )}
            {data.length > 0 && (
              <button onClick={() => { setSearch(""); setStatusFilter("All"); }} className="text-indigo-600 font-medium hover:underline">
                Clear all filters
              </button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-medium uppercase tracking-wider text-xs">
                <tr>
                  <th scope="col" className="px-6 py-4">Company & Role</th>
                  <th scope="col" className="px-6 py-4">Status</th>
                  <th scope="col" className="px-6 py-4">Date Applied</th>
                  <th scope="col" className="px-6 py-4">Deadline</th>
                  <th scope="col" className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredData.map((item) => (
                  <tr key={item._id} className="hover:bg-slate-50/80 transition-colors group">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center flex-shrink-0 font-bold">
                          {item.company.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div className="font-semibold text-slate-900 text-base">{item.company}</div>
                          <div className="text-slate-500 text-xs flex items-center gap-1 mt-0.5">
                            <Briefcase className="w-3 h-3" />
                            {item.role}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${
                        item.status === "Offer" ? "bg-green-50 text-green-700 border-green-200" :
                        item.status === "Interview" ? "bg-amber-50 text-amber-700 border-amber-200" :
                        item.status === "Rejected" ? "bg-red-50 text-red-700 border-red-200" :
                        "bg-slate-100 text-slate-700 border-slate-200"
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-1.5 text-slate-600">
                        <CalendarIcon className="w-4 h-4 text-slate-400" />
                        {item.dateApplied ? new Date(item.dateApplied).toLocaleDateString() : "Not set"}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-1.5 text-slate-600">
                        {item.deadline ? new Date(item.deadline).toLocaleDateString() : <span className="text-slate-400 italic">No deadline</span>}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-2 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                        <Link 
                          href={`/internships/${item._id}/edit`} 
                          className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors border border-transparent hover:border-indigo-100 bg-white shadow-sm"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button 
                          onClick={() => handleDelete(item._id, item.company)} 
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-100 bg-white shadow-sm"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
