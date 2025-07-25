const db = require('../config/database');

const getAllProducts = async (req, res) => {
  try {
    const { category, featured, sale, search, limit = 12, page = 1 } = req.query;
    let query = `
      SELECT p.*, c.name as category_name, 
             pi.image_url as primary_image,
             CASE WHEN p.sale_price IS NOT NULL THEN 'true' ELSE 'false' END as on_sale
      FROM products p 
      LEFT JOIN categories c ON p.category_id = c.id 
      LEFT JOIN product_images pi ON p.id = pi.product_id AND pi.is_primary = true
      WHERE p.is_active = true
    `;
    
    const params = [];

    if (category) {
      query += ' AND c.name = ?';
      params.push(category);
    }

    if (featured === 'true') {
      query += ' AND p.featured = true';
    }

    if (sale === 'true') {
      query += ' AND p.sale_price IS NOT NULL';
    }

    if (search) {
      query += ' AND (p.name LIKE ? OR p.description LIKE ? OR p.brand LIKE ?)';
      params.push(`%${search}%`, `%${search}%`, `%${search}%`);
    }

    query += ' ORDER BY p.created_at DESC';

    const offset = (page - 1) * limit;
    query += ' LIMIT ? OFFSET ?';
    params.push(parseInt(limit), parseInt(offset));

    const [products] = await db.execute(query, params);
    
    // Get total count for pagination
    let countQuery = `
      SELECT COUNT(*) as total 
      FROM products p 
      LEFT JOIN categories c ON p.category_id = c.id 
      WHERE p.is_active = true
    `;
    
    const countParams = [];
    if (category) {
      countQuery += ' AND c.name = ?';
      countParams.push(category);
    }

    const [countResult] = await db.execute(countQuery, countParams);
    const totalProducts = countResult[0].total;

    res.json({
      products,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalProducts / limit),
        totalProducts,
        hasMore: page * limit < totalProducts
      }
    });
  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const [products] = await db.execute(`
      SELECT p.*, c.name as category_name,
             CASE WHEN p.sale_price IS NOT NULL THEN 'true' ELSE 'false' END as on_sale
      FROM products p 
      LEFT JOIN categories c ON p.category_id = c.id 
      WHERE p.id = ? AND p.is_active = true
    `, [id]);

    if (products.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Get product images
    const [images] = await db.execute(
      'SELECT image_url, is_primary, alt_text FROM product_images WHERE product_id = ?',
      [id]
    );

    // Get product reviews
    const [reviews] = await db.execute(`
      SELECT r.*, u.username, u.first_name, u.last_name 
      FROM reviews r 
      JOIN users u ON r.user_id = u.id 
      WHERE r.product_id = ? AND r.is_approved = true 
      ORDER BY r.created_at DESC
    `, [id]);

    const product = {
      ...products[0],
      images,
      reviews
    };

    res.json({ product });
  } catch (error) {
    console.error('Get product error:', error);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
};

const getCategories = async (req, res) => {
  try {
    const [categories] = await db.execute(
      'SELECT * FROM categories WHERE is_active = true ORDER BY name'
    );

    res.json({ categories });
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
};

const getFeaturedProducts = async (req, res) => {
  try {
    const [products] = await db.execute(`
      SELECT p.*, c.name as category_name, 
             pi.image_url as primary_image,
             CASE WHEN p.sale_price IS NOT NULL THEN 'true' ELSE 'false' END as on_sale
      FROM products p 
      LEFT JOIN categories c ON p.category_id = c.id 
      LEFT JOIN product_images pi ON p.id = pi.product_id AND pi.is_primary = true
      WHERE p.is_active = true AND p.featured = true
      ORDER BY p.created_at DESC
      LIMIT 8
    `);

    res.json({ products });
  } catch (error) {
    console.error('Get featured products error:', error);
    res.status(500).json({ error: 'Failed to fetch featured products' });
  }
};

const getSaleProducts = async (req, res) => {
  try {
    const [products] = await db.execute(`
      SELECT p.*, c.name as category_name, 
             pi.image_url as primary_image,
             CASE WHEN p.sale_price IS NOT NULL THEN 'true' ELSE 'false' END as on_sale
      FROM products p 
      LEFT JOIN categories c ON p.category_id = c.id 
      LEFT JOIN product_images pi ON p.id = pi.product_id AND pi.is_primary = true
      WHERE p.is_active = true AND p.sale_price IS NOT NULL
      ORDER BY p.created_at DESC
      LIMIT 12
    `);

    res.json({ products });
  } catch (error) {
    console.error('Get sale products error:', error);
    res.status(500).json({ error: 'Failed to fetch sale products' });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  getCategories,
  getFeaturedProducts,
  getSaleProducts
};