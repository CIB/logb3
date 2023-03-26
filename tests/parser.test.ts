import { Quantifier } from '@src/quantifier';
import { parser } from '@src/parser/parser'; // Import the parser

describe('parser', () => {
  it('should parse a simple logical statement', () => {
    // Logical statement: ∀x∈People.P(x)
    const input = '∀x∈S.P(x)';

    const result = parser.parse(input);
    const expectedResult: Quantifier = {
      type: 'Quantifier',
      quantifier: '∀',
      variable: 'x',
      set: {
        type: 'NamedSet',
        name: 'S',
      },
      statement: {
        type: 'Relation',
        predicate: 'P',
        tuple: [{ type: 'NamedEntity', name: 'x' }],
      },
    };

    console.log(JSON.stringify(result));

    expect(result).toEqual(expectedResult);
  });
});
