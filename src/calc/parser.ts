import { Token, tokenize } from "./lexer";

type ExprType = "binaryExpr" | "numericLiteral";

interface Expr {
  kind: ExprType;
}

interface BinaryExpr extends Expr {
  kind: "binaryExpr";
  left: Expr;
  right: Expr;
  operator: string;
}

interface NumericLiteral extends Expr {
  kind: "numericLiteral";
  value: number;
}

function at(src: Token[]) {
  return src[0];
}

function eat(src: Token[]) {
  return src.shift();
}

function parse(src: string) {
  const tknSrc = tokenize(src);
  const program = { body: {} };

  while (at(tknSrc).type != "eof") {
    program.body = parseExpr(tknSrc);
  }

  return program;
}

function parseExpr(src: Token[]): Expr {
  return parseAdditiveExpr(src);
}

function parseMultiplicativeExpr(src: Token[]) {
  let left = parsePrimaryExpression(src);
  while (at(src).value == "*" || at(src).value == "/") {
    const operator = eat(src)!.value;
    const right = parsePrimaryExpression(src);
    left = {
      left,
      right,
      operator,
      kind: "binaryExpr",
    } as BinaryExpr;
  }
  return left;
}

function parseAdditiveExpr(src: Token[]): Expr {
  let left = parseMultiplicativeExpr(src);
  while (at(src).value == "+" || at(src).value == "-") {
    const operator = eat(src)!.value;
    const right = parseMultiplicativeExpr(src);
    left = {
      left,
      right,
      operator,
      kind: "binaryExpr",
    } as BinaryExpr;
  }
  return left;
}

function parsePrimaryExpression(src: Token[]): Expr {
  switch (at(src).type) {
    case "number":
      return {
        kind: "numericLiteral",
        value: parseFloat(eat(src)!.value),
      } as NumericLiteral;
    case "openParen": {
      eat(src);
      const value = parseAdditiveExpr(src);
      eat(src);
      return value;
    }
  }

  return {} as Expr;
}

export { parse };

export type { BinaryExpr, Expr, NumericLiteral };
