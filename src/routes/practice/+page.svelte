<script lang="ts">
	import PracticeQuestion from '$lib/components/PracticeQuestion.svelte';
	import Button from '$lib/components/Button.svelte';
	import Card from '$lib/components/Card.svelte';
	import { generatePracticeQuestion } from '$lib/conversions';
	import type { PracticeQuestion as PracticeQuestionType } from '$lib/types';
	import { resolve } from '$app/paths';

	let currentQuestion = $state<PracticeQuestionType | null>(null);
	let score = $state(0);
	let totalQuestions = $state(0);
	let isSessionActive = $state(false);
	let sessionComplete = $state(false);
	let questionsPerSession = $state(10);

	function startNewSession() {
		score = 0;
		totalQuestions = 0;
		sessionComplete = false;
		isSessionActive = true;
		generateNewQuestion();
	}

	function generateNewQuestion() {
		if (totalQuestions >= questionsPerSession) {
			endSession();
			return;
		}
		currentQuestion = generatePracticeQuestion();
	}

	function handleAnswer(correct: boolean) {
		if (correct) {
			score++;
		}
		totalQuestions++;
		
		// Small delay before next question for better UX
		setTimeout(() => {
			generateNewQuestion();
		}, 1500);
	}

	function endSession() {
		isSessionActive = false;
		sessionComplete = true;
		currentQuestion = null;
	}

	function getScoreMessage(): string {
		const percentage = Math.round((score / totalQuestions) * 100);
		if (percentage >= 90) return "🎉 Excellent! You're a conversion master!";
		if (percentage >= 75) return "👏 Great job! You're getting the hang of it!";
		if (percentage >= 60) return "👍 Good work! Keep practicing to improve!";
		if (percentage >= 40) return "📚 Not bad! Review the mental math tricks and try again!";
		return "💪 Keep practicing! The more you do it, the easier it gets!";
	}
</script>

<svelte:head>
	<title>Practice Mode - Quick Convert</title>
	<meta name="description" content="Test your unit conversion skills with random practice questions" />
</svelte:head>

<div class="page-header">
	<h1>🎯 Practice Mode</h1>
	<p>Test your conversion skills with random questions. You'll get 3 attempts per question with helpful hints!</p>
</div>

