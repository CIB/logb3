import { Dictionary, reduce } from 'lodash';
import { Quantifier } from './quantifier';
import {
  EntityDescription,
  Relation,
  Statement,
  VariableEntity,
  StatementVariable,
} from './statement';

export interface StatementSubstitution {
  type: 'StatementSubstitution';
  substitutions: Dictionary<EntityDescription>;
  statement: Statement;
}

export function findRelationVariables(
  relation: Relation,
  path: string[] = []
): Dictionary<VariableEntity> {
  return reduce(
    relation.tuple,
    (acc, tupleEntityDescription, index) => {
      const tuplePath = path.concat(`[${index}]`);
      return {
        ...acc,
        ...findEntityVariables(tupleEntityDescription, tuplePath),
      };
    },
    {}
  );
}

export function findQuantifierVariables(
  quantifier: Quantifier,
  path: string[] = []
): Dictionary<VariableEntity> {
  return findEntityVariables(quantifier.statement, path.concat('statement'));
}

export function findEntityVariables(
  entityDescription: EntityDescription,
  path: string[] = []
): Dictionary<VariableEntity> {
  if (entityDescription.type === 'Variable') {
    const fullPath = path.join('.');
    return { [fullPath]: entityDescription };
  } else if (entityDescription.type === 'Relation') {
    return findRelationVariables(entityDescription, path);
  } else if (entityDescription.type === 'Quantifier') {
    return findQuantifierVariables(entityDescription, path);
  } else {
    return {};
  }
}

export function replaceVariables(
  entityDescription: EntityDescription,
  variables: Dictionary<EntityDescription>
): EntityDescription {
  if (entityDescription.type === 'StatementVariable') {
    const statementVariable = variables[entityDescription.name];
    if (!statementVariable) {
      return { ...entityDescription };
    }
    return { ...statementVariable };
  } else if (entityDescription.type === 'Variable') {
    const variable = variables[entityDescription.name];
    if (!variable) {
      return { ...entityDescription };
    }
    return { ...variable };
  } else if (entityDescription.type === 'Relation') {
    const tuple = entityDescription.tuple.map(tupleEntityDescription =>
      replaceVariables(tupleEntityDescription, variables)
    );
    return {
      ...entityDescription,
      tuple,
    };
  } else if (entityDescription.type === 'Quantifier') {
    const statement = replaceVariables(
      entityDescription.statement,
      variables
    ) as Statement;
    return {
      ...entityDescription,
      statement,
    };
  } else {
    // do nothing for NamedEntity and NamedSet types
    return { ...entityDescription };
  }
}
