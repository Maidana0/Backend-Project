
const form = document.getElementById('login')
const inputEmail = document.getElementById('email')
const inputPassword = document.getElementById('password')
const msgDiv = document.querySelector('#div') || false


form.onsubmit = e => {
    e.preventDefault()
    fetch('http://localhost:8080/account/login', {
        method: 'POST',
        body: JSON.stringify({
            email: inputEmail.value,
            password: inputPassword.value
        }),
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then(res => res.json())
        .then(data => { 
            fetch('http://localhost:8080/account/login/jwt', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + data.token
                }
            })
            .then(()=>location.href = "/views/products")
            .catch((e)=>console.log(e))
        })
        .catch((error)=>{
            console.log(error)
            msgDiv.classList.remove('no')
        })

}



