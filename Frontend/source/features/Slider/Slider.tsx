import { createSignal, children, onMount, onCleanup, Show } from "solid-js"
import { Toggle } from "@shared/ui/Toggle/Toggle"
import styles from "./Slider.module.sass"

interface SliderProps {
	children: any
	title?: string
}

export const Slider = (props: SliderProps) => {
	let scrollContainerRef: HTMLDivElement | undefined
	let trackRef: HTMLDivElement | undefined
	const c = children(() => props.children)

	const getCardWidth = () => {
		if (scrollContainerRef && trackRef) {
			if (trackRef.children.length > 0) {
				const firstCard = trackRef.children[0] as HTMLElement
				const style = window.getComputedStyle(trackRef)
				const gap = parseFloat(style.gap) || 0
				return firstCard.offsetWidth + gap
			}
		}
		return 0
	}

	const scroll = (direction: "left" | "right") => {
		if (scrollContainerRef) {
			const cardWidth = getCardWidth()
			const scrollAmount = cardWidth > 0 ? cardWidth : scrollContainerRef.clientWidth * 0.8

			const targetScroll =
				direction === "left"
					? scrollContainerRef.scrollLeft - scrollAmount
					: scrollContainerRef.scrollLeft + scrollAmount

			scrollContainerRef.scrollTo({
				left: targetScroll,
				behavior: "smooth",
			})
		}
	}

	return (
		<section class={styles["slider-section"]}>
			<div class={styles["slider-header"]}>
				<Show when={props.title}>
					<h2 class={styles["slider-title"]}>{props.title}</h2>
				</Show>
				<div class={styles["slider-controls"]}>
					<Toggle
						direction="left"
						onClick={() => scroll("left")}
						class=""
						ariaLabel="Previous slide"
					/>
					<Toggle
						direction="right"
						onClick={() => scroll("right")}
						class=""
						ariaLabel="Next slide"
					/>
				</div>
			</div>
			<div class={styles["slider-container"]} ref={scrollContainerRef}>
				<div class={styles["slider-track"]} ref={trackRef}>{c()}</div>
			</div>
		</section>
	)
}
