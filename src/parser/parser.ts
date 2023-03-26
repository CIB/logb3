import * as peg from 'pegjs';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { EntityDescription, Statement } from '@src/statement';

const filePath = resolve(__dirname, 'logicGrammar.pegjs');
const grammar = readFileSync(filePath, 'utf8');

export const parser = peg.generate(grammar);

export function e(input: string): EntityDescription {
  return parser.parse(input) as EntityDescription;
}

export function s(input: string): Statement {
  return parser.parse(input) as Statement;
}
