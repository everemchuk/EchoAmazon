import { FastAverageColor } from "fast-average-color"

// @ts-ignore
const fac = new FastAverageColor()

export const colorExtractor = (img: HTMLImageElement, target: HTMLElement) => {
	if (!img || !target) return

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
}
