import HeatmapChart from './HeatmapChart';
import TrafficHourlyChart from './TrafficHourlyChart';
import KPICard from './KPICard';
import { traficoZonas, traficoPorHora, formatNumber } from '@/data/mockData';
import { AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const OperationalView = () => {
  // Calcular estadísticas operativas
  const zonasSaturadas = traficoZonas.filter(z => z.densidad > 0.8).length;
  const zonasNormales = traficoZonas.filter(z => z.densidad >= 0.4 && z.densidad <= 0.8).length;
  const zonasBajas = traficoZonas.filter(z => z.densidad < 0.4).length;
  
  const permanenciaPromedio = traficoZonas.reduce((sum, z) => sum + z.permanenciaPromedio, 0) / traficoZonas.length;
  
  const traficoMaximo = Math.max(...traficoPorHora.map(t => t.trafico));
  const horasPico = traficoPorHora.filter(t => t.trafico > traficoMaximo * 0.8).length;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Operational KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass-card p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-muted-foreground">Zonas Saturadas</span>
            <AlertTriangle className="w-4 h-4 text-destructive" />
          </div>
          <p className="text-2xl font-bold text-destructive">{zonasSaturadas}</p>
          <p className="text-xs text-muted-foreground mt-1">Densidad &gt;80%</p>
        </div>
        
        <div className="glass-card p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-muted-foreground">Zonas Normales</span>
            <CheckCircle className="w-4 h-4 text-success" />
          </div>
          <p className="text-2xl font-bold text-success">{zonasNormales}</p>
          <p className="text-xs text-muted-foreground mt-1">Densidad 40-80%</p>
        </div>
        
        <div className="glass-card p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-muted-foreground">Permanencia Prom.</span>
            <Clock className="w-4 h-4 text-primary" />
          </div>
          <p className="text-2xl font-bold text-foreground">{permanenciaPromedio.toFixed(0)}</p>
          <p className="text-xs text-muted-foreground mt-1">minutos</p>
        </div>
        
        <div className="glass-card p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-muted-foreground">Horas Pico</span>
            <Badge className="bg-warning/20 text-warning border-0 text-[10px]">Alta Demanda</Badge>
          </div>
          <p className="text-2xl font-bold text-foreground">{horasPico}</p>
          <p className="text-xs text-muted-foreground mt-1">períodos al día</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <HeatmapChart />
        </div>
        
        <div className="space-y-6">
          <TrafficHourlyChart />
          
          {/* Recommendations */}
          <div className="glass-card p-4">
            <h4 className="text-sm font-semibold text-foreground mb-3">Recomendaciones Operativas</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-2 rounded-lg bg-destructive/10 border border-destructive/20">
                <AlertTriangle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs font-medium text-foreground">Refuerzo de Seguridad</p>
                  <p className="text-xs text-muted-foreground">Entrada Principal y Food Court requieren personal adicional en horario 18:00-21:00</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-2 rounded-lg bg-warning/10 border border-warning/20">
                <Clock className="w-4 h-4 text-warning mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs font-medium text-foreground">Limpieza Preventiva</p>
                  <p className="text-xs text-muted-foreground">Programar limpieza adicional en Pasillo Central P1 entre 13:00-14:00</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-2 rounded-lg bg-primary/10 border border-primary/20">
                <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs font-medium text-foreground">Oportunidad Publicitaria</p>
                  <p className="text-xs text-muted-foreground">Zona Ancla Este tiene alto tráfico y baja permanencia - ideal para pantallas digitales</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Zone Distribution */}
      <div className="glass-card p-6">
        <h4 className="text-lg font-semibold text-foreground mb-4">Distribución de Zonas por Densidad</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/20">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-destructive">Alta Densidad (&gt;80%)</span>
              <span className="text-2xl font-bold text-destructive">{zonasSaturadas}</span>
            </div>
            <div className="space-y-1">
              {traficoZonas
                .filter(z => z.densidad > 0.8)
                .map((zona, i) => (
                  <div key={i} className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">{zona.zona}</span>
                    <span className="text-destructive font-medium">{(zona.densidad * 100).toFixed(0)}%</span>
                  </div>
                ))}
            </div>
          </div>
          
          <div className="p-4 rounded-xl bg-warning/10 border border-warning/20">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-warning">Media Densidad (40-80%)</span>
              <span className="text-2xl font-bold text-warning">{zonasNormales}</span>
            </div>
            <div className="space-y-1">
              {traficoZonas
                .filter(z => z.densidad >= 0.4 && z.densidad <= 0.8)
                .slice(0, 4)
                .map((zona, i) => (
                  <div key={i} className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">{zona.zona}</span>
                    <span className="text-warning font-medium">{(zona.densidad * 100).toFixed(0)}%</span>
                  </div>
                ))}
            </div>
          </div>
          
          <div className="p-4 rounded-xl bg-success/10 border border-success/20">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-success">Baja Densidad (&lt;40%)</span>
              <span className="text-2xl font-bold text-success">{zonasBajas}</span>
            </div>
            <div className="space-y-1">
              {traficoZonas
                .filter(z => z.densidad < 0.4)
                .map((zona, i) => (
                  <div key={i} className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">{zona.zona}</span>
                    <span className="text-success font-medium">{(zona.densidad * 100).toFixed(0)}%</span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OperationalView;
