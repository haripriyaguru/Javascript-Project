$(document).ready(function() {
    // Hero Slider
    let currentSlide = 0;
    const slides = $('.hero-slide');
    const dots = $('.hero-dot');
    const totalSlides = slides.length;
    
    function showSlide(index) {
      slides.removeClass('active');
      dots.removeClass('active');
      
      $(slides[index]).addClass('active');
      $(dots[index]).addClass('active');
      
      currentSlide = index;
    }
    
    // Auto slide every 5 seconds
    let slideInterval = setInterval(nextSlide, 5000);
    
    function nextSlide() {
      showSlide((currentSlide + 1) % totalSlides);
    }
    
    function prevSlide() {
      showSlide((currentSlide - 1 + totalSlides) % totalSlides);
    }
    
    // Navigation buttons
    $('.hero-next').on('click', function() {
      clearInterval(slideInterval);
      nextSlide();
      slideInterval = setInterval(nextSlide, 5000);
    });
    
    $('.hero-prev').on('click', function() {
      clearInterval(slideInterval);
      prevSlide();
      slideInterval = setInterval(nextSlide, 5000);
    });
    
    // Dots navigation
    $('.hero-dot').on('click', function() {
      clearInterval(slideInterval);
      const index = $(this).data('index');
      showSlide(index);
      slideInterval = setInterval(nextSlide, 5000);
    });
    
    // Load featured products
    function loadFeaturedProducts() {
      const featuredProducts = getFeaturedProducts();
      const productGrid = $('#featured-products-grid');
      
      productGrid.empty();
      
      featuredProducts.forEach(product => {
        const productCard = `
          <div class="product-card">
            <div class="product-image">
              <a href="product.html?id=${product.id}">
                <img src="${product.image}" alt="${product.name}">
              </a>
              
              <div class="product-actions">
                <button class="product-action-btn" onclick="addToWishlist(${product.id})">
                  <i class="fas fa-heart"></i>
                </button>
                
                <button class="product-action-btn" onclick="openQuickView(${product.id})">
                  <i class="fas fa-eye"></i>
                </button>
              </div>
              
              ${product.isNew ? `<div class="product-badge">New</div>` : ''}
              
              ${!product.inStock ? `
                <div class="product-out-of-stock">
                  <span>Out of Stock</span>
                </div>
              ` : ''}
              
              <button class="btn product-add-to-cart" onclick="addToCart(${product.id})" ${!product.inStock ? 'disabled' : ''}>
                <i class="fas fa-shopping-cart"></i>
                Add to Cart
              </button>
            </div>
            
            <div class="product-info">
              <a href="product.html?id=${product.id}">
                <h3 class="product-name">${product.name}</h3>
              </a>
              
              <div class="product-rating">
                <i class="fas fa-star"></i>
                <span class="product-rating-value">${product.rating}</span>
                <span class="product-reviews">${product.reviews} reviews</span>
              </div>
              
              <div class="product-price">${formatPrice(product.price)}</div>
            </div>
          </div>
        `;
        
        productGrid.append(productCard);
      });
    }
    
    // Quick view functionality
    window.openQuickView = function(productId) {
      const product = getProductById(productId);
      if (!product) return;
      
      const quickViewContent = `
        <div class="quick-view-grid">
          <div class="quick-view-image">
            <img src="${product.image}" alt="${product.name}">
          </div>
          
          <div class="quick-view-details">
            <h2>${product.name}</h2>
            
            <div class="product-rating">
              <i class="fas fa-star"></i>
              <span class="product-rating-value">${product.rating}</span>
              <span class="product-reviews">${product.reviews} reviews</span>
            </div>
            
            <div class="product-price">${formatPrice(product.price)}</div>
            
            <p class="product-description">${product.description}</p>
            
            <div class="product-meta">
              <div class="product-meta-item">
                <span class="product-meta-label">Material:</span>
                <span>${product.material}</span>
              </div>
              
              <div class="product-meta-item">
                <span class="product-meta-label">Availability:</span>
                <span class="product-info-availability ${!product.inStock ? 'out-of-stock' : ''}">
                  ${product.inStock ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>
            </div>
            
            <div class="quick-view-actions">
              <button class="btn" onclick="addToCart(${product.id})" ${!product.inStock ? 'disabled' : ''}>
                <i class="fas fa-shopping-cart"></i>
                Add to Cart
              </button>
              
              <button class="btn btn-outline" onclick="addToWishlist(${product.id})">
                <i class="fas fa-heart"></i>
                Add to Wishlist
              </button>
            </div>
            
            <a href="product.html?id=${product.id}" class="view-full-details">
              View Full Details
            </a>
          </div>
        </div>
      `;
      
      $('.quick-view-container').html(quickViewContent);
      openModal('quick-view-modal');
    };
    
    // Newsletter form submission
    $('#newsletter-form').on('submit', function(e) {
      e.preventDefault();
      
      const email = $(this).find('input[type="email"]').val();
      
      // Simulate API call
      setTimeout(function() {
        showToast('Subscription Successful', 'Thank you for subscribing to our newsletter.');
        $('#newsletter-form')[0].reset();
      }, 1000);
    });
    
    // Initialize
    loadFeaturedProducts();
  });