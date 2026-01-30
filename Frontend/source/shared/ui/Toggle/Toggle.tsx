import { Icon } from "@shared/ui/Icon/Icon"
import styles from "./Toggle.module.sass"

interface ToggleProps {
	id?: string
	class?: string
	ariaLabel?: string
	direction?: "left" | "right"
	isOpen?: boolean
	onClick?: (e: MouseEvent) => void
}

export const Toggle = (props: ToggleProps) => {
	const id = props.id || "toggle-btn"
	const className = props.class || ""
	const ariaLabel = props.ariaLabel || "Toggle"
	const direction = props.direction || "left"

	return (
		<button
			id={id}
			class={`${styles["toggle-btn"]} ${className} ${styles[direction]} ${props.isOpen ? styles.open : ""}`}
			aria-label={ariaLabel}
			onClick={props.onClick}
		>
			{/* Progress circle */}
			<svg class={styles.progress} viewBox="0 0 48 48">
				{/* Base circle - always visible */}
				<circle class={styles["progress__circle"]} cx="24" cy="24" r="22"></circle>
				{/* Animated path - draws on hover */}
				<circle class={styles["progress__path"]} cx="24" cy="24" r="22" pathLength="1"></circle>
			</svg>

			{/* Arrow icon */}
			<Icon name="chevron-left" class={styles["arrow-icon"]} size={18} />
		</button>
	)
}
