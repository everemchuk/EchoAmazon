import { createSignal, createEffect, onMount, onCleanup, Show, For } from "solid-js"
import { useStore } from "@nanostores/solid"
import { isProductViewOpen, setProductViewOpen, activeProduct } from "@shared/state/productView"
import { Icon } from "@shared/ui/Icon/Icon"
import { Button } from "@shared/ui/Button/Button"
import { Toggle } from "@shared/ui/Toggle/Toggle"
import { Stars } from "@shared/ui/Stars/Stars"
import styles from "./ProductView.module.sass"

export const ProductView = () => {
	const isOpen = useStore(isProductViewOpen)
	const product = useStore(activeProduct)
	const [activeThumb, setActiveThumb] = createSignal(0)
	const [selectedSize, setSelectedSize] = createSignal("XL")

	const sizes = ["XS", "S", "M", "L", "XL"]

	// Lock body scroll when open
	createEffect(() => {
		if (typeof document !== "undefined") {
			if (isOpen()) {
				document.body.style.overflow = "hidden"
			} else {
				document.body.style.overflow = ""
			}
		}
	})

	const close = () => {
		setProductViewOpen(false)
	}

	const handleBackdropClick = (e: MouseEvent) => {
		if (e.target === e.currentTarget) {
			close()
		}
	}

	const handleThumbClick = (index: number) => {
		setActiveThumb(index)
	}

	// Reset state when product changes
	createEffect(() => {
		if (product()) {
			setActiveThumb(0)
			setSelectedSize("XL")
		}
	})

	// Keyboard support
	const handleKeyDown = (e: KeyboardEvent) => {
		if (e.key === "Escape" && isOpen()) {
			close()
		}
	}

	onMount(() => {
		if (typeof document !== "undefined") {
			document.addEventListener("keydown", handleKeyDown)
		}
	})

	onCleanup(() => {
		if (typeof document !== "undefined") {
			document.removeEventListener("keydown", handleKeyDown)
			document.body.style.overflow = "" // Ensure cleanup
		}
	})

	return (
		<div
			class={`${styles["product-view-overlay"]} ${isOpen() ? styles.active : ""}`}
			id="product-view-overlay"
		>
			<div
				class={styles["product-view-backdrop"]}
				onClick={handleBackdropClick}
				id="product-view-backdrop"
			/>

			<Toggle
				class={styles["pv-close-toggle"]}
				ariaLabel="Close product view"
				direction="right"
				onClick={close}
			/>

			<div class={styles["product-view-panel"]}>
				<div class={styles["product-view-content"]}>
					{/* Product Image Section */}
					<div class={styles["product-image-section"]}>
						<div class={styles["main-image-container"]}>
							<img
								src={product()?.image || ""}
								alt={product()?.title || "Product Image"}
								class={styles["pv-main-image"]}
							/>
							<div class={styles["image-shadow"]}></div>
						</div>

						{/* Gallery Navigation Indicators */}
						<div class={styles["gallery-indicators"]}>
							<For each={[0, 1, 2]}>
								{(index) => (
									<span
										class={`${styles.indicator} ${activeThumb() === index ? styles.active : ""}`}
										onClick={() => handleThumbClick(index)}
									></span>
								)}
							</For>
						</div>

						{/* Thumbnail Gallery */}
						<div class={styles["thumbnail-gallery"]}>
							<For each={[0, 1, 2]}>
								{(index) => (
									<div
										class={`${styles["pv-thumbnail"]} ${activeThumb() === index ? styles.active : ""}`}
										onClick={() => handleThumbClick(index)}
									>
										<img src={product()?.image || ""} alt={`Thumbnail ${index + 1}`} />
									</div>
								)}
							</For>
						</div>
					</div>

					{/* Product Details Section */}
					<div class={styles["product-details-section"]}>
						<div class={styles["pv-header"]}>
							<p class={styles["pv-brand"]}>{product()?.brand || "Brand"}</p>
							<h2 class={styles["pv-title"]}>{product()?.title || "Product Title"}</h2>

							<div class={styles["pv-rating"]}>
								<Stars rating={product()?.rating || 0} size="medium" />
							</div>
						</div>

						<div class={styles["pv-description"]}>
							<p>
								{product()?.description || "Experience unparalleled luxury with this exquisite item. Crafted from the finest materials, this piece represents the pinnacle of elegance."}
							</p>
						</div>

						<div class={styles["pv-sizes"]}>
							<For each={sizes}>
								{(size) => (
									<span
										class={`${styles["size-option"]} ${selectedSize() === size ? styles.selected : ""}`}
										onClick={() => setSelectedSize(size)}
									>
										{size}
									</span>
								)}
							</For>
						</div>

						<div class={styles["pv-actions"]}>
							<div class={styles["price-block"]}>
								<span class={styles.label}>Best Price</span>
								<span class={styles.price}>{product()?.price || "$0.00"}</span>
							</div>
							<Button
								text="Add To Cart"
								color="primary"
								variant="sharp"
								class="add-to-cart-btn"
								onClick={() => console.log("Added to cart:", product())}
							/>
						</div>

						<a
							href={`/product/${product()?.id || "1"}`}
							class={styles["full-view-link-wrapper"]}
							onClick={close}
						>
							<Button
								text="Go To Product Page"
								color="primary"
								variant="sharp"
								showArrow={true}
								class="full-view-btn"
							/>
						</a>
					</div>
				</div>
			</div>
		</div>
	)
}
