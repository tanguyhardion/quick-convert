<script lang="ts">
	import type { PracticeQuestion } from '../types';
	import { formatAnswer, isAnswerClose } from '../conversions';

	interface Props {
		question: PracticeQuestion;
		onAnswer: (correct: boolean) => void;
	}

	let { question, onAnswer }: Props = $props();

	let userAnswer = $state('');
	let attempts = $state(0);
	let feedback = $state('');
	let isCorrect = $state(false);
	let isComplete = $state(false);

	function handleSubmit() {
		if (isComplete) return;

		attempts++;
		const numAnswer = parseFloat(userAnswer);
		
		if (isNaN(numAnswer)) {
			feedback = 'Please enter a valid number';
			return;
		}

		const tolerance = question.decimals === 0 ? 1 : Math.pow(10, -question.decimals);
		const correct = isAnswerClose(numAnswer, question.correctAnswer, tolerance);

		if (correct) {
			isCorrect = true;
			isComplete = true;
			feedback = `Correct! ${formatAnswer(question.correctAnswer, question.decimals)} ${question.toUnit.abbreviation}`;
			onAnswer(true);
		} else if (attempts >= 3) {
			isComplete = true;
			feedback = `The correct answer is ${formatAnswer(question.correctAnswer, question.decimals)} ${question.toUnit.abbreviation}`;
			onAnswer(false);
		} else {
			const hint = numAnswer > question.correctAnswer ? 'Too high! Try a smaller number.' : 'Too low! Try a larger number.';
			feedback = `${hint} (Attempt ${attempts}/3)`;
		}
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Enter') {
			handleSubmit();
		}
	}

	// Reset state when question changes
	$effect(() => {
		userAnswer = '';
		attempts = 0;
		feedback = '';
		isCorrect = false;
		isComplete = false;
	});
</script>

<div class="question-card">
	<div class="question">
		<h3>Convert:</h3>
		<div class="conversion-prompt">
			<span class="value">{question.value}</span>
			<span class="unit">{question.fromUnit.abbreviation}</span>
			<span class="arrow">→</span>
			<span class="unit">{question.toUnit.abbreviation}</span>
		</div>
	</div>

	<div class="answer-section">
		<div class="input-group">
			<input
				type="number"
				bind:value={userAnswer}
				onkeydown={handleKeydown}
				placeholder="Your answer"
				disabled={isComplete}
				step="any"
			/>
			<span class="unit-label">{question.toUnit.abbreviation}</span>
		</div>

		<button 
			onclick={handleSubmit}
			disabled={isComplete || !userAnswer.trim()}
			class="submit-btn"
		>
			{isComplete ? 'Complete' : 'Submit'}
		</button>
	</div>

	{#if feedback}
		<div class="feedback {isCorrect ? 'correct' : attempts >= 3 ? 'incorrect' : 'hint'}">
			{feedback}
		</div>
	{/if}

	<div class="mental-math-hint">
		<details>
			<summary>💡 Need a hint?</summary>
			<p>{question.category.mentalMathTrick}</p>
		</details>
	</div>
</div>

<style>
	.question-card {
		background: white;
		border-radius: 1rem;
		padding: 2rem;
		box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
		border: 1px solid #e5e7eb;
		max-width: 500px;
		margin: 0 auto;
	}

	.question h3 {
		margin: 0 0 1rem 0;
		color: #374151;
		font-size: 1.25rem;
		text-align: center;
	}

	.conversion-prompt {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.75rem;
		font-size: 1.5rem;
		margin-bottom: 2rem;
		flex-wrap: wrap;
	}

	.value {
		font-weight: bold;
		color: #1f2937;
		font-size: 2rem;
	}

	.unit {
		background-color: #f3f4f6;
		padding: 0.25rem 0.75rem;
		border-radius: 0.375rem;
		color: #6b7280;
		font-weight: 600;
	}

	.arrow {
		color: #3b82f6;
		font-weight: bold;
		font-size: 2rem;
	}

	.answer-section {
		display: flex;
		gap: 1rem;
		margin-bottom: 1rem;
		align-items: flex-end;
	}

	.input-group {
		flex: 1;
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	input {
		flex: 1;
		padding: 0.75rem;
		border: 2px solid #d1d5db;
		border-radius: 0.5rem;
		font-size: 1.125rem;
		text-align: center;
	}

	input:focus {
		outline: none;
		border-color: #3b82f6;
		box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
	}

	input:disabled {
		background-color: #f9fafb;
		color: #6b7280;
	}

	.unit-label {
		color: #6b7280;
		font-weight: 600;
		min-width: 40px;
	}

	.submit-btn {
		padding: 0.75rem 1.5rem;
		background-color: #3b82f6;
		color: white;
		border: none;
		border-radius: 0.5rem;
		font-weight: 600;
		cursor: pointer;
		transition: background-color 0.2s ease;
	}

	.submit-btn:hover:not(:disabled) {
		background-color: #2563eb;
	}

	.submit-btn:disabled {
		background-color: #9ca3af;
		cursor: not-allowed;
	}

	.feedback {
		padding: 1rem;
		border-radius: 0.5rem;
		text-align: center;
		font-weight: 600;
		margin-bottom: 1rem;
	}

	.feedback.correct {
		background-color: #dcfce7;
		color: #166534;
		border: 1px solid #bbf7d0;
	}

	.feedback.incorrect {
		background-color: #fee2e2;
		color: #dc2626;
		border: 1px solid #fecaca;
	}

	.feedback.hint {
		background-color: #fef3c7;
		color: #d97706;
		border: 1px solid #fed7aa;
	}

	.mental-math-hint {
		margin-top: 1rem;
	}

	.mental-math-hint details {
		cursor: pointer;
	}

	.mental-math-hint summary {
		color: #3b82f6;
		font-weight: 600;
		padding: 0.5rem;
		border-radius: 0.375rem;
		background-color: #eff6ff;
		border: 1px solid #bfdbfe;
	}

	.mental-math-hint summary:hover {
		background-color: #dbeafe;
	}

	.mental-math-hint p {
		margin: 0.5rem 0 0 0;
		padding: 1rem;
		background-color: #f8fafc;
		border: 1px solid #e2e8f0;
		border-radius: 0.375rem;
		color: #475569;
		line-height: 1.5;
	}

	@media (max-width: 640px) {
		.conversion-prompt {
			font-size: 1.25rem;
		}

		.value {
			font-size: 1.75rem;
		}

		.arrow {
			font-size: 1.5rem;
		}

		.answer-section {
			flex-direction: column;
		}
	}
</style>
