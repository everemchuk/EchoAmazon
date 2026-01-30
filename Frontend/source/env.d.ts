/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

declare module "*.module.sass" {
	const classes: { [key: string]: string }
	export default classes
}

declare module "*.module.scss" {
	const classes: { [key: string]: string }
	export default classes
}

declare module "*.module.css" {
	const classes: { [key: string]: string }
	export default classes
}
