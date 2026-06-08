import { Button } from "../ui/Button";
import { motion } from "framer-motion";
import { ChevronRight, Play } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-20 pb-32 lg:pt-32 lg:pb-48">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -z-10 w-full max-w-4xl h-[500px] bg-brand-orange/10 blur-[120px] rounded-full opacity-50"></div>
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-orange/20 bg-brand-orange/5 px-3 py-1 text-sm font-medium text-brand-orange mb-8">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-orange opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-orange"></span>
            </span>
            New: Prospeo Integration Live
          </span>
          
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-7xl mb-6">
            One Domain In.<br />
            <span className="text-brand-orange">Thousands of Leads Out.</span>
          </h1>
          
          <p className="mx-auto max-w-2xl text-lg text-brand-gray-400 mb-10">
            The ultimate AI-powered outreach engine. Find similar companies, extract decision makers, verify emails, and send personalized campaigns—all on autopilot.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="w-full sm:w-auto gap-2">
              Start Automation <ChevronRight size={18} />
            </Button>
            <Button variant="secondary" size="lg" className="w-full sm:w-auto gap-2">
              <Play size={18} fill="currentColor" /> Watch Demo
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
