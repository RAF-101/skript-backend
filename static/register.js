function init() {

    document.getElementById('btn').addEventListener('click', e => {
        e.preventDefault();

        const data = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            password: document.getElementById('password').value,
            admin:false,
            usertype: document.getElementById('type').value
        };

        fetch('http://127.0.0.1:9000/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then( res => res.json() )
            .then( el => {
                if(el.msg){
                    alert(el.msg)
                    document.cookie = `token=;SameSite=Lax`;
                    window.location.href = 'register.html';
                }
                else{
                    document.cookie = `token=${el.token};SameSite=Lax`;
                    window.location.href = 'index.html';
                }
            });
    });

    document.getElementById('btn_l').addEventListener('click', e => {
        e.preventDefault();

        const data = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            password: document.getElementById('password').value,
            admin:false,
            usertype: document.getElementById('type').value
        };

        fetch('http://127.0.0.1:9000/admin/toLogin', {
            method: 'GET'
        })
            .then( res => res.json() )
            .then( el => {
                document.cookie = `token=;SameSite=Lax`;
                window.location.href = 'login.html';
            });
    });
}