import { Dictionary } from 'lodash';
import { KnowledgeBase, runInference } from '../src/inference';
import { andInference } from '../src/boolean';
import { EntityDescription, Statement } from '../src/statement';
import { s } from '@src/parser/parser';

describe('runInference', () => {
  it('should correctly apply the and inference rule', () => {
    // Create statements for "John is a programmer" and "John is a mathematician"
    const johnProgrammer = s('John is Programmer');
    const johnMathematician = s('John is Mathematician');

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
    const inferredAnd: Statement = s(
      '(John is Programmer) ∧ (John is Mathematician)'
    );

    // Check if the knowledge base contains both initial statements and the inferred 'and' statement after the inference
    const expectedResult = [johnProgrammer, johnMathematician, inferredAnd];
    expect(kb.statements).toEqual(expectedResult);
  });
});
