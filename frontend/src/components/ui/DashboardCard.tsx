import Card from '../shared/Card'
import StatusPill from '../shared/StatusPill'

type Props = {
  title: string
  status: 'safe' | 'medium' | 'high' | 'critical'
  score?: number
}

export default function DashboardCard({ title, status, score }: Props) {
  return (
    <Card>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          {typeof score === 'number' && (
            <p className="text-sm text-dark-gray">Risk score: {score}</p>
          )}
        </div>
        <StatusPill status={status} />
      </div>
    </Card>
  )
}




