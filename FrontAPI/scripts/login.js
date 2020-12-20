function login() {
    var emailField = document.getElementById("email");
    var passwordField = document.getElementById("password")

    var email = emailField.value
    var password = passwordField.value

    axios.post("http://localhost:8000/auth", { email, password }).then(res => {
        var token = res.data.token;
       // alert(token)
        localStorage.setItem("token", token)
        axiosConfig.headers.Authorization = "Bearer " + localStorage.getItem("token")
        window.location.reload(true)

    }).catch(err => {
        console.log(err)
    })
}