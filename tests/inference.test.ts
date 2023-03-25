import { Dictionary } from 'lodash';
import { KnowledgeBase, runInference } from '../src/inference';
import { andInference } from '../src/boolean';
import { EntityDescription, Statement } from '../src/statement';

describe('runInference', () => {
  it('should correctly apply the and inference rule', () => {
    // Create statements for "John is a programmer" and "John is a mathematician"
    const johnProgrammer: Statement = {
      type: 'Relation',
      predicate: 'is',
      tuple: [
        { type: 'NamedEntity', name: 'John' },
        { type: 'NamedEntity', name: 'Programmer' },
      ],
    };

    const johnMathematician: Statement = {
      type: 'Relation',
      predicate: 'is',
      tuple: [
        { type: 'NamedEntity', name: 'John' },
        { type: 'NamedEntity', name: 'Mathematician' },
      ],
    };

    // Create a knowledge base with the two initial statements
    const kb: KnowledgeBase = {
      statements: [johnProgrammer, johnMathematician],
    };

    // Create a dictionary of substitutions for our inference rule
    const substitutions: Dictionary<EntityDescription> = {
      X: johnProgrammer,
      Y: johnMathematician,
    };

    // Run the 'and' inference on the knowledge base
    runInference(kb, andInference, substitutions);

    // Create the expected inferred 'and' statement
    const inferredAnd: Statement = {
      type: 'Relation',
      predicate: '∧',
      tuple: [johnProgrammer, johnMathematician],
    };

    // Check if the knowledge base contains both initial statements and the inferred 'and' statement after the inference
    const expectedResult = [johnProgrammer, johnMathematician, inferredAnd];
    expect(kb.statements).toEqual(expectedResult);
  });
});
