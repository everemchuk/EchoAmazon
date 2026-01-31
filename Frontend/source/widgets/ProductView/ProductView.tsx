import { createSignal, createEffect, onMount, onCleanup, Show, For } from "solid-js"
import { useStore } from "@nanostores/solid"
import { isProductViewOpen, setProductViewOpen, activeProduct } from "@shared/state/productView"
import { Tooltip } from "@shared/ui/Tooltip/Tooltip"
import { Button } from "@shared/ui/Button/Button"
import { Toggle } from "@shared/ui/Toggle/Toggle"
import { Stars } from "@shared/ui/Stars/Stars"
import { Gallery } from "@features/Gallery/Gallery"
import styles from "./ProductView.module.sass"

export const ProductView = () => {
	const isOpen = useStore(isProductViewOpen)
	const product = useStore(activeProduct)
	const [selectedSize, setSelectedSize] = createSignal("")

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

	// Reset state when product changes
	createEffect(() => {
		if (product()) {
			if (product()?.selectedSize) {
				setSelectedSize(product()!.selectedSize!)
			} else {
				setSelectedSize("")
			}
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
					<Gallery
						images={[product()?.image || "", product()?.image || "", product()?.image || ""]}
						title={product()?.title}
						class={styles["product-image-section"]}
					/>

					{/* Product Details Section */}
					<div class={styles["product-details-section"]}>
						<div class={styles["pv-header"]}>
							<p class={styles["pv-brand"]}>{product()?.brand || "Brand"}</p>
							<h2 class={styles["pv-title"]}>{product()?.title || "Product Title"}</h2>

							<div class={styles["pv-rating"]}>
								<div class={styles["stars-wrapper"]}>
									<Stars rating={product()?.rating || 0} size="medium" />
									<Tooltip text={`${product()?.rating || 0}`} position="right" color="primary" />
								</div>
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
								variant="smooth"
								class="add-to-cart-btn"
								onClick={() => console.log("Added to cart:", product())}
							/>
						</div>

						<a
							href={`/product/${product()?.id || "1"}`}
							class={styles["full-view-link-wrapper"]}
							data-astro-reload
						>
							<Button
								text="Go To Product Page"
								color="primary"
								variant="smooth"
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
