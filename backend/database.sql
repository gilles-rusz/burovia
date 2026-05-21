CREATE DATABASE IF NOT EXISTS burovia
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE burovia;

CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(120) UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE suppliers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    website_url VARCHAR(255),
    contact_email VARCHAR(150),
    country VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    sku VARCHAR(50) UNIQUE NOT NULL,
    supplier_id INT NULL,
    supplier_product_id VARCHAR(100) NULL,
    supplier_vid VARCHAR(100) NULL,

    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    short_description VARCHAR(500),
    description TEXT,

    price_cents INT NOT NULL,
    cost_price_cents INT NOT NULL,

    stock_quantity INT DEFAULT 0,
    is_dropshipping BOOLEAN DEFAULT TRUE,
    is_active BOOLEAN DEFAULT TRUE,
    is_featured BOOLEAN DEFAULT FALSE,
    is_seasonal BOOLEAN DEFAULT FALSE,

    category_id INT NULL,
    delivery_estimate VARCHAR(100),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL,
    FOREIGN KEY (supplier_id) REFERENCES suppliers(id) ON DELETE SET NULL
);

CREATE TABLE product_images (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    url VARCHAR(255) NOT NULL,
    alt_text VARCHAR(255),
    is_main BOOLEAN DEFAULT FALSE,
    sort_order INT DEFAULT 0,

    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    status VARCHAR(50) DEFAULT 'pending_payment',

    total_amount_cents INT NOT NULL DEFAULT 0,

    customer_email VARCHAR(150),
    customer_name VARCHAR(150),
    customer_phone VARCHAR(50),

    shipping_address_line1 VARCHAR(255),
    shipping_address_line2 VARCHAR(255),
    shipping_city VARCHAR(100),
    shipping_postal_code VARCHAR(20),
    shipping_country_code VARCHAR(10),

    stripe_session_id VARCHAR(255),
    stripe_payment_intent_id VARCHAR(255),

    supplier_status VARCHAR(50),
    supplier_response TEXT,
    supplier_error TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,

    supplier_id INT NULL,
    supplier_vid VARCHAR(100),

    name VARCHAR(255) NOT NULL,
    quantity INT NOT NULL,

    unit_price_cents INT NOT NULL,
    cost_price_cents INT NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id)
);

INSERT INTO categories (name, slug, description) VALUES
('Confort & posture', 'confort-posture', 'Accessoires pour améliorer la posture en télétravail'),
('Organisation du bureau', 'organisation-bureau', 'Accessoires pour garder un bureau propre et rangé'),
('Productivité', 'productivite', 'Accessoires pour travailler plus efficacement'),
('Foot 2026', 'foot-2026', 'Collection saisonnière inspirée de l’univers football');

INSERT INTO suppliers (name, website_url, country) VALUES
('Fournisseur test', 'https://example.com', 'EU');

INSERT INTO products (
    sku,
    supplier_id,
    supplier_product_id,
    supplier_vid,
    name,
    slug,
    short_description,
    description,
    price_cents,
    cost_price_cents,
    stock_quantity,
    is_dropshipping,
    is_active,
    is_featured,
    is_seasonal,
    category_id,
    delivery_estimate
) VALUES
(
    'BUR-REP-001',
    1,
    'SUP-REP-001',
    'VID-REP-001',
    'Repose-poignet ergonomique haute densité',
    'repose-poignet-ergonomique-haute-densite',
    'Un repose-poignet confortable pour les longues journées de télétravail.',
    'Ce repose-poignet ergonomique améliore le confort au clavier ou à la souris.',
    2490,
    850,
    100,
    TRUE,
    TRUE,
    TRUE,
    FALSE,
    1,
    'Livraison estimée entre 5 et 10 jours ouvrés'
),
(
    'BUR-SUP-001',
    1,
    'SUP-PC-001',
    'VID-PC-001',
    'Support PC portable pliable aluminium',
    'support-pc-portable-pliable-aluminium',
    'Un support pliable pour surélever votre ordinateur portable.',
    'Ce support améliore votre posture en télétravail.',
    1990,
    700,
    100,
    TRUE,
    TRUE,
    TRUE,
    FALSE,
    1,
    'Livraison estimée entre 5 et 10 jours ouvrés'
),
(
    'BUR-GOB-001',
    1,
    'SUP-GOB-001',
    'VID-GOB-001',
    'Support gobelet & casque 2-en-1 à pince',
    'support-gobelet-casque-2-en-1-pince',
    'Un support pratique pour libérer de l’espace sur votre bureau.',
    'Ce support à pince permet de ranger un casque ou un gobelet.',
    1490,
    500,
    100,
    TRUE,
    TRUE,
    FALSE,
    FALSE,
    2,
    'Livraison estimée entre 5 et 10 jours ouvrés'
),
(
    'BUR-CAB-001',
    1,
    'SUP-CAB-001',
    'VID-CAB-001',
    'Organisateur de câbles magnétique',
    'organisateur-cables-magnetique',
    'Un accessoire simple pour garder vos câbles bien rangés.',
    'Cet organisateur magnétique permet de garder vos câbles accessibles et propres.',
    1250,
    350,
    100,
    TRUE,
    TRUE,
    FALSE,
    FALSE,
    2,
    'Livraison estimée entre 5 et 10 jours ouvrés'
);