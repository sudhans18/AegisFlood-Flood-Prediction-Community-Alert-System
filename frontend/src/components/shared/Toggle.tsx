type Props = {
  checked: boolean
  onChange: (checked: boolean) => void
}

export default function Toggle({ checked, onChange }: Props) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`w-12 h-6 rounded-full p-1 transition-colors ${checked ? 'bg-brand-blue' : 'bg-border-gray'}`}
    >
      <span className={`block w-4 h-4 bg-white rounded-full transform transition-transform ${checked ? 'translate-x-6' : ''}`} />
    </button>
  )
}




