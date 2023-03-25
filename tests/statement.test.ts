import {
  EntityDescription,
  Relation,
  Statement,
  VariableEntity,
  StatementVariable,
} from '../src/statement';
import { findEntityVariables, replaceVariables } from '../src/pattern';
import { Dictionary } from 'lodash';

describe('findEntityVariables', () => {
  it('should find variables in a relation', () => {
    // Variable mapping of P(a, x), which should be [1] -> x
    const relation: Relation = {
      type: 'Relation',
      predicate: 'P',
      tuple: [
        { type: 'NamedEntity', name: 'a' },
        { type: 'Variable', name: 'x' },
      ],
    };

    const result = findEntityVariables(relation);
    const expectedResult: Dictionary<VariableEntity> = {
      '[1]': { type: 'Variable', name: 'x' },
    };

    expect(result).toEqual(expectedResult);
  });
});

describe('replaceVariables', () => {
  it('should replace variables in a relation', () => {
    // Substituting { x -> a } in P(a, x) should result in P(a, b)
    const relation: Relation = {
      type: 'Relation',
      predicate: 'P',
      tuple: [
        { type: 'NamedEntity', name: 'a' },
        { type: 'Variable', name: 'x' },
      ],
    };

    const substitutions: Dictionary<EntityDescription> = {
      x: { type: 'NamedEntity', name: 'b' },
    };

    const result = replaceVariables(relation, substitutions);
    const expectedResult: Relation = {
      type: 'Relation',
      predicate: 'P',
      tuple: [
        { type: 'NamedEntity', name: 'a' },
        { type: 'NamedEntity', name: 'b' },
      ],
    };

    expect(result).toEqual(expectedResult);
  });
});
