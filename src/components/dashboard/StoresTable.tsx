import { useState, useMemo } from 'react';
import { ArrowUpDown, ArrowUp, ArrowDown, Search, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { tiendas, formatCurrency, Tienda } from '@/data/mockData';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { FilterState } from './FilterHeader';

type SortKey = keyof Tienda;
type SortDirection = 'asc' | 'desc' | null;

interface StoresTableProps {
  filters: FilterState;
}

const StoresTable = ({ filters }: StoresTableProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortKey, setSortKey] = useState<SortKey>('ventas');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  // Filtrar tiendas según los filtros globales
  const globalFilteredTiendas = useMemo(() => {
    return tiendas.filter(t => {
      const matchCategoria = filters.categoria === 'todas' || t.categoria.toLowerCase() === filters.categoria;
      const matchZona = filters.zona === 'todas' || t.zona.toLowerCase() === filters.zona;
      const matchTienda = filters.tienda === 'todas' || t.nombre.toLowerCase() === filters.tienda;
      return matchCategoria && matchZona && matchTienda;
    });
  }, [filters]);

  // Promedios para benchmark (basados en tiendas filtradas)
  const avgVentaPorM2 = useMemo(() => {
    const filtered = globalFilteredTiendas.filter(t => t.ventas > 0);
    if (filtered.length === 0) return 0;
    return filtered.reduce((sum, t) => sum + (t.ventas / t.m2), 0) / filtered.length;
  }, [globalFilteredTiendas]);

  const avgConversion = useMemo(() => {
    const filtered = globalFilteredTiendas.filter(t => t.ventas > 0);
    if (filtered.length === 0) return 0;
    return filtered.reduce((sum, t) => sum + t.conversion, 0) / filtered.length;
  }, [globalFilteredTiendas]);

  const avgIndice = useMemo(() => {
    const filtered = globalFilteredTiendas.filter(t => t.ventas > 0);
    if (filtered.length === 0) return 0;
    return filtered.reduce((sum, t) => sum + t.indiceAtraccion, 0) / filtered.length;
  }, [globalFilteredTiendas]);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDirection(prev => 
        prev === 'asc' ? 'desc' : prev === 'desc' ? null : 'asc'
      );
    } else {
      setSortKey(key);
      setSortDirection('desc');
    }
  };

  const SortIcon = ({ columnKey }: { columnKey: SortKey }) => {
    if (sortKey !== columnKey || sortDirection === null) {
      return <ArrowUpDown className="w-3 h-3 text-muted-foreground/50" />;
    }
    return sortDirection === 'asc' 
      ? <ArrowUp className="w-3 h-3 text-primary" /> 
      : <ArrowDown className="w-3 h-3 text-primary" />;
  };

  const filteredAndSortedData = useMemo(() => {
    // Aplicar búsqueda local
    let data = globalFilteredTiendas.filter(t => 
      t.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.categoria.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.zona.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (sortDirection !== null) {
      data = [...data].sort((a, b) => {
        const aValue = a[sortKey];
        const bValue = b[sortKey];
        
        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return sortDirection === 'asc' 
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        }
        
        if (typeof aValue === 'number' && typeof bValue === 'number') {
          return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
        }
        
        return 0;
      });
    }

    return data;
  }, [globalFilteredTiendas, searchTerm, sortKey, sortDirection]);

  const getBenchmarkBadge = (value: number, avg: number, type: 'high-good' | 'low-good' = 'high-good') => {
    if (avg === 0) return null;
    const ratio = value / avg;
    const isGood = type === 'high-good' ? ratio > 1 : ratio < 1;
    const isBad = type === 'high-good' ? ratio < 0.8 : ratio > 1.2;
    
    if (isGood) {
      return (
        <Badge className="bg-success/20 text-success border-0 text-[10px] gap-0.5">
          <TrendingUp className="w-2.5 h-2.5" />
          +{((ratio - 1) * 100).toFixed(0)}%
        </Badge>
      );
    }
    if (isBad) {
      return (
        <Badge className="bg-destructive/20 text-destructive border-0 text-[10px] gap-0.5">
          <TrendingDown className="w-2.5 h-2.5" />
          {((ratio - 1) * 100).toFixed(0)}%
        </Badge>
      );
    }
    return (
      <Badge className="bg-muted text-muted-foreground border-0 text-[10px] gap-0.5">
        <Minus className="w-2.5 h-2.5" />
        Promedio
      </Badge>
    );
  };

  const categoryColors: Record<string, string> = {
    'Moda': 'bg-primary/20 text-primary',
    'Restaurantes': 'bg-warning/20 text-warning',
    'Electrónica': 'bg-purple-500/20 text-purple-400',
    'Entretenimiento': 'bg-success/20 text-success',
    'Hogar': 'bg-orange-500/20 text-orange-400',
    'Belleza': 'bg-pink-500/20 text-pink-400',
    'Deportes': 'bg-cyan-500/20 text-cyan-400',
    'Servicios': 'bg-muted text-muted-foreground',
  };

  const isFiltered = filters.categoria !== 'todas' || filters.zona !== 'todas' || filters.tienda !== 'todas';

  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Benchmark por Tienda</h3>
          <p className="text-sm text-muted-foreground">
            {isFiltered ? `${globalFilteredTiendas.length} tienda(s) filtrada(s)` : 'Comparativa vs. promedio del mall'}
          </p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Buscar tienda..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 w-[200px] h-9 bg-secondary/50 border-border/50"
          />
        </div>
      </div>

      <div className="overflow-auto max-h-[400px] rounded-lg border border-border/50">
        <Table>
          <TableHeader className="sticky top-0 bg-card z-10">
            <TableRow className="border-border/50 hover:bg-transparent">
              <TableHead 
                className="cursor-pointer hover:text-foreground transition-colors"
                onClick={() => handleSort('nombre')}
              >
                <div className="flex items-center gap-1">
                  Tienda
                  <SortIcon columnKey="nombre" />
                </div>
              </TableHead>
              <TableHead 
                className="cursor-pointer hover:text-foreground transition-colors"
                onClick={() => handleSort('categoria')}
              >
                <div className="flex items-center gap-1">
                  Categoría
                  <SortIcon columnKey="categoria" />
                </div>
              </TableHead>
              <TableHead 
                className="cursor-pointer hover:text-foreground transition-colors text-right"
                onClick={() => handleSort('ventas')}
              >
                <div className="flex items-center justify-end gap-1">
                  Ventas
                  <SortIcon columnKey="ventas" />
                </div>
              </TableHead>
              <TableHead className="text-right">Venta/m²</TableHead>
              <TableHead 
                className="cursor-pointer hover:text-foreground transition-colors text-right"
                onClick={() => handleSort('conversion')}
              >
                <div className="flex items-center justify-end gap-1">
                  Conversión
                  <SortIcon columnKey="conversion" />
                </div>
              </TableHead>
              <TableHead 
                className="cursor-pointer hover:text-foreground transition-colors text-right"
                onClick={() => handleSort('indiceAtraccion')}
              >
                <div className="flex items-center justify-end gap-1">
                  Í. Atracción
                  <SortIcon columnKey="indiceAtraccion" />
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAndSortedData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  No hay tiendas que coincidan con los filtros
                </TableCell>
              </TableRow>
            ) : (
              filteredAndSortedData.map((tienda) => {
                const ventaPorM2 = tienda.ventas / tienda.m2;
                return (
                  <TableRow 
                    key={tienda.id} 
                    className="border-border/30 hover:bg-secondary/30 transition-colors"
                  >
                    <TableCell className="font-medium text-foreground">
                      {tienda.nombre}
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant="secondary" 
                        className={`${categoryColors[tienda.categoria] || 'bg-muted text-muted-foreground'} border-0 text-[10px]`}
                      >
                        {tienda.categoria}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      {formatCurrency(tienda.ventas)}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <span className="text-sm">S/{ventaPorM2.toFixed(0)}</span>
                        {getBenchmarkBadge(ventaPorM2, avgVentaPorM2)}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <span className="text-sm">{tienda.conversion.toFixed(1)}%</span>
                        {getBenchmarkBadge(tienda.conversion, avgConversion)}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <span className="text-sm">{tienda.indiceAtraccion.toFixed(2)}</span>
                        {getBenchmarkBadge(tienda.indiceAtraccion, avgIndice)}
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between mt-4 pt-4 border-t border-border/50 text-xs text-muted-foreground">
        <span>Mostrando {filteredAndSortedData.length} de {globalFilteredTiendas.length} tiendas</span>
        <div className="flex items-center gap-4">
          <span>Promedio Venta/m²: S/{avgVentaPorM2.toFixed(0)}</span>
          <span>Promedio Conversión: {avgConversion.toFixed(1)}%</span>
        </div>
      </div>
    </div>
  );
};

export default StoresTable;