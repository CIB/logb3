# logb

logb is a project aimed at providing a foundation for working with logical statements in a manner similar to programming languages. It offers a flexible and expressive way to represent, manipulate, and reason about knowledge, making it easier to understand and work with logical statements and their relations.
Goal

The primary goal of this project is to create a versatile system that enables users to interact with logical statements seamlessly. By providing a well-structured and expressive syntax, this system aims to simplify the process of reasoning and knowledge representation.

## Examples

Below are a few examples of short-form statements in mathematical notation and their corresponding representation in the code.

### Simple Relation

Mathematical Notation: `P(a, b)`

Code Representation:

```typescript
{
  type: 'Relation',
  predicate: 'P',
  tuple: [
    { type: 'NamedEntity', name: 'a' },
    { type: 'NamedEntity', name: 'b' },
  ],
}
```

### Quantified Statement

Mathematical Notation: `∀x P(x)`

Code Representation:

```typescript
{
  type: 'Quantifier',
  quantifier: '∀',
  variable: 'x',
  statement: {
    type: 'Relation',
    predicate: 'P',
    tuple: [
      { type: 'Variable', name: 'x' },
    ],
  },
}
```

### Inference Rule

Mathematical Notation: `A ∧ B ⊢ C`

Code Representation:

```typescript
{
  variables: ['A', 'B', 'C'],
  premises: [
    { type: 'StatementVariable', name: 'A' },
    { type: 'StatementVariable', name: 'B' },
  ],
  conclusion: { type: 'StatementVariable', name: 'C' },
}
```
