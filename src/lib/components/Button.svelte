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
		padding: 1rem 2rem;
		border-radius: 24px;
		text-decoration: none;
		font-weight: 700;
		text-align: center;
		transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
		cursor: pointer;
		border: none;
		background: none;
		font-family: inherit;
		font-size: inherit;
		position: relative;
		overflow: hidden;
		letter-spacing: 0.025em;
		text-transform: uppercase;
		font-size: 0.875rem;
	}

	.button::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		border-radius: 24px;
		transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
		z-index: -1;
	}

	.primary {
		background: #4f46e5;
		color: white;
		box-shadow: 0 8px 25px rgba(79, 70, 229, 0.3);
	}

	.primary:hover {
		background: #3730a3;
		transform: translateY(-3px) scale(1.02);
		box-shadow: 0 15px 35px rgba(79, 70, 229, 0.4);
	}

	.primary:active {
		transform: translateY(-1px) scale(1.01);
	}

	.secondary {
		background: #059669;
		color: white;
		box-shadow: 0 8px 25px rgba(5, 150, 105, 0.3);
	}

	.secondary:hover {
		background: #047857;
		transform: translateY(-3px) scale(1.02);
		box-shadow: 0 15px 35px rgba(5, 150, 105, 0.4);
	}

	.outline {
		background: rgba(255, 255, 255, 0.9);
		color: #4f46e5;
		border: 3px solid #4f46e5;
		backdrop-filter: blur(10px);
	}

	.outline:hover {
		background: #4f46e5;
		color: white;
		transform: translateY(-3px) scale(1.02);
		box-shadow: 0 15px 35px rgba(79, 70, 229, 0.4);
	}

	.small {
		padding: 0.75rem 1.5rem;
		font-size: 0.75rem;
		border-radius: 20px;
	}

	.medium {
		padding: 1rem 2rem;
		font-size: 0.875rem;
		border-radius: 24px;
	}

	.large {
		padding: 1.25rem 2.5rem;
		font-size: 1rem;
		border-radius: 28px;
	}

	@keyframes bounce {
		0%, 20%, 53%, 80%, 100% {
			transform: translate3d(0, 0, 0);
		}
		40%, 43% {
			transform: translate3d(0, -8px, 0);
		}
		70% {
			transform: translate3d(0, -4px, 0);
		}
		90% {
			transform: translate3d(0, -2px, 0);
		}
	}

	.button:focus {
		outline: none;
		animation: bounce 1s ease;
	}
</style>
