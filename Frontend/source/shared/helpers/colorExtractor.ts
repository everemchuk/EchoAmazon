import { FastAverageColor } from "fast-average-color"

export const colorExtractor = (img: HTMLImageElement, target: HTMLElement) => {
	// Guard against SSR
	if (typeof window === "undefined" || !img || !target) return

	try {
		// @ts-ignore
		const fac = new FastAverageColor()

		const processColor = async () => {
			try {
				// @ts-ignore
				const color = await fac.getColorAsync(img)
				target.style.setProperty("background", color.hex, "important")
			} catch (e) {
				console.error("Error extracting color:", e)
			}
		}

		if (img.complete) {
			processColor()
		} else {
			img.addEventListener("load", processColor)
		}
	} catch (e) {
		// handle instantiation errors if any
	}
}
