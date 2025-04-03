$(document).ready(function() {
    // Render wishlist
    function renderWishlist() {
      const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
      const container = $('#wishlist-container');
      
      if (wishlist.length === 0) {
        // Empty wishlist
        container.html(`
          <div class="cart-empty">
            <i class="fas fa-heart"></i>
            <h2>Your wishlist is empty</h2>
            <p>Add items you love to your wishlist. Review them anytime and easily move them to the cart.</p>
            <a href="index.html" class="btn">Continue Shopping</a>
          </div>
        `);
        return;
      }
      
      // Render wishlist
      const wishlistHTML = `
        <div class="product-grid">
          ${wishlist.map(item => {
            const product = getProductById(item.id) || item;
            return `
              <div class="product-card">
                <div class="product-image">
                  <a href="product.html?id=${product.id}">
                    <img src="${product.image}" alt="${product.name}">
                  </a>
                  
                  <button class="product-action-btn" style="top: 10px; right: 10px;" onclick="removeFromWishlist(${product.id})">
                    <i class="fas fa-trash-alt"></i>
                  </button>
                  
                  ${!product.inStock ? `
                    <div class="product-out-of-stock">
                      <span>Out of Stock</span>
                    </div>
                  ` : ''}
                </div>
                
                <div class="product-info">
                  <a href="product.html?id=${product.id}">
                    <h3 class="product-name">${product.name}</h3>
                  </a>
                  
                  <div class="product-price">${formatPrice(product.price)}</div>
                  
                  <div class="product-actions" style="margin-top: 10px;">
                    <button class="btn btn-outline btn-full" onclick="addToCart(${product.id})" ${!product.inStock ? 'disabled' : ''}>
                      <i class="fas fa-shopping-cart"></i>
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      `;
      
      container.html(wishlistHTML);
    }
    
    // Remove from wishlist function
    window.removeFromWishlist = function(productId) {
      let wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
      const updatedWishlist = wishlist.filter(item => item.id !== productId);
      
      localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
      updateWishlistCount();
      
      showToast('Removed from Wishlist', 'Item has been removed from your wishlist.');
      
      // Update the wishlist display
      renderWishlist();
    };
    
    // Initialize
    renderWishlist();
  });