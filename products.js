// Mock product data
const products = [
    {
      id: 1,
      name: "Crystal Drop Earrings",
      price: 29.99,
      image: "images/earing.jpg",
      category: "earrings",
      rating: 4.5,
      reviews: 28,
      description: "Elegant crystal drop earrings handcrafted with precision. These stunning earrings catch the light beautifully and add a touch of glamour to any outfit.",
      details: [
        "Length: 2 inches",
        "Nickel-free",
        "Hypoallergenic",
        "Handmade in small batches",
        "Comes in a gift box"
      ],
      material: "Silver plated brass, Crystal",
      care: "To keep your jewelry looking its best, avoid contact with water, perfume, and lotions. Store in a cool, dry place and clean with a soft cloth.",
      inStock: true,
      sku: "EAR-CRY-001",
      shippingInfo: "Free shipping on orders over $50. Estimated delivery: 3-5 business days.",
      images: [
        "images/earing.jpg",
        "images/earing.jpg",
        "images/earing.jpg",
        "images/earing.jpg"
      ],
      color: "Silver",
      isNew: true,
      featured: true
    },
    {
      id: 2,
      name: "Layered Gold Necklace",
      price: 49.99,
      image: "images/gem neck.jpg",
      category: "necklaces",
      rating: 4.8,
      reviews: 36,
      description: "A delicate layered gold necklace that adds elegance to any outfit. Features multiple chains of varying lengths for a sophisticated look.",
      details: [
        "Length: 18-20 inches (adjustable)",
        "Layered design with 3 chains",
        "Lobster clasp closure",
        "Tarnish resistant",
        "Comes in a gift box"
      ],
      material: "Gold plated brass",
      care: "Remove before showering or swimming. Avoid contact with perfumes and lotions. Store in a cool, dry place.",
      inStock: true,
      sku: "NCK-GLD-001",
      shippingInfo: "Free shipping on orders over $50. Estimated delivery: 3-5 business days.",
      images: [
        "images/gem neck.jpg",
        "images/gem neck.jpg",
        "images/gem neck.jpg",
        "images/gem neck.jpg"
      ],
      color: "Gold",
      isNew: false,
      featured: true
    },
    {
      id: 3,
      name: "Beaded Charm Bracelet",
      price: 24.99,
      image: "images/bracelet.webp",
      category: "bracelets",
      rating: 4.3,
      reviews: 19,
      description: "Colorful beaded charm bracelet with unique handmade charms. Adjustable size to fit most wrists.",
      details: [
        "Adjustable size: 6-8 inches",
        "Handcrafted glass beads",
        "Unique charm designs",
        "Toggle clasp",
        "Comes in a gift pouch"
      ],
      material: "Glass beads, Brass charms",
      care: "Remove before swimming or bathing. Wipe clean with a soft, dry cloth.",
      inStock: true,
      sku: "BRC-BED-001",
      shippingInfo: "Free shipping on orders over $50. Estimated delivery: 3-5 business days.",
      images: [
        "images/bracelet.webp",
        "images/bracelet.webp",
        "images/bracelet.webp",
        "images/bracelet.webp"
      ],
      color: "Multi",
      isNew: true,
      featured: true
    },
    {
      id: 4,
      name: "Minimalist Stacking Rings",
      price: 19.99,
      image: "images/ring.jpg",
      category: "rings",
      rating: 4.6,
      reviews: 42,
      description: "Set of three minimalist stacking rings that can be worn together or separately. Perfect for everyday wear.",
      details: [
        "Set of 3 rings",
        "Available in sizes 5-9",
        "Thin band design",
        "Comfortable for everyday wear",
        "Comes in a gift box"
      ],
      material: "Sterling silver",
      care: "Remove before swimming or using harsh chemicals. Polish with a jewelry cloth when needed.",
      inStock: false,
      sku: "RNG-STK-001",
      shippingInfo: "Free shipping on orders over $50. Estimated delivery: 3-5 business days.",
      images: [
        "images/ring.jpg",
        "images/ring.jpg",
        "images/ring.jpg",
        "images/ring.jpg"
      ],
      color: "Silver",
      isNew: false,
      featured: true
    },
    {
      id: 5,
      name: "Pearl Hair Pins",
      price: 15.99,
      image: "images/hair.jpg",
      category: "hair-accessories",
      rating: 4.7,
      reviews: 23,
      description: "Set of three elegant pearl hair pins. Perfect for adding a touch of sophistication to any hairstyle.",
      details: [
        "Set of 3 pins",
        "Length: 2.5 inches",
        "Freshwater pearl accents",
        "Secure grip design",
        "Comes in a gift box"
      ],
      material: "Freshwater pearls, Metal alloy",
      care: "Store in a dry place. Wipe clean with a soft cloth.",
      inStock: true,
      sku: "HAR-PRL-001",
      shippingInfo: "Free shipping on orders over $50. Estimated delivery: 3-5 business days.",
      images: [
        "images/hair.jpg",
        "images/hair.jpg",
        "images/hair.jpg",
        "images/hair.jpg"
      ],
      color: "White",
      isNew: false,
      featured: true
    },
    {
      id: 6,
      name: "Statement Hoop Earrings",
      price: 34.99,
      image: "images/earing.jpg",
      category: "earrings",
      rating: 4.4,
      reviews: 31,
      description: "Bold statement hoop earrings with intricate detailing. These eye-catching earrings are perfect for making a statement.",
      details: [
        "Diameter: 2 inches",
        "Lever back closure",
        "Intricate design pattern",
        "Lightweight despite size",
        "Comes in a gift box"
      ],
      material: "Brass with gold plating",
      care: "Remove before showering or swimming. Store in a jewelry box to prevent tarnishing.",
      inStock: true,
      sku: "EAR-HOP-001",
      shippingInfo: "Free shipping on orders over $50. Estimated delivery: 3-5 business days.",
      images: [
        "images/earing.jpg",
        "images/earing.jpg",
        "images/earing.jpg",
        "images/earing.jpg"
      ],
      color: "Gold",
      isNew: false,
      featured: true
    },
    {
      id: 7,
      name: "Gemstone Pendant Necklace",
      price: 39.99,
      image: "images/gem neck.jpg",
      category: "necklaces",
      rating: 4.9,
      reviews: 47,
      description: "Beautiful gemstone pendant necklace featuring a natural stone. Each piece is unique due to the natural variations in the gemstones.",
      details: [
        "Chain length: 18 inches",
        "Pendant size: 0.75 inches",
        "Natural gemstone",
        "Adjustable chain",
        "Comes in a gift box"
      ],
      material: "Sterling silver, Natural gemstone",
      care: "Avoid contact with water and chemicals. Store in a cool, dry place.",
      inStock: true,
      sku: "NCK-GEM-001",
      shippingInfo: "Free shipping on orders over $50. Estimated delivery: 3-5 business days.",
      images: [
        "images/gem neck.jpg",
        "images/gem neck.jpg",
        "images/gem neck.jpg",
        "images/gem neck.jpg"
      ],
      color: "Blue",
      isNew: true,
      featured: true
    },
    {
      id: 8,
      name: "Woven Friendship Bracelet",
      price: 12.99,
      image: "images/woven.webp",
      category: "bracelets",
      rating: 4.2,
      reviews: 18,
      description: "Handwoven friendship bracelet made with colorful threads. Adjustable size with sliding knot closure.",
      details: [
        "Adjustable size fits most wrists",
        "Handwoven design",
        "Sliding knot closure",
        "Waterproof threads",
        "Comes in a gift pouch"
      ],
      material: "Cotton threads",
      care: "Can get wet, but avoid prolonged exposure to water. Air dry if wet.",
      inStock: true,
      sku: "BRC-WVN-001",
      shippingInfo: "Free shipping on orders over $50. Estimated delivery: 3-5 business days.",
      images: [
        "images/woven.webp",
        "images/woven.webp",
        "images/woven.webp",
        "images/woven.webp"
      ],
      color: "Multi",
      isNew: false,
      featured: true
    }
  ];
  
  // Mock reviews data
  const reviews = [
    {
      id: 1,
      productId: 1,
      name: "Sarah Johnson",
      date: "2 months ago",
      rating: 5,
      comment: "These earrings are absolutely beautiful! They catch the light perfectly and I've received so many compliments. They're lightweight and comfortable to wear all day."
    },
    {
      id: 2,
      productId: 1,
      name: "Emily Davis",
      date: "1 month ago",
      rating: 4,
      comment: "Lovely earrings, exactly as pictured. The only reason I'm giving 4 stars instead of 5 is that one of the hooks was slightly bent upon arrival, but I was able to fix it easily."
    },
    {
      id: 3,
      productId: 1,
      name: "Michael Wilson",
      date: "3 weeks ago",
      rating: 5,
      comment: "Bought these as a gift for my wife and she loves them! Great quality for the price and they arrived in a nice gift box."
    },
    {
      id: 4,
      productId: 2,
      name: "Jessica Brown",
      date: "1 month ago",
      rating: 5,
      comment: "This necklace is stunning! The layered chains are delicate but sturdy, and the gold plating looks expensive. It's become my go-to piece for both casual and dressy outfits."
    },
    {
      id: 5,
      productId: 2,
      name: "Amanda Lee",
      date: "2 weeks ago",
      rating: 4,
      comment: "Beautiful necklace that looks just like the photos. The clasp is a bit small and can be tricky to open/close, but otherwise it's perfect."
    }
  ];
  
  // Function to get product by ID
  function getProductById(id) {
    return products.find(product => product.id === parseInt(id));
  }
  
  // Function to get products by category
  function getProductsByCategory(category) {
    return products.filter(product => product.category === category);
  }
  
  // Function to get featured products
  function getFeaturedProducts() {
    return products.filter(product => product.featured);
  }
  
  // Function to get related products (same category, excluding current product)
  function getRelatedProducts(productId, limit = 4) {
    const product = getProductById(productId);
    if (!product) return [];
    
    return products
      .filter(p => p.category === product.category && p.id !== product.id)
      .slice(0, limit);
  }
  
  // Function to get reviews by product ID
  function getReviewsByProductId(productId) {
    return reviews.filter(review => review.productId === parseInt(productId));
  }
  
  // Function to get unique colors from products
  function getUniqueColors() {
    return [...new Set(products.map(product => product.color))];
  }
  
  // Function to get unique materials from products
  function getUniqueMaterials() {
    const allMaterials = products.flatMap(product => 
      product.material.split(',').map(m => m.trim())
    );
    return [...new Set(allMaterials)];
  }