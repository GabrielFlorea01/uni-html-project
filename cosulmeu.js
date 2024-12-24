const basket = JSON.parse(localStorage.getItem('basket')) || [];
const productList = document.getElementById('product-list');
if (basket.length === 0) {
    productList.innerHTML = '<li>Coșul este gol.</li>';
} else {
    basket.forEach(product => {
        const li = document.createElement('li');
        const img = document.createElement('img');
        img.src = product.image;
        img.alt = product.name;
        img.style.width = '100px';
        li.innerHTML = `${product.name} - ${product.price} RON`;
        productList.appendChild(li);
    });
}

const clearButton = document.getElementById('clear-basket');
if (clearButton) {
    clearButton.addEventListener('click', function() {
        localStorage.removeItem('basket');
        productList.innerHTML = "<li>Coșul a fost golit!</li>";
        alert("Coșul a fost golit!");
        setTimeout(function () {
            window.location.reload();
        }, 2000);
    });
}