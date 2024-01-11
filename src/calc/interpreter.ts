import { BinaryExpr, Expr, NumericLiteral } from "./parser";

function evaluateNumExpr(a: number, b: number, c: string): NumericLiteral {
  if (c == "+") {
    return { kind: "numericLiteral", value: a + b } as NumericLiteral;
  } else if (c == "-") {
    return { kind: "numericLiteral", value: a - b } as NumericLiteral;
  }
  return {} as NumericLiteral;
}

function evalauteBinaryExpr(
  lf: Expr,
  rh: Expr,
  operator: string,
): NumericLiteral {
  const le = evaluate(lf);
  const re = evaluate(rh);
  return evaluateNumExpr(le.value, re.value, operator);
}

function evaluate(expr: Expr): NumericLiteral {
  switch (expr.kind) {
    case "numericLiteral":
      return expr as NumericLiteral;

    case "binaryExpr": {
      const { left, right, operator } = expr as BinaryExpr;
      return evalauteBinaryExpr(left, right, operator);
    }
  }
}

export { evaluate };