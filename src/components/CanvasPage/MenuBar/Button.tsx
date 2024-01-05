export type ButtonProps = {
	name: string
	icon: string
	handleButtonClick: (menu: string) => void
}

export default function Button({ name, icon, handleButtonClick }: ButtonProps) {
	return (
		<button
			className="flex flex-col items-center my-4 "
			onClick={() => handleButtonClick(name)}
		>
			<img src={icon} alt={name} className="w-6 h-6" />
			<p className="text-[12px]">{name}</p>
		</button>
	)
}
