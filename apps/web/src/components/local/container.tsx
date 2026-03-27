import { cn } from '@/lib/utils'

interface ContainerProps {
  className?: string
  children: React.ReactNode
  as?: React.ElementType
}

export function Container({ className, children, as: Component = 'div' }: ContainerProps) {
  return (
    <Component className={cn('mx-auto w-full max-w-7xl px-6 lg:px-8', className)}>
      {children}
    </Component>
  )
}
