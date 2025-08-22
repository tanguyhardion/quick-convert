<script lang="ts">
	import favicon from '$lib/assets/favicon.ico';
	import icon from '$lib/assets/icon.png';
	import { page } from '$app/state';
	import { resolve } from '$app/paths';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<nav>
	<div class="nav-container">
		<a href={resolve('/')} class="logo">
			<img src={icon} alt="Quick Convert" class="logo-icon" />
			Quick Convert
		</a>
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
		font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, 'Inter', sans-serif;
		background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e0 100%);
		min-height: 100vh;
		color: #1a202c;
		line-height: 1.6;
	}

	:global(*) {
		box-sizing: border-box;
	}

	nav {
		background: rgba(255, 255, 255, 0.98);
		backdrop-filter: blur(20px);
		border-bottom: none;
		position: sticky;
		top: 0;
		z-index: 100;
		box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
		border-radius: 0 0 24px 24px;
	}

	.nav-container {
		max-width: 1200px;
		margin: 0 auto;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 1.25rem 2rem;
	}

	.logo {
		font-size: 1.75rem;
		font-weight: 800;
		color: #4f46e5;
		text-decoration: none;
		transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
		letter-spacing: -0.025em;
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.logo-icon {
		width: 32px;
		height: 32px;
		transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
	}

	.logo:hover {
		transform: scale(1.05);
		color: #3730a3;
	}

	.nav-links {
		display: flex;
		gap: 0.5rem;
	}

	.nav-links a {
		text-decoration: none;
		color: #4a5568;
		font-weight: 600;
		padding: 0.75rem 1.25rem;
		border-radius: 16px;
		transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
		position: relative;
		overflow: hidden;
	}

	.nav-links a::before {
		content: '';
		position: absolute;
		top: 0;
		left: -100%;
		width: 100%;
		height: 100%;
		background: #4f46e5;
		transition: left 0.3s cubic-bezier(0.4, 0, 0.2, 1);
		z-index: -1;
		border-radius: 16px;
	}

	.nav-links a:hover::before,
	.nav-links a.active::before {
		left: 0;
	}

	.nav-links a:hover,
	.nav-links a.active {
		color: white;
		transform: translateY(-2px);
		box-shadow: 0 8px 25px rgba(79, 70, 229, 0.3);
	}

	main {
		max-width: 1200px;
		margin: 0 auto;
		padding: 2rem;
		min-height: calc(100vh - 100px);
	}

	@media (max-width: 768px) {
		.nav-container {
			padding: 1rem;
		}

		.logo {
			font-size: 1.5rem;
		}

		.logo-icon {
			width: 24px;
			height: 24px;
		}

		.nav-links {
			gap: 0.25rem;
		}

		.nav-links a {
			padding: 0.5rem 1rem;
			font-size: 0.875rem;
		}

		main {
			padding: 1rem;
		}
	}
</style>
