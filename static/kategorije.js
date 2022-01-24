function init() {

    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];

    document.getElementById('btn_a').addEventListener('click', e => {
        e.preventDefault();

        const data = {
            name: document.getElementById('name').value
        };

        fetch('http://127.0.0.1:8000/api/kategorija', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}` 
            },
            body: JSON.stringify(data)
        })
            .then( res => res.json() )
            .then( el => {
                if(el.msg){
                    alert(el.msg)
                }
                else{
                    document.cookie = `token=${document.cookie.split("=")[1]};SameSite=Lax`;
                    window.location.href = 'kategorije.html';
                }
            });
    });

    document.getElementById('btn_d').addEventListener('click', e => {
    });

    document.getElementById('btn_m').addEventListener('click', e => {
    });

    document.getElementById('btn_b').addEventListener('click', e => {
        document.cookie = `token=${document.cookie.split("=")[1]};SameSite=Lax`;
        window.location.href = 'index.html';
    });
}