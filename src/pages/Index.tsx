import { useState } from 'react';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import FilterHeader, { FilterState } from '@/components/dashboard/FilterHeader';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

import FinancialView from '@/components/dashboard/FinancialView';
import EfficiencyView from '@/components/dashboard/EfficiencyView';
import OperationalView from '@/components/dashboard/OperationalView';
import MarketingView from '@/components/dashboard/MarketingView';
import ErrorBoundary from '@/components/ErrorBoundary';

type ViewType = 'financiero' | 'eficiencia' | 'operativo' | 'marketing';

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
      case 'marketing':
        return (
          <ErrorBoundary>
            <MarketingView filters={filters} />
          </ErrorBoundary>
        );
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
          {renderView()}
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
