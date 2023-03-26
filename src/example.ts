import { s } from './parser/parser';
import { statementToString } from './print';
import { Statement } from './statement';

const johnMathematician = s('John is Mathematician');
const inferredAnd: Statement = s(
  '(John is Programmer) ∧ (John is Mathematician)'
);

console.log(statementToString(johnMathematician));
console.log(statementToString(inferredAnd));
