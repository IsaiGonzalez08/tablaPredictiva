import { handlerstack, isNotTerminal, getProduction, report } from "./gramatica";

function validateExpression(value) {
  const tokens = value.match(/\b\w+\b|<=|>=|==|[<>=]|\S/g);
  let stack= ["$", "REPETITIVA"];
  let prompter = 0;
  let infostack= [];

  while (stack.length > 0) {
    const X = stack.at(-1);
    const currentToken = tokens[prompter];
    if (X === "$") {
      handlerstack("Pop", X, tokens, prompter, stack, infostack);
      break;
    }

    if (X === currentToken) {
      handlerstack("Pop", X, tokens, prompter, stack, infostack);
      prompter++;
    } else if (isNotTerminal(X)) {
      const production = getProduction(X, currentToken);
      
      if (production) {
        handlerstack("Pop", X, tokens, prompter, stack, infostack);
        handlerstack("Push", X, tokens, prompter, stack, infostack);
        if (production[0] !== "ε") {
          for (let i = production.length - 1; i >= 0; i--) {
            stack.push(production[i]);
          }
        }
      } else {
        return report("No existe una producción válida de : ", X, currentToken, infostack);
      }
    } else {
      return report("Token no esperado ", X, currentToken, infostack);
    }
  }

  return { esValida: prompter === tokens.length, infostack};
}




export {
  validateExpression,
};