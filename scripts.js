document.getElementById("date").textContent = new Date().toLocaleDateString("ro-RO");

function togglePromotion() {
    const promotion = document.getElementById('promotion');
    promotion.classList.toggle('hidden');
}

function allowDrop(event) {
    event.preventDefault();
}

function drag(event) {
    event.dataTransfer.setData('text', event.target.id);
}

function drop(event) {
    event.preventDefault();
    const data = event.dataTransfer.getData('text');
    const droppedItem = document.getElementById(data);
    const productName = droppedItem.querySelector('h3').textContent;
    const productPrice = droppedItem.querySelector('.price').textContent;

    alert(`Produsul ${productName} a fost adăugat în coș!`);
    
    const basket = document.getElementById('basket');
    basket.classList.add('droppable');
    const basketIcon = document.getElementById('basket-icon');
    basketIcon.classList.add('jump');
    setTimeout(() => {
        basketIcon.classList.remove('jump');
        basket.classList.remove('droppable');
    }, 1000);

    let basketItems = JSON.parse(localStorage.getItem('basket')) || [];
    basketItems.push({ name: productName, price: productPrice });
    localStorage.setItem('basket', JSON.stringify(basketItems));
}

document.querySelectorAll('.produs button').forEach(button => {
    button.addEventListener('click', function(event) {
        const product = event.target.closest('.produs');
        const productName = product.querySelector('h3').textContent;
        const productPrice = product.querySelector('.price').textContent;

        alert(`Produsul ${productName} a fost adăugat în coș!`);

        let basketItems = JSON.parse(localStorage.getItem('basket')) || [];
        basketItems.push({ name: productName, price: productPrice});
        localStorage.setItem('basket', JSON.stringify(basketItems));

        const basket = document.getElementById('basket');
        basket.classList.add('droppable');
        const basketIcon = document.getElementById('basket-icon');
        basketIcon.classList.add('jump');
        setTimeout(() => {
            basketIcon.classList.remove('jump');
            basket.classList.remove('droppable');
        }, 1000);
    });
});

//web worker
function startCountdown() {
    if (typeof Worker !== "undefined") {
        const modal = document.getElementById('countdown');
        modal.style.display = 'block';

        const workerBlob = new Blob([`
            self.onmessage = function(event) {
                if (event.data === 'start') {
                    let count = 3;
                    const countdown = setInterval(() => {
                        count--;
                        self.postMessage({ count: count });
                        if (count <= 0) {
                            clearInterval(countdown);
                        }
                    }, 1000);
                }
            };
        `], { type: 'application/javascript' });

        const worker = new Worker(URL.createObjectURL(workerBlob));
        worker.postMessage('start');

        worker.onmessage = function(event) {
            if (event.data.count > 0) {
                document.getElementById('countdownText').innerText = `Vei fi redirecționat catre Cosul Tau în: ${event.data.count}`;
            } else {
                document.getElementById('countdownText').innerText = "Redirecționare...";
                setTimeout(() => {
                    modal.style.display = 'none';
                    window.location.href = 'cosul-meu.html';
                }, 1000);
                worker.terminate();
            }
        };
    } else {
        alert('Browser-ul tău nu suportă Web Worker!');
    }
}