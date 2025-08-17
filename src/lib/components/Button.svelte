<script lang="ts">
	interface Props {
		href?: string;
		onclick?: () => void;
		variant?: 'primary' | 'secondary' | 'outline';
		size?: 'small' | 'medium' | 'large';
		children: any;
	}

	let { href, onclick, variant = 'primary', size = 'medium', children }: Props = $props();
</script>

{#if href}
	<a {href} class="button {variant} {size}">
		{@render children()}
	</a>
{:else}
	<button {onclick} class="button {variant} {size}">
		{@render children()}
	</button>
{/if}

<style>
	.button {
		display: inline-block;
		padding: 0.75rem 1.5rem;
		border-radius: 0.5rem;
		text-decoration: none;
		font-weight: 600;
		text-align: center;
		transition: all 0.2s ease;
		cursor: pointer;
		border: 2px solid transparent;
		background: none;
		font-family: inherit;
		font-size: inherit;
	}

	.primary {
		background-color: #3b82f6;
		color: white;
	}

	.primary:hover {
		background-color: #2563eb;
		transform: translateY(-1px);
	}

	.secondary {
		background-color: #6b7280;
		color: white;
	}

	.secondary:hover {
		background-color: #4b5563;
		transform: translateY(-1px);
	}

	.outline {
		background-color: transparent;
		color: #3b82f6;
		border-color: #3b82f6;
	}

	.outline:hover {
		background-color: #3b82f6;
		color: white;
		transform: translateY(-1px);
	}

	.small {
		padding: 0.5rem 1rem;
		font-size: 0.875rem;
	}

	.medium {
		padding: 0.75rem 1.5rem;
		font-size: 1rem;
	}

	.large {
		padding: 1rem 2rem;
		font-size: 1.125rem;
	}
</style>
