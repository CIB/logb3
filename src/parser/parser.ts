import * as peg from 'pegjs';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import {
  Relation,
  NamedEntity,
  VariableEntity,
  StatementVariable,
  Statement,
  EntityDescription,
} from '../statement';

const filePath = resolve(__dirname, 'logicGrammar.pegjs');
const grammar = readFileSync(filePath, 'utf8');

export const parser = peg.generate(grammar);
