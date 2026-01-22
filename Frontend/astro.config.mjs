import { defineConfig } from 'astro/config'
import node from '@astrojs/node'
import solid from '@astrojs/solid-js'
import icon from 'astro-icon'

export default defineConfig({
	publicDir: './public',
	srcDir: './source',
	outDir: './build',

	adapter: node({
		mode: 'standalone'
	}),
	integrations: [
		solid(),
		icon({
			iconDir: 'source/shared/assets/icons'
		})
	],
	server: {
		host: true,
		port: 3000
	},
	devToolbar: {
		enabled: false
	},
	vite: {
		resolve: {
			alias: {
				"@app": "/source/app",
				"@pages": "/source/pages",
				"@widgets": "/source/widgets",
				"@features": "/source/features",
				"@entities": "/source/entities",
				"@shared": "/source/shared"
			}
		}
	}
})
