import { motion } from "framer-motion";
import { 
  Globe, 
  Search, 
  Users, 
  Mail, 
  Send, 
  CheckCircle,
  ArrowDown
} from "lucide-react";

const steps = [
  { label: "Company Domain", icon: Globe, color: "text-blue-400" },
  { label: "Ocean.io", icon: Search, color: "text-cyan-400" },
  { label: "Prospeo", icon: Users, color: "text-purple-400" },
  { label: "Eazyreach", icon: Mail, color: "text-indigo-400" },
  { label: "Brevo", icon: Send, color: "text-green-400" },
  { label: "Emails Sent", icon: CheckCircle, color: "text-brand-orange" },
];

export function WorkflowAnimation() {
  return (
    <section className="py-24 bg-brand-gray-950/50" id="workflow">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">Seamless End-to-End Automation</h2>
          <p className="text-brand-gray-400">Our pipeline handles the heavy lifting while you focus on closing deals.</p>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative">
          {/* Connector Line (Desktop) */}
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-brand-gray-800 -translate-y-1/2 hidden md:block"></div>

          {steps.map((step, index) => (
            <motion.div
              key={step.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="relative z-10 flex flex-col items-center group"
            >
              <div className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-gray-900 border border-brand-gray-800 shadow-xl group-hover:border-brand-orange/50 transition-colors duration-300`}>
                <step.icon className={`${step.color}`} size={28} />
              </div>
              <p className="mt-4 text-sm font-medium text-brand-gray-300">{step.label}</p>
              
              {/* Arrow (Mobile) */}
              {index < steps.length - 1 && (
                <div className="md:hidden mt-4 text-brand-gray-700">
                  <ArrowDown size={24} />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
