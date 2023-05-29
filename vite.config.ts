import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		fs: {
			allow: ['..'] // importing config.ts in src errors out for some weird reasons, so just allowing the whole dir above src fixes the issue
		}
	}
});
