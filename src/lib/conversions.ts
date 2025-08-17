import type { UnitCategory, ConversionUnit, PracticeQuestion } from './types';

// Length conversions (base: meters)
const lengthUnits: ConversionUnit[] = [
	{
		name: 'Meters',
		abbreviation: 'm',
		toBase: (value) => value,
		fromBase: (value) => value
	},
	{
		name: 'Centimeters',
		abbreviation: 'cm',
		toBase: (value) => value / 100,
		fromBase: (value) => value * 100
	},
	{
		name: 'Feet',
		abbreviation: 'ft',
		toBase: (value) => value * 0.3048,
		fromBase: (value) => value / 0.3048
	},
	{
		name: 'Inches',
		abbreviation: 'in',
		toBase: (value) => value * 0.0254,
		fromBase: (value) => value / 0.0254
	}
];

// Weight conversions (base: kilograms)
const weightUnits: ConversionUnit[] = [
	{
		name: 'Kilograms',
		abbreviation: 'kg',
		toBase: (value) => value,
		fromBase: (value) => value
	},
	{
		name: 'Pounds',
		abbreviation: 'lbs',
		toBase: (value) => value * 0.453592,
		fromBase: (value) => value / 0.453592
	}
];

// Temperature conversions (base: Celsius)
const temperatureUnits: ConversionUnit[] = [
	{
		name: 'Celsius',
		abbreviation: '°C',
		toBase: (value) => value,
		fromBase: (value) => value
	},
	{
		name: 'Fahrenheit',
		abbreviation: '°F',
		toBase: (value) => (value - 32) * 5/9,
		fromBase: (value) => (value * 9/5) + 32
	}
];

export const unitCategories: UnitCategory[] = [
	{
		name: 'Length',
		type: 'length',
		units: lengthUnits,
		mentalMathTrick: 'Remember: 1 foot ≈ 30cm (actually 30.48cm). For quick estimates, multiply feet by 3 to get rough decimeters, or use the "double and add 10%" rule for cm.'
	},
	{
		name: 'Weight',
		type: 'weight',
		units: weightUnits,
		mentalMathTrick: 'Quick trick: 1 pound ≈ 0.5kg (actually 0.454kg). To convert pounds to kg, divide by 2 and subtract 10%. For kg to pounds, double and add 10%.'
	},
	{
		name: 'Temperature',
		type: 'temperature',
		units: temperatureUnits,
		mentalMathTrick: 'Quick estimate: °F to °C = (°F - 30) ÷ 2. For exact: (°F - 32) × 5/9. Remember key points: 0°C = 32°F, 20°C = 68°F, 37°C = 98.6°F.'
	}
];

export function convertValue(value: number, fromUnit: ConversionUnit, toUnit: ConversionUnit): number {
	const baseValue = fromUnit.toBase(value);
	return toUnit.fromBase(baseValue);
}

export function generatePracticeQuestion(): PracticeQuestion {
	const category = unitCategories[Math.floor(Math.random() * unitCategories.length)];
	const fromUnit = category.units[Math.floor(Math.random() * category.units.length)];
	let toUnit = category.units[Math.floor(Math.random() * category.units.length)];
	
	// Ensure we're converting between different units
	while (toUnit === fromUnit) {
		toUnit = category.units[Math.floor(Math.random() * category.units.length)];
	}

	let value: number;
	let decimals: number;

	// Generate appropriate values and decimal precision based on unit type
	switch (category.type) {
		case 'length':
			if (fromUnit.abbreviation === 'ft') {
				value = Math.floor(Math.random() * 10) + 1; // 1-10 feet
				decimals = toUnit.abbreviation === 'm' ? 2 : 0; // 2 decimals for meters, 0 for cm
			} else if (fromUnit.abbreviation === 'm') {
				value = Math.round((Math.random() * 3 + 0.5) * 100) / 100; // 0.5-3.5 meters
				decimals = toUnit.abbreviation === 'ft' ? 1 : 0;
			} else if (fromUnit.abbreviation === 'cm') {
				value = Math.floor(Math.random() * 200) + 50; // 50-250 cm
				decimals = toUnit.abbreviation === 'm' ? 2 : 1;
			} else {
				value = Math.floor(Math.random() * 48) + 12; // 12-60 inches
				decimals = 1;
			}
			break;
		
		case 'weight':
			if (fromUnit.abbreviation === 'lbs') {
				value = Math.floor(Math.random() * 200) + 10; // 10-210 lbs
				decimals = value > 50 ? 0 : 1; // No decimals for heavy weights, 1 for light
			} else {
				value = Math.floor(Math.random() * 100) + 5; // 5-105 kg
				decimals = value > 25 ? 0 : 1;
			}
			break;
		
		case 'temperature':
			if (fromUnit.abbreviation === '°F') {
				value = Math.floor(Math.random() * 100) + 32; // 32-132°F
			} else {
				value = Math.floor(Math.random() * 50); // 0-50°C
			}
			decimals = 0; // Temperature conversions typically don't need decimals
			break;
	}

	const correctAnswer = convertValue(value, fromUnit, toUnit);

	return {
		value,
		fromUnit,
		toUnit,
		category,
		correctAnswer,
		decimals
	};
}

export function formatAnswer(value: number, decimals: number): string {
	return value.toFixed(decimals);
}

export function isAnswerClose(userAnswer: number, correctAnswer: number, tolerance: number = 0.1): boolean {
	return Math.abs(userAnswer - correctAnswer) <= tolerance;
}
