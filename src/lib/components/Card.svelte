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
		background: white;
		border-radius: 1rem;
		padding: 2rem;
		box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
		border: 1px solid #e5e7eb;
		transition: transform 0.2s ease, box-shadow 0.2s ease;
	}

	.card:hover {
		transform: translateY(-2px);
		box-shadow: 0 8px 15px -3px rgba(0, 0, 0, 0.1);
	}

	h3 {
		margin: 0 0 1.5rem 0;
		color: #1f2937;
		font-size: 1.5rem;
		font-weight: 700;
	}
</style>
