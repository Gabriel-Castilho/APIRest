var axiosConfig = {
    headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
    }
}
function createGame() {
    var titleInput = document.getElementById("title");
    var yearInput = document.getElementById("year");
    var priceInput = document.getElementById("price")
    var idInput = document.getElementById("id");

    var game = {
        title: titleInput.value,
        year: yearInput.value,
        price: priceInput.value,
        id: idInput.value
    }
  
    axios.post("http://localhost:8000/game", game, axiosConfig).then(res => {
        if (res.status == 200) {
            alert("Cadastro efetuado com sucesso")
            window.location.reload(true)
        }
    }).catch(err => {
        console.log(err)
    })
}
