'use client';
import React, { useState, useMemo, useCallback, ReactNode, useEffect } from 'react';
import {
  ChevronDown,
  ChevronUp,
  ChevronsUpDown,
  MoreHorizontal,
  Search,
  X,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Loader2,
  Filter,
  Download,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Types
export interface Column {
  key: string;
  label: string;
  sortable?: boolean;
  className?: string;
  cellClassName?: string;
  render?: (value: any, row: any) => ReactNode;
}

export interface Action {
  label: string;
  icon: ReactNode;
  onClick: (row: any) => void;
  variant?: 'default' | 'destructive';
}

export interface FilterOption {
  label: string;
  value: string;
}

export interface FilterConfig {
  key: string;
  label: string;
  placeholder?: string;
  options: FilterOption[];
  defaultValue?: string;
  allOptionsLabel?: string;
}

interface SortConfig {
  key: string | null;
  direction: 'asc' | 'desc' | null;
}

interface TableContextType {
  columns: Column[];
  data: any[];
  selectedRows: (string | number)[];
  sortConfig: SortConfig;
  searchTerm: string;
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  totalItems: number;
  enableRowSelection: boolean;
  enableMultiSelect: boolean;
  enablePagination: boolean;
  backendPagination: boolean;
  actions: Action[];
  onRowClick: ((row: any) => void) | null;
  emptyMessage: string;
  filters: Record<string, string>;
  filterConfigs: FilterConfig[];
  isLoading?: boolean;
  handleSort: (key: string) => void;
  handleSelectRow: (rowId: string | number) => void;
  handleSelectAll: () => void;
  clearSelection: () => void;
  setSearchTerm: (term: string) => void;
  clearSearch: () => void;
  setCurrentPage: (page: number | ((prev: number) => number)) => void;
  setItemsPerPage: (limit: number) => void;
  setFilter: (key: string, value: string) => void;
  clearFilters: () => void;
}

// Table Context
const TableContext = React.createContext<TableContextType | undefined>(undefined);

const useTable = (): TableContextType => {
  const context = React.useContext(TableContext);
  if (!context) {
    throw new Error('useTable must be used within TableProvider');
  }
  return context;
};

// Table Provider Component
export const TableProvider: React.FC<{
  columns: Column[];
  data: any[];
  enableRowSelection?: boolean;
  enableMultiSelect?: boolean;
  enablePagination?: boolean;
  itemsPerPage?: number;
  actions?: Action[];
  onRowClick?: ((row: any) => void) | null;
  emptyMessage?: string;
  isLoading?: boolean;
  backendPagination?: boolean;
  totalItems?: number;
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  onItemsPerPageChange?: (limit: number) => void;
  onSearchChange?: (search: string) => void;
  searchValue?: string;
  filterConfigs?: FilterConfig[];
  filters?: Record<string, string>;
  onFilterChange?: (filters: Record<string, string>) => void;
  onSelectionChange?: (selectedIds: (string | number)[]) => void;
  children: ReactNode;
}> = ({
  columns = [],
  data = [],
  enableRowSelection = false,
  enableMultiSelect = false,
  enablePagination = true,
  itemsPerPage: initialItemsPerPage = 10,
  actions = [],
  onRowClick = null,
  emptyMessage = 'No data available',
  isLoading = false,
  backendPagination = false,
  totalItems = 0,
  currentPage: externalCurrentPage = 1,
  totalPages: externalTotalPages = 1,
  onPageChange,
  onItemsPerPageChange,
  onSearchChange,
  searchValue = '',
  filterConfigs = [],
  filters: externalFilters = {},
  onFilterChange,
  onSelectionChange,
  children,
}) => {
  const [selectedRows, setSelectedRows] = useState<(string | number)[]>([]);
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: null,
    direction: null,
  });

  const [internalSearchTerm, setInternalSearchTerm] = useState<string>('');
  const [internalCurrentPage, setInternalCurrentPage] = useState<number>(1);
  const [internalItemsPerPage, setInternalItemsPerPage] = useState<number>(initialItemsPerPage);
  const [internalFilters, setInternalFilters] = useState<Record<string, string>>({});

  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchValue);

  const searchTerm = backendPagination ? searchValue : internalSearchTerm;
  const currentPage = backendPagination ? externalCurrentPage : internalCurrentPage;
  const itemsPerPage = backendPagination ? initialItemsPerPage : internalItemsPerPage;
  const filters = backendPagination ? externalFilters : internalFilters;

  useEffect(() => {
    if (!backendPagination || !onSearchChange) return;

    const timer = setTimeout(() => {
      if (searchValue !== debouncedSearchTerm) {
        setDebouncedSearchTerm(searchValue);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchValue, backendPagination, onSearchChange, debouncedSearchTerm]);

  const sortedData = useMemo(() => {
    if (backendPagination || !sortConfig.key || !data?.length) return data || [];

    return [...data].sort((a, b) => {
      const aValue = a?.[sortConfig.key!];
      const bValue = b?.[sortConfig.key!];

      if (aValue == null && bValue == null) return 0;
      if (aValue == null) return 1;
      if (bValue == null) return -1;

      const aStr = String(aValue).toLowerCase();
      const bStr = String(bValue).toLowerCase();

      if (aStr < bStr) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aStr > bStr) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [data, sortConfig, backendPagination]);

  const filteredData = useMemo(() => {
    if (backendPagination) return data || [];

    let result = sortedData || [];

    if (searchTerm?.trim()) {
      const searchLower = searchTerm.toLowerCase().trim();
      result = result.filter((row) => {
        if (!row) return false;
        return columns.some((col) => {
          const value = row[col.key];
          if (value == null) return false;
          return String(value).toLowerCase().includes(searchLower);
        });
      });
    }

    if (filters && Object.keys(filters).length > 0) {
      result = result.filter((row) => {
        if (!row) return false;
        return Object.entries(filters).every(([key, value]) => {
          if (!value) return true;
          const rowValue = row[key];
          if (rowValue == null) return false;
          return String(rowValue).toLowerCase() === value.toLowerCase();
        });
      });
    }

    return result;
  }, [sortedData, searchTerm, filters, columns, backendPagination, data]);

  const paginatedData = useMemo(() => {
    if (backendPagination) return data || [];
    if (!enablePagination || !filteredData?.length) return filteredData || [];

    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredData, currentPage, itemsPerPage, enablePagination, backendPagination, data]);

  const totalPagesCalculated = backendPagination
    ? externalTotalPages
    : enablePagination && filteredData?.length
      ? Math.ceil(filteredData.length / itemsPerPage)
      : 1;

  const handleSort = useCallback(
    (key: string) => {
      if (backendPagination) {
        return;
      }
      setSortConfig((prev) => ({
        key,
        direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
      }));
    },
    [backendPagination]
  );

  const handleSelectRow = useCallback(
    (rowId: string | number) => {
      if (!rowId) return;

      if (enableMultiSelect) {
        setSelectedRows((prev) => {
          const newSelection = prev.includes(rowId)
            ? prev.filter((id) => id !== rowId)
            : [...prev, rowId];

          if (onSelectionChange) {
            onSelectionChange(newSelection);
          }

          return newSelection;
        });
      } else {
        setSelectedRows([rowId]);
        if (onSelectionChange) {
          onSelectionChange([rowId]);
        }
      }
    },
    [enableMultiSelect, onSelectionChange]
  );

  const handleSelectAll = useCallback(() => {
    const currentData = paginatedData;
    if (!currentData?.length) return;

    const allIds = currentData.map((row) => row?.id).filter(Boolean);

    if (selectedRows.length === allIds.length && allIds.length > 0) {
      setSelectedRows([]);
      if (onSelectionChange) {
        onSelectionChange([]);
      }
    } else {
      setSelectedRows(allIds);
      if (onSelectionChange) {
        onSelectionChange(allIds);
      }
    }
  }, [paginatedData, selectedRows.length, onSelectionChange]);

  const clearSelection = useCallback(() => {
    setSelectedRows([]);
    if (onSelectionChange) {
      onSelectionChange([]);
    }
  }, [onSelectionChange]);

  const clearSearch = useCallback(() => {
    if (backendPagination && onSearchChange) {
      onSearchChange('');
    } else {
      setInternalSearchTerm('');
    }
  }, [backendPagination, onSearchChange]);

  const handleSetSearchTerm = useCallback(
    (term: string) => {
      if (backendPagination && onSearchChange) {
        onSearchChange(term);
      } else {
        setInternalSearchTerm(term);
        setInternalCurrentPage(1);
      }
    },
    [backendPagination, onSearchChange]
  );

  const handleSetCurrentPage = useCallback(
    (page: number | ((prev: number) => number)) => {
      const newPage = typeof page === 'function' ? page(currentPage) : page;

      if (backendPagination && onPageChange) {
        onPageChange(newPage);
      } else {
        setInternalCurrentPage(newPage);
      }
    },
    [backendPagination, onPageChange, currentPage]
  );

  const handleSetItemsPerPage = useCallback(
    (limit: number) => {
      if (backendPagination && onItemsPerPageChange) {
        onItemsPerPageChange(limit);
      } else {
        setInternalItemsPerPage(limit);
        setInternalCurrentPage(1);
      }
    },
    [backendPagination, onItemsPerPageChange]
  );

  const handleSetFilter = useCallback(
    (key: string, value: string) => {
      if (backendPagination && onFilterChange) {
        const newFilters = { ...filters, [key]: value };
        if (!value) {
          delete newFilters[key];
        }
        onFilterChange(newFilters);
      } else {
        setInternalFilters((prev) => {
          const newFilters = { ...prev, [key]: value };
          if (!value) {
            delete newFilters[key];
          }
          return newFilters;
        });
        setInternalCurrentPage(1);
      }
    },
    [backendPagination, onFilterChange, filters]
  );

  const handleClearFilters = useCallback(() => {
    if (backendPagination && onFilterChange) {
      onFilterChange({});
    } else {
      setInternalFilters({});
      setInternalCurrentPage(1);
    }
  }, [backendPagination, onFilterChange]);

  const value: TableContextType = {
    columns,
    data: paginatedData,
    selectedRows,
    sortConfig,
    searchTerm,
    currentPage,
    totalPages: totalPagesCalculated,
    itemsPerPage,
    totalItems: backendPagination ? totalItems : filteredData.length,
    enableRowSelection,
    enableMultiSelect,
    enablePagination,
    backendPagination,
    actions,
    onRowClick,
    emptyMessage,
    filters,
    filterConfigs,
    isLoading,
    handleSort,
    handleSelectRow,
    handleSelectAll,
    clearSelection,
    setSearchTerm: handleSetSearchTerm,
    clearSearch,
    setCurrentPage: handleSetCurrentPage,
    setItemsPerPage: handleSetItemsPerPage,
    setFilter: handleSetFilter,
    clearFilters: handleClearFilters,
  };

  return <TableContext.Provider value={value}>{children}</TableContext.Provider>;
};

// Table Toolbar Component
export const TableToolbar: React.FC<{
  placeholder?: string;
  showFilters?: boolean;
  onExportClick?: () => void;
}> = ({ placeholder = 'Search...', showFilters = true, onExportClick }) => {
  const {
    searchTerm,
    setSearchTerm,
    clearSearch,
    selectedRows,
    clearSelection,
    enablePagination,
    itemsPerPage,
    setItemsPerPage,
    filters,
    setFilter,
    clearFilters,
    filterConfigs,
  } = useTable();

  const hasActiveFilters = Object.keys(filters).some((key) => filters[key]);

  console.log(hasActiveFilters);
  console.log(filters);
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-4 flex-1">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            <Input
              placeholder={placeholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value || '')}
              className="pl-10 pr-10"
            />
            {searchTerm && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
                onClick={clearSearch}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>

          {/* Export Button */}
          {onExportClick && (
            <Button
              onClick={onExportClick}
              variant="ghost"
              className="gap-1.5 cursor-pointer btn btn-link"
            >
              <Download className="h-3.5 w-3.5" />
              Export Excel File
            </Button>
          )}
        </div>

        {showFilters && filterConfigs && filterConfigs.length > 0 && (
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Filter className="h-4 w-4" />
              <span className="font-medium">Filters:</span>
            </div>
            {filterConfigs.map((config) => (
              <Select
                key={config.key}
                value={filters[config.key] || 'all'}
                onValueChange={(value) => {
                  const normalizedValue = value ?? 'all';
                  setFilter(config.key, normalizedValue === 'all' ? '' : normalizedValue);
                }}
              >
                <SelectTrigger className="w-[180px] cursor-pointer">
                  <SelectValue placeholder={config.placeholder || config.label} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all" className="cursor-pointer">
                    {config.allOptionsLabel || 'All'}
                  </SelectItem>
                  {config.options.map((option) => (
                    <SelectItem className="cursor-pointer" key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ))}
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="h-9 px-3 cursor-pointer"
              >
                <X className="h-4 w-4 mr-1" />
                Clear Filters
              </Button>
            )}
          </div>
        )}

        {enablePagination && (
          <div className="flex items-center gap-2">
            {selectedRows.length > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  {selectedRows.length} selected
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearSelection}
                  className="h-9 px-3 cursor-pointer"
                >
                  <X className="h-4 w-4 mr-1" />
                  Clear Selected
                </Button>
              </div>
            )}
            <Select
              value={itemsPerPage.toString()}
              onValueChange={(value) => {
                const pageSize = Number.parseInt(value ?? '10', 10);
                if (!Number.isNaN(pageSize)) {
                  setItemsPerPage(pageSize);
                }
              }}
            >
              <SelectTrigger className="w-full sm:w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 per page</SelectItem>
                <SelectItem value="2">2 per page</SelectItem>
                <SelectItem value="3">3 per page</SelectItem>
                <SelectItem value="5">5 per page</SelectItem>
                <SelectItem value="10">10 per page</SelectItem>
                <SelectItem value="20">20 per page</SelectItem>
                <SelectItem value="50">50 per page</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
      </div>
    </div>
  );
};

// Main Data Table Component
export const DataTable: React.FC = () => {
  const {
    columns,
    data,
    selectedRows,
    sortConfig,
    enableRowSelection,
    enableMultiSelect,
    actions,
    onRowClick,
    emptyMessage,
    isLoading,
    handleSort,
    handleSelectRow,
    handleSelectAll,
  } = useTable();

  const hasActions = actions && actions.length > 0;
  const totalColumns = columns.length + (enableRowSelection ? 1 : 0) + (hasActions ? 1 : 0);

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            {enableRowSelection && (
              <TableHead className="w-12">
                {enableMultiSelect && data?.length > 0 && !isLoading && (
                  <Checkbox
                    checked={data.length > 0 && selectedRows.length === data.length}
                    onCheckedChange={handleSelectAll}
                    aria-label="Select all rows"
                  />
                )}
              </TableHead>
            )}
            {columns.map((column) => (
              <TableHead key={column.key} className={column.className || ''}>
                <div
                  className={`flex items-center gap-2 ${
                    column.sortable !== false
                      ? 'cursor-pointer select-none hover:text-foreground'
                      : ''
                  }`}
                  onClick={() => column.sortable !== false && handleSort(column.key)}
                >
                  {column.label}
                  {column.sortable !== false && (
                    <span className="text-muted-foreground">
                      {sortConfig.key === column.key ? (
                        sortConfig.direction === 'asc' ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )
                      ) : (
                        <ChevronsUpDown className="h-4 w-4 opacity-50" />
                      )}
                    </span>
                  )}
                </div>
              </TableHead>
            ))}
            {hasActions && <TableHead className="w-24">Actions</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={totalColumns} className="text-center py-12">
                <div className="flex flex-col items-center justify-center gap-3">
                  <Loader2 className="h-8 w-8  animate-spin text-indigo-600" />
                  <p className="text-muted-foreground text-sm">Loading data...</p>
                </div>
              </TableCell>
            </TableRow>
          ) : !data || data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={totalColumns} className="text-center py-12 text-muted-foreground">
                {emptyMessage}
              </TableCell>
            </TableRow>
          ) : (
            data.map((row) => {
              if (!row?.id) return null;

              return (
                <TableRow
                  key={row.id}
                  className={`${onRowClick ? 'cursor-pointer' : ''} ${
                    selectedRows.includes(row.id) ? 'bg-muted/50' : ''
                  }`}
                  onClick={() => onRowClick && onRowClick(row)}
                >
                  {enableRowSelection && (
                    <TableCell>
                      <Checkbox
                        checked={selectedRows.includes(row.id)}
                        onCheckedChange={() => handleSelectRow(row.id)}
                        onClick={(e) => e.stopPropagation()}
                        aria-label={`Select row ${row.id}`}
                      />
                    </TableCell>
                  )}
                  {columns.map((column) => (
                    <TableCell key={column.key} className={column.cellClassName || ''}>
                      {column.render
                        ? column.render(row[column.key], row)
                        : (row[column.key] ?? '-')}
                    </TableCell>
                  ))}
                  {hasActions && (
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 cursor-pointer"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Open actions menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-52">
                          <DropdownMenuItem className="">Quick Actions</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          {actions.map((action, idx) => (
                            <DropdownMenuItem
                              key={idx}
                              onClick={(e) => {
                                e.stopPropagation();
                                action.onClick?.(row);
                              }}
                              className={
                                action.variant === 'destructive'
                                  ? 'text-destructive focus:text-destructive cursor-pointer'
                                  : 'cursor-pointer'
                              }
                            >
                              <span className="flex items-center gap-2">
                                {action.icon}
                                {action.label}
                              </span>
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  )}
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </div>
  );
};

// Table Pagination Component
export const TablePagination: React.FC = () => {
  const {
    currentPage,
    totalPages,
    setCurrentPage,
    totalItems,
    itemsPerPage,
    enablePagination,
    isLoading,
  } = useTable();

  if (!enablePagination || totalItems === 0) {
    return null;
  }

  const startIndex = (currentPage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(currentPage * itemsPerPage, totalItems);

  const getPageNumbers = (): (number | string)[] => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push('...');
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <div className="flex items-center justify-between mt-4 px-2">
      <div className="text-sm text-muted-foreground">
        Showing <span className="font-medium">{startIndex}</span> to{' '}
        <span className="font-medium">{endIndex}</span> of{' '}
        <span className="font-medium">{totalItems}</span> results
      </div>
      <div className="flex items-center gap-1">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage(1)}
          disabled={currentPage === 1 || isLoading}
          className="h-9 w-9 p-0 cursor-pointer"
        >
          <ChevronsLeft className="h-4 w-4" />
          <span className="sr-only">First page</span>
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
          disabled={currentPage === 1 || isLoading}
          className="h-9 cursor-pointer"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Previous
        </Button>
        <div className="flex items-center gap-1 mx-2">
          {getPageNumbers().map((page, idx) => {
            if (page === '...') {
              return (
                <span key={`ellipsis-${idx}`} className="px-2 text-muted-foreground">
                  ...
                </span>
              );
            }

            return (
              <Button
                key={page}
                variant={currentPage === page ? 'default' : 'outline'}
                size="sm"
                onClick={() => setCurrentPage(page as number)}
                disabled={isLoading}
                className={`h-9 min-w-[2.25rem] cursor-pointer ${
                  currentPage === page && 'btn-primary btn'
                }`}
              >
                {page}
              </Button>
            );
          })}
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
          disabled={currentPage === totalPages || isLoading}
          className="h-9 cursor-pointer"
        >
          Next
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage(totalPages)}
          disabled={currentPage === totalPages || isLoading}
          className="h-9 w-9 p-0 cursor-pointer"
        >
          <ChevronsRight className="h-4 w-4" />
          <span className="sr-only">Last page</span>
        </Button>
      </div>
    </div>
  );
};
