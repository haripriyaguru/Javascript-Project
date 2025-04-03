$(document).ready(function() {
    let subtotal = 0;
    let tax = 0;
    let shippingCost = 0;
    let discount = 0;

    // Load cart items in the order summary
    function loadOrderSummary() {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        const orderItemsContainer = $('#checkout-items');
        subtotal = 0;

        orderItemsContainer.empty();

        cart.forEach(item => {
            const product = getProductById(item.id);
            if (!product) return;

            const itemTotal = product.price * item.quantity;
            subtotal += itemTotal;

            const orderItem = `
                <div class="order-item">
                    <div class="order-item-image">
                        <img src="${product.image}" alt="${product.name}">
                    </div>
                    <div class="order-item-details">
                        <h3>${product.name}</h3>
                        <p>Quantity: ${item.quantity}</p>
                        <p class="order-item-price">${formatPrice(itemTotal)}</p>
                    </div>
                </div>
            `;
            orderItemsContainer.append(orderItem);
        });

        // Update totals
        $('#checkout-subtotal').text(formatPrice(subtotal));
        
        // Calculate tax (assuming 8% tax rate)
        tax = subtotal * 0.08;
        $('#checkout-tax').text(formatPrice(tax));
        
        // Get shipping cost
        const shippingMethod = $('input[name="shipping"]:checked').val();
        shippingCost = 0;
        if (shippingMethod === 'express') {
            shippingCost = 12.99;
        } else if (shippingMethod === 'overnight') {
            shippingCost = 24.99;
        }
        $('#checkout-shipping').text(shippingCost === 0 ? 'Free' : formatPrice(shippingCost));
        
        // Calculate total
        const total = subtotal + tax + shippingCost - discount;
        $('#checkout-total').text(formatPrice(total));
    }

    // Handle shipping method change
    $('input[name="shipping"]').on('change', function() {
        loadOrderSummary();
    });

    // Handle coupon code
    $('#apply-coupon').on('click', function() {
        const couponCode = $('#coupon-code').val().toUpperCase();
        discount = 0;

        if (couponCode === 'DISCOUNT20') {
            discount = subtotal * 0.20; // 20% discount
        } else if (couponCode === 'SAVE10') {
            discount = subtotal * 0.10; // 10% discount
        }

        if (discount > 0) {
            $('#discount-row').show();
            $('#checkout-discount').text(`-${formatPrice(discount)}`);
            const total = subtotal + tax + shippingCost - discount;
            $('#checkout-total').text(formatPrice(total));
            showToast('Success', 'Coupon code applied successfully!');
        } else {
            showToast('Error', 'Invalid coupon code');
        }
    });

    // Handle place order button click
    $('#place-order-btn').on('click', function(e) {
        e.preventDefault();

        // Validate form
        const form = $('#checkout-form');
        if (!form[0].checkValidity()) {
            form[0].reportValidity();
            return;
        }

        // Get order details
        const orderDetails = {
            customer: {
                firstName: $('#checkout-first-name').val(),
                lastName: $('#checkout-last-name').val(),
                email: $('#checkout-email').val(),
                phone: $('#checkout-phone').val(),
                address: $('#checkout-address').val(),
                address2: $('#checkout-address2').val(),
                city: $('#checkout-city').val(),
                state: $('#checkout-state').val(),
                zip: $('#checkout-zip').val()
            },
            payment: {
                method: $('.payment-tab.active').data('payment'),
                cardName: $('#card-name').val(),
                cardNumber: $('#card-number').val(),
                cardExpiry: $('#card-expiry').val(),
                cardCvc: $('#card-cvc').val(),
                upiId: $('#upi-id').val()
            },
            shipping: {
                method: $('input[name="shipping"]:checked').val(),
                cost: shippingCost
            },
            items: JSON.parse(localStorage.getItem('cart') || '[]'),
            subtotal: subtotal,
            tax: tax,
            discount: discount,
            total: subtotal + tax + shippingCost - discount,
            orderDate: new Date().toISOString()
        };

        // Save order to localStorage
        const orders = JSON.parse(localStorage.getItem('orders') || '[]');
        orders.push(orderDetails);
        localStorage.setItem('orders', JSON.stringify(orders));

        // Clear cart
        localStorage.setItem('cart', '[]');
        updateCartCount();

        // Redirect to order summary page
        window.location.href = 'order-summary.html';
    });

    // Initialize order summary
    loadOrderSummary();
}); 
$(document).ready(function () {
    // Payment method toggle functionality
    $(".payment-tab").click(function () {
        $(".payment-tab").removeClass("active");
        $(this).addClass("active");
        
        let selectedPayment = $(this).data("payment");
        
        $(".payment-panel").removeClass("active").hide();
        $("#" + selectedPayment + "-panel").fadeIn().addClass("active");
    });

    // Place order button functionality
    $("#place-order-btn").click(function () {
        alert("Your order has been confirmed successfully!"); 
        window.location.href = "order-confirmation.html";
    });
});
