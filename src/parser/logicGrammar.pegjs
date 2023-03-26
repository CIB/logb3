start
  = ws? expr:Statement ws? { return expr; }

Statement
  = Quantifier / Relation

Quantifier
  = q:("∀" / "∃") ws? v:VariableEntity ws? "∈" ws? s:Set ws? "." ws? st:Statement
    { return { type: 'Quantifier', quantifier: q, variable: v.name, set: s, statement: st }; }

Relation
  = left:EntityDescription ws? predicate:Identifier ws? right:EntityDescription
    { return { type: 'Relation', predicate: predicate, tuple: [left, right] }; }
  / predicate:Identifier ws? "(" ws? tuple:EntityDescriptionList ws? ")"
    { return { type: 'Relation', predicate: predicate, tuple: tuple }; }

EntityDescriptionList
  = head:EntityDescription ws? "," ws? tail:EntityDescriptionList
    { return [head].concat(tail); }
  / single:EntityDescription { return [single]; }

EntityDescription
  = NamedEntity / NestedStatement

NestedStatement
  = "(" statement:Statement ")"
  { return statement }

NamedEntity
  = name:Identifier
    { return { type: 'NamedEntity', name: name }; }

VariableEntity
  = name:VariableIdentifier
    { return { type: 'Variable', name: name }; }

Set
  = NamedSet

NamedSet
  = name:Identifier
    { return { type: 'NamedSet', name: name }; }

Identifier
  = chars:Letter+ { return chars.join(''); }

VariableIdentifier
  = chars:Letter+ { return chars.join(''); }

Letter
  = [a-zA-Z∧]
  
ws
  = [\\t\\n\\r ]+