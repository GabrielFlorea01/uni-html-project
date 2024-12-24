const basket = JSON.parse(localStorage.getItem('basket')) || [];
const productList = document.getElementById('product-list');
const totalDisplay = document.getElementById('total-display');
const promotionMessage = document.createElement('p');
promotionMessage.id = 'promotion-message';
promotionMessage.style.color = 'green';
promotionMessage.style.textAlign = 'center';
promotionMessage.style.fontWeight = 'bold';
document.body.appendChild(promotionMessage);

const discountWorker = new Worker('discountWorker.js');


function updateBasketDisplay(discountedBasket) {
    productList.innerHTML = '';
    discountedBasket.forEach(product => {
        const li = document.createElement('li');
        li.innerHTML = `${product.name} - ${product.discountedPrice} RON`;
        productList.appendChild(li);
    });

    const total = discountedBasket.reduce((sum, product) => sum + parseFloat(product.discountedPrice), 0);
    if (totalDisplay) {
        totalDisplay.textContent = `Total: ${total.toFixed(2)} RON`;
    }
}

if (basket.length > 0) {
    discountWorker.postMessage(basket);
    discountWorker.addEventListener('message', function (event) {
        const { type, data } = event.data;
        if (type === 'basket') {
            updateBasketDisplay(data);
        } else if (type === 'message') {
            promotionMessage.textContent = data;
            setTimeout(() => {
                promotionMessage.textContent = '';
            }, 3000);
        }
    });
} else {
    productList.innerHTML = '<li>Coșul este gol.</li>';
    if (totalDisplay) {
        totalDisplay.textContent = 'Total: 0 RON';
    }
}

const clearButton = document.getElementById('clear-basket');
if (clearButton) {
    clearButton.addEventListener('click', function () {
        localStorage.removeItem('basket');
        productList.innerHTML = '<li>Cosul a fost golit!</li>';
        if (totalDisplay) {
            totalDisplay.textContent = 'Total: 0 RON';
        }
        alert('Coșul a fost golit!');
        setTimeout(function () {
            window.location.reload();
        }, 2000);
    });
}