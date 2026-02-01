import React, { InputHTMLAttributes, TextareaHTMLAttributes, SelectHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface ToolInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

interface ToolTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

interface ToolSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  options: { value: string; label: string }[];
}

export const ToolInput = React.forwardRef<HTMLInputElement, ToolInputProps>(
  ({ label, error, icon, className, ...props }, ref) => {
    return (
      <div className="brutal-input-group">
        {label && (
          <label className="brutal-label">
            {label}
          </label>
        )}
        <div className="relative">
          <input
            ref={ref}
            className={cn(
              'brutal-input',
              error && 'border-red-500 focus:border-red-500 focus:ring-red-500/20',
              className
            )}
            {...props}
          />
          {icon && (
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400">
              {icon}
            </div>
          )}
        </div>
        {error && (
          <p className="mt-1 text-sm text-red-600 font-bold uppercase tracking-wider">
            {error}
          </p>
        )}
      </div>
    );
  }
);

export const ToolTextarea = React.forwardRef<HTMLTextAreaElement, ToolTextareaProps>(
  ({ label, error, icon, className, ...props }, ref) => {
    return (
      <div className="brutal-input-group">
        {label && (
          <label className="brutal-label">
            {label}
          </label>
        )}
        <div className="relative">
          <textarea
            ref={ref}
            className={cn(
              'brutal-textarea',
              error && 'border-red-500 focus:border-red-500 focus:ring-red-500/20',
              className
            )}
            {...props}
          />
          {icon && (
            <div className="absolute right-4 top-4 text-slate-400">
              {icon}
            </div>
          )}
        </div>
        {error && (
          <p className="mt-1 text-sm text-red-600 font-bold uppercase tracking-wider">
            {error}
          </p>
        )}
      </div>
    );
  }
);

export const ToolSelect = React.forwardRef<HTMLSelectElement, ToolSelectProps>(
  ({ label, error, options, className, ...props }, ref) => {
    return (
      <div>
        {label && (
          <label className="brutal-label">
            {label}
          </label>
        )}
        <select
          ref={ref}
          className={cn(
            'brutal-select',
            error && 'border-red-500 focus:border-red-500 focus:ring-red-500/20',
            className
          )}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && (
          <p className="mt-1 text-sm text-red-600 font-bold uppercase tracking-wider">
            {error}
          </p>
        )}
      </div>
    );
  }
);

ToolInput.displayName = 'ToolInput';
ToolTextarea.displayName = 'ToolTextarea';
ToolSelect.displayName = 'ToolSelect';