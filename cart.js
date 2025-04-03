$(document).ready(function() {
    // Render cart
    function renderCart() {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      const container = $('#cart-container');
      
      if (cart.length === 0) {
        // Empty cart
        container.html(`
          <div class="cart-empty">
            <i class="fas fa-shopping-cart"></i>
            <h2>Your cart is empty</h2>
            <p>Looks like you haven't added anything to your cart yet.</p>
            <a href="index.html" class="btn">Continue Shopping</a>
          </div>
        `);
        return;
      }
      
      // Calculate totals
      const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
      const shipping = subtotal > 50 ? 0 : 5.99;
      
      // Get discount from localStorage if any
      const discount = parseFloat(localStorage.getItem('cartDiscount') || '0');
      const discountAmount = (subtotal * discount) / 100;
      
      const total = subtotal - discountAmount + shipping;
      
      // Render cart
      const cartHTML = `
        <div class="cart-grid">
          <div class="cart-items">
            <div class="cart-header">
              <div>Product</div>
              <div>Price</div>
              <div>Quantity</div>
              <div>Total</div>
            </div>
            
            ${cart.map(item => `
              <div class="cart-item" data-id="${item.id}">
                <div class="cart-item-main">
                  <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}">
                  </div>
                  <div class="cart-item-details">
                    <a href="product.html?id=${item.id}" class="cart-item-name">${item.name}</a>
                    <div class="cart-item-meta">
                      <span class="cart-item-price">${formatPrice(item.price)}</span>
                      <span class="cart-item-quantity-mobile">× ${item.quantity}</span>
                    </div>
                  </div>
                </div>
                
                <div class="cart-item-quantity">
                  <div class="quantity-input">
                    <button type="button" class="quantity-btn decrease-cart-quantity" data-id="${item.id}">
                      <i class="fas fa-minus"></i>
                    </button>
                    <span class="quantity-value">${item.quantity}</span>
                    <button type="button" class="quantity-btn increase-cart-quantity" data-id="${item.id}">
                      <i class="fas fa-plus"></i>
                    </button>
                  </div>
                </div>
                
                <button class="cart-item-remove" data-id="${item.id}">
                  <i class="fas fa-trash-alt"></i>
                </button>
                
                <div class="cart-item-total">
                  ${formatPrice(item.price * item.quantity)}
                </div>
              </div>
            `).join('')}
            
            <div class="cart-footer">
              <a href="index.html" class="cart-continue-shopping">
                <i class="fas fa-arrow-left"></i>
                Continue Shopping
              </a>
              
              <button class="btn btn-outline" id="clear-cart-btn">Clear Cart</button>
            </div>
          </div>
          
          <div class="cart-summary">
            <h2>Order Summary</h2>
            
            <div class="cart-totals">
              <div class="cart-total-row">
                <span class="cart-total-label">Subtotal</span>
                <span>${formatPrice(subtotal)}</span>
              </div>
              
              ${discount > 0 ? `
                <div class="cart-total-row">
                  <span class="cart-total-label">Discount (${discount}%)</span>
                  <span class="cart-discount">-${formatPrice(discountAmount)}</span>
                </div>
              ` : ''}
              
              <div class="cart-total-row">
                <span class="cart-total-label">Shipping</span>
                <span>${shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
              </div>
              
              <div class="cart-total-row total">
                <span>Total</span>
                <span>${formatPrice(total)}</span>
              </div>
            </div>
            
            <div class="cart-coupon">
              <div class="form-row">
                <input type="text" id="coupon-code" placeholder="Coupon code">
                <button type="button" id="apply-coupon" class="btn btn-outline">Apply</button>
              </div>
              <div class="cart-coupon-hint">Try these codes: DISCOUNT20, SAVE10</div>
            </div>
            
            <a href="checkout.html" class="btn btn-full">Proceed to Checkout</a>
          </div>
        </div>
      `;
      
      container.html(cartHTML);
    }
    
    // Initialize
    renderCart();
    
    // Event handlers
    $(document).on('click', '.increase-cart-quantity', function() {
      const id = $(this).data('id');
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      const item = cart.find(item => item.id === id);
      
      if (item) {
        item.quantity += 1;
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        renderCart();
      }
    });
    
    $(document).on('click', '.decrease-cart-quantity', function() {
      const id = $(this).data('id');
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      const item = cart.find(item => item.id === id);
      
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        renderCart();
      }
    });
    
    $(document).on('click', '.cart-item-remove', function() {
      const id = $(this).data('id');
      removeFromCart(id);
    });
    
    $(document).on('click', '#clear-cart-btn', function() {
      clearCart();
    });
    
    $(document).on('click', '#apply-coupon', function() {
      const couponCode = $('#coupon-code').val().trim().toLowerCase();
      
      if (!couponCode) {
        showToast('Error', 'Please enter a coupon code.', 'error');
        return;
      }
      
      // Simulate API call
      $(this).text('Applying...').prop('disabled', true);
      
      setTimeout(() => {
        $(this).text('Apply').prop('disabled', false);
        
        if (couponCode === 'discount20') {
          localStorage.setItem('cartDiscount', '20');
          showToast('Coupon Applied', '20% discount has been applied to your order.');
          renderCart();
        } else if (couponCode === 'save10') {
          localStorage.setItem('cartDiscount', '10');
          showToast('Coupon Applied', '10% discount has been applied to your order.');
          renderCart();
        } else {
          showToast('Invalid Coupon', 'The coupon code you entered is invalid or expired.', 'error');
        }
      }, 1000);
    });
    
    // Helper function to update cart count
    function updateCartCount() {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      const count = cart.reduce((total, item) => total + item.quantity, 0);
      $('.cart-count').text(count > 0 ? count : '0');
    }
  });