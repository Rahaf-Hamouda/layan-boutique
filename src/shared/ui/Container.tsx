import type { ReactNode } from 'react';
import { cn } from '@shared/lib/cn';

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export const Container = ({ children, className }: ContainerProps) => (
  <div className={cn('container', className)}>{children}</div>
);
