import { createSignal, For, mergeProps } from "solid-js"
import styles from "./Gallery.module.sass"

interface GalleryProps {
	images: string[]
	title?: string
	class?: string
}

export const Gallery = (props: GalleryProps) => {
	// Fallback if images array is empty or undefined
	const mergedProps = mergeProps({ images: [], title: "Product Image" }, props)
	const [activeThumb, setActiveThumb] = createSignal(0)

	const handleThumbClick = (index: number) => {
		setActiveThumb(index)
	}

	return (
		<div class={`${styles["gallery-container"]} ${mergedProps.class || ""}`}>
			<div class={styles["main-image-wrapper"]}>
				<img
					src={mergedProps.images[activeThumb()] || ""}
					alt={mergedProps.title}
					class={styles["main-image"]}
					id="main-product-image" // ID kept for external query selectors if needed (e.g. color switcher)
				/>
				<div class={styles["shadow"]}></div>
			</div>

			<div class={styles["indicators"]}>
				<For each={mergedProps.images}>
					{(_, index) => (
						<span
							class={`${styles.indicator} ${activeThumb() === index() ? styles.active : ""}`}
							onClick={() => handleThumbClick(index())}
						></span>
					)}
				</For>
			</div>

			<div class={styles["thumbnails"]}>
				<For each={mergedProps.images}>
					{(image, index) => (
						<div
							class={`${styles["thumbnail"]} ${activeThumb() === index() ? styles.active : ""}`}
							onClick={() => handleThumbClick(index())}
						>
							<img src={image} alt={`Thumbnail ${index() + 1}`} />
						</div>
					)}
				</For>
			</div>
		</div>
	)
}
