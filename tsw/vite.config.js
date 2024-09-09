import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
	build: {
		rollupOptions: {
			input: {
				// site urls for nav, start in the site folder other then index, index defacto redirects on apps
				main: resolve(__dirname, 'index.html'),
				about: resolve(__dirname, 'site/about.html'),
			},
		},
	},
})