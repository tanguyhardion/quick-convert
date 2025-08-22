<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Card from '$lib/components/Card.svelte';
	import { resolve } from '$app/paths';
</script>

<svelte:head>
	<title>Quick Convert - Unit Conversion Trainer</title>
	<meta
		name="description"
		content="Learn unit conversions with mental math tricks and practice mode"
	/>
</svelte:head>

<div class="hero">
	<h1>
		<img src="/icon_dark.png" alt="Quick Convert" class="hero-icon" />
		Quick Convert
	</h1>
	<p class="subtitle">Master unit conversions with mental math tricks</p>

	<div class="hero-content">
		<p>
			Learn to convert between common units quickly and confidently. Our app teaches you mental math
			shortcuts and provides interactive practice to help you master length, weight, and temperature
			conversions.
		</p>
	</div>

	<div class="cta-buttons">
		<Button href={resolve('/conversions')} variant="primary" size="large">Start Converting</Button>
		<Button href={resolve('/practice')} variant="primary" size="large">Practice Mode</Button>
	</div>
</div>

<div class="features">
	<h2>What You'll Learn</h2>

	<div class="features-grid">
		<Card title="📏 Length Conversions">
			<p>Convert between feet/inches and centimeters/meters with ease.</p>
			<ul>
				<li>Feet ↔ Meters</li>
				<li>Inches ↔ Centimeters</li>
				<li>Quick estimation tricks</li>
			</ul>
		</Card>

		<Card title="⚖️ Weight Conversions">
			<p>Master the pounds to kilograms conversion and vice versa.</p>
			<ul>
				<li>Pounds ↔ Kilograms</li>
				<li>Mental math shortcuts</li>
				<li>Real-world examples</li>
			</ul>
		</Card>

		<Card title="🌡️ Temperature Conversions">
			<p>Switch between Fahrenheit and Celsius like a pro.</p>
			<ul>
				<li>Fahrenheit ↔ Celsius</li>
				<li>Quick estimation methods</li>
				<li>Key reference points</li>
			</ul>
		</Card>
	</div>
</div>

<div class="how-it-works">
	<h2>How It Works</h2>

	<div class="steps">
		<div class="step">
			<div class="step-number">1</div>
			<h3>Learn the Tricks</h3>
			<p>Each conversion comes with mental math shortcuts that make calculations quick and easy.</p>
		</div>

		<div class="step">
			<div class="step-number">2</div>
			<h3>Practice Conversions</h3>
			<p>Use our interactive calculators to get familiar with the conversions.</p>
		</div>

		<div class="step">
			<div class="step-number">3</div>
			<h3>Test Your Skills</h3>
			<p>Challenge yourself with random questions in practice mode and track your progress.</p>
		</div>
	</div>
</div>

