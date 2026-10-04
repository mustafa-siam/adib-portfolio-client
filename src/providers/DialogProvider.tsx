'use client';
import React, { createContext, useContext, useState, useCallback } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

// Types
interface DialogConfig {
  title?: string;
  description?: string | React.ReactNode;
  content?: React.ReactNode;
  footer?: React.ReactNode;
  showHeader?: boolean;
  showFooter?: boolean;
  confirmText?: string;
  cancelText?: string;
  variant?: 'default' | 'destructive' | 'success' | 'warning';
  showCancel?: boolean;
  showConfirm?: boolean;
  onConfirm?: () => void | Promise<void>;
  onCancel?: () => void;
  onOpenChange?: (open: boolean) => void;
  closeOnConfirm?: boolean;
  closeOnCancel?: boolean;
  closeOnOutsideClick?: boolean;
  size?: 'sm' | 'default' | 'lg' | 'xl' | 'full';
  icon?: React.ReactNode;
  className?: string;
  confirmButtonClassName?: string;
  cancelButtonClassName?: string;
}

interface DialogContextType {
  showDialog: (config: DialogConfig) => void;
  hideDialog: () => void;
  isOpen: boolean;
  updateDialog: (config: Partial<DialogConfig>) => void;
}

interface InternalDialogConfig {
  title: string;
  description: string | React.ReactNode;
  content: React.ReactNode | null;
  footer: React.ReactNode | null;
  showHeader: boolean;
  showFooter: boolean;
  confirmText: string;
  cancelText: string;
  variant: 'default' | 'destructive' | 'success' | 'warning';
  showCancel: boolean;
  showConfirm: boolean;
  onConfirm: (() => void | Promise<void>) | null;
  onCancel: (() => void) | null;
  onOpenChange: ((open: boolean) => void) | null;
  closeOnConfirm: boolean;
  closeOnCancel: boolean;
  closeOnOutsideClick: boolean;
  size: 'sm' | 'default' | 'lg' | 'xl' | 'full';
  icon: React.ReactNode | null;
  className?: string;
  confirmButtonClassName?: string;
  cancelButtonClassName?: string;
}

// Dialog Context
const DialogContext = createContext<DialogContextType | null>(null);

// Hook for using dialog
export const useDialog = (): DialogContextType => {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error('useDialog must be used within DialogProvider');
  }
  return context;
};

// Default Icons

