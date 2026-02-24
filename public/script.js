let loginForm = document.getElementById("loginForm");

const errorDiv = document.getElementById('error');

if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
        e.preventDefault();

        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;

        fetch("http://localhost:3000/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,      // luis.luna@patitasfelices.com
                password: password // SecurePass125!
            }),
        })
            .then((res) => {
                if (!res.ok) throw new Error("HTTP " + res.status);
                return res.json();
            })
            .then((data) => {
                console.log("Token recibido:", data.token);

                localStorage.setItem("token", data.token);

                window.location.href = "/dashboard.html";
            })
            .catch((err) => {
                console.error(err);

                if (err.message.startsWith("HTTP 401")) {
                    errorDiv.textContent = "Credenciales incorrectas. Por favor, inténtalo de nuevo.";
                } else {    
                errorDiv.textContent = "Error al iniciar sesión: " + err.message;
            }});
    });
}



/* form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const res = await fetch('http://localhost:3000/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await res.json();

        if (!res.ok) throw new Error(data.message || 'Error al iniciar sesión');

        // Guardar token
        localStorage.setItem('token', data.token);

    } catch (err) {
        errorDiv.textContent = err.message;
    }
});


const token = localStorage.getItem('token');
console.log(token); */
