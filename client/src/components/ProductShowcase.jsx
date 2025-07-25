import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard.jsx";
import styles from "./ProductShowcase.module.css";

// Mock product data
const MOCK_PRODUCTS = [
  {
    _id: "p1",
    name: "Hydrating Face Serum",
    description: "Deeply hydrates and rejuvenates skin with hyaluronic acid",
    price: 29.99,
    category: "skincare",
    image:
      "https://m.media-amazon.com/images/I/71dWzRMvc0L._UF350,350_QL80_.jpg",
    rating: 4.8,
    isWishlisted: false,
  },
  {
    _id: "p2",
    name: "Volumizing Mascara",
    description: "Adds dramatic volume and length to lashes",
    price: 24.99,
    category: "makeup",
    image:
      "data:image/jpeg;base64,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",
    rating: 4.5,
    isWishlisted: true,
  },
  {
    _id: "p3",
    name: "Nourishing Hair Oil",
    description: "Repairs damaged hair and adds shine",
    price: 34.99,
    category: "haircare",
    image:
      "https://www.epharmacy.com.np/content/images/thumbs/61d297d9775a73ede3b08be2_mamaearth-nourishing-baby-hair-oil-almond-and-avocado-200ml.jpeg",
    rating: 4.7,
    isWishlisted: false,
  },
  {
    _id: "p4",
    name: "Exfoliating Body Scrub",
    description: "Gently removes dead skin cells for smooth skin",
    price: 22.99,
    category: "bodycare",
    image:
      "https://static.beautytocare.com/media/catalog/product/n/i/nivea-men-protect-care-exfoliating-face-scrub-75ml.jpg",
    rating: 4.6,
    isWishlisted: false,
  },
  {
    _id: "p5",
    name: "Makeup Brush Set",
    description: "Professional quality brushes for flawless application",
    price: 49.99,
    category: "tools",
    image:
      "data:image/jpeg;base64,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",
    rating: 4.9,
    isWishlisted: false,
  },
  {
    _id: "p6",
    name: "Anti-Aging Night Cream",
    description: "Reduces fine lines and wrinkles while you sleep",
    price: 39.99,
    category: "skincare",
    image:
      "https://cdn.shopify.com/s/files/1/0434/3604/8550/files/01_fba115e0-f191-4173-b87c-7b059190a490.jpg?v=1750941242",
    rating: 4.7,
    isWishlisted: false,
  },
];

const ProductShowcase = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState("all");
  const [sortBy, setSortBy] = useState("default");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const categories = [
    "all",
    ...new Set(MOCK_PRODUCTS.map((product) => product.category)),
  ];

  useEffect(() => {
    fetchProducts();
  }, [activeCategory, sortBy, searchQuery, currentPage]);

  const fetchProducts = () => {
    try {
      setLoading(true);

      // Simulate API delay
      setTimeout(() => {
        // Filter products by category
        let filteredProducts = [...MOCK_PRODUCTS];
        if (activeCategory !== "all") {
          filteredProducts = filteredProducts.filter(
            (product) => product.category === activeCategory
          );
        }

        // Filter by search query
        if (searchQuery) {
          const query = searchQuery.toLowerCase();
          filteredProducts = filteredProducts.filter(
            (product) =>
              product.name.toLowerCase().includes(query) ||
              product.description.toLowerCase().includes(query)
          );
        }

        // Sort products
        if (sortBy === "price-low") {
          filteredProducts.sort((a, b) => a.price - b.price);
        } else if (sortBy === "price-high") {
          filteredProducts.sort((a, b) => b.price - a.price);
        } else if (sortBy === "rating") {
          filteredProducts.sort((a, b) => b.rating - a.rating);
        }

        // Pagination
        const hasMorePages = filteredProducts.length > currentPage * 12;
        const paginatedProducts = filteredProducts.slice(0, currentPage * 12);

        setProducts(paginatedProducts);
        setHasMore(hasMorePages);
        setError(null);
        setLoading(false);
      }, 500);
    } catch (err) {
      setError("Failed to fetch products. Please try again later.");
      console.error("Error loading products");
      setLoading(false);
    }
  };

  const handleAddToCart = (productId) => {
    try {
      // Simulate successful API call
      console.log("Product added to cart successfully");
      // Show a simple alert to the user
      alert("Product added to cart successfully");
    } catch (err) {
      console.error("Error adding to cart:", err);
      alert("Failed to add product to cart");
    }
  };

  const handleToggleWishlist = (productId) => {
    try {
      // Update the product's wishlist status in the UI
      setProducts((prev) =>
        prev.map((product) => {
          if (product._id === productId) {
            const newStatus = !product.isWishlisted;
            const message = newStatus
              ? "Product added to wishlist"
              : "Product removed from wishlist";
            console.log(message);
            // Show a simple alert to the user
            alert(message);
            return { ...product, isWishlisted: newStatus };
          }
          return product;
        })
      );
    } catch (err) {
      console.error("Error updating wishlist:", err);
      alert("Failed to update wishlist");
    }
  };

  return (
    <section id="products" className={styles.productShowcase}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Our Products</h2>
          <p className={styles.sectionDescription}>
            Discover our curated collection of premium beauty products
          </p>
        </div>

        <div className={styles.controlsContainer}>
          <div className={styles.searchContainer}>
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
            <button
              className={styles.searchButton}
              onClick={() => {
                setCurrentPage(1);
                fetchProducts();
              }}
            >
              Search
            </button>
          </div>

          <div className={styles.filtersContainer}>
            <select
              value={activeCategory}
              onChange={(e) => {
                setActiveCategory(e.target.value);
                setCurrentPage(1);
              }}
              className={styles.select}
            >
              <option value="all">All Categories</option>
              <option value="skincare">Skincare</option>
              <option value="makeup">Makeup</option>
              <option value="haircare">Hair Care</option>
              <option value="bodycare">Body Care</option>
              <option value="tools">Beauty Tools</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value);
                setCurrentPage(1);
              }}
              className={styles.select}
            >
              <option value="newest">Newest First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="popular">Most Popular</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {error && <div className={styles.error}>{error}</div>}

        <div className={styles.productsGrid}>
          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              onAddToCart={() => handleAddToCart(product._id)}
              onToggleWishlist={() => handleToggleWishlist(product._id)}
            />
          ))}
        </div>

        {loading && (
          <div className={styles.loading}>
            <div className={styles.spinner}></div>
            <p>Loading products...</p>
          </div>
        )}

        {!loading && products.length === 0 && (
          <div className={styles.noResults}>
            <p>No products found matching your criteria</p>
          </div>
        )}

        {hasMore && !loading && products.length > 0 && (
          <div className={styles.loadMore}>
            <button
              onClick={() => setCurrentPage((prev) => prev + 1)}
              className={styles.loadMoreButton}
            >
              Load More Products
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
export default ProductShowcase;
