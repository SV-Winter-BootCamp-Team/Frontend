type MenuSectionProps = {
	isOpen: boolean
	menu: string
}

export default function MenuSection({ isOpen, menu }: MenuSectionProps) {
	return (
		<div className={`h-screen w-60 bg-red-300 ${!isOpen && 'hidden'}`}>
			This is {menu} MenuSection
		</div>
	)
}
