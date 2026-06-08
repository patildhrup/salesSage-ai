import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { X, Send, User, AtSign } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function EmailPreviewModal({ isOpen, onClose, lead }) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-black/80 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="w-full max-w-2xl"
        >
          <Card className="relative p-0 overflow-hidden border-brand-gray-700 shadow-2xl">
            <div className="flex items-center justify-between p-4 border-b border-brand-gray-800 bg-brand-gray-900/50">
              <h3 className="text-lg font-semibold text-white">Email Preview</h3>
              <button onClick={onClose} className="text-brand-gray-400 hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <span className="w-12 text-brand-gray-500">To:</span>
                  <div className="flex items-center gap-2 px-2 py-1 rounded-md bg-brand-gray-800 border border-brand-gray-700 text-brand-gray-200">
                    <User size={14} className="text-brand-orange" />
                    {lead.name}
                  </div>
                  <div className="flex items-center gap-2 px-2 py-1 rounded-md bg-brand-gray-800 border border-brand-gray-700 text-brand-gray-200">
                    <AtSign size={14} className="text-brand-orange" />
                    {lead.email}
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <span className="w-12 text-brand-gray-500">Subject:</span>
                  <span className="text-brand-gray-200 font-medium">Scalable outreach for {lead.company}</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-brand-gray-950 border border-brand-gray-800 text-brand-gray-300 font-serif leading-relaxed min-h-[200px]">
                <p>Hi {lead.name.split(' ')[0]},</p>
                <br />
                <p>I noticed {lead.company} is rapidly expanding its sales operations. Most teams at your scale struggle with manual lead sourcing and verification.</p>
                <br />
                <p>We've built a system that automates this entire pipeline—finding similar companies to your best customers and extracting verified decision makers in minutes.</p>
                <br />
                <p>Would you be open to a quick 10-minute chat next Tuesday to see how we could help {lead.company} scale its outreach?</p>
                <br />
                <p>Best,<br />Alex from SalesSage</p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 p-4 border-t border-brand-gray-800 bg-brand-gray-900/50">
              <Button variant="secondary" onClick={onClose}>Cancel</Button>
              <Button className="gap-2">
                <Send size={16} /> Send Test Email
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
