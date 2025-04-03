$(document).ready(function() {
    // Initialize cart and wishlist counts
    updateCartCount();
    updateWishlistCount();
    
    // Mobile menu toggle
    $('.mobile-menu-toggle').on('click', function() {
      $('.mobile-menu').slideToggle(300);
      $(this).find('i').toggleClass('fa-bars fa-times');
    });
    
    // Theme toggle
    $('#theme-toggle, .theme-toggle-mobile').on('click', function() {
      $('body').toggleClass('dark-theme');
      $('.theme-toggle i, .theme-toggle-mobile i').toggleClass('fa-moon fa-sun');
      
      // Save theme preference to localStorage
      const isDarkTheme = $('body').hasClass('dark-theme');
      localStorage.setItem('darkTheme', isDarkTheme);
      
      // Update theme toggle text for mobile
      $('.theme-toggle-mobile span').text(isDarkTheme ? 'Light Mode' : 'Dark Mode');
    });
    
    // Load theme preference from localStorage
    if (localStorage.getItem('darkTheme') === 'true') {
      $('body').addClass('dark-theme');
      $('.theme-toggle i, .theme-toggle-mobile i').removeClass('fa-moon').addClass('fa-sun');
      $('.theme-toggle-mobile span').text('Light Mode');
    }
    
    // Toast notification
    window.showToast = function(title, message, type = 'success') {
      const toast = $('#toast');
      const toastTitle = $('.toast-title');
      const toastDescription = $('.toast-description');
      const toastIcon = $('.toast-icon');
      
      toastTitle.text(title);
      toastDescription.text(message);
      
      // Set icon based on type
      toastIcon.removeClass('fa-check-circle fa-exclamation-circle fa-info-circle');
      
      if (type === 'success') {
        toastIcon.addClass('fa-check-circle').css('color', 'var(--success-color)');
      } else if (type === 'error') {
        toastIcon.addClass('fa-exclamation-circle').css('color', 'var(--error-color)');
      } else if (type === 'info') {
        toastIcon.addClass('fa-info-circle').css('color', 'var(--info-color)');
      }
      
      // Show toast
      toast.addClass('active');
      
      // Hide toast after 3 seconds
      setTimeout(function() {
        toast.removeClass('active');
      }, 3000);
    };
    
    // Close toast on click
    $('.toast-close').on('click', function() {
      $('#toast').removeClass('active');
    });
    
    // Modal functionality
    window.openModal = function(modalId) {
      $(`#${modalId}`).addClass('active');
      $('body').css('overflow', 'hidden');
    };
    
    window.closeModal = function(modalId) {
      $(`#${modalId}`).removeClass('active');
      $('body').css('overflow', 'auto');
    };
    
    // Close modal when clicking on close button or outside the modal
    $('.modal-close, .modal').on('click', function(e) {
      if (e.target === this) {
        $(this).closest('.modal').removeClass('active');
        $('body').css('overflow', 'auto');
      }
    });
    
    // Prevent modal content click from closing modal
    $('.modal-content').on('click', function(e) {
      e.stopPropagation();
    });
    
    // Set current year in footer
    $('#current-year').text(new Date().getFullYear());
    
    // Helper functions for cart and wishlist
    function updateCartCount() {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      const count = cart.reduce((total, item) => total + item.quantity, 0);
      $('.cart-count').text(count > 0 ? count : '0');
    }
    
    function updateWishlistCount() {
      const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
      $('.wishlist-count').text(wishlist.length > 0 ? wishlist.length : '0');
    }
    
    // Add to cart function
    window.addToCart = function(productId, quantity = 1) {
      const product = getProductById(productId);
      if (!product) return;
      
      if (!product.inStock) {
        showToast('Out of Stock', 'This item is currently out of stock.', 'error');
        return;
      }
      
      let cart = JSON.parse(localStorage.getItem('cart') || '[]');
      const existingItem = cart.find(item => item.id === product.id);
      
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.push({
          id: product.id,
          name: product.name,
          price: product.price,
          image: `images/${product.image}`,
          quantity: quantity
        });
      }
      
      localStorage.setItem('cart', JSON.stringify(cart));
      updateCartCount();
      
      showToast('Added to Cart', `${product.name} has been added to your cart.`);
    };
    
    // Add to wishlist function
    window.addToWishlist = function(productId) {
      const product = getProductById(productId);
      if (!product) return;
      
      let wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
      const existingItem = wishlist.find(item => item.id === product.id);
      
      if (existingItem) {
        showToast('Already in Wishlist', `${product.name} is already in your wishlist.`, 'info');
        return;
      }
      
      wishlist.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: `images/${product.image}`,
        category: product.category,
        inStock: product.inStock
      });
      
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
      updateWishlistCount();
      
      showToast('Added to Wishlist', `${product.name} has been added to your wishlist.`);
    };
    
    // Remove from cart function
    window.removeFromCart = function(productId) {
      let cart = JSON.parse(localStorage.getItem('cart') || '[]');
      const updatedCart = cart.filter(item => item.id !== productId);
      
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      updateCartCount();
      
      showToast('Removed from Cart', 'Item has been removed from your cart.');
      
      // If on cart page, update the cart display
      if (window.location.pathname.includes('cart.html')) {
        renderCart();
      }
    };
    
    // Update cart item quantity
    window.updateCartItemQuantity = function(productId, quantity) {
      if (quantity < 1) return;
      
      let cart = JSON.parse(localStorage.getItem('cart') || '[]');
      const item = cart.find(item => item.id === productId);
      
      if (item) {
        item.quantity = quantity;
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        
        // If on cart page, update the cart display
        if (window.location.pathname.includes('cart.html')) {
          renderCart();
        }
      }
    };
    
    // Clear cart function
    window.clearCart = function() {
      localStorage.setItem('cart', '[]');
      updateCartCount();
      
      showToast('Cart Cleared', 'All items have been removed from your cart.');
      
      // If on cart page, update the cart display
      if (window.location.pathname.includes('cart.html')) {
        renderCart();
      }
    };
    
    // Format price
    window.formatPrice = function(price) {
      return '$' + price.toFixed(2);
    };
  });