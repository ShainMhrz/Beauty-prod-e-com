import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaHeart, FaRegHeart, FaStar, FaShoppingCart } from "react-icons/fa";
import styles from "./ProductCard.module.css";

const ProductCard = ({ product, onAddToCart, onToggleWishlist }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleLike = () => {
    if (onToggleWishlist) {
      onToggleWishlist(product._id);
    }
  };

  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart(product._id);
    }
  };

  return (
    <motion.div
      className={styles.card}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      transition={{ duration: 0.3 }}
    >
      <div className={styles.imageContainer}>
        <img src={product.image} alt={product.name} className={styles.image} />
        <div className={styles.rating}>
          <FaStar className={styles.starIcon} />
          <span>{product.rating}</span>
        </div>
      </div>
      <motion.div
        className={styles.info}
        initial={false}
        animate={isHovered ? { y: 0 } : { y: 20 }}
      >
        <h3 className={styles.title}>{product.name}</h3>
        <p className={styles.description}>{product.description}</p>
        <div className={styles.priceContainer}>
          <span className={styles.price}>${product.price}</span>
        </div>
        <div className={styles.actions}>
          <motion.button
            className={styles.likeButton}
            onClick={handleLike}
            whileTap={{ scale: 0.9 }}
            aria-label={
              product.isWishlisted ? "Remove from wishlist" : "Add to wishlist"
            }
            title={
              product.isWishlisted ? "Remove from wishlist" : "Add to wishlist"
            }
          >
            {product.isWishlisted ? (
              <FaHeart className={styles.heartIcon} />
            ) : (
              <FaRegHeart />
            )}
          </motion.button>
          <motion.button
            className={styles.addToCartButton}
            onClick={handleAddToCart}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaShoppingCart className={styles.cartIcon} />
            Add to Cart
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProductCard;
