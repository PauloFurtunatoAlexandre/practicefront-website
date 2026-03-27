import { cn } from '@/lib/utils'

interface HeadingProps {
  as?: 'h1' | 'h2' | 'h3' | 'h4'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'
  className?: string
  children: React.ReactNode
}

const sizeClasses = {
  xs: 'text-lg font-semibold tracking-tight',
  sm: 'text-xl font-semibold tracking-tight',
  md: 'text-2xl font-bold tracking-tight',
  lg: 'text-3xl font-bold tracking-tight',
  xl: 'text-4xl font-bold tracking-tight',
  '2xl': 'text-5xl font-bold tracking-tight',
  '3xl': 'text-6xl font-bold tracking-tight lg:text-7xl',
}

export function Heading({ as: Tag = 'h2', size = 'xl', className, children }: HeadingProps) {
  return (
    <Tag className={cn('font-heading', sizeClasses[size], className)}>
      {children}
    </Tag>
  )
}

interface SubheadingProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
  children: React.ReactNode
}

export function Subheading({ size = 'md', className, children }: SubheadingProps) {
  const sizes = {
    sm: 'text-sm',
    md: 'text-base leading-relaxed',
    lg: 'text-lg leading-relaxed',
  }
  return (
    <p className={cn('font-sans text-muted-foreground', sizes[size], className)}>
      {children}
    </p>
  )
}

export function Eyebrow({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <p
      className={cn(
        'font-heading text-xs font-semibold uppercase tracking-widest text-primary',
        className,
      )}
    >
      {children}
    </p>
  )
}

export function GradientText({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <span
      className={cn(
        'bg-gradient-to-br from-primary to-[hsl(280,70%,65%)] bg-clip-text text-transparent',
        className,
      )}
    >
      {children}
    </span>
  )
}
