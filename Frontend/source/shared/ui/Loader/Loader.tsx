import { mergeProps } from "solid-js"
import styles from "./Loader.module.sass"

interface LoaderProps {
	size?: "small" | "medium" | "large"
	color?: "primary" | "text"
	centered?: boolean
	visible?: boolean
	class?: string
}

export const Loader = (props: LoaderProps) => {
	const merged = mergeProps(
		{
			size: "medium" as const,
			color: "text" as const,
			centered: false,
			visible: true,
		},
		props,
	)

	return (
		<div
			class={`${styles.loader} ${styles[`loader-${merged.size}`]} ${styles[`loader-color-${merged.color}`]} ${merged.centered ? styles["loader-centered"] : ""} ${!merged.visible ? styles["loader-hidden"] : ""} ${props.class || ""}`}
			role="status"
			aria-label="Loading"
		/>
	)
}
