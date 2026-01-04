import { useMemo } from 'react';
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
import { tiendas, formatCurrency } from '@/data/mockData';
import { FilterState } from './FilterHeader';

interface TopStoresChartProps {
  filters: FilterState;
}

const TopStoresChart = ({ filters }: TopStoresChartProps) => {
  const categoryColors: Record<string, string> = {
    'Moda': 'hsl(var(--primary))',
    'Restaurantes': 'hsl(var(--warning))',
    'Electrónica': 'hsl(var(--chart-3))',
    'Entretenimiento': 'hsl(var(--success))',
    'Hogar': 'hsl(var(--chart-4))',
    'Belleza': 'hsl(340 80% 60%)',
    'Deportes': 'hsl(var(--chart-1))',
    'Servicios': 'hsl(var(--muted-foreground))',
  };

  const data = useMemo(() => {
    // Filtrar tiendas
    let filtered = tiendas.filter(t => {
      const matchCategoria = filters.categoria === 'todas' || t.categoria.toLowerCase() === filters.categoria;
      const matchZona = filters.zona === 'todas' || t.zona.toLowerCase() === filters.zona;
      const matchTienda = filters.tienda === 'todas' || t.nombre.toLowerCase() === filters.tienda;
      return matchCategoria && matchZona && matchTienda;
    });

    // Ordenar y tomar top 10
    return [...filtered]
      .sort((a, b) => b.ventas - a.ventas)
      .slice(0, 10)
      .map((tienda) => ({
        nombre: tienda.nombre,
        ventas: tienda.ventas,
        categoria: tienda.categoria,
      }));
  }, [filters]);

  const isFiltered = filters.categoria !== 'todas' || filters.zona !== 'todas' || filters.tienda !== 'todas';

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="glass-card p-3 border border-border/50">
          <p className="text-sm font-medium text-foreground mb-1">{data.nombre}</p>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">Ventas:</span>
            <span className="text-xs font-medium text-foreground">
              {formatCurrency(data.ventas)}
            </span>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs text-muted-foreground">Categoría:</span>
            <span 
              className="text-xs font-medium px-1.5 py-0.5 rounded"
              style={{ 
                backgroundColor: `${categoryColors[data.categoria]}20`,
                color: categoryColors[data.categoria]
              }}
            >
              {data.categoria}
            </span>
          </div>
        </div>
      );
    }
    return null;
  };

  if (data.length === 0) {
    return (
      <div className="glass-card p-6 flex items-center justify-center h-[400px]">
        <p className="text-muted-foreground">No hay tiendas que coincidan con los filtros seleccionados</p>
      </div>
    );
  }

  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">
            {isFiltered ? `Top ${Math.min(data.length, 10)} Tiendas Filtradas` : 'Top 10 Tiendas'}
          </h3>
          <p className="text-sm text-muted-foreground">
            {isFiltered ? `${data.length} tienda(s) encontrada(s)` : 'Por facturación mensual'}
          </p>
        </div>
      </div>

      <div className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart 
            data={data} 
            layout="vertical"
            margin={{ top: 0, right: 20, left: 0, bottom: 0 }}
          >
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="hsl(var(--border))" 
              horizontal={false}
            />
            <XAxis
              type="number"
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }}
              tickFormatter={(value) => `S/${(value / 1000).toFixed(0)}K`}
            />
            <YAxis
              type="category"
              dataKey="nombre"
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }}
              width={100}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'hsl(var(--secondary))', opacity: 0.5 }} />
            <Bar 
              dataKey="ventas" 
              radius={[0, 4, 4, 0]}
              animationDuration={500}
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={categoryColors[entry.categoria] || 'hsl(var(--primary))'}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-3 mt-4 pt-4 border-t border-border/50">
        {Object.entries(categoryColors).slice(0, 6).map(([category, color]) => (
          <div key={category} className="flex items-center gap-1.5">
            <div 
              className="w-2.5 h-2.5 rounded-sm"
              style={{ backgroundColor: color }}
            />
            <span className="text-xs text-muted-foreground">{category}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopStoresChart;