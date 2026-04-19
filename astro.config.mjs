// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// Single configurable site title. Override by editing this value or by
// setting the TABULAKIT_TITLE environment variable at build time.
// OPORD 202604-019 acceptance criterion: "site title configurable via a
// single config value".
const SITE_TITLE = process.env.TABULAKIT_TITLE || 'TabulaKit v2';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: SITE_TITLE,
			// Starlight ships with a dark/light theme toggle by default — no config required.
			social: [
				{
					icon: 'github',
					label: 'GitHub',
					href: 'https://github.com/heatherstoneio/tabulakit-v2',
				},
			],
			sidebar: [
				{
					label: 'Guides',
					items: [
						{ label: 'Getting Started', slug: 'guides/getting-started' },
						{ label: 'How Do I…?', slug: 'guides/how-do-i' },
					],
				},
			],
		}),
	],
});
