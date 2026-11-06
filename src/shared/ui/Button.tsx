import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import type { LinkProps } from 'react-router-dom';
import { cn } from '@shared/lib/cn';
import styles from './Button.module.css';

export type ButtonVariant = 'primary' | 'outline' | 'rose' | 'gold' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface StyleOptions {
  variant?: ButtonVariant;
  size?: ButtonSize;
  full?: boolean;
  className?: string;
}

export const buttonClass = ({
  variant = 'primary',
  size = 'md',
  full = false,
  className,
}: StyleOptions = {}): string =>
  cn(styles.root, styles[variant], styles[size], full && styles.full, className);

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & StyleOptions;

export const Button = ({
  variant,
  size,
  full,
  className,
  type = 'button',
  children,
  ...rest
}: ButtonProps) => (
  <button type={type} className={buttonClass({ variant, size, full, className })} {...rest}>
    {children}
  </button>
);

type ButtonLinkProps = Omit<LinkProps, 'className'> &
  StyleOptions & {
    children: ReactNode;
  };

export const ButtonLink = ({ variant, size, full, className, children, ...rest }: ButtonLinkProps) => (
  <Link className={buttonClass({ variant, size, full, className })} {...rest}>
    {children}
  </Link>
);
