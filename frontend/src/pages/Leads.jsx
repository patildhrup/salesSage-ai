import { LeadsTable } from "../components/leads/LeadsTable";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { Search, Filter, Download } from "lucide-react";

export default function Leads() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Leads</h1>
          <p className="text-brand-gray-500 text-sm">Manage and export your discovered prospects.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="secondary" className="gap-2">
            <Download size={18} /> Export CSV
          </Button>
          <Button className="gap-2">
            <Search size={18} /> Find Leads
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <Input icon={Search} placeholder="Search by name, company, or email..." />
        </div>
        <Button variant="secondary" className="gap-2">
          <Filter size={18} /> Filters
        </Button>
      </div>

      <LeadsTable />
    </div>
  );
}
