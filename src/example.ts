import { s } from './parser/parser';
import { statementToString } from './print';
import { Statement } from './statement';

const johnMathematician = s('John is Mathematician');
const inferredAnd: Statement = s(
  '(John is Programmer) ∧ (John is Mathematician)'
);
const quantifier: Statement = s('∀x∈S.P(x)');

console.log(statementToString(johnMathematician));
console.log(statementToString(inferredAnd));
console.log(statementToString(quantifier));
