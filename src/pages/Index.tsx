import { useState, Suspense, lazy } from 'react';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import FilterHeader, { FilterState } from '@/components/dashboard/FilterHeader';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Loader2 } from 'lucide-react';

const FinancialView = lazy(() => import('@/components/dashboard/FinancialView'));
const EfficiencyView = lazy(() => import('@/components/dashboard/EfficiencyView'));
const OperationalView = lazy(() => import('@/components/dashboard/OperationalView'));

type ViewType = 'financiero' | 'eficiencia' | 'operativo';

const Index = () => {
  const [currentView, setCurrentView] = useState<ViewType>('financiero');
  const [filters, setFilters] = useState<FilterState>({
    dateRange: undefined,
    categoria: 'todas',
    zona: 'todas',
    tienda: 'todas',
    periodoRapido: 'mes-actual',
  });

  const lastUpdate = format(new Date(), "dd MMM yyyy, HH:mm", { locale: es });

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
    console.log('Filtros aplicados:', newFilters);
  };

  const renderView = () => {
    switch (currentView) {
      case 'financiero':
        return <FinancialView filters={filters} />;
      case 'eficiencia':
        return <EfficiencyView filters={filters} />;
      case 'operativo':
        return <OperationalView filters={filters} />;
      default:
        return <FinancialView filters={filters} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Background gradient */}
      <div className="fixed inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent pointer-events-none" />

      <div className="relative container mx-auto px-4 py-6 max-w-[1600px]">
        <DashboardHeader
          currentView={currentView}
          onViewChange={setCurrentView}
          lastUpdate={lastUpdate}
        />

        <FilterHeader onFilterChange={handleFilterChange} />

        <main>
          <Suspense fallback={
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="flex flex-col items-center gap-2">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="text-muted-foreground text-sm">Cargando visualización...</p>
              </div>
            </div>
          }>
            {renderView()}
          </Suspense>
        </main>

        {/* Footer */}
        <footer className="mt-8 pt-6 border-t border-border/30">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-4">
              <span>© 2025 Mall Analytics</span>
              <span className="hidden md:inline">•</span>
              <span>Dashboard de Business Intelligence</span>
            </div>
            <div className="flex items-center gap-4">
              <span>Zona horaria: America/Lima (UTC-5)</span>
              <span>•</span>
              <span>Moneda: Soles (S/)</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
