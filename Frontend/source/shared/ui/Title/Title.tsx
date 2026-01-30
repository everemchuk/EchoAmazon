import type { JSX } from "solid-js"
import { Show } from "solid-js"
import styles from "./Title.module.sass"

interface TitleProps {
	title: string
	children?: JSX.Element | string
	class?: string
}

export const Title = (props: TitleProps) => {
	return (
		<div class={`${styles.container} ${props.class || ""}`}>
			<h1 class={styles.title}>
				<Show when={props.title.includes(" ")} fallback={props.title}>
					{(() => {
						const words = props.title.split(" ")
						const lastWord = words.pop()
						const firstPart = words.join(" ")
						return (
							<>
								{firstPart} <span class={styles.highlight}>{lastWord}</span>
							</>
						)
					})()}
				</Show>
			</h1>
			<Show when={props.children}>
				<p class={styles.description}>{props.children}</p>
			</Show>
		</div>
	)
}

