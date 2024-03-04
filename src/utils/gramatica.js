function report(message, X, currentToken, infostack) {
  const report = `Error: ${message} "${X}" con "${currentToken}".`;
  infostack.push(report);
  return { esValida: false, infostack, report: report };
}

function isNotTerminal(simbolo) {
  return /[A-Z]/.test(simbolo);
}

function handlerstack(action, X, tokens, prompter, stack, infostack) {
  const message = `${action}: ${X}, Cadena: ${tokens.slice(prompter).join(" ")}`;
  infostack.push(message);
  if (action === "Pop") stack.pop();
}


function getProduction(noTerminal, next) {
  const productions = {
    "REPETITIVA": /^mientras$/.test(next) ?["mientras", "CONDICIONAL"] : null,
    "CONDICIONAL": /^\($/.test(next) ? ["(", "EXPRESIONES", "OPCIONAL", ")" ] : null,
    "EXPRESIONES": /[a-z)]/.test(next) ? ["VALOR", "OPERADOR", "VALOR"] : null,
    "VALOR": /[a-z]+/.test(next) ? ["LETRA"] : null,
    "LETRA": /[a-z]/.test(next) ? [next] : null,
    "OPERADOR": /(==|<=|>=|<|>)/.test(next) ? [next] : null, 
    "OPCIONAL": /^(and|or)$/.test(next) ?["LOGICO", "EXPRESIONES"] : next === ")" ? [] : ["ε"],
    "LOGICO": /^(and|or)$/.test(next) ? [next] : null,
  };
  return productions[noTerminal] || null;
}


export {
  
  isNotTerminal,
  handlerstack,
  report,
  getProduction
};