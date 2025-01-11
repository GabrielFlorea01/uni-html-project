const basket = JSON.parse(localStorage.getItem('basket')) || [];
const productList = document.getElementById('product-list');
const totalDisplay = document.getElementById('total-display');

function updateBasketDisplay() {
    productList.innerHTML = '';
    basket.forEach(product => {
        const li = document.createElement('li');
        li.innerHTML = `${product.name} - ${product.price} RON`;
        productList.appendChild(li);
    });

    const total = basket.reduce((sum, product) => sum + parseFloat(product.price), 0);
    if (totalDisplay) {
        totalDisplay.textContent = `Total: ${total.toFixed(2)} RON`;
    }
}

if (basket.length > 0) {
    updateBasketDisplay();
} else {
    productList.innerHTML = '<li>Cosul este gol.</li>';
    if (totalDisplay) {
        totalDisplay.textContent = 'Total: 0 RON';
    }
}

const clearButton = document.getElementById('clear-basket');
if (clearButton) {
    clearButton.addEventListener('click', function () {
        if (basket.length === 0) {
            alert('Cosul este gol!');
            return;
        }

        localStorage.removeItem('basket');
        productList.innerHTML = '<li>Cosul a fost golit!</li>';
        if (totalDisplay) {
            totalDisplay.textContent = 'Total: 0 RON';
        }
        alert('Cosul a fost golit!');
        setTimeout(function () {
            window.location.reload();
        }, 2000);
    });
}

const order = document.getElementById('shop');
if (order) {
    order.addEventListener('click', function () {
        if (basket.length === 0) {
            alert('Cosul este gol! Nu puteti plasa o comanda.');
            return; 
        }

        localStorage.removeItem('basket');
        productList.innerHTML = '<li>Produsele au fost comandate cu succes!</li>';
        alert('Produsele au fost comandate cu succes!');
        setTimeout(function () {
            window.location.reload();
        }, 2000);
    });
}

const correctPassword = "Parola123";

function checkPassword() {
    const passwordInput = document.getElementById('passwordInput').value;
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

    if (!regex.test(passwordInput)) {
        alert('Parola nu respectă cerințele! Trebuie să conțină cel puțin o literă mică, o literă mare, un număr și să aibă minim 8 caractere.');
        return;
    }

    if (passwordInput === correctPassword) {
        document.getElementById('password-protection').style.display = 'none';
        document.getElementById('main-content').style.display = 'block';
    } else {
        alert('Parolă incorectă! Încercați din nou.');
    }
}