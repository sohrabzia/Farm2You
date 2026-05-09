-- Default admin: admin@farm2you.pk / farm2you
INSERT OR IGNORE INTO users (email, password_hash, password_salt, name, role) VALUES (
  'admin@farm2you.pk',
  '7FoOFqz95FoVUE5GeBA552ofQBMWsv3kzZBHfqTrJbA=',
  'f2y-default-salt-2026',
  'Admin',
  'admin'
);

-- Sample farmers
INSERT OR IGNORE INTO farmers (id, name, region, crop, phone) VALUES
  (1, 'Aslam Khan', 'Sindh', 'Tomato', '0300-1234567'),
  (2, 'Rukhsana Bibi', 'Punjab', 'Wheat', '0301-2345678'),
  (3, 'Hamza Lashari', 'Sindh', 'Onion', '0302-3456789'),
  (4, 'Faisal Mughal', 'Punjab', 'Citrus', '0303-4567890'),
  (5, 'Bilal Memon', 'Sindh', 'Goat', '0304-5678901'),
  (6, 'Saima Akhtar', 'Punjab', 'Dairy', '0305-6789012'),
  (7, 'Naveed Iqbal', 'KP', 'Apple', '0306-7890123');

-- Products with Unsplash imagery
INSERT OR IGNORE INTO products (slug, name, name_ur, description, category, unit, retail_price, wholesale_price, stock, image_url, farmer_id, is_organic, is_featured) VALUES
  ('tomato-organic',  'Tomato',         'ٹماٹر',     'Sun-ripened, organic tomatoes from Sindh fields. Picked the morning of dispatch.', 'vegetables', 'kg', 80, 60, 350, 'https://images.unsplash.com/photo-1582284540020-8acbe03f4924?w=900&q=80', 1, 1, 1),
  ('red-onion',       'Red Onion',      'پیاز',      'Sweet red onions, hand-cleaned and graded.',                                          'vegetables', 'kg', 70, 55, 500, 'https://images.unsplash.com/photo-1518977956812-cd3dbadaaf31?w=900&q=80', 3, 0, 1),
  ('potato',          'Potato',         'آلو',       'Fresh potatoes from Punjab. Excellent for daily cooking.',                            'vegetables', 'kg', 60, 45, 800, 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=900&q=80', 2, 0, 0),
  ('spinach',         'Spinach (Palak)','پالک',     'Tender spinach leaves, washed and bunched.',                                          'vegetables', 'bunch', 50, 35, 200, 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=900&q=80', 1, 1, 0),
  ('okra',            'Okra (Bhindi)',  'بھنڈی',    'Crisp tender okra, perfect for sabzi.',                                              'vegetables', 'kg', 110, 90, 180, 'https://images.unsplash.com/photo-1664297601816-b9d3c1bdd57e?w=900&q=80', 1, 1, 0),
  ('eggplant',        'Eggplant',       'بینگن',    'Glossy purple eggplant for bharta and salan.',                                       'vegetables', 'kg', 90, 70, 150, 'https://images.unsplash.com/photo-1591735746036-6f5d6c97f8ac?w=900&q=80', 3, 0, 0),
  ('carrot',          'Carrots',        'گاجر',      'Sweet, crunchy carrots from Punjab valleys.',                                        'vegetables', 'kg', 75, 55, 300, 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=900&q=80', 2, 0, 0),
  ('green-chili',     'Green Chili',    'ہری مرچ',   'Pakistani green chilies. Sharp, fresh, fragrant.',                                   'vegetables', 'kg', 130, 100, 90, 'https://images.unsplash.com/photo-1635963662063-72f8a4d29929?w=900&q=80', 3, 1, 0),

  ('mango-sindhri',   'Mango (Sindhri)','آم',        'The king of fruits — Sindhri mangoes straight from Mirpurkhas.',                       'fruits', 'kg', 220, 180, 240, 'https://images.unsplash.com/photo-1605027990121-cbae9e0642db?w=900&q=80', 4, 1, 1),
  ('kinnow',          'Kinnow',         'کینو',      'Juicy Pakistani Kinnows — vitamin C rich, naturally sweet.',                         'fruits', 'kg', 120, 95, 600, 'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab12?w=900&q=80', 4, 0, 1),
  ('banana',          'Banana',         'کیلا',      'Ripe Cavendish bananas, perfect for breakfast and lunches.',                         'fruits', 'dozen', 180, 140, 300, 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=900&q=80', 5, 0, 0),
  ('apple',           'Apple (Kashmiri)','سیب',      'Crisp Kashmiri apples from KP orchards.',                                            'fruits', 'kg', 260, 210, 220, 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=900&q=80', 7, 0, 1),
  ('guava',           'Guava',          'امرود',     'Aromatic local guavas — eat fresh or with chaat masala.',                            'fruits', 'kg', 100, 80, 160, 'https://images.unsplash.com/photo-1536511132770-e5058c7e8c46?w=900&q=80', 4, 1, 0),
  ('watermelon',      'Watermelon',     'تربوز',     'Sweet, large summer watermelons.',                                                   'fruits', 'piece', 350, 290, 80, 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=900&q=80', 3, 0, 0),

  ('milk-fresh',      'Fresh Milk',     'دودھ',     'Farm-fresh whole milk — chilled, delivered same day.',                              'dairy', 'liter', 220, 190, 400, 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=900&q=80', 6, 0, 1),
  ('yogurt',          'Yogurt (Dahi)',  'دہی',      'Thick, creamy desi yogurt set the traditional way.',                                'dairy', 'kg', 240, 200, 200, 'https://images.unsplash.com/photo-1571212515416-fef01fc43637?w=900&q=80', 6, 0, 0),
  ('desi-ghee',       'Desi Ghee',      'دیسی گھی', 'Pure desi ghee — clarified butter from grass-fed cows.',                            'dairy', 'kg', 2400, 2100, 60, 'https://images.unsplash.com/photo-1620479186080-9a4cb44d4c5b?w=900&q=80', 6, 1, 1),
  ('butter-makhan',   'Butter (Makhan)','مکھن',     'Hand-churned white butter, fresh and unsalted.',                                    'dairy', 'kg', 1100, 950, 50, 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=900&q=80', 6, 0, 0),

  ('atta',            'Wheat Atta',     'آٹا',      'Stone-ground whole wheat atta — chakki fresh.',                                      'grains', 'kg', 120, 95, 1000, 'https://images.unsplash.com/photo-1568271675343-1ce5d6b5c7fa?w=900&q=80', 2, 1, 1),
  ('basmati',         'Basmati Rice',   'باسمتی چاول','Long-grain Pakistani Basmati rice — aromatic and aged.',                           'grains', 'kg', 320, 260, 600, 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=900&q=80', 2, 0, 1),
  ('masoor-dal',      'Masoor Daal',    'مسور دال',  'Premium red lentils, sun-dried and cleaned.',                                       'grains', 'kg', 380, 330, 300, 'https://images.unsplash.com/photo-1612257999556-0f49b39b1eaa?w=900&q=80', 2, 0, 0),
  ('chana-dal',       'Chana Daal',     'چنا دال',   'Yellow split chana lentils — the soul of dal chawal.',                              'grains', 'kg', 360, 310, 280, 'https://images.unsplash.com/photo-1624799385022-1f9b30d7c64f?w=900&q=80', 2, 0, 0),

  ('goat-live',       'Goat (Live)',    'بکرا',      'Healthy bakra — vet certified, weight 25-30kg.',                                    'livestock', 'piece', 45000, 42000, 12, 'https://images.unsplash.com/photo-1533318087102-b3ad366ed041?w=900&q=80', 5, 0, 1),
  ('cow-live',        'Cow (Dairy)',    'گائے',     'Dairy cow — Holstein cross, vet checked, current production 12L/day.',              'livestock', 'piece', 280000, 260000, 4, 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=900&q=80', 5, 0, 0),
  ('hen-desi',        'Desi Hen',       'دیسی مرغی', 'Free-range desi hens — fresh, healthy, ready for cooking.',                         'livestock', 'piece', 1800, 1500, 40, 'https://images.unsplash.com/photo-1612170153139-6f881ff067e0?w=900&q=80', 5, 0, 0),

  ('seeds-pack',      'Seed Pack',      'بیج',       'Verified vegetable seed pack — 6 varieties for kitchen garden.',                    'agri-inputs', 'pack', 850, 720, 100, 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=900&q=80', 1, 1, 0),
  ('npk-fertilizer',  'NPK Fertilizer', 'کھاد',     'Balanced NPK fertilizer — 50kg bag for field application.',                          'agri-inputs', 'bag', 5800, 5400, 60, 'https://images.unsplash.com/photo-1574263867128-a3d5c1b1deae?w=900&q=80', 2, 0, 0);

-- Sample consultations
INSERT INTO consultations (farmer_name, region, expert_name, specialty, diagnosis) VALUES
  ('Aslam Khan',     'Sindh',  'Dr. Amina Sheikh',  'pathology',  'Late blight on tomato — copper spray Rx'),
  ('Rukhsana Bibi',  'Punjab', 'Dr. Tariq Hussain', 'pathology',  'Wheat rust — fungicide every 7 days'),
  ('Bilal Memon',    'Sindh',  'Dr. Hassan Raza',   'veterinary', 'Goat fever — broad spectrum antibiotic'),
  ('Faisal Mughal',  'Punjab', 'Dr. Amina Sheikh',  'pathology',  'Citrus canker — prune affected branches');

-- Sample orders
INSERT INTO orders (customer_name, customer_phone, customer_address, city, payment_method, subtotal, delivery_fee, total, status) VALUES
  ('Karim Stores',  '0301-1111111', 'Korangi Industrial Area',     'Karachi', 'cod', 4800,  150, 4950, 'delivered'),
  ('Ayesha Khan',   '0302-2222222', 'F-7 Markaz',                  'Karachi', 'cod', 600,   100, 700,  'delivered'),
  ('Iqbal Mart',    '0303-3333333', 'Liaqatabad No. 4',            'Karachi', 'cod', 11000, 200, 11200,'pending'),
  ('Hira Khan',     '0304-4444444', 'Defence Phase 5',             'Karachi', 'cod', 900,   100, 1000, 'confirmed');

INSERT INTO order_items (order_id, product_name, unit, qty, unit_price, line_total) VALUES
  (1, 'Tomato', 'kg', 80, 60, 4800),
  (2, 'Apple (Kashmiri)', 'kg', 5, 120, 600),
  (3, 'Red Onion', 'kg', 200, 55, 11000),
  (4, 'Wheat Atta', 'kg', 10, 90, 900);

-- Sample waitlist
INSERT OR IGNORE INTO waitlist (email, role) VALUES
  ('hello@example.pk', 'family'),
  ('store@karachimart.pk', 'shopkeeper');
