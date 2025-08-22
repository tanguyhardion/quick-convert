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
			const hint =
				numAnswer > question.correctAnswer
					? 'Too high! Try a smaller number.'
					: 'Too low! Try a larger number.';
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

		<button onclick={handleSubmit} disabled={isComplete || !userAnswer.trim()} class="submit-btn">
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
		background: rgba(255, 255, 255, 0.95);
		backdrop-filter: blur(20px);
		border-radius: 32px;
		padding: 3rem;
		box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
		border: 1px solid rgba(255, 255, 255, 0.3);
		max-width: 600px;
		margin: 0 auto;
		position: relative;
		overflow: hidden;
	}

	.question-card::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 6px;
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

	.question h3 {
		margin: 0 0 1.5rem 0;
		color: #1a202c;
		font-size: 1.75rem;
		text-align: center;
		font-weight: 800;
	}

	.conversion-prompt {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 1rem;
		font-size: 1.75rem;
		margin-bottom: 3rem;
		flex-wrap: wrap;
	}

	.value {
		font-weight: 900;
		color: #1a202c;
		font-size: 2.5rem;
		text-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	}

	.unit {
		background: #4f46e5;
		padding: 0.5rem 1rem;
		border-radius: 16px;
		color: white;
		font-weight: 700;
		box-shadow: 0 4px 12px rgba(79, 70, 229, 0.3);
		transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
	}

	.unit:hover {
		transform: scale(1.05);
		box-shadow: 0 8px 20px rgba(79, 70, 229, 0.4);
	}

	.arrow {
		color: #059669;
		font-weight: 900;
		font-size: 2.5rem;
		transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
	}

	.answer-section {
		display: flex;
		gap: 1.5rem;
		margin-bottom: 2rem;
		align-items: flex-end;
	}

	.input-group {
		flex: 1;
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	input {
		flex: 1;
		padding: 1.25rem;
		border: 3px solid #e2e8f0;
		border-radius: 20px;
		font-size: 1.375rem;
		text-align: center;
		font-weight: 700;
		transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
		background: rgba(255, 255, 255, 0.9);
		backdrop-filter: blur(10px);
	}

	input:focus {
		outline: none;
		border-color: #4f46e5;
		box-shadow: 0 0 0 6px rgba(79, 70, 229, 0.2);
		transform: scale(1.02);
		background: white;
	}

	input:disabled {
		background: rgba(79, 70, 229, 0.1);
		color: #2d3748;
		border-color: #cbd5e0;
	}

	.unit-label {
		color: #2d3748;
		font-weight: 700;
		min-width: 50px;
		font-size: 1.125rem;
	}

	.submit-btn {
		padding: 1.25rem 2rem;
		background: #4f46e5;
		color: white;
		border: none;
		border-radius: 20px;
		font-weight: 700;
		cursor: pointer;
		transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
		font-size: 1.125rem;
		text-transform: uppercase;
		letter-spacing: 0.025em;
		box-shadow: 0 8px 20px rgba(79, 70, 229, 0.3);
	}

	.submit-btn:hover:not(:disabled) {
		background: #3730a3;
		transform: translateY(-3px) scale(1.02);
		box-shadow: 0 15px 30px rgba(79, 70, 229, 0.4);
	}

	.submit-btn:active:not(:disabled) {
		transform: translateY(-1px) scale(1.01);
	}

	.submit-btn:disabled {
		background: #cbd5e0;
		cursor: not-allowed;
		color: #9ca3af;
		box-shadow: none;
		transform: none;
	}

	.feedback {
		padding: 1.5rem;
		border-radius: 20px;
		text-align: center;
		font-weight: 700;
		margin-bottom: 1.5rem;
		font-size: 1.125rem;
		box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
		backdrop-filter: blur(10px);
		transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
	}

	.feedback.correct {
		background: rgba(34, 197, 94, 0.15);
		color: #166534;
		border: 2px solid rgba(34, 197, 94, 0.3);
	}

	.feedback.incorrect {
		background: rgba(239, 68, 68, 0.15);
		color: #dc2626;
		border: 2px solid rgba(239, 68, 68, 0.3);
	}

	.feedback.hint {
		background: rgba(245, 158, 11, 0.15);
		color: #d97706;
		border: 2px solid rgba(245, 158, 11, 0.3);
	}

	.mental-math-hint {
		margin-top: 1.5rem;
	}

	.mental-math-hint details {
		cursor: pointer;
	}

	.mental-math-hint summary {
		background: rgba(79, 70, 229, 0.1);
		color: #4f46e5;
		font-weight: 700;
		padding: 1rem 1.5rem;
		border-radius: 16px;
		border: 2px solid rgba(79, 70, 229, 0.2);
		transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
		list-style: none;
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 1.125rem;
	}

	.mental-math-hint summary::-webkit-details-marker {
		display: none;
	}

	.mental-math-hint summary::before {
		content: '▶';
		transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
	}

	.mental-math-hint[open] summary::before {
		transform: rotate(90deg);
	}

	.mental-math-hint summary:hover {
		background: rgba(79, 70, 229, 0.15);
		transform: translateY(-2px);
		box-shadow: 0 8px 20px rgba(79, 70, 229, 0.2);
	}

	.mental-math-hint p {
		margin: 1rem 0 0 0;
		padding: 1.5rem;
		background: rgba(255, 255, 255, 0.8);
		border: 2px solid rgba(79, 70, 229, 0.1);
		border-radius: 16px;
		color: #1a202c;
		line-height: 1.6;
		font-weight: 600;
		backdrop-filter: blur(10px);
	}

	@media (max-width: 640px) {
		.question-card {
			padding: 2rem;
		}

		.conversion-prompt {
			font-size: 1.5rem;
		}

		.value {
			font-size: 2rem;
		}

		.arrow {
			font-size: 2rem;
		}

		.answer-section {
			flex-direction: column;
			gap: 1rem;
		}

		.submit-btn {
			width: 100%;
		}

		input {
			font-size: 1.25rem;
			padding: 1rem;
		}
	}
</style>
