import Card from '../components/shared/Card'

export default function Profile() {
	return (
		<div className="p-4">
			<Card className="p-6">
				<h1 className="text-lg font-semibold mb-2">Profile</h1>
				<p className="text-sm text-gray-600">Your profile settings will appear here.</p>
			</Card>
		</div>
	)
}
