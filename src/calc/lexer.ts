const TOKEN_TYPES = {
  number: "number",
  binop: "binop",
  openParen: "openParen",
  closeParen: "closeParen",
  eof: "eof",
} as const;

type ObjectValues<T> = T[keyof T];

type TokenType = ObjectValues<typeof TOKEN_TYPES>;

type Token = {
  value: string;
  type: TokenType;
};

function token(value: string, type: TokenType): Token {
  return {
    value,
    type,
  };
}

function isInt(src: string) {
  const c = src.charCodeAt(0);
  const bounds = ["0".charCodeAt(0), "9".charCodeAt(0)];
  return (c >= bounds[0] && c <= bounds[1]);
}

function isSpace(c: string) {
  return c == " ";
}

function isBinOp(c: string) {
  return c == "+" || c == "-" || c == "*" || c == "/";
}

function tokenize(src: string): Token[] {
  const tkSrc = new Array<Token>();
  const slptSrc = src.split("");

  while (slptSrc.length > 0) {
    if (isInt(slptSrc[0])) {
      let num = "";
      while (slptSrc.length > 0 && isInt(slptSrc[0])) {
        num += slptSrc.shift();
      }
      tkSrc.push(token(num, "number"));
    } else if (isBinOp(slptSrc[0])) {
      tkSrc.push(token(slptSrc.shift() as string, "binop"));
    } else if (isSpace(slptSrc[0])) {
      slptSrc.shift();
    } else if (slptSrc[0] == "(") {
      tkSrc.push(token(slptSrc.shift() as string, "openParen"))
    } else if (slptSrc[0] == ")") {
      tkSrc.push(token(slptSrc.shift() as string, "closeParen"))
    } else {
      throw new Error(`token invalido: "${slptSrc[0]}"`)
    }
  }
  tkSrc.push(token("eof", "eof"));
  return tkSrc;
}

export { tokenize };

export type { Token };
