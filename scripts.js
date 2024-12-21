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
    alert('Produsul ' + droppedItem.querySelector('h3').textContent + ' a fost adăugat în coș!');
    const basket = document.getElementById('basket');
    basket.classList.add('droppable');
    setTimeout(() => {
        basket.classList.remove('droppable');
    }, 1000);
}

document.getElementById('priceRange').addEventListener('input', function () {
    const selectedPrice = parseInt(this.value);
    document.getElementById('priceValue').textContent = selectedPrice + " RON";
    const products = document.querySelectorAll('.produs');
    products.forEach(product => {
        const productPrice = parseInt(product.getAttribute('data-price'));

        if (productPrice <= selectedPrice) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
});