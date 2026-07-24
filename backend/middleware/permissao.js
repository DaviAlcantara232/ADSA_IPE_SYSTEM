// =====================================
// ADSA IPÊ SYSTEM
// MIDDLEWARE DE PERMISSÃO
// =====================================


function permitir(...tiposPermitidos) {


    return (req, res, next) => {



        if (!req.usuario) {

            return res.status(401).json({

                sucesso: false,

                mensagem: "Usuário não autenticado"

            });

        }



        if (!tiposPermitidos.includes(req.usuario.tipo)) {


            return res.status(403).json({

                sucesso: false,

                mensagem: "Usuário sem permissão para acessar esta área"

            });


        }



        next();


    };


}



module.exports = permitir;