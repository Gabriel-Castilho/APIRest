var axiosConfig = {
    headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
    }
}


function deleteGame(listItem) {
    var id = listItem.getAttribute("data-id");


    axios.delete("http://localhost:8000/game/" + id, axiosConfig).then(res => {
        if (res.status == 200) {
            window.alert("Jogo deletado")
            window.location.reload(true)
        }
    }).catch(error => {
        console.log(error)
    })

} 
