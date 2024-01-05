export type ButtonProps = {
	name: string
	icon: string
}

export default function Button({ name, icon }: ButtonProps) {
	return (
		<button className="flex flex-col items-center my-4 ">
			<img src={icon} alt={name} className="w-6 h-6" />
			<p className="text-[12px]">{name}</p>
		</button>
	)
}
