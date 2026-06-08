import { ConversionChart } from "../components/analytics/ConversionChart";
import { Card } from "../components/ui/Card";
import { kpis } from "../data/mockData";

export default function Analytics() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white">Analytics</h1>
        <p className="text-brand-gray-500 text-sm">Track your outreach performance and conversion rates.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi) => (
          <Card key={kpi.title} className="flex flex-col gap-2">
            <p className="text-sm text-brand-gray-500 font-medium">{kpi.title}</p>
            <h3 className="text-3xl font-bold text-white" style={{ color: kpi.color === '#FF6B00' ? '#FF6B00' : 'white' }}>
              {kpi.value}
            </h3>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-8">
        <ConversionChart />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="flex flex-col gap-4">
          <h3 className="text-lg font-semibold text-white">Top Performing Domains</h3>
          <div className="space-y-4">
            {[
              { domain: 'vercel.com', rate: '18.4%' },
              { domain: 'stripe.com', rate: '14.2%' },
              { domain: 'linear.app', rate: '12.8%' },
              { domain: 'notion.so', rate: '11.5%' },
            ].map((item) => (
              <div key={item.domain} className="flex items-center justify-between">
                <span className="text-sm text-brand-gray-300">{item.domain}</span>
                <div className="flex items-center gap-4">
                  <div className="w-32 h-2 bg-brand-gray-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-brand-orange rounded-full" 
                      style={{ width: item.rate }}
                    ></div>
                  </div>
                  <span className="text-sm font-bold text-white w-12 text-right">{item.rate}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="flex flex-col gap-4">
          <h3 className="text-lg font-semibold text-white">Best Reply Times</h3>
          <div className="space-y-4">
            {[
              { time: 'Tuesday, 10:00 AM', score: 95 },
              { time: 'Wednesday, 02:00 PM', score: 88 },
              { time: 'Thursday, 11:00 AM', score: 82 },
              { time: 'Monday, 09:00 AM', score: 74 },
            ].map((item) => (
              <div key={item.time} className="flex items-center justify-between">
                <span className="text-sm text-brand-gray-300">{item.time}</span>
                <div className="flex items-center gap-4">
                  <div className="w-32 h-2 bg-brand-gray-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-brand-orange rounded-full" 
                      style={{ width: `${item.score}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-bold text-white w-12 text-right">{item.score}%</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
