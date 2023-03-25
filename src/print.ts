import { KnowledgeBase } from './inference';
import { EntityDescription, Relation, Statement } from './statement';
import colors from 'colors';

function entityDescriptionToString(entity: EntityDescription): string {
  switch (entity.type) {
    case 'NamedEntity':
      return colors.blue(entity.name);
    case 'NamedSet':
      return colors.magenta(`{${entity.name}}`);
    case 'Variable':
      return colors.green(entity.name);
    case 'StatementVariable':
      return colors.yellow(entity.name);
    case 'Relation':
      return relationToString(entity);
    default:
      throw new Error(`Unsupported entity type: ${entity.type}`);
  }
}

function relationToString(relation: Relation): string {
  const tuple = relation.tuple.map(entityDescriptionToString);

  if (tuple.length === 2) {
    // Infix syntax for binary relations
    return `${tuple[0]} ${colors.bold.green(relation.predicate)} ${tuple[1]}`;
  } else if (tuple.length === 1) {
    // Prefix syntax for unary relations
    return `${colors.bold(relation.predicate)} ${tuple[0]}`;
  } else {
    // Default case: use parentheses
    return `${colors.bold(relation.predicate)}(${tuple.join(', ')})`;
  }
}

function statementToString(statement: Statement): string {
  switch (statement.type) {
    case 'Relation':
      return relationToString(statement);
    case 'Quantifier':
      return `${colors.red(statement.quantifier)}${colors.green(
        statement.variable
      )} ${entityDescriptionToString(statement.set)}. ${statementToString(
        statement.statement
      )}`;
    case 'StatementVariable':
      return colors.yellow(statement.name);
  }
}

export function knowledgeBaseToString(kb: KnowledgeBase): string {
  return kb.statements.map(statementToString).join(',\n');
}
