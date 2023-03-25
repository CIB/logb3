import { NamedSet, Quantifier } from './quantifier';

/**
 * Relation represents a predicate applied to a tuple of entities.
 * For example, in the relation `R(a, b)`, `R` is the predicate and `[a, b]` is the tuple.
 */
export interface Relation {
  type: 'Relation';
  predicate: string;
  tuple: EntityDescription[];
}

/**
 * NamedEntity represents an entity with a specific name, such as a constant or a specific object.
 * For example, in the relation `R(a, b)`, both 'a' and 'b' can be NamedEntities.
 */
export interface NamedEntity {
  type: 'NamedEntity';
  name: string;
}

/**
 * A placeholder for an entity. Can be used for pattern matching and substitution.
 */
export interface VariableEntity {
  type: 'Variable';
  name: string;
}

/**
 * Similar to a `VariableEntity`, but can be a placeholder for statements specifically.
 *
 * Statements may be parametrized, for example in:
 * `∀x.P(x)`
 *
 * Here if `P` is a statement variable, any substitution of `P` should be done with respect to `x`,
 * so that it is clear that the `x` in the substituted statement is the same `x` as the one in `∀x.`
 */
export interface StatementVariable {
  type: 'StatementVariable';
  name: string;
  variables: string[];
}

/**
 * Shorthand syntax to create a variable.
 */
export function variable(name: string): VariableEntity {
  return { type: 'Variable', name };
}

/**
 * Shorthand syntax ot create a statement variable.
 */
export function statement(
  name: string,
  variables: string[] = []
): StatementVariable {
  return {
    type: 'StatementVariable',
    name,
    variables,
  };
}

export type Statement = Relation | Quantifier | StatementVariable;

/**
 * A type to represent all entities that may be referenced in the system.
 */
export type EntityDescription =
  | NamedEntity
  | NamedSet
  | VariableEntity
  | Statement;
