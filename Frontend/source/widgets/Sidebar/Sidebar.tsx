import { createSignal, onMount, onCleanup, For } from "solid-js"
import { Icon } from "@shared/ui/Icon/Icon"
import { Logo } from "@shared/ui/Logo/Logo"
import { Tooltip } from "@shared/ui/Tooltip/Tooltip"
import styles from "./Sidebar.module.sass"

interface SidebarProps {
	activePage?: string
}

const navItems = [
	{ name: "home", label: "Home", href: "/home", icon: "house-blank" },
	{ name: "store", label: "Store", href: "/store", icon: "shopping-bag" },
	{ name: "news", label: "News", href: "/news", icon: "newspaper" },
	{ name: "help", label: "Help Center", href: "/help", icon: "life-ring" },
	{ name: "cart", label: "Cart", href: "/cart", icon: "shopping-cart" },
]

export const Sidebar = (props: SidebarProps) => {
	const activePage = () => props.activePage || "home"
	const [cartCount, setCartCount] = createSignal(0)
	let cartIconRef: HTMLDivElement | undefined
	let cartCounterRef: HTMLSpanElement | undefined

	onMount(() => {
		const handleCartAdd = (e: any) => {
			// Increment
			const count = cartCount() + 1
			setCartCount(count)

			// Bump animation
			if (cartCounterRef && styles.bump) {
				cartCounterRef.classList.add(styles.bump)
				setTimeout(() => {
					if (cartCounterRef && styles.bump) cartCounterRef.classList.remove(styles.bump)
				}, 300)
			}

			// Fly Image Animation
			if (e.detail && e.detail.rect && e.detail.image) {
				const target = cartIconRef
				if (target) {
					const targetRect = target.getBoundingClientRect()
					const startRect = e.detail.rect

					const flyImg = document.createElement("img")
					flyImg.src = e.detail.image
					flyImg.style.position = "fixed"
					flyImg.style.left = `${startRect.left}px`
					flyImg.style.top = `${startRect.top}px`
					flyImg.style.width = `${startRect.width}px`
					flyImg.style.height = `${startRect.height}px`
					flyImg.style.objectFit = "contain"
					flyImg.style.zIndex = "9999"
					flyImg.style.pointerEvents = "none"
					flyImg.style.transition = "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)"
					flyImg.style.borderRadius = "12px"

					document.body.appendChild(flyImg)

					// Force reflow
					requestAnimationFrame(() => {
						flyImg.style.left = `${targetRect.left + targetRect.width / 2 - 12}px`
						flyImg.style.top = `${targetRect.top + targetRect.height / 2 - 12}px`
						flyImg.style.width = "24px"
						flyImg.style.height = "24px"
						flyImg.style.opacity = "0"
					})

					let finished = false
					flyImg.addEventListener("transitionend", () => {
						if (finished) return
						finished = true
						flyImg.remove()
					})
				}
			}
		}

		window.addEventListener("cart:add", handleCartAdd)
		onCleanup(() => {
			window.removeEventListener("cart:add", handleCartAdd)
		})
	})

	return (
		<aside class={styles.sidebar} id="sidebar">
			<div class={`${styles["sidebar-header"]} sidebar-header`}>
				<a href="/home" class={`${styles["logo-link"]} logo-link`}>
					<Logo width="100%" />
				</a>
			</div>

			<nav class={styles["sidebar-nav"]}>
				<ul>
					<For each={navItems}>
						{(item) => {
							const isActive = activePage() === item.name
							const iconBase = item.icon || item.name
							const iconName = isActive ? `${iconBase}-active` : iconBase

							return (
								<li>
									<a
										href={item.href}
										class={`${styles["nav-link"]} ${isActive ? styles.active : ""}`}
										aria-label={item.label}
									>
										<div
											class={styles["icon-container"]}
											ref={(el) => { if (item.name === "cart") cartIconRef = el }}
										>
											<Icon name={iconName} size={24} />
											{item.name === "cart" && (
												<span class={styles["cart-counter"]} ref={cartCounterRef}>
													{cartCount()}
												</span>
											)}
										</div>
										<Tooltip
											text={item.label}
											color={isActive ? "primary" : "regular"}
										/>
									</a>
								</li>
							)
						}}
					</For>
				</ul>
			</nav>

			<div class={styles["sidebar-footer"]}>
				<a
					href="/signin"
					class={`${styles["nav-link"]} ${activePage() === "signin" ? styles.active : ""}`}
					aria-label="Sign In"
				>
					<div class={styles["icon-container"]}>
						<Icon
							name={activePage() === "signin" ? "sign-in-active" : "sign-in"}
							size={24}
						/>
					</div>
					<Tooltip
						text="Sign In"
						color={activePage() === "signin" ? "primary" : "regular"}
					/>
				</a>
			</div>
		</aside>
	)
}
