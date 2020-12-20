
var axiosConfig = {
    headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
    }
}


function loadForm(listItem){
    console.log(listItem)

    var id = listItem.getAttribute("data-id")
    var title = listItem.getAttribute("data-title")
    var year = listItem.getAttribute("data-year")
    var price = listItem.getAttribute("data-price")
    document.getElementById("idEdit").value=id;
    document.getElementById("titleEdit").value=title;
    document.getElementById("yearEdit").value=year;
    document.getElementById("priceEdit").value=price;
}
 

function updateGame(){
    
    var titleInput = document.getElementById("titleEdit");
    var yearInput = document.getElementById("yearEdit");
    var priceInput = document.getElementById("priceEdit")
    var idInput = document.getElementById("idEdit");

    var game = {
        title: titleInput.value,
        year: yearInput.value,
        price: priceInput.value,
       
    }

    var id = idInput.value

    axios.put("http://localhost:8000/game/" + id, game, axiosConfig).then(res => {
        if (res.status == 200) {
            alert("Jogo atualizado com sucesso")
            window.location.reload(true)
        }
    }).catch(err => {
        console.log(err)
    })
}