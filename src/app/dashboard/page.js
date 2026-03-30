"use client";

import { useEffect, useState } from "react";
import { fetchInternships } from "@/lib/api";
import { Briefcase, Calendar, CheckCircle, XCircle } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

export default function DashboardPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
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
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full min-h-[50vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-indigo-200 border-t-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[50vh] text-center">
        <XCircle className="w-12 h-12 text-red-500 mb-4" />
        <h3 className="text-lg font-semibold text-slate-900">Failed to load dashboard</h3>
        <p className="text-slate-500 mt-2 max-w-sm">There was an error communicating with the backend API. Ensure it is running on port 5001.</p>
      </div>
    );
  }

  const totalApplied = data.length;
  const interviews = data.filter((d) => d.status === "Interview").length;
  const offers = data.filter((d) => d.status === "Offer").length;
  const rejected = data.filter((d) => d.status === "Rejected").length;
  const appliedOnly = data.filter((d) => d.status === "Applied").length;

  const pieData = [
    { name: "Applied", value: appliedOnly, color: "#9ca3af" },
    { name: "Interview", value: interviews, color: "#eab308" },
    { name: "Offer", value: offers, color: "#22c55e" },
    { name: "Rejected", value: rejected, color: "#ef4444" },
  ].filter((d) => d.value > 0);

  const stats = [
    { label: "Total Applications", value: totalApplied, icon: Briefcase, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Interviews", value: interviews, icon: Calendar, color: "text-amber-500", bg: "bg-amber-50" },
    { label: "Offers", value: offers, icon: CheckCircle, color: "text-green-600", bg: "bg-green-50" },
    { label: "Rejected", value: rejected, icon: XCircle, color: "text-red-600", bg: "bg-red-50" },
  ];

  const recentActivity = [...data]
    .sort((a, b) => new Date(b.updatedAt || b.dateApplied || 0) - new Date(a.updatedAt || a.dateApplied || 0))
    .slice(0, 5);

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Dashboard</h1>
          <p className="text-slate-500 mt-1">Here's an overview of your internship hunt.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4 transition-transform hover:scale-[1.02]">
              <div className={`p-4 rounded-xl ${stat.bg}`}>
                <Icon className={`w-7 h-7 ${stat.color}`} />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Status Breakdown */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm lg:col-span-1">
          <h2 className="text-lg font-semibold text-slate-900 mb-6">Application Status</h2>
          <div className="h-64">
            {totalApplied === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-slate-400 gap-2">
                <Briefcase className="w-8 h-8 opacity-50" />
                <p className="text-sm">No data available</p>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    innerRadius={70}
                    outerRadius={90}
                    paddingAngle={3}
                    dataKey="value"
                    stroke="none"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip wrapperClassName="rounded-xl border-none shadow-lg text-sm" />
                  <Legend iconType="circle" />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm lg:col-span-2">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Recent Activity</h2>
          {recentActivity.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-48 py-12 text-slate-400 gap-2">
              <Calendar className="w-8 h-8 opacity-50" />
              <p className="text-sm">No recent activity found.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {recentActivity.map((item) => (
                <div key={item._id} className="flex items-center justify-between p-4 bg-slate-50 border border-slate-100 rounded-xl hover:bg-slate-100 transition-colors">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-slate-900 truncate pr-4">{item.company}</h3>
                    <p className="text-sm text-slate-500 truncate">{item.role}</p>
                  </div>
                  <div className="text-right flex-shrink-0 flex flex-col items-end">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${
                      item.status === "Offer" ? "bg-green-50 text-green-700 border-green-200" :
                      item.status === "Interview" ? "bg-amber-50 text-amber-700 border-amber-200" :
                      item.status === "Rejected" ? "bg-red-50 text-red-700 border-red-200" :
                      "bg-slate-100 text-slate-700 border-slate-200"
                    }`}>
                      {item.status}
                    </span>
                    <div className="text-xs text-slate-400 mt-2 font-medium">
                      {new Date(item.updatedAt || item.dateApplied || Date.now()).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
