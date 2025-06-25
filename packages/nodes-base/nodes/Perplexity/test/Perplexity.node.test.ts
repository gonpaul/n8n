import { Perplexity } from '../../Perplexity/Perplexity.node';
import { description } from '../descriptions/chat/complete.operation';

jest.mock('../../Perplexity/GenericFunctions', () => ({
	getModels: jest.fn(),
}));

describe('Perplexity Node', () => {
	let node: Perplexity;

	beforeEach(() => {
		node = new Perplexity();
	});

	describe('Node Description', () => {
		it('should correctly include chat completion properties', () => {
			const properties = node.description.properties;

			expect(properties).toEqual(expect.arrayContaining(description));
		});
		it('should correctly set frequency penalty min value to 0', () => {
			const properties = node.description.properties;
			const optionsProperty = properties.find((property) => property.name === 'options');
			// We know optionsProperty and its .options exist
			const frequencyPenaltyOption = (optionsProperty as any).options.find(
				(option: any) => option.name === 'frequencyPenalty',
			);

			expect(frequencyPenaltyOption.default).toBe(0);
			expect(frequencyPenaltyOption.typeOptions.minValue).toBe(0);
		});
	});
});
