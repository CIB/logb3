import { Inference } from './inference';
import { statement, variable } from './statement';

export const AndPredicate = '∧';
export const OrPredicate = '∨';
export const NotPredicate = '¬';
export const ImpliesPredicate = '→';

export const andInference: Inference = {
  variables: ['X', 'Y'],
  premises: [statement('X'), statement('Y')],
  conclusion: {
    type: 'Relation',
    predicate: AndPredicate,
    tuple: [statement('X'), statement('Y')],
  },
};

export const substitutionInference: Inference = {
  variables: ['X', 'Y', 'Z'],
  premises: [
    {
      type: 'Quantifier',
      quantifier: '∀',
      statement: statement('Y', ['X1']),
      variable: 'X1',
      set: variable('Z'),
    },
    {
      type: 'Relation',
      predicate: 'elementOf',
      tuple: [variable('X'), variable('Z')],
    },
  ],
  conclusion: {
    type: 'StatementSubstitution',
    statement: statement('Z'),
    substitutions: { X1: variable('X') },
  },
};
