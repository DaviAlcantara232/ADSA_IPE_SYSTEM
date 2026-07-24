# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests\usuarios.spec.js >> API de usuários deve funcionar
- Location: tests\usuarios.spec.js:3:1

# Error details

```
SyntaxError: Unexpected token '<', "<!DOCTYPE "... is not valid JSON
```

# Test source

```ts
  1  | const { test, expect } = require("@playwright/test");
  2  | 
  3  | test("API de usuários deve funcionar", async ({ request }) => {
  4  | 
  5  |     const resposta = await request.get(
  6  |         "http://localhost:3000/api/usuarios"
  7  |     );
  8  | 
  9  |     console.log("Status:", resposta.status());
  10 | 
> 11 |     const dados = await resposta.json();
     |                   ^ SyntaxError: Unexpected token '<', "<!DOCTYPE "... is not valid JSON
  12 | 
  13 |     console.log(dados);
  14 | 
  15 |     expect(resposta.status()).toBe(200);
  16 | 
  17 |     expect(dados.sucesso).toBe(true);
  18 | 
  19 | });
```