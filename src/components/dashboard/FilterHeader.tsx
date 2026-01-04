import { useState } from 'react';
import { Calendar, Filter, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import { categorias, zonas } from '@/data/mockData';
import { format, subDays, startOfMonth, endOfMonth } from 'date-fns';
import { es } from 'date-fns/locale';
import { DateRange } from 'react-day-picker';

interface FilterHeaderProps {
  onFilterChange: (filters: FilterState) => void;
}

export interface FilterState {
  dateRange: DateRange | undefined;
  categoria: string;
  zona: string;
  periodoRapido: string;
}

const FilterHeader = ({ onFilterChange }: FilterHeaderProps) => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: startOfMonth(new Date()),
    to: endOfMonth(new Date()),
  });
  const [categoria, setCategoria] = useState<string>('todas');
  const [zona, setZona] = useState<string>('todas');
  const [periodoRapido, setPeriodoRapido] = useState<string>('mes-actual');

  const handlePeriodoRapido = (periodo: string) => {
    setPeriodoRapido(periodo);
    let newRange: DateRange | undefined;
    
    switch (periodo) {
      case '7-dias':
        newRange = { from: subDays(new Date(), 7), to: new Date() };
        break;
      case '30-dias':
        newRange = { from: subDays(new Date(), 30), to: new Date() };
        break;
      case '90-dias':
        newRange = { from: subDays(new Date(), 90), to: new Date() };
        break;
      case 'mes-actual':
        newRange = { from: startOfMonth(new Date()), to: endOfMonth(new Date()) };
        break;
      case 'año':
        newRange = { from: new Date(new Date().getFullYear(), 0, 1), to: new Date() };
        break;
      default:
        newRange = dateRange;
    }
    
    setDateRange(newRange);
    onFilterChange({ dateRange: newRange, categoria, zona, periodoRapido: periodo });
  };

  const handleCategoriaChange = (value: string) => {
    setCategoria(value);
    onFilterChange({ dateRange, categoria: value, zona, periodoRapido });
  };

  const handleZonaChange = (value: string) => {
    setZona(value);
    onFilterChange({ dateRange, categoria, zona: value, periodoRapido });
  };

  const handleDateChange = (range: DateRange | undefined) => {
    setDateRange(range);
    setPeriodoRapido('personalizado');
    onFilterChange({ dateRange: range, categoria, zona, periodoRapido: 'personalizado' });
  };

  const limpiarFiltros = () => {
    const defaultRange = { from: startOfMonth(new Date()), to: endOfMonth(new Date()) };
    setDateRange(defaultRange);
    setCategoria('todas');
    setZona('todas');
    setPeriodoRapido('mes-actual');
    onFilterChange({ dateRange: defaultRange, categoria: 'todas', zona: 'todas', periodoRapido: 'mes-actual' });
  };

  const activeFiltersCount = [
    categoria !== 'todas' ? 1 : 0,
    zona !== 'todas' ? 1 : 0,
  ].reduce((a, b) => a + b, 0);

  return (
    <div className="glass-card p-4 mb-6">
      <div className="flex flex-wrap items-center gap-3">
        {/* Períodos rápidos */}
        <div className="flex items-center gap-1 bg-secondary/50 rounded-lg p-1">
          {[
            { value: '7-dias', label: '7D' },
            { value: '30-dias', label: '30D' },
            { value: '90-dias', label: '90D' },
            { value: 'mes-actual', label: 'Mes' },
            { value: 'año', label: 'Año' },
          ].map((periodo) => (
            <button
              key={periodo.value}
              onClick={() => handlePeriodoRapido(periodo.value)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                periodoRapido === periodo.value
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
              }`}
            >
              {periodo.label}
            </button>
          ))}
        </div>

        {/* Date Range Picker */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="h-9 gap-2 bg-secondary/50 border-border/50 hover:bg-secondary">
              <Calendar className="w-4 h-4" />
              <span className="text-sm">
                {dateRange?.from ? (
                  dateRange.to ? (
                    <>
                      {format(dateRange.from, 'dd MMM', { locale: es })} -{' '}
                      {format(dateRange.to, 'dd MMM yyyy', { locale: es })}
                    </>
                  ) : (
                    format(dateRange.from, 'dd MMM yyyy', { locale: es })
                  )
                ) : (
                  'Seleccionar fecha'
                )}
              </span>
              <ChevronDown className="w-3 h-3 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 bg-popover border-border" align="start">
            <CalendarComponent
              initialFocus
              mode="range"
              defaultMonth={dateRange?.from}
              selected={dateRange}
              onSelect={handleDateChange}
              numberOfMonths={2}
              className="pointer-events-auto"
            />
          </PopoverContent>
        </Popover>

        <div className="h-6 w-px bg-border/50" />

        {/* Categoría */}
        <Select value={categoria} onValueChange={handleCategoriaChange}>
          <SelectTrigger className="w-[160px] h-9 bg-secondary/50 border-border/50">
            <SelectValue placeholder="Categoría" />
          </SelectTrigger>
          <SelectContent className="bg-popover border-border">
            <SelectItem value="todas">Todas las categorías</SelectItem>
            {categorias.map((cat) => (
              <SelectItem key={cat} value={cat.toLowerCase()}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Zona */}
        <Select value={zona} onValueChange={handleZonaChange}>
          <SelectTrigger className="w-[180px] h-9 bg-secondary/50 border-border/50">
            <SelectValue placeholder="Zona" />
          </SelectTrigger>
          <SelectContent className="bg-popover border-border">
            <SelectItem value="todas">Todas las zonas</SelectItem>
            {zonas.map((z) => (
              <SelectItem key={z} value={z.toLowerCase()}>
                {z}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Filtros activos y limpiar */}
        <div className="flex items-center gap-2 ml-auto">
          {activeFiltersCount > 0 && (
            <Badge variant="secondary" className="bg-primary/20 text-primary border-0">
              <Filter className="w-3 h-3 mr-1" />
              {activeFiltersCount} filtro{activeFiltersCount > 1 ? 's' : ''}
            </Badge>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={limpiarFiltros}
            className="h-8 text-xs text-muted-foreground hover:text-foreground"
          >
            <X className="w-3 h-3 mr-1" />
            Limpiar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FilterHeader;
