
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { MESSAGES } from '../constants';

const data = [
  { name: 'Mon', views: 4000 },
  { name: 'Tue', views: 3000 },
  { name: 'Wed', views: 2000 },
  { name: 'Thu', views: 2780 },
  { name: 'Fri', views: 1890 },
  { name: 'Sat', views: 2390 },
  { name: 'Sun', views: 3490 },
];

const AdminDashboard: React.FC = () => {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-black tracking-tight text-white">Overview</h1>
        <p className="text-text-secondary mt-1">Welcome back, Alex. Here's what's happening with your portfolio today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon="visibility" label="Total Views" value="24,532" trend="+12.5%" trendColor="text-green-500" />
        <StatCard icon="folder" label="Active Projects" value="14" trend="0 new" trendColor="text-slate-400" />
        <StatCard icon="mail" label="Unread Messages" value="8" trend="+5 new" trendColor="text-green-500" />
        <StatCard icon="favorite" label="Appreciations" value="1,204" trend="-2.4%" trendColor="text-red-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 bg-surface-dark border border-border-dark rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-white">Profile Analytics</h3>
            <select className="bg-background-dark border-none text-xs font-medium text-text-secondary rounded-lg px-3 py-1.5 focus:ring-1 focus:ring-primary outline-none">
              <option>Last 30 Days</option>
              <option>Last 7 Days</option>
            </select>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#283539" vertical={false} />
                <XAxis dataKey="name" stroke="#9db2b9" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#9db2b9" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1c2427', border: '1px solid #283539', borderRadius: '8px' }}
                  itemStyle={{ color: '#13b6ec' }}
                />
                <Bar dataKey="views" radius={[4, 4, 0, 0]}>
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 3 ? '#13b6ec' : '#13b6ec20'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="bg-surface-dark border border-border-dark rounded-2xl p-6 shadow-sm flex-1">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-white">Recent Messages</h3>
              <button className="text-xs font-bold text-primary">View All</button>
            </div>
            <div className="flex flex-col gap-4">
              {MESSAGES.map((msg) => (
                <div key={msg.id} className="flex items-start gap-3 p-3 rounded-xl hover:bg-background-dark transition-colors cursor-pointer">
                  <img src={msg.avatar} alt={msg.senderName} className="h-10 w-10 rounded-full object-cover shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline">
                      <h4 className="text-sm font-bold text-white truncate">{msg.senderName}</h4>
                      <span className="text-[10px] text-text-secondary">{msg.time}</span>
                    </div>
                    <p className="text-xs text-text-secondary truncate mt-0.5">{msg.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-surface-dark border border-border-dark rounded-2xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-border-dark flex items-center justify-between">
          <h3 className="text-lg font-bold text-white">Recent Activity</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-background-dark/50 text-xs text-text-secondary uppercase tracking-wider">
                <th className="px-6 py-4 font-semibold">Action</th>
                <th className="px-6 py-4 font-semibold">User/Source</th>
                <th className="px-6 py-4 font-semibold">Date</th>
                <th className="px-6 py-4 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-dark text-sm">
              <ActivityRow action="Project Published" source="E-Commerce Redesign" date="2h ago" status="Live" statusColor="text-green-400 bg-green-400/10" />
              <ActivityRow action="New Message" source="Joseph Doe" date="3h ago" status="Pending" statusColor="text-amber-400 bg-amber-400/10" />
              <ActivityRow action="Skill Updated" source="React (Advanced)" date="5h ago" status="Updated" statusColor="text-blue-400 bg-blue-400/10" />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const StatCard: React.FC<any> = ({ icon, label, value, trend, trendColor }) => (
  <div className="bg-surface-dark p-6 rounded-2xl border border-border-dark shadow-sm flex flex-col gap-4">
    <div className="flex items-start justify-between">
      <div className="p-3 bg-primary/10 rounded-xl text-primary">
        <span className="material-symbols-outlined">{icon}</span>
      </div>
      <span className={`text-xs font-bold ${trendColor} bg-white/5 px-2 py-1 rounded-full`}>{trend}</span>
    </div>
    <div>
      <p className="text-sm font-medium text-text-secondary">{label}</p>
      <h3 className="text-2xl font-bold text-white mt-1">{value}</h3>
    </div>
  </div>
);

const ActivityRow: React.FC<any> = ({ action, source, date, status, statusColor }) => (
  <tr className="hover:bg-background-dark transition-colors">
    <td className="px-6 py-4 font-medium text-white">{action}</td>
    <td className="px-6 py-4 text-text-secondary">{source}</td>
    <td className="px-6 py-4 text-text-secondary">{date}</td>
    <td className="px-6 py-4">
      <span className={`px-2 py-1 rounded-full text-xs font-bold ${statusColor}`}>{status}</span>
    </td>
  </tr>
);

export default AdminDashboard;