{#if !isSessionActive && !sessionComplete}
	<div class="start-screen">
		<Card title="Ready to Practice?">
			<div class="session-setup">
				<p>Challenge yourself with {questionsPerSession} random conversion questions.</p>
				
				<div class="difficulty-info">
					<h4>What to Expect:</h4>
					<ul>
						<li>Random conversions between length, weight, and temperature units</li>
						<li>3 attempts per question with "higher/lower" hints</li>
						<li>Mental math trick hints available</li>
						<li>Appropriate decimal precision for each unit type</li>
					</ul>
				</div>

				<div class="session-controls">
					<label for="questions-count">Questions per session:</label>
					<select id="questions-count" bind:value={questionsPerSession}>
						<option value={5}>5 Questions</option>
						<option value={10}>10 Questions</option>
						<option value={15}>15 Questions</option>
						<option value={20}>20 Questions</option>
					</select>
				</div>

				<Button onclick={startNewSession} variant="primary" size="large">
					Start Practice Session
				</Button>
			</div>
		</Card>
	</div>
{/if}

{#if isSessionActive && currentQuestion}
	<div class="practice-session">
		<div class="session-info">
			<div class="progress">
				<span>Question {totalQuestions + 1} of {questionsPerSession}</span>
				<div class="progress-bar">
					<div 
						class="progress-fill" 
						style="width: {((totalQuestions) / questionsPerSession) * 100}%"
					></div>
				</div>
			</div>
			<div class="score">
				Score: {score}/{totalQuestions}
				{#if totalQuestions > 0}
					<span class="percentage">({Math.round((score / totalQuestions) * 100)}%)</span>
				{/if}
			</div>
		</div>

		<PracticeQuestion 
			question={currentQuestion} 
			onAnswer={handleAnswer}
		/>
	</div>
{/if}

{#if sessionComplete}
	<div class="session-complete">
		<Card title="🎊 Session Complete!">
			<div class="results">
				<div class="final-score">
					<h3>Final Score: {score}/{totalQuestions}</h3>
					<div class="percentage-score">
						{Math.round((score / totalQuestions) * 100)}%
					</div>
				</div>

				<p class="score-message">{getScoreMessage()}</p>

				<div class="actions">
					<Button onclick={startNewSession} variant="primary" size="large">
						Practice Again
					</Button>
					<Button href={resolve('/conversions')} variant="outline" size="medium">
						Review Conversions
					</Button>
				</div>
			</div>
		</Card>
	</div>
{/if}

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

	.start-screen {
		max-width: 700px;
		margin: 0 auto;
	}

	.session-setup {
		text-align: center;
	}

	.session-setup p {
		font-size: 1.25rem;
		color: #2d3748;
		margin-bottom: 2.5rem;
		font-weight: 500;
	}

	.difficulty-info {
		text-align: left;
		margin: 2.5rem 0;
		padding: 2rem;
		background: rgba(79, 70, 229, 0.1);
		border-radius: 20px;
		border: 2px solid rgba(79, 70, 229, 0.2);
		position: relative;
		overflow: hidden;
	}

	.difficulty-info::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 4px;
		background: #4f46e5;
	}

	@keyframes shimmer {
		0% { background-position: -200% 0; }
		100% { background-position: 200% 0; }
	}

	.difficulty-info h4 {
		margin: 0 0 1.5rem 0;
		color: #1a202c;
		font-weight: 700;
		font-size: 1.25rem;
	}

	.difficulty-info ul {
		margin: 0;
		padding-left: 1.5rem;
		color: #2d3748;
	}

	.difficulty-info li {
		margin: 0.75rem 0;
		line-height: 1.6;
		font-weight: 500;
	}

	.session-controls {
		margin: 2.5rem 0;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 1.5rem;
		flex-wrap: wrap;
	}

	.session-controls label {
		font-weight: 700;
		color: #1a202c;
		font-size: 1.125rem;
	}

	.session-controls select {
		padding: 0.75rem 1.25rem;
		border: 3px solid #e2e8f0;
		border-radius: 16px;
		font-size: 1rem;
		font-weight: 600;
		background: rgba(255, 255, 255, 0.9);
		backdrop-filter: blur(10px);
		cursor: pointer;
		transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
	}

	.session-controls select:focus {
		outline: none;
		border-color: #4f46e5;
		box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.2);
		transform: scale(1.02);
	}

	.practice-session {
		max-width: 700px;
		margin: 0 auto;
	}

	.session-info {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 2.5rem;
		padding: 1.5rem 2rem;
		background: rgba(255, 255, 255, 0.98);
		border-radius: 24px;
		backdrop-filter: blur(20px);
		box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
		flex-wrap: wrap;
		gap: 1.5rem;
		border: 1px solid rgba(255, 255, 255, 0.3);
	}

	.progress {
		flex: 1;
		min-width: 220px;
	}

	.progress span {
		display: block;
		font-weight: 700;
		color: #1a202c;
		margin-bottom: 0.75rem;
		font-size: 1.125rem;
	}

	.progress-bar {
		width: 100%;
		height: 12px;
		background: #e2e8f0;
		border-radius: 8px;
		overflow: hidden;
		box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
	}

	.progress-fill {
		height: 100%;
		background: #4f46e5;
		transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1);
		box-shadow: 0 2px 8px rgba(79, 70, 229, 0.3);
	}

	.score {
		font-weight: 700;
		color: #1a202c;
		text-align: right;
		font-size: 1.125rem;
	}

	.percentage {
		color: #4f46e5;
		font-size: 1rem;
		font-weight: 600;
	}

	.session-complete {
		max-width: 600px;
		margin: 0 auto;
	}

	.results {
		text-align: center;
	}

	.final-score h3 {
		margin: 0 0 1.5rem 0;
		color: #1a202c;
		font-size: 2rem;
		font-weight: 800;
	}

	.percentage-score {
		font-size: 4rem;
		font-weight: 900;
		color: #4f46e5;
		margin-bottom: 2rem;
	}

	.score-message {
		font-size: 1.375rem;
		color: #2d3748;
		margin: 0 0 3rem 0;
		line-height: 1.6;
		font-weight: 600;
	}

	.actions {
		display: flex;
		gap: 1.5rem;
		justify-content: center;
		flex-wrap: wrap;
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

		.session-info {
			flex-direction: column;
			text-align: center;
			padding: 1.25rem 1.5rem;
		}

		.score {
			text-align: center;
		}

		.session-controls {
			flex-direction: column;
		}

		.actions {
			flex-direction: column;
		}

		.percentage-score {
			font-size: 3rem;
		}

		.difficulty-info {
			padding: 1.5rem;
		}
	}
</style>
