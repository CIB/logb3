import { pathsToModuleNameMapper } from 'ts-jest';
import { CompilerOptions } from 'typescript';
import { readFileSync } from 'fs';
import { parse } from 'json5';

const tsconfigJson = readFileSync('./tsconfig.json', 'utf8');
const tsconfig = parse(tsconfigJson);
const compilerOptions: CompilerOptions = tsconfig.compilerOptions;

export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths || {}, {
    prefix: '<rootDir>/',
  }),
};
