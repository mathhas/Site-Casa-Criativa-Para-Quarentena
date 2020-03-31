//usei o express pra criar e configurar meu servidor
const express = require("express")
const server = express()

const db = require("./db.js")

//configura arquivos estaticos(htmls, css, scripts, imagens...)
server.use(express.static("public"))

//habilitar o uso do "req.body"
server.use(express.urlencoded({extended: true}))


//configuração nunjucks
const nunjucks = require("nunjucks")
nunjucks.configure("views", {
    express: server,
    noCache: true,/*o noCache habilitado faz com que as atualizações se apliquem de imediato. 
    no geral é ruim pois perde desempenho, mas durante o desenvolvimento é melhor para ter mais
    agilidade para ver as modificações*/
})

//criei uma rota /
//e capturo o pedido do cliente pra responder
server.get("/", function (req, res) {

    db.all(`SELECT * FROM ideas`, function (err, rows) {
        if (err) return console.log(err)

        //deixar os cursos organizados de forma do que foi criado por ultimo, sendo apresentado primeiro (reverter o vetor basicamente)
        const reversedIdeas = [...rows].reverse()//em JS as reticências espalham um vetor em outro, o reverse faz com que seja reverso...

        let lastIdeas = []
        for (let idea of reversedIdeas) {
            if (lastIdeas.length < 2) {
                lastIdeas.push(idea)
            }
        }

        //abrir o arquivo html 
        return res.render("index.html", { ideas: lastIdeas }) //{ideas: lastIdeas} faz com que os valores de ideas sejam lastIdeas, para nao precisar renomear todas as variaveis nos outros arquivos

    })

})

//criar um caminho "de volta para o index" solução erro de nao voltar, cannot get alguma coisa index...
server.get("/ideias", function (req, res) {


    db.all(`SELECT * FROM ideas`, function (err, rows) {
        if (err) {
            console.log(err)
            return res.send("Erro no bando de dados!")
        }

        const reversedIdeas = [...rows].reverse()

        return res.render("ideias.html", { ideas: reversedIdeas })

    })



})

//pega os dados inseridos no modal, e traz no formato digitado (parecido com JSON)
server.post("/", function(req, res){
    //console.log(req.body) //linha teste, para ver se o formulário foi retornado corretamente com so dados preenchidos

    //inserir dados na tabela
    //cada item de ideas ocupa um espaço dos values
    const query = `
        INSERT INTO ideas(
            image,
            title,
            category,
            description,
            link
        ) VALUES(?,?,?,?,?)`

        const values = [
            req.body.image,
            req.body.title,
            req.body.category,
            req.body.description,
            req.body.link
        ]

    db.run(query, values, function(err){
        if (err) {
            console.log(err)
            return res.send("Erro no bando de dados!")
        }

        return res.redirect("/ideias") //depois de salvar no banco de daods o formulario vindo do modal, ele redireciona de volta para a pagina ideias
    })

})


//liguei meu servidor na porta 3000
server.listen(3000)