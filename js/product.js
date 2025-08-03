$(document).ready(function() {
    // Get product ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));
    
    if (!productId) {
      window.location.href = 'index.html';
      return;
    }
    
    const product = getProductById(productId);
    if (!product) {
      window.location.href = 'index.html';
      return;
    }
    
    // Load product details
    function loadProductDetails() {
      // Set page title
      document.title = `${product.name} - Artisan`;
      
      // Breadcrumb
      const breadcrumb = `
        <a href="index.html">Home</a>
        <span>/</span>
        <a href="category.html?category=${product.category}">${capitalizeFirstLetter(product.category)}</a>
        <span>/</span>
        <span>${product.name}</span>
      `;
      $('#product-breadcrumb').html(breadcrumb);
      
      // Product detail
      const productDetail = `
        <div class="product-gallery">
          <div class="product-main-image">
            <img src="images/${product.images[0]}" alt="${product.name}" id="main-product-image">
          </div>
          
          <div class="product-thumbnails">
            ${product.images.map((image, index) => `
              <div class="product-thumbnail ${index === 0 ? 'active' : ''}" data-image="images/${image}">
                <img src="images/${image}" alt="${product.name} - Image ${index + 1}">
              </div>
            `).join('')}
          </div>
        </div>
        
        <div class="product-info-detail">
          <h1>${product.name}</h1>
          
          <div class="product-info-rating">
            <i class="fas fa-star"></i>
            <span class="product-info-rating-value">${product.rating}</span>
            <a href="#reviews-tab" class="product-info-reviews">${product.reviews} reviews</a>
          </div>
          
          <div class="product-info-price">${formatPrice(product.price)}</div>
          
          <p class="product-info-description">${product.description}</p>
          
          <div class="product-info-meta">
            <div class="product-info-meta-item">
              <span class="product-info-meta-label">Material:</span>
              <span>${product.material}</span>
            </div>
            
            <div class="product-info-meta-item">
              <span class="product-info-meta-label">SKU:</span>
              <span>${product.sku}</span>
            </div>
            
            <div class="product-info-meta-item">
              <span class="product-info-meta-label">Availability:</span>
              <span class="product-info-availability ${!product.inStock ? 'out-of-stock' : ''}">
                ${product.inStock ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>
          </div>
          
          <div class="product-quantity">
            <div class="quantity-input">
              <button type="button" class="quantity-btn" id="decrease-quantity">
                <i class="fas fa-minus"></i>
              </button>
              <span class="quantity-value" id="product-quantity">1</span>
              <button type="button" class="quantity-btn" id="increase-quantity">
                <i class="fas fa-plus"></i>
              </button>
            </div>
          </div>
          
          <div class="product-actions">
            <button class="btn" id="add-to-cart-btn" ${!product.inStock ? 'disabled' : ''}>
              <i class="fas fa-shopping-cart"></i>
              Add to Cart
            </button>
            
            <button class="btn btn-outline" id="add-to-wishlist-btn">
              <i class="fas fa-heart"></i>
            </button>
            
            <button class="btn btn-outline" id="share-btn">
              <i class="fas fa-share-alt"></i>
            </button>
          </div>
          
          <div class="product-shipping-info">
            <i class="fas fa-truck"></i>
            <p>${product.shippingInfo}</p>
          </div>
        </div>
      `;
      $('#product-detail').html(productDetail);
      
      // Product details tab
      const detailsTab = `
        <div class="product-details-grid">
          <div class="product-details-section">
            <h3>Description</h3>
            <p>${product.description}</p>
          </div>
          
          <div class="product-details-section">
            <h3>Features</h3>
            <ul class="product-features">
              ${product.details.map(detail => `<li>${detail}</li>`).join('')}
            </ul>
          </div>
        </div>
      `;
      $('#details-panel').html(detailsTab);
      
      // Care instructions tab
      const careTab = `
        <div class="product-care">
          <h3>Jewelry Care</h3>
          <p>${product.care}</p>
          
          <h4>General Care Tips:</h4>
          <ul class="product-features">
            <li>Remove jewelry before showering, swimming, or exercising</li>
            <li>Apply perfume, lotion, and hairspray before putting on jewelry</li>
            <li>Store pieces individually to prevent scratching or tangling</li>
            <li>Clean regularly with a soft polishing cloth</li>
            <li>For deeper cleaning, use mild soap and warm water, then dry thoroughly</li>
          </ul>
        </div>
      `;
      $('#care-panel').html(careTab);
      
      // Reviews tab
      const reviews = getReviewsByProductId(productId);
      const reviewsTab = `
        <div class="product-reviews-header">
          <h3>Customer Reviews</h3>
          <button class="btn btn-outline" id="write-review-btn">Write a Review</button>
        </div>
        
        <div class="product-reviews-summary">
          <div class="product-reviews-rating">
            <i class="fas fa-star"></i>
            <span class="product-reviews-rating-value">${product.rating}</span>
          </div>
          <div class="product-reviews-count">
            Based on ${product.reviews} reviews
          </div>
        </div>
        
        <div class="product-reviews-list">
          ${reviews.length > 0 ? reviews.map(review => `
            <div class="review-item">
              <div class="review-header">
                <div class="review-rating">
                  ${Array(5).fill().map((_, i) => `
                    <i class="fas fa-star ${i < review.rating ? '' : 'far'}"></i>
                  `).join('')}
                  <span class="review-author">${review.name}</span>
                </div>
                <div class="review-date">${review.date}</div>
              </div>
              <div class="review-content">
                <p>${review.comment}</p>
              </div>
            </div>
          `).join('') : `
            <div class="no-reviews">
              <p>There are no reviews yet for this product. Be the first to leave a review!</p>
            </div>
          `}
        </div>
      `;
      $('#reviews-panel').html(reviewsTab);
      
      // Related products
      loadRelatedProducts();
    }
    
    // Load related products
    function loadRelatedProducts() {
      const relatedProducts = getRelatedProducts(productId);
      const productGrid = $('#related-products-grid');
      
      productGrid.empty();
      
      relatedProducts.forEach(product => {
        const productCard = `
          <div class="product-card">
            <div class="product-image">
              <a href="product.html?id=${product.id}">
                <img src="images/${product.image}" alt="${product.name}">
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
    
    // Initialize
    loadProductDetails();
    
    // Event handlers
    $(document).on('click', '.product-thumbnail', function() {
      const image = $(this).data('image');
      $('#main-product-image').attr('src', image);
      
      $('.product-thumbnail').removeClass('active');
      $(this).addClass('active');
    });
    
    $(document).on('click', '#increase-quantity', function() {
      const quantityEl = $('#product-quantity');
      const quantity = parseInt(quantityEl.text()) + 1;
      quantityEl.text(quantity);
    });
    
    $(document).on('click', '#decrease-quantity', function() {
      const quantityEl = $('#product-quantity');
      const quantity = Math.max(1, parseInt(quantityEl.text()) - 1);
      quantityEl.text(quantity);
    });
    
    $(document).on('click', '#add-to-cart-btn', function() {
      const quantity = parseInt($('#product-quantity').text());
      addToCart(productId, quantity);
    });
    
    $(document).on('click', '#add-to-wishlist-btn', function() {
      addToWishlist(productId);
    });
    
    $(document).on('click', '#share-btn', function() {
      // Copy URL to clipboard
      const url = window.location.href;
      
      // Create a temporary input element
      const tempInput = document.createElement('input');
      tempInput.value = url;
      document.body.appendChild(tempInput);
      
      // Select and copy the URL
      tempInput.select();
      document.execCommand('copy');
      
      // Remove the temporary input
      document.body.removeChild(tempInput);
      
      showToast('Link Copied', 'Product link copied to clipboard');
    });
    
    // Tab switching
    $('.tab-btn').on('click', function() {
      const tab = $(this).data('tab');
      
      // Update active tab
      $('.tab-btn').removeClass('active');
      $(this).addClass('active');
      
      // Show corresponding panel
      $('.tab-panel').removeClass('active');
      $(`#${tab}-panel`).addClass('active');
    });
    
    // Helper function to capitalize first letter
    function capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
  });