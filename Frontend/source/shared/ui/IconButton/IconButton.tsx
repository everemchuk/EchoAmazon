import { Icon } from "@shared/ui/Icon/Icon"
import styles from "./IconButton.module.sass"

interface IconButtonProps {
	icon: string
	size?: number
	buttonSize?: "small" | "medium" | "large"
	variant?: "solid" | "outline" | "ghost"
	color?: "primary" | "regular"
	shape?: "circle" | "rounded" | "square"
	ariaLabel: string
	class?: string
	onClick?: (e: MouseEvent) => void
}

export const IconButton = (props: IconButtonProps) => {
	const size = props.size || 20
	const buttonSize = props.buttonSize || "medium"
	const variant = props.variant || "outline"
	const color = props.color || "primary"
	const shape = props.shape || "rounded"

	return (
		<button
			class={`${styles["icon-btn"]} ${styles[`btn-${variant}`]} ${styles[`btn-color-${color}`]} ${styles[`btn-shape-${shape}`]} ${styles[`btn-size-${buttonSize}`]} ${props.class || ""}`}
			aria-label={props.ariaLabel}
			onClick={props.onClick}
		>
			<Icon name={props.icon} size={size} />
		</button>
	)
}
