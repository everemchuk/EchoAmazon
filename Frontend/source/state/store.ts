import { atom, map } from 'nanostores'

export interface CartItem {
	id: string
	name: string
	price: number
	quantity: number
	image: string
}

export const isCartOpen = atom(false)
export const cartItems = map<Record<string, CartItem>>({})

export function addCartItem(item: CartItem) {
	const existingEntry = cartItems.get()[item.id]
	if (existingEntry) {
		cartItems.setKey(item.id, {
			...existingEntry,
			quantity: existingEntry.quantity + item.quantity,
		})
	} else {
		cartItems.setKey(item.id, item)
	}
}

export function removeCartItem(itemId: string) {
	const currentItems = cartItems.get()
	const { [itemId]: _, ...rest } = currentItems
	cartItems.set(rest)
}
