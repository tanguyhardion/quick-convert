<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import { page } from '$app/state';
	import { resolve } from '$app/paths';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<nav>
	<div class="nav-container">
		<a href={resolve('/')} class="logo">🔄 Quick Convert</a>
		<div class="nav-links">
			<a href={resolve('/')} class:active={page.url.pathname === '/'}>Home</a>
			<a href={resolve('/conversions')} class:active={page.url.pathname === '/conversions'}>Conversions</a>
			<a href={resolve('/practice')} class:active={page.url.pathname === '/practice'}>Practice</a>
		</div>
	</div>
</nav>

<main>
	{@render children?.()}
</main>

<style>
	:global(body) {
		margin: 0;
		padding: 0;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		min-height: 100vh;
		color: #1f2937;
	}

	:global(*) {
		box-sizing: border-box;
	}

	nav {
		background: rgba(255, 255, 255, 0.95);
		backdrop-filter: blur(10px);
		border-bottom: 1px solid rgba(255, 255, 255, 0.2);
		position: sticky;
		top: 0;
		z-index: 100;
	}

	.nav-container {
		max-width: 1200px;
		margin: 0 auto;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 1rem 2rem;
	}

	.logo {
		font-size: 1.5rem;
		font-weight: bold;
		color: #3b82f6;
		text-decoration: none;
		transition: color 0.2s ease;
	}

	.logo:hover {
		color: #2563eb;
	}

	.nav-links {
		display: flex;
		gap: 2rem;
	}

	.nav-links a {
		text-decoration: none;
		color: #6b7280;
		font-weight: 500;
		padding: 0.5rem 1rem;
		border-radius: 0.5rem;
		transition: all 0.2s ease;
	}

	.nav-links a:hover,
	.nav-links a.active {
		color: #3b82f6;
		background-color: rgba(59, 130, 246, 0.1);
	}

	main {
		max-width: 1200px;
		margin: 0 auto;
		padding: 2rem;
		min-height: calc(100vh - 80px);
	}

	@media (max-width: 768px) {
		.nav-container {
			padding: 1rem;
		}

		.nav-links {
			gap: 1rem;
		}

		.nav-links a {
			padding: 0.5rem 0.75rem;
			font-size: 0.875rem;
		}

		main {
			padding: 1rem;
		}
	}
</style>
