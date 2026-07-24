const { test, expect } = require("@playwright/test");

test("API de usuários deve funcionar", async ({ request }) => {

    const resposta = await request.get(
        "http://localhost:3000/api/usuarios"
    );

    console.log("Status:", resposta.status());

    const dados = await resposta.json();

    console.log(dados);

    expect(resposta.status()).toBe(200);

    expect(dados.sucesso).toBe(true);

});