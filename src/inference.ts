import { Dictionary, every, isEqual, some } from 'lodash';
import { replaceVariables, StatementSubstitution } from './pattern';
import { EntityDescription, Statement, VariableEntity } from './statement';

export interface KnowledgeBase {
  statements: Statement[];
}

export interface Inference {
  variables: string[];
  premises: Statement[];
  conclusion: Statement | StatementSubstitution;
}

function substituteConclusion(
  inference: Inference,
  substitutions: Dictionary<EntityDescription>
): Statement {
  if (inference.conclusion.type === 'StatementSubstitution') {
    // Handle multi-layered variable substitution
    const concreteConclusion = replaceVariables(
      inference.conclusion.statement,
      substitutions
    ) as Statement;

    return replaceVariables(
      concreteConclusion,
      inference.conclusion.substitutions
    ) as Statement;
  } else {
    return replaceVariables(inference.conclusion, substitutions) as Statement;
  }
}

/**
 * Runs an inference rule and adds the conclusion to the knowledge base if the premises are true.
 *
 * @param substitutions - Variable substitutions to turn the inference rule into a concrete inference
 */
export function runInference(
  kb: KnowledgeBase,
  inference: Inference,
  substitutions: Dictionary<EntityDescription>
): void {
  // Replace variables in premises with their corresponding values according to the substitutions
  const premises = inference.premises.map(
    premise => replaceVariables(premise, substitutions) as Statement
  );

  const premisesAreTrue = every(premises, premise =>
    some(kb.statements, statement => isEqual(premise, statement))
  );

  if (premisesAreTrue) {
    const conclusion = substituteConclusion(inference, substitutions);
    kb.statements.push(conclusion);
  }
}
