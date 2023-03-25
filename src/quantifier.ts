import { Statement, StatementVariable, VariableEntity } from './statement';

export interface NamedSet {
  type: 'NamedSet';
  name: string;
}

export type Set = NamedSet;

export interface Quantifier {
  type: 'Quantifier';
  quantifier: '∀' | '∃';
  variable: string;
  set: Set | VariableEntity;
  statement: Statement;
}
