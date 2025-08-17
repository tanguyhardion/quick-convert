<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Card from '$lib/components/Card.svelte';
</script>

<svelte:head>
	<title>Quick Convert - Unit Conversion Trainer</title>
	<meta name="description" content="Learn unit conversions with mental math tricks and practice mode" />
</svelte:head>

<div class="hero">
	<h1>🔄 Quick Convert</h1>
	<p class="subtitle">Master unit conversions with mental math tricks</p>
	
	<div class="hero-content">
		<p>
			Learn to convert between common units quickly and confidently. 
			Our app teaches you mental math shortcuts and provides interactive practice 
			to help you master length, weight, and temperature conversions.
		</p>
	</div>

	<div class="cta-buttons">
		<Button href="/conversions" variant="primary" size="large">
			Start Converting
		</Button>
		<Button href="/practice" variant="primary" size="large">
			Practice Mode
		</Button>
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
		padding: 4rem 0;
		background: rgba(255, 255, 255, 0.1);
		border-radius: 2rem;
		margin-bottom: 4rem;
		backdrop-filter: blur(10px);
		border: 1px solid rgba(255, 255, 255, 0.2);
	}

	h1 {
		font-size: 3.5rem;
		margin: 0 0 1rem 0;
		color: white;
		text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	}

	.subtitle {
		font-size: 1.5rem;
		color: rgba(255, 255, 255, 0.9);
		margin: 0 0 2rem 0;
		font-weight: 300;
	}

	.hero-content {
		max-width: 600px;
		margin: 0 auto 3rem auto;
		color: rgba(255, 255, 255, 0.8);
		font-size: 1.125rem;
		line-height: 1.6;
	}

	.cta-buttons {
		display: flex;
		gap: 1rem;
		justify-content: center;
		flex-wrap: wrap;
	}

	.features {
		margin-bottom: 4rem;
	}

	.features h2,
	.how-it-works h2 {
		text-align: center;
		color: white;
		font-size: 2.5rem;
		margin: 0 0 3rem 0;
		text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	}

	.features-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 2rem;
	}

	.features-grid ul {
		margin: 1rem 0 0 0;
		padding-left: 1.5rem;
		color: #6b7280;
	}

	.features-grid li {
		margin: 0.5rem 0;
	}

	.how-it-works {
		background: rgba(255, 255, 255, 0.1);
		border-radius: 2rem;
		padding: 4rem 2rem;
		backdrop-filter: blur(10px);
		border: 1px solid rgba(255, 255, 255, 0.2);
	}

	.steps {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 3rem;
		max-width: 900px;
		margin: 0 auto;
	}

	.step {
		text-align: center;
		color: white;
	}

	.step-number {
		display: inline-block;
		width: 3rem;
		height: 3rem;
		background: linear-gradient(135deg, #3b82f6, #1d4ed8);
		color: white;
		border-radius: 50%;
		font-size: 1.5rem;
		font-weight: bold;
		line-height: 3rem;
		margin-bottom: 1rem;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
	}

	.step h3 {
		font-size: 1.25rem;
		margin: 0 0 1rem 0;
		color: white;
	}

	.step p {
		color: rgba(255, 255, 255, 0.8);
		line-height: 1.6;
	}

	@media (max-width: 768px) {
		.hero {
			padding: 2rem 1rem;
		}

		h1 {
			font-size: 2.5rem;
		}

		.subtitle {
			font-size: 1.25rem;
		}

		.cta-buttons {
			flex-direction: column;
			align-items: center;
		}

		.features h2,
		.how-it-works h2 {
			font-size: 2rem;
		}

		.how-it-works {
			padding: 2rem 1rem;
		}
	}
</style>
