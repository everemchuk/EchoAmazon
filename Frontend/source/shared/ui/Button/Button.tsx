import { Show } from "solid-js"
import styles from "./Button.module.sass"

interface ButtonProps {
	text: string
	variant?: "sharp" | "smooth" | "rounded"
	color?: "primary" | "regular"
	showArrow?: boolean
	class?: string
	onClick?: (e: MouseEvent) => void
}

export const Button = (props: ButtonProps) => {
	const variant = props.variant || "sharp"
	const color = props.color || "primary"

	return (
		<button
			class={`${styles["custom-btn"]} ${styles[`btn-${variant}`]} ${styles[`btn-color-${color}`]} ${props.showArrow ? styles["has-arrow"] : ""} ${props.class || ""}`}
			onClick={props.onClick}
		>
			<span class={styles["btn-text"]}>{props.text}</span>
			<Show when={props.showArrow}>
				<svg
					class={styles["btn-arrow"]}
					viewBox="0 0 24 24"
					width="18"
					height="18"
					stroke="currentColor"
					stroke-width="2"
					fill="none"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<line x1="5" y1="12" x2="19" y2="12" />
					<polyline points="12 5 19 12 12 19" />
				</svg>
			</Show>
		</button>
	)
}
