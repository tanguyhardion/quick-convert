export type UnitType = 'length' | 'weight' | 'temperature';

export interface ConversionUnit {
	name: string;
	abbreviation: string;
	toBase: (value: number) => number;
	fromBase: (value: number) => number;
}

export interface UnitCategory {
	name: string;
	type: UnitType;
	units: ConversionUnit[];
	mentalMathTrick: string;
}

export interface PracticeQuestion {
	value: number;
	fromUnit: ConversionUnit;
	toUnit: ConversionUnit;
	category: UnitCategory;
	correctAnswer: number;
	decimals: number;
}

export interface PracticeSession {
	questions: PracticeQuestion[];
	currentQuestionIndex: number;
	score: number;
	isComplete: boolean;
}
