-- Sample data for products
USE ownbeauty_db;

-- Insert sample products
INSERT INTO products (name, description, price, category, stock, image_url, rating, rating_count) VALUES
('Hydrating Face Serum', 'A powerful hydrating serum with hyaluronic acid and vitamin E for plump, radiant skin.', 29.99, 'Skincare', 50, '/api/placeholder/300/300', 4.5, 125),
('Volumizing Mascara', 'Get dramatic, voluminous lashes with this long-lasting, clump-free mascara.', 19.99, 'Makeup', 75, '/api/placeholder/300/300', 4.2, 89),
('Matte Liquid Lipstick', 'Full-coverage, long-wearing liquid lipstick in a beautiful matte finish.', 15.99, 'Makeup', 60, '/api/placeholder/300/300', 4.7, 203),
('Anti-Aging Night Cream', 'Rich, nourishing night cream with retinol and peptides to reduce fine lines.', 39.99, 'Skincare', 35, '/api/placeholder/300/300', 4.6, 156),
('Setting Powder', 'Translucent setting powder for a smooth, shine-free finish that lasts all day.', 24.99, 'Makeup', 45, '/api/placeholder/300/300', 4.3, 92),
('Vitamin C Brightening Serum', 'Brighten and even skin tone with this potent vitamin C serum.', 34.99, 'Skincare', 40, '/api/placeholder/300/300', 4.8, 267),
('Eyeshadow Palette', '12-shade eyeshadow palette with both matte and shimmer finishes.', 27.99, 'Makeup', 30, '/api/placeholder/300/300', 4.4, 178),
('Gentle Cleansing Foam', 'Mild, sulfate-free cleanser that removes makeup without stripping skin.', 18.99, 'Skincare', 80, '/api/placeholder/300/300', 4.1, 134),
('Cream Blush', 'Buildable cream blush for a natural, healthy glow.', 21.99, 'Makeup', 55, '/api/placeholder/300/300', 4.5, 87),
('SPF 30 Moisturizer', 'Daily moisturizer with broad-spectrum SPF 30 protection.', 25.99, 'Skincare', 65, '/api/placeholder/300/300', 4.3, 145);

-- Insert a test user (password is 'password123' hashed)
INSERT INTO users (email, password, first_name, last_name, role) VALUES
('demo@example.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj8NqKzfLjNO', 'Demo', 'User', 'user');