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
        const productImage = product.querySelector('img').src;

        alert(`Produsul ${productName} a fost adăugat în coș!`);

        let basketItems = JSON.parse(localStorage.getItem('basket')) || [];
        basketItems.push({ name: productName, price: productPrice, image: productImage});
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