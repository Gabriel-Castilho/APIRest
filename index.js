const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors")

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


var DB = {
    games: [
        {
            id: 1,
            title: "God of War",
            year: 2012,
            price: 50
        }, {
            id: 2,
            title: "Minecraft",
            year: 2010,
            price: 80
        }, {
            id: 10,
            title: "The Last of US",
            year: 2014,
            price: 100
        },

    ]
}

app.get("/games", (req, res) => {
    res.statusCode = 200;
    res.json(DB.games)
})

app.get("/game/:id", (req, res) => {
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
app.post("/game", (req, res) => {
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


app.delete("/game/:id", (req, res) => {
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


app.put("/game/:id", (req, res) => {
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




app.listen(8000, () => {
    console.log("Api rodando")
})