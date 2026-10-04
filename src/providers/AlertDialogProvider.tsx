'use client';
import React, { createContext, useContext, useState, useCallback } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

// Types
interface ModalConfig {
  title?: string;
  description?: string | React.ReactNode;
  confirmText?: string;
  cancelText?: string;
  variant?: 'default' | 'destructive' | 'success' | 'warning';
  showCancel?: boolean;
  onConfirm?: () => void | Promise<void>;
  onCancel?: () => void;
  closeOnConfirm?: boolean;
  closeOnCancel?: boolean;
  icon?: React.ReactNode;
  customContent?: React.ReactNode;
  confirmButtonClassName?: string;
  cancelButtonClassName?: string;
}

interface ModalContextType {
  showModal: (config: ModalConfig) => void;
  hideModal: () => void;
  isOpen: boolean;
}

interface InternalModalConfig {
  title: string;
  description: string | React.ReactNode;
  confirmText: string;
  cancelText: string;
  variant: 'default' | 'destructive' | 'success' | 'warning';
  showCancel: boolean;
  onConfirm: (() => void | Promise<void>) | null;
  onCancel: (() => void) | null;
  closeOnConfirm: boolean;
  closeOnCancel: boolean;
  icon: React.ReactNode | null;
  customContent: React.ReactNode | null;
  confirmButtonClassName?: string;
  cancelButtonClassName?: string;
}

// Modal Context
const ModalContext = createContext<ModalContextType | null>(null);

// Hook for using modal
export const useModal = (): ModalContextType => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within ModalProvider');
  }
  return context;
};

// Modal Provider Component
export const AlertDialogProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [modalConfig, setModalConfig] = useState<InternalModalConfig>({
    title: '',
    description: '',
    confirmText: 'Confirm',
    cancelText: 'Cancel',
    variant: 'default',
    showCancel: true,
    onConfirm: null,
    onCancel: null,
    closeOnConfirm: true,
    closeOnCancel: true,
    icon: null,
    customContent: null,
  });

  const showModal = useCallback((config: ModalConfig) => {
    const variant = config.variant || 'default';
    setModalConfig({
      title: config.title || 'Confirmation',
      description: config.description || '',
      confirmText: config.confirmText || 'Confirm',
      cancelText: config.cancelText || 'Cancel',
      variant,
      showCancel: config.showCancel !== false,
      onConfirm: config.onConfirm || null,
      onCancel: config.onCancel || null,
      closeOnConfirm: config.closeOnConfirm !== false,
      closeOnCancel: config.closeOnCancel !== false,
      icon: config.icon !== undefined && config.icon,
      customContent: config.customContent || null,
      confirmButtonClassName: config.confirmButtonClassName,
      cancelButtonClassName: config.cancelButtonClassName,
    });
    setIsOpen(true);
    setIsLoading(false);
  }, []);

  const hideModal = useCallback(() => {
    setIsOpen(false);
    setIsLoading(false);
  }, []);

  const handleConfirm = useCallback(async () => {
    if (modalConfig.onConfirm) {
      setIsLoading(true);
      try {
        await modalConfig.onConfirm();
        if (modalConfig.closeOnConfirm) {
          hideModal();
        }
      } catch (error) {
        console.error('Modal confirm error:', error);
      } finally {
        setIsLoading(false);
      }
    } else if (modalConfig.closeOnConfirm) {
      hideModal();
    }
  }, [modalConfig, hideModal]);

  const handleCancel = useCallback(() => {
    if (modalConfig.onCancel) {
      modalConfig.onCancel();
    }
    if (modalConfig.closeOnCancel) {
      hideModal();
    }
  }, [modalConfig, hideModal]);

  const getButtonClassName = () => {
    if (modalConfig.confirmButtonClassName) {
      return modalConfig.confirmButtonClassName;
    }

    switch (modalConfig.variant) {
      case 'destructive':
        return 'bg-red-600 hover:bg-red-700 focus:ring-red-600 cursor-pointer';
      case 'success':
        return 'bg-green-600 hover:bg-green-700 focus:ring-green-600 cursor-pointer';
      case 'warning':
        return 'bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-600 cursor-pointer';
      default:
        return 'cursor-pointer bg-[#1D3E6B] hover:bg-[#1D3E6B]/90 dark:bg-blue-600 dark:hover:bg-blue-700 dark:text-white';
    }
  };

  const value: ModalContextType = {
    showModal,
    hideModal,
    isOpen,
  };

  return (
    <ModalContext.Provider value={value}>
      {children}
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent className="sm:max-w-[425px]">
          <AlertDialogHeader>
            {modalConfig.icon && <div className="mb-4">{modalConfig.icon}</div>}
            <AlertDialogTitle className="text-center sm:text-left">
              {modalConfig.title}
            </AlertDialogTitle>
            {modalConfig.description && (
              <AlertDialogDescription className="text-center sm:text-left">
                {modalConfig.description}
              </AlertDialogDescription>
            )}
          </AlertDialogHeader>

          {modalConfig.customContent && <div className="py-4">{modalConfig.customContent}</div>}

          <AlertDialogFooter className="flex-col sm:flex-row gap-2">
            {modalConfig.showCancel && (
              <AlertDialogCancel
                onClick={handleCancel}
                disabled={isLoading}
                className={modalConfig.cancelButtonClassName}
              >
                {modalConfig.cancelText}
              </AlertDialogCancel>
            )}
            <AlertDialogAction
              onClick={handleConfirm}
              disabled={isLoading}
              className={`${getButtonClassName()} ${
                isLoading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
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
                modalConfig.confirmText
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </ModalContext.Provider>
  );
};

// Utility function for common modal patterns
export const modalHelpers = {
  confirm: (config: Omit<ModalConfig, 'variant'> & { variant?: ModalConfig['variant'] }) => ({
    variant: 'default' as const,
    ...config,
  }),

  delete: (config: Omit<ModalConfig, 'variant' | 'confirmText'>) => ({
    variant: 'destructive' as const,
    confirmText: 'Delete',
    title: 'Delete Confirmation',
    description: 'Are you sure you want to delete this item? This action cannot be undone.',
    ...config,
  }),

  success: (config: Omit<ModalConfig, 'variant'>) => ({
    variant: 'success' as const,
    showCancel: false,
    confirmText: 'OK',
    ...config,
  }),

  warning: (config: Omit<ModalConfig, 'variant'>) => ({
    variant: 'warning' as const,
    ...config,
  }),
};
