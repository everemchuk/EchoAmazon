import { createSignal, onMount, onCleanup, For } from "solid-js"
import { colorExtractor } from "@shared/helpers/colorExtractor"
import styles from "./ProductCard.module.sass"
import { Icon } from "@shared/ui/Icon/Icon"
import { Tooltip } from "@shared/ui/Tooltip/Tooltip"
import { Button } from "@shared/ui/Button/Button"
import { IconButton } from "@shared/ui/IconButton/IconButton"
import { Loader } from "@shared/ui/Loader/Loader"
import { Stars } from "@shared/ui/Stars/Stars"
import { setActiveProduct, setProductViewOpen } from "@shared/state/productView"

interface Props {
	id: string
	image: string
	title: string
	brand: string
	price: string
	rating: number
}

export default function ProductCard(props: Props) {
	const [loading, setLoading] = createSignal(true)
	const [selectedSize, setSelectedSize] = createSignal<string | null>(null)
	let imgRef: HTMLImageElement | undefined
	let bgShapeRef: HTMLDivElement | undefined


	const handleQuickView = (e: MouseEvent) => {
		e.preventDefault()
		e.stopPropagation()

		const productData = {
			image: props.image,
			title: props.title,
			brand: props.brand,
			price: props.price,
			id: props.id,
			rating: props.rating, // Pass rating to ProductView store
		}

		setActiveProduct(productData)
		setProductViewOpen(true)
	}

	const handleAddToCart = (e: MouseEvent) => {
		e.preventDefault()
		e.stopPropagation()

		const rect = imgRef?.getBoundingClientRect()

		window.dispatchEvent(
			new CustomEvent("cart:add", {
				detail: {
					rect: rect,
					image: props.image,
				},
			}),
		)
	}

	const extractColor = () => {
		if (imgRef && bgShapeRef) {
			colorExtractor(imgRef, bgShapeRef)
		}
	}

	onMount(() => {
		// Simulate loading
		setTimeout(() => {
			setLoading(false)
		}, 1000)

		// Initial color extraction
		extractColor()

		// Theme observer
		const observer = new MutationObserver((mutations) => {
			mutations.forEach((mutation) => {
				if (mutation.attributeName === "data-theme") {
					extractColor()
				}
			})
		})

		observer.observe(document.documentElement, {
			attributes: true,
			attributeFilter: ["data-theme"],
		})

		onCleanup(() => {
			observer.disconnect()
		})
	})

	return (
		<article class={`${styles["product-card"]} ${loading() ? styles.loading : ""}`} data-product-id={props.id}>
			<div class={styles["image-container"]}>
				<Loader color="primary" centered visible={loading()} />
				<img
					ref={imgRef}
					src={props.image}
					alt={props.title}
					class={`${styles["product-image"]} ${loading() ? styles.loading : ""}`}
					onLoad={extractColor}
				/>
			</div>
			<div class={styles["card-shape"]}>
				<div ref={bgShapeRef} class={styles["bg-shape"]}></div>
			</div>
			<div class={styles.content}>
				<div class={styles.info}>
					<h3 class={styles.title}>{props.title}</h3>
					<p class={styles.brand}>{props.brand}</p>
					<p class={styles.price}>{props.price}</p>
				</div>

				<div class={styles["hover-details"]}>
					<div class={styles.rating}>
						<div>
							<Stars rating={props.rating} />
						</div>
						<Tooltip text={`${props.rating}`} position="right" color="primary" />
					</div>

					<div class={styles.sizes}>
						<For each={["XS", "S", "M", "L", "XL"]}>
							{(size) => (
								<span
									class={selectedSize() === size ? styles.selected : ""}
									onClick={(e) => {
										e.preventDefault()
										setSelectedSize(size)
									}}
								>
									{size}
								</span>
							)}
						</For>
					</div>

					<div class={styles.actions}>
						<Button
							text="SEE PRODUCT"
							variant="smooth"
							color="primary"
							class={styles["quick-view-btn"]}
							onClick={handleQuickView}
						/>
						<IconButton
							icon="shopping-cart-add"
							ariaLabel="Add to cart"
							class="js-add-to-cart"
							variant="outline"
							color="primary"
							shape="rounded"
							onClick={handleAddToCart}
						/>
					</div>
				</div>
			</div>
		</article>
	)
}

