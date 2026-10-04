import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Loader2, Download, Calendar } from 'lucide-react';
import { toast } from 'sonner';

// ============================================
// Type Definitions
// ============================================

export interface FilterOption {
  label: string;
  value: string;
}

export interface FilterField {
  id: string;
  label: string;
  type: 'select' | 'text' | 'number';
  placeholder?: string;
  options?: FilterOption[];
  defaultValue?: string;
}

export interface ExportDialogConfig {
  // API Configuration
  apiEndpoint: string; // e.g., "/users/export", "/products/export"
  baseUrl?: string; // Optional: Override default API URL

  // Entity Configuration
  entityName: string; // e.g., "Users", "Products", "Orders"
  entityNamePlural: string; // e.g., "Users", "Products", "Orders"

  // Filter Configuration
  filterFields?: FilterField[];

  // Additional Options (passed to API)
  additionalOptions?: Record<string, any>;

  // Current State
  currentFilters?: Record<string, string>;
  currentSearch?: string;

  // Filename Configuration
  fileNamePrefix?: string; // e.g., "users", "products" - Default: entity name lowercase

  // Authorization
  requireAuth?: boolean;
  authTokenKey?: string; // Default: "token"

  // Customization
  showExportTypeToggle?: boolean; // Default: true
  showLimitInput?: boolean; // Default: true
  showSearchInput?: boolean; // Default: true
  showDateRange?: boolean; // Default: true

  // Callbacks
  onClose: () => void;
  onSuccess?: (filename: string) => void;
  onError?: (error: Error) => void;
}

// ============================================
// Main Export Dialog Component
// ============================================

