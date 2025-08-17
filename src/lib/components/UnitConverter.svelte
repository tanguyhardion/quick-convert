<script lang="ts">
	import type { UnitCategory } from '../types';
	import { convertValue } from '../conversions';

	interface Props {
		category: UnitCategory;
	}

	let { category }: Props = $props();

	let inputValue = $state(0);
	let fromUnitIndex = $state(0);
	let toUnitIndex = $state(1);
	let result = $state(0);

	function handleConversion() {
		if (fromUnitIndex === toUnitIndex) {
			result = inputValue;
			return;
		}
		
		const fromUnit = category.units[fromUnitIndex];
		const toUnit = category.units[toUnitIndex];
		result = convertValue(inputValue, fromUnit, toUnit);
	}

	// Update conversion when any input changes
	$effect(() => {
		handleConversion();
	});
</script>

<div class="converter">
	<h4>{category.name} Converter</h4>
	
	<div class="conversion-row">
		<div class="input-group">
			<input
				type="number"
				bind:value={inputValue}
				placeholder="Enter value"
				step="any"
			/>
			<select bind:value={fromUnitIndex}>
				{#each category.units as unit, index}
					<option value={index}>{unit.name} ({unit.abbreviation})</option>
				{/each}
			</select>
		</div>
		
		<div class="equals">=</div>
		
		<div class="input-group">
			<input
				type="number"
				value={result.toFixed(3)}
				readonly
			/>
			<select bind:value={toUnitIndex}>
				{#each category.units as unit, index}
					<option value={index}>{unit.name} ({unit.abbreviation})</option>
				{/each}
			</select>
		</div>
	</div>

	<div class="mental-math-trick">
		<h5>💡 Mental Math Trick:</h5>
		<p>{category.mentalMathTrick}</p>
	</div>
</div>

<style>
	.converter {
		margin-bottom: 2rem;
	}

	h4 {
		margin: 0 0 1rem 0;
		color: #374151;
		font-size: 1.25rem;
		font-weight: 600;
	}

	.conversion-row {
		display: flex;
		align-items: center;
		gap: 1rem;
		margin-bottom: 1.5rem;
		flex-wrap: wrap;
	}

	.input-group {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		flex: 1;
		min-width: 200px;
	}

	.equals {
		font-size: 1.5rem;
		font-weight: bold;
		color: #6b7280;
		margin: 0 0.5rem;
	}

	input, select {
		padding: 0.75rem;
		border: 2px solid #d1d5db;
		border-radius: 0.5rem;
		font-size: 1rem;
		transition: border-color 0.2s ease;
	}

	input:focus, select:focus {
		outline: none;
		border-color: #3b82f6;
		box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
	}

	input[readonly] {
		background-color: #f9fafb;
		color: #374151;
		font-weight: 600;
	}

	.mental-math-trick {
		background-color: #eff6ff;
		border: 1px solid #bfdbfe;
		border-radius: 0.5rem;
		padding: 1rem;
	}

	.mental-math-trick h5 {
		margin: 0 0 0.5rem 0;
		color: #1d4ed8;
		font-size: 1rem;
		font-weight: 600;
	}

	.mental-math-trick p {
		margin: 0;
		color: #1e40af;
		line-height: 1.5;
	}

	@media (max-width: 640px) {
		.conversion-row {
			flex-direction: column;
		}
		
		.equals {
			transform: rotate(90deg);
		}
	}
</style>
