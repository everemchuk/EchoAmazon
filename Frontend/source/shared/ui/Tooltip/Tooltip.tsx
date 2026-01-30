import styles from "./Tooltip.module.sass"

interface TooltipProps {
	text: string
	color?: "primary" | "regular"
	position?: "right" | "top" | "bottom" | "left"
	class?: string
}

export const Tooltip = (props: TooltipProps) => {
	const color = props.color || "regular"
	const position = props.position || "right"
	return (
		<span class={`${styles.tooltip} tooltip ${styles[`tooltip-${position}`]} ${styles[`tooltip-color-${color}`]} ${props.class || ""}`}>
			{props.text}
		</span>
	)
}
