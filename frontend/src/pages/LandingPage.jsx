import { Hero } from "../components/landing/Hero";
import { WorkflowAnimation } from "../components/landing/WorkflowAnimation";

export default function LandingPage() {
  return (
    <div className="flex flex-col">
      <Hero />
      <WorkflowAnimation />
      
      {/* Features Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8" id="features">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-brand-gray-900/50 border border-brand-gray-800 hover:border-brand-orange/30 transition-colors group">
              <div className="h-12 w-12 rounded-xl bg-brand-orange/10 flex items-center justify-center text-brand-orange mb-6 group-hover:bg-brand-orange group-hover:text-white transition-colors">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Instant Discovery</h3>
              <p className="text-brand-gray-400">Find thousands of companies similar to your best customers with one click.</p>
            </div>
            
            <div className="p-8 rounded-2xl bg-brand-gray-900/50 border border-brand-gray-800 hover:border-brand-orange/30 transition-colors group">
              <div className="h-12 w-12 rounded-xl bg-brand-orange/10 flex items-center justify-center text-brand-orange mb-6 group-hover:bg-brand-orange group-hover:text-white transition-colors">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Precision Targeting</h3>
              <p className="text-brand-gray-400">Extract verified decision makers based on role, seniority, and department.</p>
            </div>

            <div className="p-8 rounded-2xl bg-brand-gray-900/50 border border-brand-gray-800 hover:border-brand-orange/30 transition-colors group">
              <div className="h-12 w-12 rounded-xl bg-brand-orange/10 flex items-center justify-center text-brand-orange mb-6 group-hover:bg-brand-orange group-hover:text-white transition-colors">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Automated Outreach</h3>
              <p className="text-brand-gray-400">Send personalized, high-deliverability email campaigns that get replies.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
