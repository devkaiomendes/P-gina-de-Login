/*=============== SHOW HIDE PASSWORD LOGIN ===============*/
const passwordAccess = (loginPass, loginEye) => {
    const input = document.getElementById(loginPass), 
    iconEye = document.getElementById(loginEye); 

    iconEye.addEventListener('click', () => {
        input.type = input.type === 'password' ? 'text' : 'password';
        iconEye.classList.toggle("ri-eye-fill");
        iconEye.classList.toggle("ri-eye-off-fill");
    });
};
passwordAccess('password', 'loginPassword');

/*=============== SHOW HIDE PASSWORD CREATE ACCOUNT ===============*/
const passwordRegister = (loginPass, loginEye) => {
    const input = document.getElementById(loginPass), 
    iconEye = document.getElementById(loginEye); 

    iconEye.addEventListener('click', () => {
        input.type = input.type === 'password' ? 'text' : 'password';
        iconEye.classList.toggle("ri-eye-fill");
        iconEye.classList.toggle("ri-eye-off-fill");
    });
};
passwordRegister('passwordCreate', 'loginPasswordCreate');

/*=============== SHOW HIDE LOGIN & CREATE ACCOUNT ===============*/
const loginAccessRegister = document.getElementById('loginAccessRegister'),
      buttonRegister = document.getElementById('loginButtonRegister'),
      buttonAccess = document.getElementById('loginButtonAccess');

if (buttonRegister && buttonAccess && loginAccessRegister) {
    buttonRegister.addEventListener('click', () => {
        loginAccessRegister.classList.add('active');
    });

    buttonAccess.addEventListener('click', () => {
        loginAccessRegister.classList.remove('active');
    });
}

/*=============== HANDLE ACCOUNT CREATION AND LOGIN WITH LOCALSTORAGE ===============*/
const registerButton = document.querySelector('.login__register .login__button');
const loginButton = document.querySelector('.login__access .login__button');

if (registerButton) {
    registerButton.addEventListener('click', (event) => {
        event.preventDefault();

        const names = document.getElementById('names').value;
        const surnames = document.getElementById('surnames').value;
        const email = document.getElementById('emailCreate').value;
        const password = document.getElementById('passwordCreate').value;

        const existingUser = localStorage.getItem(email);
        if (existingUser) {
            alert('Este email já está cadastrado.');
        } else {
            const newUser = {
                names,
                surnames,
                email,
                password
            };
            localStorage.setItem(email, JSON.stringify(newUser));
            alert('Conta criada com sucesso!');
            loginAccessRegister.classList.remove('active'); // Volta para login
        }
    });
}

if (loginButton) {
    loginButton.addEventListener('click', (event) => {
        event.preventDefault();

        const loginEmail = document.getElementById('email').value;
        const loginPassword = document.getElementById('password').value;

        const storedUser = localStorage.getItem(loginEmail);
        if (storedUser) {
            const user = JSON.parse(storedUser);
            if (user.password === loginPassword) {
                localStorage.setItem('userEmail', loginEmail);
                alert('Login bem-sucedido!');
                window.location.href = 'dashboard.html'; // Redireciona para página protegida
            } else {
                alert('Senha incorreta!');
            }
        } else {
            alert('Usuário não encontrado!');
        }
    });
}

/*=============== PROTEÇÃO DA PÁGINA PROTEGIDA (dashboard.html) ===============*/
const isProtectedPage = window.location.pathname.includes("dashboard.html");

if (isProtectedPage) {
    window.addEventListener('load', () => {
        const userEmail = localStorage.getItem('userEmail');
        if (!userEmail) {
            window.location.href = 'login.html'; // Redireciona se não estiver logado
        }
    });
}
