let searchFrom = document.querySelector('.search-form');

document.querySelector('#search-btn').onclick = () =>
{
    searchFrom.classList.toggle('active');
}

let LoginForm = document.querySelector('.login-form');

document.querySelector('#login-btn').onclick = () =>
{
    LoginForm.classList.toggle('active');
}