export const ExportDialog = ({
  apiEndpoint,
  baseUrl,
  entityName,
  entityNamePlural,
  filterFields = [],
  additionalOptions = {},
  currentFilters = {},
  currentSearch = '',
  fileNamePrefix,
  requireAuth = false,
  authTokenKey = 'token',
  showExportTypeToggle = true,
  showLimitInput = true,
  showSearchInput = true,
  showDateRange = true,
  onClose,
  onSuccess,
  onError,
}: ExportDialogConfig) => {
  const [isExporting, setIsExporting] = useState(false);
  const [exportConfig, setExportConfig] = useState({
    exportAll: true,
    search: currentSearch || '',
    startDate: '',
    endDate: '',
    limit: '',
    customFilters: { ...currentFilters },
  });

  // Update custom filter
  const updateCustomFilter = (key: string, value: string | null) => {
    const val = value ?? '';
    setExportConfig((prev) => ({
      ...prev,
      customFilters: {
        ...prev.customFilters,
        [key]: val === 'all' ? '' : val,
      },
    }));
  };

  // Handle Export
  const handleExport = async () => {
    try {
      setIsExporting(true);
      toast.loading('Preparing export...', { id: 'export-toast' });

      // Build params
      const params: any = {
        exportAll: exportConfig.exportAll,
        ...additionalOptions,
      };

      // Add custom filters
      Object.entries(exportConfig.customFilters).forEach(([key, value]) => {
        if (value) params[key] = value;
      });

      // Add search
      if (exportConfig.search?.trim()) {
        params.search = exportConfig.search.trim();
      }

      // Add date range
      if (exportConfig.startDate) params.startDate = exportConfig.startDate;
      if (exportConfig.endDate) params.endDate = exportConfig.endDate;

      // Add limit
      if (!exportConfig.exportAll && exportConfig.limit) {
        params.limit = parseInt(exportConfig.limit);
      }

      console.log('Exporting with params:', params);

      // Build URL
      const queryString = new URLSearchParams(params).toString();
      const apiUrl = `${baseUrl || process.env.NEXT_PUBLIC_API_URL}${apiEndpoint}?${queryString}`;

      // Build headers
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
      };

      if (requireAuth && typeof window !== 'undefined') {
        const token = localStorage.getItem(authTokenKey);
        if (token) {
          headers.Authorization = `Bearer ${token}`;
        }
      }

      // Make fetch request
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Export failed');
      }

      // Get blob
      const blob = await response.blob();

      if (!blob || blob.size === 0) {
        throw new Error('No data received from server');
      }

      // Create download
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;

      const prefix = fileNamePrefix || entityName.toLowerCase().replace(/\s+/g, '_');
      const filename = `${prefix}_export_${new Date().toISOString().split('T')[0]}.xlsx`;
      link.download = filename;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast.success('Export completed successfully!', { id: 'export-toast' });

      if (onSuccess) onSuccess(filename);
      onClose();
    } catch (error: any) {
      console.error('Export failed:', error);
      toast.error(error?.message || `Failed to export ${entityNamePlural.toLowerCase()}`, {
        id: 'export-toast',
      });
      if (onError) onError(error);
    } finally {
      setIsExporting(false);
    }
  };

  // Render filter field
  const renderFilterField = (field: FilterField) => {
    const value = exportConfig.customFilters[field.id] || field.defaultValue || '';

    if (field.type === 'select' && field.options) {
      return (
        <div key={field.id} className="space-y-2">
          <Label htmlFor={field.id}>{field.label}</Label>
          <Select
            value={value || 'all'}
            onValueChange={(val: string | null) => updateCustomFilter(field.id, val)}
          >
            <SelectTrigger id={field.id}>
              <SelectValue placeholder={field.placeholder || `Select ${field.label}`} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              {field.options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      );
    }

    if (field.type === 'text' || field.type === 'number') {
      return (
        <div key={field.id} className="space-y-2">
          <Label htmlFor={field.id}>{field.label}</Label>
          <Input
            id={field.id}
            type={field.type}
            placeholder={field.placeholder}
            value={value}
            onChange={(e) => updateCustomFilter(field.id, e.target.value)}
          />
        </div>
      );
    }

    return null;
  };

  return (
    <div className="space-y-6">
      {/* Export Type */}
      {showExportTypeToggle && (
        <div className="space-y-2">
          <Label htmlFor="exportType">Export Type</Label>
          <Select
            value={exportConfig.exportAll ? 'all' : 'limited'}
            onValueChange={(value: string | null) =>
              setExportConfig((prev) => ({
                ...prev,
                exportAll: value === 'all',
              }))
            }
          >
            <SelectTrigger id="exportType">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Export All {entityNamePlural}</SelectItem>
              <SelectItem value="limited">Export Limited {entityNamePlural}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Limit Input */}
      {showLimitInput && !exportConfig.exportAll && (
        <div className="space-y-2">
          <Label htmlFor="limit">Number of {entityNamePlural}</Label>
          <Input
            id="limit"
            type="number"
            placeholder="e.g., 100"
            value={exportConfig.limit}
            onChange={(e) => setExportConfig((prev) => ({ ...prev, limit: e.target.value }))}
            min="1"
          />
          <p className="text-xs text-muted-foreground">
            Leave empty to export all available {entityNamePlural.toLowerCase()}
          </p>
        </div>
      )}

      {/* Custom Filter Fields */}
      {filterFields.map((field) => renderFilterField(field))}

      {/* Search Input */}
      {showSearchInput && (
        <div className="space-y-2">
          <Label htmlFor="search">Search Query</Label>
          <Input
            id="search"
            placeholder={`Search ${entityNamePlural.toLowerCase()}...`}
            value={exportConfig.search}
            onChange={(e) => setExportConfig((prev) => ({ ...prev, search: e.target.value }))}
          />
          {currentSearch && (
            <p className="text-xs text-muted-foreground">Current search: {currentSearch}</p>
          )}
        </div>
      )}

      {/* Date Range */}
      {showDateRange && (
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="startDate" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Start Date
            </Label>
            <Input
              id="startDate"
              type="date"
              value={exportConfig.startDate}
              onChange={(e) => setExportConfig((prev) => ({ ...prev, startDate: e.target.value }))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="endDate" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              End Date
            </Label>
            <Input
              id="endDate"
              type="date"
              value={exportConfig.endDate}
              onChange={(e) => setExportConfig((prev) => ({ ...prev, endDate: e.target.value }))}
            />
          </div>
        </div>
      )}

      {/* Summary */}
      <div className="bg-muted/50 p-4 rounded-md space-y-2">
        <p className="text-sm font-medium">Export Summary:</p>
        <ul className="text-xs text-muted-foreground space-y-1">
          <li>
            • Type:{' '}
            {exportConfig.exportAll ? `All ${entityNamePlural}` : `Limited ${entityNamePlural}`}
          </li>
          {!exportConfig.exportAll && exportConfig.limit && (
            <li>
              • Limit: {exportConfig.limit} {entityNamePlural.toLowerCase()}
            </li>
          )}
          {Object.entries(exportConfig.customFilters).map(([key, value]) => {
            if (!value) return null;
            const field = filterFields.find((f) => f.id === key);
            const displayLabel = field?.label || key;
            return (
              <li key={key}>
                • {displayLabel}: {value}
              </li>
            );
          })}
          {exportConfig.search && <li>• Search: {exportConfig.search}</li>}
          {exportConfig.startDate && <li>• From: {exportConfig.startDate}</li>}
          {exportConfig.endDate && <li>• To: {exportConfig.endDate}</li>}
        </ul>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end gap-3 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onClose}
          disabled={isExporting}
          className="cursor-pointer"
        >
          Cancel
        </Button>
        <Button
          type="button"
          onClick={handleExport}
          disabled={isExporting}
          className="cursor-pointer btn btn-primary flex items-center gap-2"
        >
          {isExporting ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Exporting...
            </>
          ) : (
            <>
              <Download className="h-4 w-4" />
              Export to Excel
            </>
          )}
        </Button>
      </div>
    </div>
  );
};