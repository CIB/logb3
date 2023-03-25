import { NamedSet, Quantifier } from './quantifier';

export interface Relation {
  type: 'Relation';
  predicate: string;
  tuple: EntityDescription[];
}

export interface NamedEntity {
  type: 'NamedEntity';
  name: string;
}

export interface VariableEntity {
  type: 'Variable';
  name: string;
}

export interface StatementVariable {
  type: 'StatementVariable';
  name: string;
  variables: string[];
}

export function variable(name: string): VariableEntity {
  return { type: 'Variable', name };
}

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

export type EntityDescription =
  | NamedEntity
  | NamedSet
  | VariableEntity
  | Statement;
export type Statement = Relation | Quantifier | StatementVariable;
