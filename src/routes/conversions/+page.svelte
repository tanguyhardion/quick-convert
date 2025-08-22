<script lang="ts">
	import UnitConverter from '$lib/components/UnitConverter.svelte';
	import Card from '$lib/components/Card.svelte';
	import { unitCategories } from '$lib/conversions';
</script>

<svelte:head>
	<title>Unit Conversions - Quick Convert</title>
	<meta name="description" content="Interactive unit conversion calculators for length, weight, and temperature" />
</svelte:head>

<div class="page-header">
	<h1>🧮 Unit Conversions</h1>
	<p>Use these interactive calculators to convert between different units and learn the mental math tricks.</p>
</div>

<div class="converters">
	{#each unitCategories as category}
		<Card title={category.name}>
			<UnitConverter {category} />
		</Card>
	{/each}
</div>

<div class="tips-section">
	<Card title="💡 General Tips">
		<div class="tips-content">
			<h4>Master These Key Conversions:</h4>
			<ul>
				<li><strong>1 foot = 30.48 cm</strong> (roughly 30 cm for quick estimates)</li>
				<li><strong>1 pound = 0.454 kg</strong> (roughly half a kg)</li>
				<li><strong>32°F = 0°C</strong> and <strong>212°F = 100°C</strong></li>
			</ul>
			
			<h4>Practice Mental Math:</h4>
			<ul>
				<li>Round numbers for quick estimates first</li>
				<li>Learn the "anchor points" for each conversion</li>
				<li>Use proportional thinking (if 1 foot ≈ 30cm, then 2 feet ≈ 60cm)</li>
				<li>Practice with common everyday measurements</li>
			</ul>
		</div>
	</Card>
</div>

<style>
	.page-header {
		text-align: center;
		margin-bottom: 4rem;
		padding: 2rem;
		background: rgba(255, 255, 255, 0.8);
		border-radius: 32px;
		backdrop-filter: blur(20px);
		border: 1px solid rgba(255, 255, 255, 0.6);
		box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
	}

	.page-header h1 {
		font-size: 3.5rem;
		margin: 0 0 1rem 0;
		color: #1a202c;
		font-weight: 900;
		letter-spacing: -0.025em;
	}

	.page-header p {
		font-size: 1.375rem;
		color: #2d3748;
		max-width: 700px;
		margin: 0 auto;
		line-height: 1.7;
		font-weight: 500;
	}

	.converters {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
		gap: 2.5rem;
		margin-bottom: 4rem;
	}

	.tips-section {
		max-width: 900px;
		margin: 0 auto;
	}

	.tips-content h4 {
		color: #1a202c;
		margin: 0 0 1.5rem 0;
		font-size: 1.375rem;
		font-weight: 700;
	}

	.tips-content ul {
		margin: 0 0 2.5rem 0;
		padding-left: 1.5rem;
		color: #2d3748;
	}

	.tips-content li {
		margin: 0.75rem 0;
		line-height: 1.6;
		font-weight: 500;
	}

	.tips-content strong {
		color: #4f46e5;
		font-weight: 700;
	}

	@media (max-width: 768px) {
		.page-header {
			padding: 1.5rem;
		}

		.page-header h1 {
			font-size: 2.75rem;
		}

		.page-header p {
			font-size: 1.25rem;
		}

		.converters {
			grid-template-columns: 1fr;
		}
	}

	@media (max-width: 480px) {
		.converters {
			grid-template-columns: 1fr;
		}
	}
</style>
