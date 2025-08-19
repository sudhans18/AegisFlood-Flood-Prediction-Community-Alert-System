type Status = 'low' | 'safe' | 'medium' | 'high' | 'critical' | 'completed'

type Props = {
  status: Status
  children?: string
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

export default function StatusPill({ status, children, className = '', size = 'md' }: Props) {
  const colorMap: Record<Status, string> = {
    low: 'bg-status-safe text-white',
    safe: 'bg-status-safe text-white',
    medium: 'bg-status-medium text-black',
    high: 'bg-status-high text-black',
    critical: 'bg-status-critical text-white',
    completed: 'bg-status-completed text-white'
  }

  const sizeMap = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-xs',
    lg: 'px-4 py-2 text-sm'
  }

  const label = children ?? `${status.charAt(0).toUpperCase()}${status.slice(1)} Risk`
  return (
    <span className={`inline-flex items-center rounded-full font-semibold ${colorMap[status]} ${sizeMap[size]} ${className}`}>
      {label}
    </span>
  )
}


