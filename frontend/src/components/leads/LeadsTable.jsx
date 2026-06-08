import { Card } from "../ui/Card";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { ExternalLink, Mail, MoreHorizontal } from "lucide-react";
import { leads } from "../../data/mockData";

export function LeadsTable() {
  return (
    <Card className="overflow-hidden p-0">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-brand-gray-800 bg-brand-gray-900/50">
              <th className="px-6 py-4 text-xs font-semibold text-brand-gray-400 uppercase tracking-wider">Company</th>
              <th className="px-6 py-4 text-xs font-semibold text-brand-gray-400 uppercase tracking-wider">Contact</th>
              <th className="px-6 py-4 text-xs font-semibold text-brand-gray-400 uppercase tracking-wider">Position</th>
              <th className="px-6 py-4 text-xs font-semibold text-brand-gray-400 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-xs font-semibold text-brand-gray-400 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-gray-800">
            {leads.map((lead) => (
              <tr key={lead.id} className="hover:bg-brand-gray-800/30 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-white">{lead.company}</span>
                    <span className="text-xs text-brand-gray-500 flex items-center gap-1 mt-0.5">
                      <ExternalLink size={12} /> Website
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-brand-gray-200">{lead.name}</span>
                    <span className="text-xs text-brand-gray-500">{lead.email}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-brand-gray-400">{lead.position}</span>
                </td>
                <td className="px-6 py-4">
                  <Badge variant={lead.status.toLowerCase() === 'failed' ? 'failed' : lead.status.toLowerCase() === 'processing' ? 'processing' : 'success'}>
                    {lead.status}
                  </Badge>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Mail size={16} />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MoreHorizontal size={16} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="px-6 py-4 border-t border-brand-gray-800 flex items-center justify-between">
        <p className="text-xs text-brand-gray-500">Showing 5 of 1,284 leads</p>
        <div className="flex gap-2">
          <Button variant="secondary" size="sm" disabled>Previous</Button>
          <Button variant="secondary" size="sm">Next</Button>
        </div>
      </div>
    </Card>
  );
}