<style>
	.hero {
		text-align: center;
		padding: 5rem 2rem;
		background: rgba(255, 255, 255, 0.8);
		border-radius: 32px;
		margin-bottom: 5rem;
		backdrop-filter: blur(20px);
		border: 1px solid rgba(255, 255, 255, 0.6);
		position: relative;
		overflow: hidden;
		box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
	}

	.hero::before {
		content: '';
		position: absolute;
		top: -50%;
		left: -50%;
		width: 200%;
		height: 200%;
		background: radial-gradient(circle, rgba(79, 70, 229, 0.05) 0%, transparent 70%);
		animation: float 6s ease-in-out infinite;
	}

	@keyframes float {
		0%,
		100% {
			transform: translate(-50%, -50%) rotate(0deg);
		}
		50% {
			transform: translate(-50%, -50%) rotate(180deg);
		}
	}

	h1 {
		font-size: 4.5rem;
		margin: 0 0 1rem 0;
		color: #1a202c;
		text-shadow: none;
		font-weight: 900;
		letter-spacing: -0.05em;
		position: relative;
		z-index: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 1rem;
	}

	.hero-icon {
		width: 80px;
		height: 80px;
		animation: float-icon 3s ease-in-out infinite;
	}

	@keyframes float-icon {
		0%,
		100% {
			transform: translateY(0px) rotate(0deg);
		}
		50% {
			transform: translateY(-10px) rotate(5deg);
		}
	}

	.subtitle {
		font-size: 1.75rem;
		color: #4a5568;
		margin: 0 0 2.5rem 0;
		font-weight: 600;
		position: relative;
		z-index: 1;
	}

	.hero-content {
		max-width: 700px;
		margin: 0 auto 3.5rem auto;
		color: #2d3748;
		font-size: 1.25rem;
		line-height: 1.7;
		position: relative;
		z-index: 1;
	}

	.cta-buttons {
		display: flex;
		gap: 1.5rem;
		justify-content: center;
		flex-wrap: wrap;
		position: relative;
		z-index: 1;
	}

	.features {
		margin-bottom: 5rem;
	}

	.features h2,
	.how-it-works h2 {
		text-align: center;
		color: #1a202c;
		font-size: 3rem;
		margin: 0 0 3.5rem 0;
		font-weight: 900;
		letter-spacing: -0.025em;
	}

	.features-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
		gap: 2.5rem;
	}

	.features-grid ul {
		margin: 1.5rem 0 0 0;
		padding-left: 1.5rem;
		color: #2d3748;
	}

	.features-grid li {
		margin: 0.75rem 0;
		font-weight: 500;
	}

	.how-it-works {
		background: rgba(255, 255, 255, 0.8);
		border-radius: 32px;
		padding: 5rem 2rem;
		backdrop-filter: blur(20px);
		border: 1px solid rgba(255, 255, 255, 0.6);
		position: relative;
		overflow: hidden;
		box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
	}

	.how-it-works::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background:
			radial-gradient(circle at 20% 80%, rgba(79, 70, 229, 0.05) 0%, transparent 50%),
			radial-gradient(circle at 80% 20%, rgba(5, 150, 105, 0.05) 0%, transparent 50%);
		pointer-events: none;
	}

	.steps {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: 3.5rem;
		max-width: 1000px;
		margin: 0 auto;
		position: relative;
		z-index: 1;
	}

	.step {
		text-align: center;
		color: #1a202c;
	}

	.step-number {
		display: inline-block;
		width: 4rem;
		height: 4rem;
		background: #4f46e5;
		color: white;
		border-radius: 50%;
		font-size: 1.75rem;
		font-weight: 900;
		line-height: 4rem;
		margin-bottom: 1.5rem;
		box-shadow: 0 12px 24px rgba(79, 70, 229, 0.3);
		transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
	}

	.step:hover .step-number {
		transform: scale(1.1) rotate(5deg);
		box-shadow: 0 20px 40px rgba(79, 70, 229, 0.4);
	}

	.step h3 {
		font-size: 1.5rem;
		margin: 0 0 1rem 0;
		color: #1a202c;
		font-weight: 700;
	}

	.step p {
		color: #2d3748;
		line-height: 1.7;
		font-size: 1.1rem;
	}

	@media (max-width: 768px) {
		.hero {
			padding: 3rem 1.5rem;
		}

		h1 {
			font-size: 3rem;
			flex-direction: column;
			gap: 0.5rem;
		}

		.hero-icon {
			width: 60px;
			height: 60px;
		}

		.subtitle {
			font-size: 1.4rem;
		}

		.hero-content {
			font-size: 1.125rem;
		}

		.cta-buttons {
			flex-direction: column;
			align-items: center;
		}

		.features h2,
		.how-it-works h2 {
			font-size: 2.5rem;
		}

		.how-it-works {
			padding: 3rem 1.5rem;
		}

		.step-number {
			width: 3.5rem;
			height: 3.5rem;
			line-height: 3.5rem;
			font-size: 1.5rem;
		}
	}
</style>
