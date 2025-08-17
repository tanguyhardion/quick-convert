<script lang="ts">
	import PracticeQuestion from '$lib/components/PracticeQuestion.svelte';
	import Button from '$lib/components/Button.svelte';
	import Card from '$lib/components/Card.svelte';
	import { generatePracticeQuestion } from '$lib/conversions';
	import type { PracticeQuestion as PracticeQuestionType } from '$lib/types';

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
					<Button href="/conversions" variant="outline" size="medium">
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

	.start-screen {
		max-width: 600px;
		margin: 0 auto;
	}

	.session-setup {
		text-align: center;
	}

	.session-setup p {
		font-size: 1.125rem;
		color: #6b7280;
		margin-bottom: 2rem;
	}

	.difficulty-info {
		text-align: left;
		margin: 2rem 0;
		padding: 1.5rem;
		background-color: #f8fafc;
		border-radius: 0.5rem;
		border: 1px solid #e2e8f0;
	}

	.difficulty-info h4 {
		margin: 0 0 1rem 0;
		color: #374151;
	}

	.difficulty-info ul {
		margin: 0;
		padding-left: 1.5rem;
		color: #6b7280;
	}

	.difficulty-info li {
		margin: 0.5rem 0;
		line-height: 1.5;
	}

	.session-controls {
		margin: 2rem 0;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 1rem;
		flex-wrap: wrap;
	}

	.session-controls label {
		font-weight: 600;
		color: #374151;
	}

	.session-controls select {
		padding: 0.5rem 1rem;
		border: 2px solid #d1d5db;
		border-radius: 0.5rem;
		font-size: 1rem;
		background: white;
	}

	.session-controls select:focus {
		outline: none;
		border-color: #3b82f6;
	}

	.practice-session {
		max-width: 600px;
		margin: 0 auto;
	}

	.session-info {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 2rem;
		padding: 1rem 1.5rem;
		background: rgba(255, 255, 255, 0.95);
		border-radius: 1rem;
		backdrop-filter: blur(10px);
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
		flex-wrap: wrap;
		gap: 1rem;
	}

	.progress {
		flex: 1;
		min-width: 200px;
	}

	.progress span {
		display: block;
		font-weight: 600;
		color: #374151;
		margin-bottom: 0.5rem;
	}

	.progress-bar {
		width: 100%;
		height: 8px;
		background-color: #e5e7eb;
		border-radius: 4px;
		overflow: hidden;
	}

	.progress-fill {
		height: 100%;
		background: linear-gradient(135deg, #3b82f6, #1d4ed8);
		transition: width 0.3s ease;
	}

	.score {
		font-weight: 600;
		color: #374151;
		text-align: right;
	}

	.percentage {
		color: #6b7280;
		font-size: 0.875rem;
	}

	.session-complete {
		max-width: 500px;
		margin: 0 auto;
	}

	.results {
		text-align: center;
	}

	.final-score h3 {
		margin: 0 0 1rem 0;
		color: #374151;
		font-size: 1.5rem;
	}

	.percentage-score {
		font-size: 3rem;
		font-weight: bold;
		color: #3b82f6;
		margin-bottom: 1.5rem;
	}

	.score-message {
		font-size: 1.125rem;
		color: #6b7280;
		margin: 0 0 2rem 0;
		line-height: 1.6;
	}

	.actions {
		display: flex;
		gap: 1rem;
		justify-content: center;
		flex-wrap: wrap;
	}

	@media (max-width: 768px) {
		.page-header h1 {
			font-size: 2.5rem;
		}

		.page-header p {
			font-size: 1.125rem;
		}

		.session-info {
			flex-direction: column;
			text-align: center;
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
	}
</style>
