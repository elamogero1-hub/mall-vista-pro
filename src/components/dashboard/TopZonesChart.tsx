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

interface TopZonesChartProps {
    filters: FilterState;
}

const TopZonesChart = ({ filters }: TopZonesChartProps) => {
    const data = useMemo(() => {
        // Filtrar tiendas primero
        let filteredTiendas = tiendas.filter(t => {
            const matchCategoria = filters.categoria === 'todas' || t.categoria.toLowerCase() === filters.categoria;
            const matchZona = filters.zona === 'todas' || t.zona.toLowerCase() === filters.zona;
            const matchTienda = filters.tienda === 'todas' || t.nombre.toLowerCase() === filters.tienda;
            return matchCategoria && matchZona && matchTienda;
        });

        // Agrupar ventas por zona
        const ventasPorZona: Record<string, number> = {};

        filteredTiendas.forEach(tienda => {
            const zona = tienda.zona;
            ventasPorZona[zona] = (ventasPorZona[zona] || 0) + tienda.ventas;
        });

        // Convertir a array y ordenar
        return Object.entries(ventasPorZona)
            .map(([zona, ventas]) => ({
                nombre: zona,
                ventas: ventas,
            }))
            .sort((a, b) => b.ventas - a.ventas)
            .slice(0, 10);
    }, [filters]);

    const isFiltered = filters.categoria !== 'todas' || filters.zona !== 'todas' || filters.tienda !== 'todas';

    const CustomTooltip = ({ active, payload }: any) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload;
            return (
                <div className="glass-card p-3 border border-border/50">
                    <p className="text-sm font-medium text-foreground mb-1">{data.nombre}</p>
                    <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">Ventas Totales:</span>
                        <span className="text-xs font-medium text-foreground">
                            {formatCurrency(data.ventas)}
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
                <p className="text-muted-foreground">No hay datos para los filtros seleccionados</p>
            </div>
        );
    }

    return (
        <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-lg font-semibold text-foreground">
                        {isFiltered ? 'Top Zonas Filtradas' : 'Top 10 Zonas'}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                        {isFiltered ? 'Por facturación agregada' : 'Ranking de zonas por ventas'}
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
                            width={120}
                        />
                        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'hsl(var(--secondary))', opacity: 0.5 }} />
                        <Bar
                            dataKey="ventas"
                            radius={[0, 4, 4, 0]}
                            animationDuration={500}
                        >
                            {data.map((_, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={`hsl(var(--primary) / ${1 - index * 0.05})`}
                                />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default TopZonesChart;
