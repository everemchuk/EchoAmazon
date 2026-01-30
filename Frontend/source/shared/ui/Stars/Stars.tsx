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
					if (props.rating >= index + 1) {
						return <Icon name="star" class={`${styles.star} ${styles["star-filled"]}`} />
					} else if (props.rating >= index + 0.5) {
						return <Icon name="star-half" class={`${styles.star} ${styles["star-filled"]}`} />
					} else {
						return <Icon name="star-outline" class={`${styles.star} ${styles["star-empty"]}`} />
					}
				}}
			</For>
		</div>
	)
}