// Dialog Provider Component
export const DialogProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [dialogConfig, setDialogConfig] = useState<InternalDialogConfig>({
    title: '',
    description: '',
    content: null,
    footer: null,
    showHeader: true,
    showFooter: true,
    confirmText: 'Confirm',
    cancelText: 'Cancel',
    variant: 'default',
    showCancel: true,
    showConfirm: true,
    onConfirm: null,
    onCancel: null,
    onOpenChange: null,
    closeOnConfirm: true,
    closeOnCancel: true,
    closeOnOutsideClick: true,
    size: 'default',
    icon: null,
  });

  const showDialog = useCallback((config: DialogConfig) => {
    const variant = config.variant || 'default';
    setDialogConfig({
      title: config.title || '',
      description: config.description || '',
      content: config.content || null,
      footer: config.footer || null,
      showHeader: config.showHeader !== false,
      showFooter: config.showFooter !== false,
      confirmText: config.confirmText || 'Confirm',
      cancelText: config.cancelText || 'Cancel',
      variant,
      showCancel: config.showCancel !== false,
      showConfirm: config.showConfirm !== false,
      onConfirm: config.onConfirm || null,
      onCancel: config.onCancel || null,
      onOpenChange: config.onOpenChange || null,
      closeOnConfirm: config.closeOnConfirm !== false,
      closeOnCancel: config.closeOnCancel !== false,
      closeOnOutsideClick: config.closeOnOutsideClick !== false,
      size: config.size || 'default',
      icon: config.icon !== undefined && config.icon,
      className: config.className,
      confirmButtonClassName: config.confirmButtonClassName,
      cancelButtonClassName: config.cancelButtonClassName,
    });
    setIsOpen(true);
    setIsLoading(false);
  }, []);

  const hideDialog = useCallback(() => {
    setIsOpen(false);
    setIsLoading(false);
  }, []);

  const updateDialog = useCallback((config: Partial<DialogConfig>) => {
    setDialogConfig((prev) => ({
      ...prev,
      ...config,
      icon: config.icon !== undefined ? config.icon : config.variant ? prev.icon : prev.icon,
    }));
  }, []);

  const handleConfirm = useCallback(async () => {
    if (dialogConfig.onConfirm) {
      setIsLoading(true);
      try {
        await dialogConfig.onConfirm();
        if (dialogConfig.closeOnConfirm) {
          hideDialog();
        }
      } catch (error) {
        console.error('Dialog confirm error:', error);
      } finally {
        setIsLoading(false);
      }
    } else if (dialogConfig.closeOnConfirm) {
      hideDialog();
    }
  }, [dialogConfig, hideDialog]);

  const handleCancel = useCallback(() => {
    if (dialogConfig.onCancel) {
      dialogConfig.onCancel();
    }
    if (dialogConfig.closeOnCancel) {
      hideDialog();
    }
  }, [dialogConfig, hideDialog]);

  const handleOpenChange = useCallback(
    (open: boolean) => {
      if (!open && !dialogConfig.closeOnOutsideClick) {
        return;
      }
      if (dialogConfig.onOpenChange) {
        dialogConfig.onOpenChange(open);
      }
      setIsOpen(open);
      if (!open) {
        setIsLoading(false);
      }
    },
    [dialogConfig]
  );

  const getButtonVariant = () => {
    switch (dialogConfig.variant) {
      case 'destructive':
        return 'destructive';
      default:
        return 'default';
    }
  };

  const getSizeClass = () => {
    switch (dialogConfig.size) {
      case 'sm':
        return 'sm:max-w-sm';
      case 'lg':
        return 'sm:max-w-2xl';
      case 'xl':
        return 'sm:max-w-4xl';
      case 'full':
        return 'sm:max-w-[95vw]';
      default:
        return 'sm:max-w-[425px]';
    }
  };

  const value: DialogContextType = {
    showDialog,
    hideDialog,
    isOpen,
    updateDialog,
  };

  return (
    <DialogContext.Provider value={value}>
      {children}
      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        <DialogContent className={`${getSizeClass()} ${dialogConfig.className || ''}`}>
          {dialogConfig.showHeader &&
            (dialogConfig.title || dialogConfig.description || dialogConfig.icon) && (
              <DialogHeader>
                {dialogConfig.icon && <div className="mb-4">{dialogConfig.icon}</div>}
                {dialogConfig.title && <DialogTitle>{dialogConfig.title}</DialogTitle>}
                {dialogConfig.description && (
                  <DialogDescription>{dialogConfig.description}</DialogDescription>
                )}
              </DialogHeader>
            )}

          {dialogConfig.content && <div className="py-4">{dialogConfig.content}</div>}

          {dialogConfig.showFooter && (
            <>
              {dialogConfig.footer ? (
                <DialogFooter>{dialogConfig.footer}</DialogFooter>
              ) : (
                (dialogConfig.showCancel || dialogConfig.showConfirm) && (
                  <DialogFooter>
                    {dialogConfig.showCancel && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleCancel}
                        disabled={isLoading}
                        className={dialogConfig.cancelButtonClassName}
                      >
                        {dialogConfig.cancelText}
                      </Button>
                    )}
                    {dialogConfig.showConfirm && (
                      <Button
                        type="button"
                        variant={getButtonVariant()}
                        onClick={handleConfirm}
                        disabled={isLoading}
                        className={dialogConfig.confirmButtonClassName}
                      >
                        {isLoading ? (
                          <span className="flex items-center gap-2">
                            <svg
                              className="animate-spin h-4 w-4"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            Loading...
                          </span>
                        ) : (
                          dialogConfig.confirmText
                        )}
                      </Button>
                    )}
                  </DialogFooter>
                )
              )}
            </>
          )}
        </DialogContent>
      </Dialog>
    </DialogContext.Provider>
  );
};

// Utility functions for common dialog patterns
export const dialogHelpers = {
  // Simple confirmation dialog
  confirm: (config: Omit<DialogConfig, 'variant'>) => ({
    variant: 'default' as const,
    title: 'Confirm Action',
    description: 'Are you sure you want to proceed?',
    ...config,
  }),

  // Delete confirmation dialog
  delete: (config: Omit<DialogConfig, 'variant' | 'confirmText'>) => ({
    variant: 'destructive' as const,
    confirmText: 'Delete',
    title: 'Delete Confirmation',
    description: 'Are you sure you want to delete this? This action cannot be undone.',
    ...config,
  }),

  // Success message dialog
  success: (config: Omit<DialogConfig, 'variant' | 'showCancel'>) => ({
    variant: 'success' as const,
    showCancel: false,
    confirmText: 'OK',
    title: 'Success',
    ...config,
  }),

  // Warning dialog
  warning: (config: Omit<DialogConfig, 'variant'>) => ({
    variant: 'warning' as const,
    title: 'Warning',
    ...config,
  }),

  // Custom content dialog (no footer)
  custom: (config: Omit<DialogConfig, 'showFooter'>) => ({
    showFooter: false,
    ...config,
  }),

  // Form dialog
  form: (config: Omit<DialogConfig, 'showFooter' | 'footer'>) => ({
    showFooter: false,
    ...config,
  }),

  // Full screen dialog
  fullScreen: (config: Omit<DialogConfig, 'size'>) => ({
    size: 'full' as const,
    ...config,
  }),
};
