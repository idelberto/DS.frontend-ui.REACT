'use client';

import { Upload } from 'lucide-react';
import { useState, type ChangeEvent, type ComponentProps } from 'react';

import { buttonVariants } from '@/registry/frontend-ui/button/ui/button';
import { cn } from '@/lib/utils';

interface FileUploadProps extends Omit<ComponentProps<'input'>, 'type' | 'onChange'> {
  label?: string;
  onFileChange?: (file: File | null) => void;
}

export function FileUpload({
  label = 'Escolher arquivo',
  onFileChange,
  className,
  ...props
}: FileUploadProps) {
  const [fileName, setFileName] = useState<string | null>(null);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.item(0) ?? null;
    setFileName(file?.name ?? null);
    onFileChange?.(file);
  }

  return (
    <div className={cn('flex items-stretch', className)}>
      <label
        className={cn(
          buttonVariants(),
          'cursor-pointer has-focus-visible:ring-3 has-focus-visible:ring-ring',
          fileName !== null && 'rounded-r-none',
        )}
      >
        <Upload />
        {label}
        <input type="file" className="sr-only" onChange={handleChange} {...props} />
      </label>
      {fileName !== null && (
        <span className="flex min-w-0 items-center rounded-r-sm border border-l-0 border-border bg-muted px-4 text-sm">
          <span className="truncate">{fileName}</span>
        </span>
      )}
    </div>
  );
}
