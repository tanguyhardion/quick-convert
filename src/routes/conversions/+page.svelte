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
		margin-bottom: 3rem;
		color: white;
	}

	.page-header h1 {
		font-size: 3rem;
		margin: 0 0 1rem 0;
		text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	}

	.page-header p {
		font-size: 1.25rem;
		color: rgba(255, 255, 255, 0.8);
		max-width: 600px;
		margin: 0 auto;
		line-height: 1.6;
	}

	.converters {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
		gap: 2rem;
		margin-bottom: 3rem;
	}

	.tips-section {
		max-width: 800px;
		margin: 0 auto;
	}

	.tips-content h4 {
		color: #374151;
		margin: 0 0 1rem 0;
		font-size: 1.125rem;
	}

	.tips-content ul {
		margin: 0 0 2rem 0;
		padding-left: 1.5rem;
		color: #6b7280;
	}

	.tips-content li {
		margin: 0.5rem 0;
		line-height: 1.5;
	}

	.tips-content strong {
		color: #374151;
	}

	@media (max-width: 768px) {
		.page-header h1 {
			font-size: 2.5rem;
		}

		.page-header p {
			font-size: 1.125rem;
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
