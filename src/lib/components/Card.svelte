<script lang="ts">
	interface Props {
		title: string;
		children: any;
	}

	let { title, children }: Props = $props();
</script>

<div class="card">
	<h3>{title}</h3>
	{@render children()}
</div>

<style>
	.card {
		background: rgba(255, 255, 255, 0.95);
		backdrop-filter: blur(20px);
		border-radius: 24px;
		padding: 2.5rem;
		box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
		border: 1px solid rgba(255, 255, 255, 0.3);
		transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
		position: relative;
		overflow: hidden;
	}

	.card::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 4px;
		background: #4f46e5;
	}

	@keyframes shimmer {
		0% {
			background-position: -200% 0;
		}
		100% {
			background-position: 200% 0;
		}
	}

	.card:hover {
		transform: translateY(-8px) scale(1.02);
		box-shadow: 0 30px 60px rgba(0, 0, 0, 0.15);
		background: rgba(255, 255, 255, 0.98);
	}

	h3 {
		margin: 0 0 1.5rem 0;
		color: #1a202c;
		font-size: 1.75rem;
		font-weight: 800;
		letter-spacing: -0.025em;
	}
</style>
