import { useState, useMemo, useEffect } from 'react';
import { traficoZonas, TraficoZona } from '@/data/mockData';
import { Badge } from '@/components/ui/badge';
import { Users, Clock, MapPin } from 'lucide-react';
import { FilterState } from './FilterHeader';

interface HeatmapChartProps {
  filters: FilterState;
}

const HeatmapChart = ({ filters }: HeatmapChartProps) => {
  const [selectedZone, setSelectedZone] = useState<TraficoZona | null>(null);

  const isFiltered = filters.zona !== 'todas';

  // Filtrar zonas según el filtro
  const filteredZonas = useMemo(() => {
    if (filters.zona === 'todas') return traficoZonas;
    return traficoZonas.filter(z =>
      z.zona.toLowerCase().includes(filters.zona.split(' - ')[0].toLowerCase()) ||
      filters.zona.toLowerCase().includes(z.zona.split(' ')[0].toLowerCase())
    );
  }, [filters.zona]);

  const getDensityColor = (density: number) => {
    if (density > 0.8) return 'from-red-500/80 to-orange-500/80';
    if (density > 0.6) return 'from-orange-500/70 to-yellow-500/70';
    if (density > 0.4) return 'from-yellow-500/60 to-green-500/60';
    return 'from-green-500/50 to-cyan-500/50';
  };

  const getDensityLabel = (density: number) => {
    if (density > 0.8) return { label: 'Muy Alto', color: 'bg-red-500/20 text-red-400' };
    if (density > 0.6) return { label: 'Alto', color: 'bg-orange-500/20 text-orange-400' };
    if (density > 0.4) return { label: 'Medio', color: 'bg-yellow-500/20 text-yellow-400' };
    return { label: 'Bajo', color: 'bg-green-500/20 text-green-400' };
  };

  // Auto-select zone if only one is filtered
  useEffect(() => {
    if (filteredZonas.length === 1 && selectedZone?.zona !== filteredZonas[0].zona) {
      setSelectedZone(filteredZonas[0]);
    }
  }, [filteredZonas, selectedZone]);

  // Use Memo for auto-select was REMOVED because it causes render loops

  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Mapa de Calor - Tráfico</h3>
          <p className="text-sm text-muted-foreground">
            {isFiltered ? `Mostrando ${filteredZonas.length} zona(s)` : 'Densidad de visitantes por zona'}
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className="text-muted-foreground">Densidad:</span>
          <div className="flex items-center gap-1">
            <div className="w-4 h-2 rounded bg-gradient-to-r from-green-500/50 to-cyan-500/50" />
            <span className="text-muted-foreground">Bajo</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-4 h-2 rounded bg-gradient-to-r from-yellow-500/60 to-green-500/60" />
            <span className="text-muted-foreground">Medio</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-4 h-2 rounded bg-gradient-to-r from-orange-500/70 to-yellow-500/70" />
            <span className="text-muted-foreground">Alto</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-4 h-2 rounded bg-gradient-to-r from-red-500/80 to-orange-500/80" />
            <span className="text-muted-foreground">Muy Alto</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Heatmap Visual */}
        <div className="lg:col-span-2">
          <div className="relative aspect-[4/3] bg-secondary/30 rounded-xl border border-border/30 overflow-hidden">
            {/* Mall floor plan background */}
            <div className="absolute inset-0 opacity-20">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                {/* Outer walls */}
                <rect x="5" y="5" width="90" height="90" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-muted-foreground" />

                {/* Floor divisions */}
                <line x1="5" y1="33" x2="95" y2="33" stroke="currentColor" strokeWidth="0.3" strokeDasharray="2" className="text-muted-foreground/50" />
                <line x1="5" y1="66" x2="95" y2="66" stroke="currentColor" strokeWidth="0.3" strokeDasharray="2" className="text-muted-foreground/50" />

                {/* Central corridor */}
                <rect x="40" y="5" width="20" height="90" fill="none" stroke="currentColor" strokeWidth="0.2" className="text-muted-foreground/30" />

                {/* Anchor stores */}
                <rect x="5" y="30" width="20" height="25" fill="none" stroke="currentColor" strokeWidth="0.3" className="text-muted-foreground/40" />
                <rect x="75" y="30" width="20" height="25" fill="none" stroke="currentColor" strokeWidth="0.3" className="text-muted-foreground/40" />

                {/* Food Court area */}
                <rect x="25" y="10" width="50" height="20" fill="none" stroke="currentColor" strokeWidth="0.3" className="text-muted-foreground/40" />

                {/* Entrance */}
                <rect x="40" y="85" width="20" height="10" fill="none" stroke="currentColor" strokeWidth="0.4" className="text-primary/50" />
              </svg>
            </div>

            {/* Heatmap points */}
            {traficoZonas.map((zona, index) => {
              const isInFilter = filteredZonas.some(fz => fz.zona === zona.zona);
              const size = 12 + zona.densidad * 20;

              return (
                <div
                  key={index}
                  className={`absolute cursor-pointer transition-all duration-300 rounded-full bg-gradient-to-br ${getDensityColor(zona.densidad)} ${isInFilter ? 'blur-sm hover:blur-none' : 'blur-md opacity-20'}`}
                  style={{
                    left: `${zona.x}%`,
                    top: `${zona.y}%`,
                    width: `${size}%`,
                    height: `${size * 0.75}%`,
                    transform: 'translate(-50%, -50%)',
                    opacity: !isInFilter ? 0.15 : selectedZone?.zona === zona.zona ? 1 : 0.7,
                  }}
                  onClick={() => isInFilter && setSelectedZone(zona)}
                />
              );
            })}

            {/* Zone labels */}
            {traficoZonas.map((zona, index) => {
              const isInFilter = filteredZonas.some(fz => fz.zona === zona.zona);
              return (
                <div
                  key={`label-${index}`}
                  className={`absolute text-[10px] font-medium pointer-events-none transition-opacity ${isInFilter ? 'text-foreground/80' : 'text-foreground/20'}`}
                  style={{
                    left: `${zona.x}%`,
                    top: `${zona.y + 8}%`,
                    transform: 'translateX(-50%)',
                  }}
                >
                  {zona.zona.length > 15 ? zona.zona.slice(0, 12) + '...' : zona.zona}
                </div>
              );
            })}
          </div>
        </div>

        {/* Zone Details Panel */}
        <div className="space-y-4">
          <div className="glass-card p-4 bg-secondary/20">
            <h4 className="text-sm font-medium text-foreground mb-3">
              {selectedZone ? selectedZone.zona : 'Selecciona una zona'}
            </h4>

            {selectedZone ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-primary" />
                    <span className="text-xs text-muted-foreground">Densidad</span>
                  </div>
                  <Badge className={getDensityLabel(selectedZone.densidad).color}>
                    {(selectedZone.densidad * 100).toFixed(0)}%
                  </Badge>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-primary" />
                    <span className="text-xs text-muted-foreground">Permanencia Prom.</span>
                  </div>
                  <span className="text-sm font-medium text-foreground">
                    {selectedZone.permanenciaPromedio.toFixed(1)} min
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span className="text-xs text-muted-foreground">Estado</span>
                  </div>
                  <Badge className={getDensityLabel(selectedZone.densidad).color}>
                    {getDensityLabel(selectedZone.densidad).label}
                  </Badge>
                </div>

                <div className="pt-3 border-t border-border/30">
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {selectedZone.densidad > 0.8
                      ? 'Zona de alta afluencia. Considerar refuerzo de personal de limpieza y seguridad.'
                      : selectedZone.densidad > 0.6
                        ? 'Flujo moderado-alto. Zona ideal para publicidad premium.'
                        : selectedZone.densidad > 0.4
                          ? 'Tráfico regular. Potencial para activaciones de marca.'
                          : 'Zona de bajo tráfico. Evaluar estrategias de atracción.'}
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-xs text-muted-foreground">
                Haz clic en cualquier zona del mapa para ver sus métricas detalladas.
              </p>
            )}
          </div>

          {/* Quick Stats */}
          <div className="space-y-2">
            <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Alertas de Capacidad
            </h4>
            {filteredZonas
              .filter(z => z.densidad > 0.8)
              .slice(0, 3)
              .map((zona, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-2 rounded-lg bg-destructive/10 border border-destructive/20"
                >
                  <span className="text-xs text-foreground">{zona.zona}</span>
                  <Badge className="bg-destructive/20 text-destructive border-0 text-[10px]">
                    {(zona.densidad * 100).toFixed(0)}%
                  </Badge>
                </div>
              ))}
            {filteredZonas.filter(z => z.densidad > 0.8).length === 0 && (
              <p className="text-xs text-muted-foreground p-2">No hay zonas saturadas</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeatmapChart;