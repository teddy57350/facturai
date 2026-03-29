-- schema.sql
-- Schéma de base de données pour Facturly (système freemium)

-- Table des utilisateurs
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  plan TEXT DEFAULT 'free', -- 'free' ou 'pro'
  stripe_customer_id TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Table des factures traitées
CREATE TABLE IF NOT EXISTS invoices (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER,
  filename TEXT,
  invoice_number TEXT,
  amount_ttc REAL,
  processed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  confidence_score INTEGER,
  xml_generated BOOLEAN DEFAULT 0,
  FOREIGN KEY (user_id) REFERENCES users (id)
);

-- Table du quota mensuel
CREATE TABLE IF NOT EXISTS monthly_usage (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER,
  month TEXT, -- Format: YYYY-MM
  invoices_count INTEGER DEFAULT 0,
  limit_reached BOOLEAN DEFAULT 0,
  FOREIGN KEY (user_id) REFERENCES users (id),
  UNIQUE(user_id, month)
);

-- Table des paiements
CREATE TABLE IF NOT EXISTS payments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER,
  stripe_payment_id TEXT,
  amount REAL,
  currency TEXT DEFAULT 'EUR',
  status TEXT, -- 'succeeded', 'pending', 'failed'
  paid_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users (id)
);

-- Index pour performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_invoices_user ON invoices(user_id);
CREATE INDEX IF NOT EXISTS idx_usage_user_month ON monthly_usage(user_id, month);

-- Vues utiles
CREATE VIEW IF NOT EXISTS user_stats AS
SELECT 
  u.id,
  u.email,
  u.plan,
  COUNT(i.id) as total_invoices,
  COALESCE(mu.invoices_count, 0) as current_month_count,
  CASE 
    WHEN u.plan = 'free' THEN 10 - COALESCE(mu.invoices_count, 0)
    ELSE 999999
  END as remaining_quota
FROM users u
LEFT JOIN invoices i ON u.id = i.user_id
LEFT JOIN monthly_usage mu ON u.id = mu.user_id 
  AND mu.month = strftime('%Y-%m', 'now')
GROUP BY u.id;

-- Données de test
INSERT OR IGNORE INTO users (id, email, name, plan) 
VALUES (1, 'test@facturly.fr', 'Utilisateur Test', 'free');

INSERT OR IGNORE INTO monthly_usage (user_id, month, invoices_count)
VALUES (1, strftime('%Y-%m', 'now'), 3);
