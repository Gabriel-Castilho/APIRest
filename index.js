const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors")
const DB = require('./database/database')
const auth= require("./middleware/auth")
const jwt = require("jsonwebtoken")
const jwtSecret = "passwordjwt123"

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/games", auth,(req, res) => {
    res.statusCode = 200;
    res.json({games: DB.games})
})

app.get("/game/:id",auth, (req, res) => {
    //verify if is a number params
    if (isNaN(req.params.id)) {
        res.sendStatus(400);

    } else {
        var id = parseInt(req.params.id);
        var game = DB.games.find(game => game.id == id);
        if (game != undefined) {
            res.statusCode = 200;
            res.json(game)
        } else {
            res.sendStatus(404)
        }
    }
})

//adding new game
app.post("/game", auth,(req, res) => {
    var { title, price, year, id } = req.body

    if (isNaN(price && year && id)) {
        res.sendStatus(400)
    } else {
        DB.games.push({
            id, title, price, year
        });

    }

    res.sendStatus(200)
})


app.delete("/game/:id", auth,(req, res) => {
    if (isNaN(req.params.id)) {
        res.sendStatus(400);

    } else {
        var id = parseInt(req.params.id);

        var index = DB.games.findIndex(game => game.id == id);

        if (index == -1) {
            res.sendStatus(404)
        } else {
            DB.games.splice(index, 1);
            res.sendStatus(200);
        }


    }
});


app.put("/game/:id", auth,(req, res) => {
    if (isNaN(req.params.id)) {
        res.sendStatus(400);

    } else {
        var id = parseInt(req.params.id);
        var game = DB.games.find(game => game.id == id);
        if (game != undefined) {

            var { title, price, year, id } = req.body

            if (title != undefined) {
                game.title = title;
            }
            if (price != undefined) {
                game.price = price;
            }
            if (year != undefined) {
                game.year = year;
            }

            res.sendStatus(200)


        } else {
            res.sendStatus(404)
        }
    }
})


app.post("/auth",(req, res) => {
    var { email, password } = req.body;
    if (email == undefined) {
        res.status(400);
        res.json({ err: "O e-mail ou a senha estão incorretos" })
    } else {
        var user = DB.users.find(user => user.email == email)
        if (user != undefined) {
            if (user.password == password) {
                //payload
                jwt.sign({ id: user.id, email: user.email }, jwtSecret, { expiresIn: '48h' }, (err, token) => {
                    if (err) {
                        res.status(400);
                        res.json({ err: "Falha" })
                    } else {
                        res.status(200);
                        res.json({ token: token })
                    }
                })
            } else {
                res.status(401)
                res.json({ err: "O e-mail ou a senha estão incorretos" })
            }
        } else {
            res.status(404);
            res.json({ err: "O e-mail ou a senha estão incorretos" })

        }
    }
})



app.listen(8000, () => {
    console.log("Api rodando")
})