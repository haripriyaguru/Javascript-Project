$(document).ready(function() {
    // Get category from URL
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    
    if (!category) {
      window.location.href = 'index.html';
      return;
    }
    
    // Set up filter variables
    let priceRange = [0, 100];
    let selectedColors = [];
    let selectedMaterials = [];
    let showInStock = false;
    let showNew = false;
    let sortBy = 'featured';
    
    // Load category page
    function loadCategoryPage() {
      // Set page title and breadcrumb
      const categoryTitle = getCategoryTitle(category);
      document.title = `${categoryTitle} - Artisan`;
      
      const breadcrumb = `
        <a href="index.html">Home</a>
        <span>/</span>
        <span>${categoryTitle}</span>
      `;
      $('#category-breadcrumb').html(breadcrumb);
      
      // Set category title
      $('#category-title').text(categoryTitle);
      
      // Load color filters
      const colors = getUniqueColors();
      const colorFilters = colors.map(color => `
        <div class="filter-option">
          <input type="checkbox" id="color-${color}" class="color-filter" value="${color}">
          <label for="color-${color}">${color}</label>
        </div>
      `).join('');
      $('#color-filters').html(colorFilters);
      
      // Load material filters
      const materials = getUniqueMaterials();
      const materialFilters = materials.map(material => `
        <div class="filter-option">
          <input type="checkbox" id="material-${material.replace(/\s+/g, '-').toLowerCase()}" class="material-filter" value="${material}">
          <label for="material-${material.replace(/\s+/g, '-').toLowerCase()}">${material}</label>
        </div>
      `).join('');
      $('#material-filters').html(materialFilters);
      
      // Initialize price slider
      $("#price-slider").slider({
        range: true,
        min: 0,
        max: 100,
        values: [0, 100],
        slide: function(event, ui) {
          priceRange = ui.values;
          $("#price-min").text('$' + ui.values[0]);
          $("#price-max").text('$' + ui.values[1]);
          filterProducts();
        }
      });
      
      // Load products
      filterProducts();
    }
    
    // Filter products
    function filterProducts() {
      let products = getProductsByCategory(category);
      
      // Apply filters
      if (showInStock) {
        products = products.filter(product => product.inStock);
      }
      
      if (showNew) {
        products = products.filter(product => product.isNew);
      }
      
      if (selectedColors.length > 0) {
        products = products.filter(product => selectedColors.includes(product.color));
      }
      
      if (selectedMaterials.length > 0) {
        products = products.filter(product => {
          const productMaterials = product.material.split(',').map(m => m.trim());
          return selectedMaterials.some(material => productMaterials.includes(material));
        });
      }
      
      // Apply price filter
      products = products.filter(product => 
        product.price >= priceRange[0] && product.price <= priceRange[1]
      );
      
      // Apply sorting
      switch (sortBy) {
        case 'price-low-high':
          products.sort((a, b) => a.price - b.price);
          break;
        case 'price-high-low':
          products.sort((a, b) => b.price - a.price);
          break;
        case 'rating':
          products.sort((a, b) => b.rating - a.rating);
          break;
        case 'newest':
          products.sort((a, b) => (a.isNew === b.isNew ? 0 : a.isNew ? -1 : 1));
          break;
        // featured - no specific sorting
      }
      
      // Render products
      renderProducts(products);
    }
    
    // Render products
    function renderProducts(products) {
      const productGrid = $('#category-products-grid');
      const noProducts = $('#no-products');
      
      if (products.length === 0) {
        productGrid.hide();
        noProducts.show();
        return;
      }
      
      productGrid.show();
      noProducts.hide();
      
      productGrid.empty();
      
      products.forEach(product => {
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
    
    // Event handlers
    $('#sort-select').on('change', function() {
      sortBy = $(this).val();
      filterProducts();
    });
    
    $('#filter-btn').on('click', function() {
      $('#filter-sidebar').addClass('active');
      $('#filter-overlay').addClass('active');
    });
    
    $('#filter-close, #filter-overlay').on('click', function() {
      $('#filter-sidebar').removeClass('active');
      $('#filter-overlay').removeClass('active');
    });
    
    $(document).on('change', '.color-filter', function() {
      const color = $(this).val();
      
      if ($(this).is(':checked')) {
        selectedColors.push(color);
      } else {
        selectedColors = selectedColors.filter(c => c !== color);
      }
      
      filterProducts();
    });
    
    $(document).on('change', '.material-filter', function() {
      const material = $(this).val();
      
      if ($(this).is(':checked')) {
        selectedMaterials.push(material);
      } else {
        selectedMaterials = selectedMaterials.filter(m => m !== material);
      }
      
      filterProducts();
    });
    
    $('#in-stock').on('change', function() {
      showInStock = $(this).is(':checked');
      filterProducts();
    });
    
    $('#new-arrivals').on('change', function() {
      showNew = $(this).is(':checked');
      filterProducts();
    });
    
    $('#reset-filters, #reset-filters-empty').on('click', function() {
      resetFilters();
    });
    
    // Reset filters
    function resetFilters() {
      priceRange = [0, 100];
      selectedColors = [];
      selectedMaterials = [];
      showInStock = false;
      showNew = false;
      sortBy = 'featured';
      
      // Reset UI
      $("#price-slider").slider("values", [0, 100]);
      $("#price-min").text('$0');
      $("#price-max").text('$100');
      
      $('.color-filter').prop('checked', false);
      $('.material-filter').prop('checked', false);
      $('#in-stock').prop('checked', false);
      $('#new-arrivals').prop('checked', false);
      $('#sort-select').val('featured');
      
      filterProducts();
    }
    
    // Helper function to get category title
    function getCategoryTitle(category) {
      const titles = {
        'earrings': 'Earrings',
        'necklaces': 'Necklaces',
        'bracelets': 'Bracelets',
        'rings': 'Rings',
        'hair-accessories': 'Hair Accessories'
      };
      
      return titles[category] || 'Products';
    }
    
    // Initialize
    loadCategoryPage();
  });