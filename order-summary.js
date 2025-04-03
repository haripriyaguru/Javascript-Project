$(document).ready(function() {
    // Get the latest order from localStorage
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const latestOrder = orders[orders.length - 1];

    if (!latestOrder) {
        window.location.href = 'index.html';
        return;
    }

    // Generate order number (ART + timestamp)
    const orderNumber = 'ART' + Date.now().toString().slice(-6);
    $('#order-number').text(orderNumber);

    // Format and display order date
    const orderDate = new Date(latestOrder.orderDate);
    $('#order-date').text(orderDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }));

    // Display order items
    const orderItemsContainer = $('#order-items');
    latestOrder.items.forEach(item => {
        const product = getProductById(item.id);
        if (!product) return;

        const orderItem = `
            <div class="order-item">
                <div class="order-item-image">
                    <img src="images/${product.image}" alt="${product.name}">
                </div>
                <div class="order-item-details">
                    <h3>${product.name}</h3>
                    <p>Quantity: ${item.quantity}</p>
                    <p class="order-item-price">${formatPrice(product.price * item.quantity)}</p>
                </div>
            </div>
        `;
        orderItemsContainer.append(orderItem);
    });

    // Display order totals
    $('#order-subtotal').text(formatPrice(latestOrder.subtotal));
    $('#order-tax').text(formatPrice(latestOrder.tax));
    $('#order-shipping').text(latestOrder.shipping.cost === 0 ? 'Free' : formatPrice(latestOrder.shipping.cost));
    
    // Handle discount display
    if (latestOrder.discount && latestOrder.discount > 0) {
        $('#order-discount-row').show();
        $('#order-discount').text(`-${formatPrice(latestOrder.discount)}`);
    } else {
        $('#order-discount-row').hide();
    }
    
    $('#order-total').text(formatPrice(latestOrder.total));

    // Display shipping details
    const shippingAddress = `
        <p>${latestOrder.customer.firstName} ${latestOrder.customer.lastName}</p>
        <p>${latestOrder.customer.address}</p>
        ${latestOrder.customer.address2 ? `<p>${latestOrder.customer.address2}</p>` : ''}
        <p>${latestOrder.customer.city}, ${latestOrder.customer.state} ${latestOrder.customer.zip}</p>
        <p>Phone: ${latestOrder.customer.phone}</p>
        <p>Email: ${latestOrder.customer.email}</p>
    `;
    $('#shipping-address').html(shippingAddress);

    // Display shipping method
    const shippingMethod = latestOrder.shipping.method.charAt(0).toUpperCase() + 
                          latestOrder.shipping.method.slice(1) + ' Shipping';
    $('#shipping-method').text(shippingMethod);

    // Display payment method
    const paymentMethod = latestOrder.payment.method.charAt(0).toUpperCase() + 
                         latestOrder.payment.method.slice(1);
    $('#payment-method').text(paymentMethod);
}); 