const db = require('../config/database');

const getAllProducts = async (req, res) => {
  try {
    const { category, search, limit = 12, page = 1 } = req.query;
    let query = `
      SELECT p.id, p.name, p.description, p.price, p.category, p.stock, 
             p.image_url, p.rating, p.rating_count, p.created_at
      FROM products p 
      WHERE 1=1
    `;
    
    const params = [];

    if (category) {
      query += ' AND p.category = ?';
      params.push(category);
    }

    if (search) {
      query += ' AND (p.name LIKE ? OR p.description LIKE ?)';
      params.push(`%${search}%`, `%${search}%`);
    }

    query += ' ORDER BY p.created_at DESC';

    const offset = (page - 1) * limit;
    query += ' LIMIT ? OFFSET ?';
    params.push(parseInt(limit), parseInt(offset));

    const [products] = await db.pool.execute(query, params);
    
    // Get total count for pagination
    let countQuery = `SELECT COUNT(*) as total FROM products p WHERE 1=1`;
    const countParams = [];

    if (category) {
      countQuery += ' AND p.category = ?';
      countParams.push(category);
    }

    if (search) {
      countQuery += ' AND (p.name LIKE ? OR p.description LIKE ?)';
      countParams.push(`%${search}%`, `%${search}%`);
    }

    const [countResult] = await db.pool.execute(countQuery, countParams);
    const totalProducts = countResult[0].total;

    res.json({
      success: true,
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
    res.status(500).json({ success: false, error: 'Failed to fetch products' });
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const [products] = await db.pool.execute(`
      SELECT p.id, p.name, p.description, p.price, p.category, p.stock, 
             p.image_url, p.rating, p.rating_count, p.created_at
      FROM products p 
      WHERE p.id = ?
    `, [id]);

    if (products.length === 0) {
      return res.status(404).json({ success: false, error: 'Product not found' });
    }

    const product = products[0];

    res.json({
      success: true,
      product
    });
  } catch (error) {
    console.error('Get product error:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch product' });
  }
};

const getFeaturedProducts = async (req, res) => {
  try {
    const [products] = await db.pool.execute(`
      SELECT p.id, p.name, p.description, p.price, p.category, p.stock, 
             p.image_url, p.rating, p.rating_count, p.created_at
      FROM products p 
      WHERE p.rating >= 4.0
      ORDER BY p.rating DESC, p.rating_count DESC
      LIMIT 8
    `);

    res.json({
      success: true,
      products
    });
  } catch (error) {
    console.error('Get featured products error:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch featured products' });
  }
};

const getSaleProducts = async (req, res) => {
  try {
    const [products] = await db.pool.execute(`
      SELECT p.id, p.name, p.description, p.price, p.category, p.stock, 
             p.image_url, p.rating, p.rating_count, p.created_at
      FROM products p 
      WHERE p.sale_price IS NOT NULL
      ORDER BY p.created_at DESC
      LIMIT 8
    `);

    res.json({
      success: true,
      products
    });
  } catch (error) {
    console.error('Get sale products error:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch sale products' });
  }
};

const getCategories = async (req, res) => {
  try {
    const [categories] = await db.pool.execute(`
      SELECT DISTINCT category as name, COUNT(*) as product_count
      FROM products 
      WHERE category IS NOT NULL 
      GROUP BY category
      ORDER BY category
    `);

    res.json({
      success: true,
      categories
    });
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch categories' });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  getFeaturedProducts,
  getSaleProducts,
  getCategories
};