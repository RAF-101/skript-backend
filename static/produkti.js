function init() {

    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];

    document.getElementById('btn_a').addEventListener('click', e => {
        e.preventDefault();

        const data = {
            ime: document.getElementById('ime').value,
            opis: document.getElementById('opis').value,
            cena: document.getElementById('cena').value,
            popust: document.getElementById('popust').value,
            kategorijaId: document.getElementById('nameKtg').value
        };

        fetch('http://127.0.0.1:8000/api/produkt', {
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
                    window.location.href = 'produkti.html';
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