import { atom } from 'nanostores'

export interface Product {
	id: string
	title: string
	brand: string
	price: string
	image: string
	rating: number
	description?: string
	selectedSize?: string
}

export const isProductViewOpen = atom(false)
export const activeProduct = atom<Product | null>(null)

export const setProductViewOpen = (isOpen: boolean) => isProductViewOpen.set(isOpen)
export const setActiveProduct = (product: Product | null) => activeProduct.set(product)
