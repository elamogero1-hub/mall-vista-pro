import { TrendingUp, TrendingDown, Minus, Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Area, AreaChart, ResponsiveContainer } from 'recharts';

interface KPICardProps {
  title: string;
  value: string;
  unit?: string;
  change: number;
  trend: 'up' | 'down' | 'neutral';
  sparkline?: number[];
  benchmark?: number;
  benchmarkLabel?: string;
  tooltip?: string;
  variant?: 'default' | 'hero' | 'compact';
}

const KPICard = ({
  title,
  value,
  unit,
  change,
  trend,
  sparkline,
  benchmark,
  benchmarkLabel,
  tooltip,
  variant = 'default',
}: KPICardProps) => {
  const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Minus;
  
  const trendBadgeClass = 
    trend === 'up' ? 'trend-badge-up' : 
    trend === 'down' ? 'trend-badge-down' : 
    'trend-badge-neutral';

  const sparklineData = sparkline?.map((value, index) => ({ value, index }));

  const chartColor = trend === 'up' ? 'hsl(var(--success))' : 
                     trend === 'down' ? 'hsl(var(--destructive))' : 
                     'hsl(var(--primary))';

  if (variant === 'hero') {
    return (
      <div className="glass-card-hover p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent rounded-full -translate-y-1/2 translate-x-1/2" />
        
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
            {tooltip && (
              <Tooltip>
                <TooltipTrigger>
                  <Info className="w-3.5 h-3.5 text-muted-foreground/60 hover:text-primary transition-colors" />
                </TooltipTrigger>
                <TooltipContent className="max-w-xs bg-popover border-border">
                  <p className="text-sm">{tooltip}</p>
                </TooltipContent>
              </Tooltip>
            )}
          </div>
          <span className={trendBadgeClass}>
            <TrendIcon className="w-3 h-3" />
            {Math.abs(change).toFixed(1)}%
          </span>
        </div>

        <div className="flex items-end gap-2 mb-4">
          <span className="kpi-value">{value}</span>
          {unit && <span className="text-lg text-muted-foreground mb-1">{unit}</span>}
        </div>

        {benchmark && (
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
            <span>Meta: {benchmarkLabel || benchmark}</span>
            <div className="flex-1 h-1.5 bg-secondary rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-500"
                style={{ width: `${Math.min((parseFloat(value.replace(/[^0-9.]/g, '')) / benchmark) * 100, 100)}%` }}
              />
            </div>
          </div>
        )}

        {sparkline && sparkline.length > 0 && (
          <div className="h-12 -mx-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={sparklineData}>
                <defs>
                  <linearGradient id={`gradient-${title}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={chartColor} stopOpacity={0.3} />
                    <stop offset="100%" stopColor={chartColor} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke={chartColor}
                  strokeWidth={2}
                  fill={`url(#gradient-${title})`}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className="glass-card p-4 flex items-center justify-between">
        <div>
          <h3 className="text-xs font-medium text-muted-foreground mb-1">{title}</h3>
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-bold text-foreground">{value}</span>
            {unit && <span className="text-sm text-muted-foreground">{unit}</span>}
          </div>
        </div>
        <span className={trendBadgeClass}>
          <TrendIcon className="w-3 h-3" />
          {Math.abs(change).toFixed(1)}%
        </span>
      </div>
    );
  }

  return (
    <div className="glass-card-hover p-5">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
          {tooltip && (
            <Tooltip>
              <TooltipTrigger>
                <Info className="w-3.5 h-3.5 text-muted-foreground/60 hover:text-primary transition-colors" />
              </TooltipTrigger>
              <TooltipContent className="max-w-xs bg-popover border-border">
                <p className="text-sm">{tooltip}</p>
              </TooltipContent>
            </Tooltip>
          )}
        </div>
        <span className={trendBadgeClass}>
          <TrendIcon className="w-3 h-3" />
          {Math.abs(change).toFixed(1)}%
        </span>
      </div>

      <div className="flex items-baseline gap-2">
        <span className="text-2xl font-bold text-foreground">{value}</span>
        {unit && <span className="text-sm text-muted-foreground">{unit}</span>}
      </div>

      {sparkline && sparkline.length > 0 && (
        <div className="h-8 mt-3 -mx-1">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={sparklineData}>
              <Area
                type="monotone"
                dataKey="value"
                stroke={chartColor}
                strokeWidth={1.5}
                fill="transparent"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default KPICard;
