
import { useMemo } from 'react';
import { tiendasMarketing } from '@/data/marketingData';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { FilterState } from './FilterHeader';
import { Badge } from '@/components/ui/badge';

interface MarketingStoresTableProps {
  filters: FilterState;
}

const MarketingStoresTable = ({ filters }: MarketingStoresTableProps) => {
  // Filtrar tiendas según los filtros globales
  const filteredStores = useMemo(() => {
    return tiendasMarketing.filter(t => {
      const matchCategoria = filters.categoria === 'todas' || t.categoria.toLowerCase() === filters.categoria;
      const matchZona = filters.zona === 'todas' || t.zona.toLowerCase() === filters.zona;
      const matchTienda = filters.tienda === 'todas' || t.nombre.toLowerCase() === filters.tienda;
      return matchCategoria && matchZona && matchTienda;
    });
  }, [filters]);
  
  return (
    <div className="glass-card animate-fade-in h-full overflow-hidden flex flex-col">
      <div className="p-6 pb-2">
        <h3 className="text-lg font-semibold text-foreground">Detalle por Tienda</h3>
        <p className="text-xs text-muted-foreground">Rendimiento de conversión digital</p>
      </div>
      
      <div className="flex-1 overflow-auto">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent border-border/50">
              <TableHead>Tienda</TableHead>
              <TableHead>Categoría</TableHead>
              <TableHead className="text-right">% Conv. Digital</TableHead>
              <TableHead className="text-right">Atracción Digital</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStores.map((tienda) => (
              <TableRow key={tienda.id} className="hover:bg-muted/50 border-border/50 transition-colors">
                <TableCell className="font-medium text-foreground">{tienda.nombre}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="bg-secondary/50 text-muted-foreground border-border/50 font-normal">
                    {tienda.categoria}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <span className={tienda.conversionDigital > 5 ? "text-success font-medium" : "text-muted-foreground"}>
                    {tienda.conversionDigital.toFixed(1)}%
                  </span>
                </TableCell>
                <TableCell className="text-right font-mono">
                  {tienda.indiceAtraccion.toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
            
            {filteredStores.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center text-muted-foreground">
                  No se encontraron resultados
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default MarketingStoresTable;
