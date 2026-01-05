import { LayoutDashboard, TrendingUp, Map, RefreshCw, Download, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

type ViewType = 'financiero' | 'eficiencia' | 'operativo' | 'marketing';

interface DashboardHeaderProps {
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
  lastUpdate: string;
}

const DashboardHeader = ({ currentView, onViewChange, lastUpdate }: DashboardHeaderProps) => {
  const views = [
    { id: 'financiero' as ViewType, label: 'Monitor Financiero', icon: LayoutDashboard },
    { id: 'eficiencia' as ViewType, label: 'Eficiencia Comercial', icon: TrendingUp },
    { id: 'operativo' as ViewType, label: 'Control Operativo', icon: Map },
    { id: 'marketing' as ViewType, label: 'Atribución de Marketing', icon: Share2 },
  ];

  return (
    <header className="glass-card px-6 py-4 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        {/* Logo and Title */}
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center shadow-lg">
            <LayoutDashboard className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">Mall Analytics</h1>
            <p className="text-xs text-muted-foreground">Dashboard Ejecutivo de Business Intelligence</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1 p-1 bg-secondary/50 rounded-xl">
          {views.map((view) => {
            const Icon = view.icon;
            const isActive = currentView === view.id;
            return (
              <button
                key={view.id}
                onClick={() => onViewChange(view.id)}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                  ${isActive 
                    ? 'bg-primary text-primary-foreground shadow-lg' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary/80'}
                `}
                style={isActive ? { boxShadow: '0 0 20px hsl(var(--primary) / 0.4)' } : {}}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden md:inline">{view.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <div className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
            <span>Actualizado: {lastUpdate}</span>
          </div>
          
          <Button variant="outline" size="sm" className="h-8 gap-2 bg-secondary/50 border-border/50 hover:bg-secondary">
            <RefreshCw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Actualizar</span>
          </Button>
          
          <Button variant="outline" size="sm" className="h-8 gap-2 bg-secondary/50 border-border/50 hover:bg-secondary">
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Exportar PDF</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
