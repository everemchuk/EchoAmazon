import { defineConfig } from 'astro/config'
import solid from '@astrojs/solid-js'
import node from '@astrojs/node'

export default defineConfig({
	publicDir: './public',
	srcDir: './source',
	outDir: './build',

	adapter: node({
		mode: 'standalone'
	}),
	integrations: [solid()],
	server: {
		port: 3000,
		host: true,
	},
	devToolbar: {
		enabled: false
	}
})
