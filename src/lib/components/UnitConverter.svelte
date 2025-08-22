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
			<input type="number" bind:value={inputValue} placeholder="Enter value" step="any" />
			<select bind:value={fromUnitIndex}>
				{#each category.units as unit, index}
					<option value={index}>{unit.name} ({unit.abbreviation})</option>
				{/each}
			</select>
		</div>

		<div class="equals">=</div>

		<div class="input-group">
			<input type="number" value={result.toFixed(3)} readonly />
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
		margin-bottom: 2.5rem;
	}

	h4 {
		margin: 0 0 1.5rem 0;
		color: #1a202c;
		font-size: 1.5rem;
		font-weight: 700;
	}

	.conversion-row {
		display: flex;
		align-items: center;
		gap: 1.5rem;
		margin-bottom: 2rem;
		flex-wrap: wrap;
	}

	.input-group {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		flex: 1;
		min-width: 220px;
	}

	.equals {
		font-size: 2rem;
		font-weight: 900;
		color: #4f46e5;
		margin: 0 0.5rem;
		transform: rotate(0deg);
		transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
	}

	.equals:hover {
		transform: rotate(180deg) scale(1.1);
	}

	input,
	select {
		padding: 1rem 1.25rem;
		border: 3px solid #e2e8f0;
		border-radius: 20px;
		font-size: 1.125rem;
		font-weight: 600;
		transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
		background: rgba(255, 255, 255, 0.9);
		backdrop-filter: blur(10px);
	}

	input:focus,
	select:focus {
		outline: none;
		border-color: #4f46e5;
		box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.2);
		background: white;
		transform: scale(1.02);
	}

	input[readonly] {
		background: rgba(79, 70, 229, 0.1);
		color: #1a202c;
		font-weight: 700;
		border-color: #4f46e5;
	}

	select {
		cursor: pointer;
		appearance: none;
		background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath fill='%234f46e5' d='M8 12L3 7h10z'/%3E%3C/svg%3E");
		background-repeat: no-repeat;
		background-position: right 1rem center;
		background-size: 1rem;
		padding-right: 3rem;
	}

	.mental-math-trick {
		background: rgba(79, 70, 229, 0.1);
		border: 2px solid rgba(79, 70, 229, 0.3);
		border-radius: 20px;
		padding: 1.5rem;
		position: relative;
		overflow: hidden;
	}

	.mental-math-trick::before {
		content: '';
		position: absolute;
		top: 0;
		left: -100%;
		width: 100%;
		height: 100%;
		background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
		transition: left 0.5s ease;
	}

	.mental-math-trick:hover::before {
		left: 100%;
	}

	.mental-math-trick h5 {
		margin: 0 0 0.75rem 0;
		color: #4f46e5;
		font-size: 1.125rem;
		font-weight: 700;
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.mental-math-trick p {
		margin: 0;
		color: #1a202c;
		line-height: 1.6;
		font-weight: 500;
	}

	@media (max-width: 640px) {
		.conversion-row {
			flex-direction: column;
		}

		.equals {
			transform: rotate(90deg);
			font-size: 1.5rem;
		}

		.equals:hover {
			transform: rotate(270deg) scale(1.1);
		}

		.input-group {
			min-width: 100%;
		}
	}
</style>
