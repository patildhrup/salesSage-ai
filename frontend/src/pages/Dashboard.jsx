import { StatCard } from "../components/dashboard/StatCard";
import { PipelineStatus } from "../components/dashboard/PipelineStatus";
import { LeadsTable } from "../components/leads/LeadsTable";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Globe, Plus } from "lucide-react";
import { stats } from "../data/mockData";

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <p className="text-brand-gray-500 text-sm">Welcome back, John. Here's what's happening today.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex-1 md:w-64">
            <Input icon={Globe} placeholder="Enter company domain..." />
          </div>
          <Button className="gap-2 shrink-0">
            <Plus size={18} /> Start Pipeline
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-3">
          <PipelineStatus />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">Recent Leads</h2>
          <Button variant="ghost" size="sm">View all leads</Button>
        </div>
        <LeadsTable />
      </div>
    </div>
  );
}
