import { Card } from "../ui/Card";
import { Badge } from "../ui/Badge";
import { CheckCircle2, Loader2, AlertCircle } from "lucide-react";

const steps = [
  { id: 1, label: "Similar Companies Found", status: "success", count: 1284 },
  { id: 2, label: "Decision Makers Extracted", status: "processing", count: 856 },
  { id: 3, label: "Emails Verified", status: "pending", count: 0 },
  { id: 4, label: "Outreach Sent", status: "pending", count: 0 },
];

export function PipelineStatus() {
  return (
    <Card className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Live Pipeline Progress</h3>
        <Badge variant="processing">Active Pipeline</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {steps.map((step) => (
          <div key={step.id} className="p-4 rounded-xl bg-brand-gray-800/30 border border-brand-gray-800 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              {step.status === "success" && <CheckCircle2 className="text-green-500" size={20} />}
              {step.status === "processing" && <Loader2 className="text-brand-orange animate-spin" size={20} />}
              {step.status === "pending" && <AlertCircle className="text-brand-gray-600" size={20} />}
              <span className="text-xs font-mono text-brand-gray-500">STEP 0{step.id}</span>
            </div>
            <div>
              <p className="text-sm font-medium text-brand-gray-300">{step.label}</p>
              <p className="text-xl font-bold text-white mt-1">{step.count.toLocaleString()}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
