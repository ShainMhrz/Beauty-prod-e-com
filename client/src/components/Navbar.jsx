import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaShoppingBag, FaUser, FaBars, FaTimes, FaSpa } from "react-icons/fa";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <nav className={`${styles.navbar} ${isScrolled ? "shadow-md" : ""}`}>
        <div className={styles["navbar-container"]}>
          <a href="#home" className={styles.logo}>
            <FaSpa className={styles["logo-icon"]} />
            <span>OwnBeauty</span>
          </a>

          <div className={styles["nav-links"]}>
            <a href="#home" className={styles["nav-link"]}>
              Home
            </a>
            <a href="#products" className={styles["nav-link"]}>
              Products
            </a>
            <a href="#beauty-tips" className={styles["nav-link"]}>
              Beauty Tips
            </a>
            <a href="#gallery" className={styles["nav-link"]}>
              Gallery
            </a>
            <a href="#contact" className={styles["nav-link"]}>
              Contact
            </a>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden lg:flex items-center gap-4">
              <button className={`${styles["nav-button"]} ${styles.primary}`}>
                <FaShoppingBag className={styles["nav-icon"]} />
                <span>Cart (0)</span>
              </button>
              <button className={`${styles["nav-button"]} ${styles.secondary}`}>
                <FaUser className={styles["nav-icon"]} />
                <span>Login</span>
              </button>
            </div>
            <button
              className={styles["mobile-menu-btn"]}
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className={`${styles["mobile-menu"]} ${
              isMobileMenuOpen ? styles.open : styles.closed
            }`}
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.3 }}
          >
            <div className={styles["mobile-nav-links"]}>
              <a
                href="#home"
                className={styles["mobile-nav-link"]}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </a>
              <a
                href="#products"
                className={styles["mobile-nav-link"]}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Products
              </a>
              <a
                href="#beauty-tips"
                className={styles["mobile-nav-link"]}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Beauty Tips
              </a>
              <a
                href="#gallery"
                className={styles["mobile-nav-link"]}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Gallery
              </a>
              <a
                href="#contact"
                className={styles["mobile-nav-link"]}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </a>
              <div className={styles["mobile-nav-buttons"]}>
                <button className={`${styles["nav-button"]} ${styles.primary}`}>
                  <FaShoppingBag className={styles["nav-icon"]} />
                  <span>Cart (0)</span>
                </button>
                <button className={`${styles["nav-button"]} ${styles.secondary}`}>
                  <FaUser className={styles["nav-icon"]} />
                  <span>Login</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
