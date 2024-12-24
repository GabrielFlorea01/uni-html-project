self.addEventListener('message', function (event) {
    const basket = event.data;
    const discountedBasket = basket.map(product => {
        const discountedPrice = (product.price * 0.6).toFixed(2); 
        return { ...product, discountedPrice };
    });
    self.postMessage({ type: 'basket', data: discountedBasket });
    self.postMessage({ type: 'message', data: 'Reducerea de 40% a fost aplicata produselor din cos!' });
});
