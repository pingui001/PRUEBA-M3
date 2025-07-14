const routes = {
    "/": "./users.html",
    "/users": "./users.html",
    "/register": "./register.html",
    "/login": "./login.html",
    "/events": "./events.html",
    "/addevent": "./addevent.html"
};

let counter = 0

function isAuth() {
    const result = localStorage.getItem("Auth") || null
    const resultBool = result === "true"
    return resultBool;
}



document.body.addEventListener("click", (e) => {
    if (e.target.matches("[data-link]")) {
        e.preventDefault();
        navigate(e.target.getAttribute("href"));
    }
});

async function navigate(pathname) {

    if (!isAuth()) {
        pathname = "/login";
    }

    const route = routes[pathname];
    const html = await fetch(route).then((res) => res.text());
    document.getElementById("content").innerHTML = html;
    history.pushState({}, "", pathname);

    if (pathname === "/about") setupCounter();
    if (pathname === "/login") setupLoginForm();
}

function setupLoginForm() {
    const userAuth = "admin"
    const passAuth = "123"

    const form = document.getElementById("login-spa")
    form.addEventListener("submit", (e) => {
        e.preventDefault()

        const user = document.getElementById("user").value
        const pass = document.getElementById("password").value

        if (user === userAuth && pass === passAuth) {
            localStorage.setItem("Auth", "true")
            navigate("/users")
        } else {
            alert("usuario o contraseña son incorrectos")
        }

    })
}

const buttonCloseSession = document.getElementById("close-sesion");
buttonCloseSession.addEventListener("click", () => {
    localStorage.setItem("Auth", "false");
    navigate("/login");

})


window.addEventListener("popstate", () =>
    navigate(location.pathname)
); 



/*const buttonAddEvent = document.getElementById("adevent");
buttonAddEvent.addEventListener("click", () => {
    localStorage.getItem("Auth", "true");
    navigate("/addevent");

})*/



document.getElementById("register-spa").addEventListener("click", () => {
    const fullName = document.getElementById("name");
    const emailinput = document.getElementById("email");
    const passWord = document.getElementById("password");
    const confirmPassword = document.getElementById("confirmPasword");

    const name = fullName.value.trim();
    const email = emailinput.value.trim();
    const password = passWord.value();
    const confirmPasswords = confirmPassword.value();

    localStorage.setItem("fullName", name);
    localStorage.setItem("email", email);
    localStorage.setItem("passWord", password);
    localStorage.setItem("confirmPasswords", confirmPasswords);

})


/*document.addEventListener('register', () => {
    const form = document.getElementById('register-spa');

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        const usuario = {
            name: name,
            email: email,
            password: password
        };

        localStorage.setItem('usuario', JSON.stringify(usuario));

        console.log('Datos guardados en localStorage:', JSON.parse(localStorage.getItem('usuario')));

        form.reset();

        alert('¡Registro guardado con éxito!');
    });
});*/
