
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { topCampanas, formatCurrency } from '@/data/marketingData';

const MarketingCampaignsChart = () => {
  // Sort by ROI descending
  const data = [...topCampanas].sort((a, b) => a.roi - b.roi); // Recharts renders bottom-up for vertical list usually? Or we use layout="vertical"

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="glass-card p-3 border border-border/50">
          <p className="text-sm font-medium text-foreground mb-2">{data.nombre}</p>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary" />
              <span className="text-xs text-muted-foreground">ROI:</span>
              <span className="text-xs font-medium text-foreground">
                {data.roi}%
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-success" />
              <span className="text-xs text-muted-foreground">Ventas Atrib.:</span>
              <span className="text-xs font-medium text-foreground">
                {formatCurrency(data.ventasAtribuidas)}
              </span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="glass-card p-6 animate-fade-in h-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Top Campañas por ROI</h3>
          <p className="text-xs text-muted-foreground">Retorno estimado sobre la venta física</p>
        </div>
      </div>

      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            layout="vertical"
            data={data}
            margin={{ top: 0, right: 30, left: 40, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="hsl(var(--border))" opacity={0.4} />
            <XAxis type="number" hide />
            <YAxis 
              dataKey="nombre" 
              type="category" 
              width={100}
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'hsl(var(--muted)/0.2)' }} />
            <Bar dataKey="roi" radius={[0, 4, 4, 0]} barSize={20}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={index >= data.length - 3 ? 'hsl(var(--primary))' : 'hsl(var(--primary)/0.5)'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MarketingCampaignsChart;
