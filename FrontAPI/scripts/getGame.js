var axiosConfig = {
    headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
    }
}

axios.get("http://localhost:8000/games", axiosConfig).then(res => {
    var games = res.data;
    var arrayGames = games;
    var list = document.getElementById("games");
    arrayGames.games.forEach(game => {
        var item = document.createElement("li");
        item.setAttribute("data-id", game.id);
        item.setAttribute("data-title", game.title)
        item.setAttribute("data-year", game.year)
        item.setAttribute("data-price", game.price)

        item.innerHTML = game.year + " - " + game.title + " - $ " + game.price;

        var deleteButton = document.createElement("button")
        deleteButton.innerHTML = "Deletar";

        deleteButton.addEventListener("click", function () {
            deleteGame(item)
        });

        var editButton = document.createElement("button")
        editButton.innerHTML = "Editar";
        editButton.addEventListener("click", function () {
            loadForm(item) 
        })

        item.appendChild(deleteButton);
        item.appendChild(editButton);
        list.appendChild(item);
    });

}).catch(error => {
    console.log("isso aqui é um teste: " + error);
});
