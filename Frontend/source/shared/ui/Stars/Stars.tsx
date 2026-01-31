import { For } from "solid-js"
import { Icon } from "@shared/ui/Icon/Icon"
import styles from "./Stars.module.sass"

interface StarsProps {
	rating: number
	size?: "small" | "medium" | "large"
	class?: string
}

export const Stars = (props: StarsProps) => {
	const size = props.size ?? "medium"

	return (
		<div class={`${styles.stars} ${styles[`stars-${size}`]} ${props.class || ""}`}>
			<For each={Array.from({ length: 5 })}>
				{(_, i) => {
					const index = i()
					return (
						<>
							{props.rating >= index + 1 ? (
								<Icon name="star" class={`${styles.star} ${styles["star-filled"]}`} />
							) : props.rating >= index + 0.5 ? (
								<Icon name="star-half" class={`${styles.star} ${styles["star-filled"]}`} />
							) : (
								<Icon name="star-outline" class={`${styles.star} ${styles["star-empty"]}`} />
							)}
						</>
					)
				}}
			</For>
		</div>
	)
}
