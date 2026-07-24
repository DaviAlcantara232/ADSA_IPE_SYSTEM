const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "D3a1v4i8!$",
    database: "adsa_ipe_system"
});

connection.connect((err) => {
    if (err) {
        console.log("Erro ao conectar no MySQL:", err);
        return;
    }

    console.log("MySQL conectado com sucesso!");
});

module.exports = connection;