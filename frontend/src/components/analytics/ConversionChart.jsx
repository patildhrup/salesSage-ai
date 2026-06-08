import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { Card } from "../ui/Card";
import { chartData } from "../../data/mockData";

export function ConversionChart() {
  return (
    <Card className="h-[400px] flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Campaign Performance</h3>
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-brand-orange"></div>
            <span className="text-xs text-brand-gray-400">Emails Sent</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-brand-gray-500"></div>
            <span className="text-xs text-brand-gray-400">Replies</span>
          </div>
        </div>
      </div>
      
      <div className="flex-1 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="colorSent" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#FF6B00" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#FF6B00" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#262626" vertical={false} />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#737373', fontSize: 12 }}
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#737373', fontSize: 12 }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1A1A1A', 
                border: '1px solid #262626',
                borderRadius: '8px',
                color: '#FFF'
              }}
              itemStyle={{ color: '#FF6B00' }}
            />
            <Area 
              type="monotone" 
              dataKey="sent" 
              stroke="#FF6B00" 
              strokeWidth={2}
              fillOpacity={1} 
              fill="url(#colorSent)" 
            />
            <Area 
              type="monotone" 
              dataKey="replies" 
              stroke="#737373" 
              strokeWidth={2}
              fill="transparent" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
