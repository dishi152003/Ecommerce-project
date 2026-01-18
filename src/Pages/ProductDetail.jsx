import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';
import { Heart, Share2, ShoppingCart, Star, ChevronLeft, ChevronRight, Truck, Shield, RotateCcw, Check, X } from 'lucide-react';
import ProductReviews from '../components/ProductReviews';

export default function ProductDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addItem } = useCart();
    const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(0);
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedColor, setSelectedColor] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState('description');
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [showZoom, setShowZoom] = useState(false);
    const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });

    // Load product data based on ID
    useEffect(() => {
        setLoading(true);

        // Simulate API call - In production, this would fetch from your backend
        setTimeout(() => {
            const productId = parseInt(id);
            console.log('Loading product with ID:', productId);

            // Generate product data dynamically based on ID
            // This matches the product generation logic from ProductListing.jsx
            let productData = null;

            // Determine which category the product belongs to based on ID ranges
            if (productId >= 1 && productId <= 30) {
                // Shirts (IDs 1-30) - Each product gets its unique image
                const shirtImageMap = [
                    'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&h=800&fit=crop',  // ID 1
                    'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&h=800&fit=crop',  // ID 2
                    'https://images.unsplash.com/photo-1603252109303-2751441dd157?w=800&h=800&fit=crop',  // ID 3
                    'https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?w=800&h=800&fit=crop',  // ID 4
                    'https://images.unsplash.com/photo-1598032895397-b9372a5f4d8e?w=800&h=800&fit=crop',  // ID 5
                    'https://images.unsplash.com/photo-1594938291221-94f18cbb5660?w=800&h=800&fit=crop',  // ID 6
                    'https://images.unsplash.com/photo-1596755095514-f87e34085b2c?w=800&h=800&fit=crop',  // ID 7
                    'https://images.unsplash.com/photo-1603252109360-909baaf261c7?w=800&h=800&fit=crop',  // ID 8
                    'https://images.unsplash.com/photo-1602810316498-ab67cf68c8e1?w=800&h=800&fit=crop',  // ID 9
                    'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=800&h=800&fit=crop',  // ID 10
                    'https://images.unsplash.com/photo-1603252109612-4e2d6c8d9e1d?w=800&h=800&fit=crop',  // ID 11
                    'https://images.unsplash.com/photo-1603252109303-2751441dd157?w=800&h=800&fit=crop',  // ID 12
                    'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&h=800&fit=crop',  // ID 13
                    'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&h=800&fit=crop',  // ID 14
                    'https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?w=800&h=800&fit=crop',  // ID 15
                    'https://images.unsplash.com/photo-1603252109303-2751441dd157?w=800&h=800&fit=crop',  // ID 16
                    'https://images.unsplash.com/photo-1598032895397-b9372a5f4d8e?w=800&h=800&fit=crop',  // ID 17
                    'https://images.unsplash.com/photo-1594938291221-94f18cbb5660?w=800&h=800&fit=crop',  // ID 18
                    'https://images.unsplash.com/photo-1596755095514-f87e34085b2c?w=800&h=800&fit=crop',  // ID 19
                    'https://images.unsplash.com/photo-1602810316498-ab67cf68c8e1?w=800&h=800&fit=crop',  // ID 20
                    'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&h=800&fit=crop',  // ID 21
                    'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=800&h=800&fit=crop',  // ID 22
                    'https://images.unsplash.com/photo-1603252109612-4e2d6c8d9e1d?w=800&h=800&fit=crop',  // ID 23
                    'https://images.unsplash.com/photo-1603252109360-909baaf261c7?w=800&h=800&fit=crop',  // ID 24
                    'https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?w=800&h=800&fit=crop',  // ID 25
                    'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&h=800&fit=crop',  // ID 26
                    'https://images.unsplash.com/photo-1603252109612-4e2d6c8d9e1d?w=800&h=800&fit=crop',  // ID 27
                    'https://images.unsplash.com/photo-1603252109303-2751441dd157?w=800&h=800&fit=crop',  // ID 28
                    'https://images.unsplash.com/photo-1596755095514-f87e34085b2c?w=800&h=800&fit=crop',  // ID 29
                    'https://images.unsplash.com/photo-1594938291221-94f18cbb5660?w=800&h=800&fit=crop'   // ID 30
                ];

                const index = productId - 1;
                const mainImage = shirtImageMap[index];

                // Create gallery with 4 images (main image + 3 similar variations)
                const productImages = [
                    mainImage,
                    shirtImageMap[(index + 1) % shirtImageMap.length],
                    shirtImageMap[(index + 2) % shirtImageMap.length],
                    shirtImageMap[(index + 3) % shirtImageMap.length]
                ];

                const shirtTitles = [
                    'Classic White Oxford Shirt',
                    'Navy Blue Formal Shirt',
                    'Light Blue Casual Shirt',
                    'Black Slim Fit Shirt',
                    'Checkered Red & White Shirt',
                    'Grey Linen Shirt',
                    'Striped Blue Shirt',
                    'Pink Casual Shirt',
                    'Maroon Party Shirt',
                    'Denim Blue Shirt',
                    'Green Olive Shirt',
                    'Yellow Mustard Shirt',
                    'Purple Formal Shirt',
                    'Beige Cotton Shirt',
                    'Charcoal Grey Shirt',
                    'Teal Blue Shirt',
                    'Brown Corduroy Shirt',
                    'Cream Silk Blend Shirt',
                    'Sky Blue Shirt',
                    'Burgundy Wine Shirt',
                    'White Linen Shirt',
                    'Indigo Denim Shirt',
                    'Mint Green Shirt',
                    'Coral Pink Shirt',
                    'Slate Grey Shirt',
                    'Lavender Purple Shirt',
                    'Forest Green Shirt',
                    'Peach Orange Shirt',
                    'Steel Blue Shirt',
                    'Khaki Casual Shirt'
                ];

                productData = {
                    id: productId,
                    title: shirtTitles[index],
                    price: 1299 + (index * 50),
                    originalPrice: 2499 + (index * 50),
                    discount: Math.floor(((2499 - 1299) / 2499) * 100),
                    rating: 4.3 + (index % 7) * 0.1,
                    reviews: 150 + (index * 10),
                    description: `Experience ultimate comfort with our ${shirtTitles[index]}. Crafted from high-quality fabric, this shirt offers breathability and style for any occasion. Perfect for both casual outings and semi-formal events.`,
                    images: productImages,
                    thumbnail: mainImage,
                    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
                    colors: [
                        { name: 'White', hex: '#FFFFFF' },
                        { name: 'Blue', hex: '#3B82F6' },
                        { name: 'Black', hex: '#000000' },
                        { name: 'Grey', hex: '#6B7280' }
                    ],
                    stock: 25 + (index % 15),
                    category: 'Men',
                    brand: 'ShopNow Premium',
                    sku: `SN-SHIRT-${String(productId).padStart(3, '0')}`
                };
            } else if (productId >= 31 && productId <= 60) {
                // T-Shirts (IDs 31-60)
                const tshirtImages = [
                    'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=800&fit=crop',
                    'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&h=800&fit=crop',
                    'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=800&h=800&fit=crop',
                    'https://images.unsplash.com/photo-1622445275463-afa2ab738c34?w=800&h=800&fit=crop'
                ];
                const index = productId - 31;
                const styles = ['Classic', 'V-Neck', 'Polo', 'Round Neck', 'Graphic'];
                const colors = ['White', 'Black', 'Navy', 'Grey', 'Red'];

                productData = {
                    id: productId,
                    title: `${styles[index % styles.length]} ${colors[index % colors.length]} T-Shirt`,
                    price: 499 + (index * 30),
                    originalPrice: 999 + (index * 30),
                    discount: 50,
                    rating: 4.4 + (index % 6) * 0.1,
                    reviews: 100 + (index * 8),
                    description: `Comfortable and stylish ${colors[index % colors.length].toLowerCase()} t-shirt perfect for everyday wear. Made from soft, breathable cotton fabric.`,
                    images: tshirtImages,
                    thumbnail: tshirtImages[0],
                    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
                    colors: [
                        { name: 'White', hex: '#FFFFFF' },
                        { name: 'Black', hex: '#000000' },
                        { name: 'Navy', hex: '#1E3A8A' },
                        { name: 'Grey', hex: '#6B7280' }
                    ],
                    stock: 40 + (index % 20),
                    category: 'Men',
                    brand: 'ShopNow Casual',
                    sku: `SN-TSHIRT-${String(productId).padStart(3, '0')}`
                };
            } else if (productId >= 10001 && productId <= 10007) {
                // TOP PICKS from Homepage (IDs 10001-10007)
                console.log('Matched TOP_PICKS condition for ID:', productId);
                const topPicksData = [
                    { id: 10001, title: 'Casual Sneakers', price: 3735, thumbnail: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=800&fit=crop', category: 'Footwear', description: 'Comfortable casual sneakers perfect for everyday wear. Features breathable mesh upper and cushioned sole for all-day comfort.', rating: 4.5 },
                    { id: 10002, title: 'Leather Jacket', price: 9960, thumbnail: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&h=800&fit=crop', category: 'Men', description: 'Premium leather jacket for a stylish look. Genuine leather construction with classic biker design and multiple pockets.', rating: 4.8 },
                    { id: 10003, title: 'Gold Watch', price: 7055, thumbnail: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=800&fit=crop', category: 'Accessories', description: 'Elegant gold watch for special occasions. Precision quartz movement with scratch-resistant sapphire crystal.', rating: 4.7 },
                    { id: 10004, title: 'Summer Dress', price: 2905, thumbnail: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&h=800&fit=crop', category: 'Women', description: 'Light and breezy summer dress perfect for warm weather. Flowy fabric with vibrant floral print.', rating: 4.6 },
                    { id: 10005, title: 'Designer Bag', price: 7470, thumbnail: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&h=800&fit=crop', category: 'Accessories', description: 'Luxury designer bag for fashion enthusiasts. Premium materials with multiple compartments and adjustable strap.', rating: 4.9 },
                    { id: 10006, title: 'Denim Jeans', price: 4565, thumbnail: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&h=800&fit=crop', category: 'Women', description: 'Classic denim jeans for casual wear. Comfortable stretch denim with modern slim fit design.', rating: 4.5 },
                    { id: 10007, title: 'Running Shoes', price: 4980, thumbnail: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&h=800&fit=crop', category: 'Footwear', description: 'High-performance running shoes with advanced cushioning technology. Lightweight and breathable for maximum comfort.', rating: 4.7 }
                ];

                const topPickItem = topPicksData.find(item => item.id === productId);
                console.log('Found TOP_PICKS item:', topPickItem);

                if (topPickItem) {
                    // Create gallery with 4 images (main image + 3 variations)
                    const productImages = [
                        topPickItem.thumbnail,
                        topPickItem.thumbnail.replace('w=800&h=800', 'w=800&h=800&sat=-50'), // Desaturated
                        topPickItem.thumbnail.replace('w=800&h=800', 'w=800&h=800&brightness=10'), // Brighter
                        topPickItem.thumbnail.replace('w=800&h=800', 'w=800&h=800&contrast=10') // Higher contrast
                    ];

                    productData = {
                        id: productId,
                        title: topPickItem.title,
                        price: topPickItem.price,
                        originalPrice: Math.floor(topPickItem.price * 1.4), // 40% discount
                        discount: 29,
                        rating: topPickItem.rating,
                        reviews: 245,
                        description: topPickItem.description,
                        images: productImages,
                        thumbnail: topPickItem.thumbnail,
                        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
                        colors: [
                            { name: 'Original', hex: '#3B82F6' },
                            { name: 'Black', hex: '#000000' },
                            { name: 'White', hex: '#FFFFFF' },
                            { name: 'Grey', hex: '#6B7280' }
                        ],
                        stock: 35,
                        category: topPickItem.category,
                        brand: 'ShopNow Premium Collection',
                        sku: `SN-TOP-${String(productId).padStart(5, '0')}`
                    };
                }
            } else {
                // Determine category based on ID range and generate appropriate product data
                let category, title, images, basePrice, description;

                // ID Range mapping (from ProductListing.jsx)
                if (productId >= 61 && productId <= 90) {
                    // Kurtas
                    category = 'Men';
                    const kurtaStyles = ['White Cotton', 'Navy Blue Silk', 'Maroon Embroidered', 'Cream Linen', 'Black Pathani'];
                    title = kurtaStyles[(productId - 61) % kurtaStyles.length] + ' Kurta';
                    images = [
                        'https://images.unsplash.com/photo-1701365676249-9d7ab5022dec?w=800&h=800&fit=crop',
                        'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=800&h=800&fit=crop',
                        'https://images.unsplash.com/photo-1610976221000-c0c2d7e8c6f9?w=800&h=800&fit=crop'
                    ];
                    basePrice = 1499;
                    description = 'Traditional kurta perfect for festive occasions and cultural events.';
                } else if (productId >= 91 && productId <= 120) {
                    // Track Pants
                    category = 'Men';
                    const trackStyles = ['Slim Fit Joggers', 'Athletic Track Pants', 'Cargo Joggers', 'Fleece Joggers', 'Sports Track Pants'];
                    title = trackStyles[(productId - 91) % trackStyles.length];
                    images = [
                        'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&h=800&fit=crop',
                        'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=800&h=800&fit=crop',
                        'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&h=800&fit=crop'
                    ];
                    basePrice = 899;
                    description = 'Comfortable track pants perfect for workouts and casual wear.';
                } else if (productId >= 121 && productId <= 150) {
                    // Jeans
                    category = 'Men';
                    const jeanStyles = ['Slim Fit', 'Regular Fit', 'Skinny', 'Straight Fit', 'Relaxed Fit'];
                    const jeanColors = ['Blue', 'Black', 'Grey', 'Light Blue', 'Dark Blue'];
                    title = jeanStyles[(productId - 121) % jeanStyles.length] + ' ' + jeanColors[(productId - 121) % jeanColors.length] + ' Jeans';
                    images = [
                        'https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&h=800&fit=crop',
                        'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&h=800&fit=crop',
                        'https://images.unsplash.com/photo-1475178626620-a4d074967452?w=800&h=800&fit=crop'
                    ];
                    basePrice = 1299;
                    description = 'Premium quality denim jeans with perfect fit and comfort.';
                } else if (productId >= 151 && productId <= 180) {
                    // Trousers
                    category = 'Men';
                    const trouserStyles = ['Formal', 'Casual', 'Chino', 'Pleated', 'Flat Front'];
                    title = trouserStyles[(productId - 151) % trouserStyles.length] + ' Trousers';
                    images = [
                        'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800&h=800&fit=crop',
                        'https://images.unsplash.com/photo-1594938291221-94f18cbb5660?w=800&h=800&fit=crop',
                        'https://images.unsplash.com/photo-1624378440070-7b4ce0a5b441?w=800&h=800&fit=crop'
                    ];
                    basePrice = 1499;
                    description = 'Elegant trousers for office and formal occasions.';
                } else if (productId >= 181 && productId <= 210) {
                    // Shorts
                    category = 'Men';
                    const shortStyles = ['Cargo', 'Denim', 'Chino', 'Athletic', 'Casual'];
                    title = shortStyles[(productId - 181) % shortStyles.length] + ' Shorts';
                    images = [
                        'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=800&h=800&fit=crop',
                        'https://images.unsplash.com/photo-1555689502-c4b22d76c56f?w=800&h=800&fit=crop',
                        'https://images.unsplash.com/photo-1519235106638-30cc49b5dbc5?w=800&h=800&fit=crop'
                    ];
                    basePrice = 699;
                    description = 'Comfortable shorts perfect for summer and casual outings.';
                } else if (productId >= 211 && productId <= 240) {
                    // Dhotis
                    category = 'Men';
                    title = 'Traditional Dhoti';
                    images = [
                        'https://images.unsplash.com/photo-1610976221000-c0c2d7e8c6f9?w=800&h=800&fit=crop',
                        'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=800&h=800&fit=crop',
                        'https://images.unsplash.com/photo-1701365676249-9d7ab5022dec?w=800&h=800&fit=crop'
                    ];
                    basePrice = 899;
                    description = 'Traditional Indian dhoti for ceremonies and cultural events.';
                } else if (productId >= 241 && productId <= 270) {
                    // Lungis
                    category = 'Men';
                    title = 'Cotton Lungi';
                    images = [
                        'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=800&h=800&fit=crop',
                        'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&h=800&fit=crop',
                        'https://images.unsplash.com/photo-1603252109360-909baaf261c7?w=800&h=800&fit=crop'
                    ];
                    basePrice = 399;
                    description = 'Comfortable traditional lungi for daily wear.';
                } else if (productId >= 271 && productId <= 300) {
                    // Jackets
                    category = 'Men';
                    const jacketStyles = ['Leather', 'Denim', 'Bomber', 'Windcheater', 'Puffer'];
                    title = jacketStyles[(productId - 271) % jacketStyles.length] + ' Jacket';
                    images = [
                        'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&h=800&fit=crop',
                        'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&h=800&fit=crop',
                        'https://images.unsplash.com/photo-1520975954732-35dd22299614?w=800&h=800&fit=crop'
                    ];
                    basePrice = 2499;
                    description = 'Stylish jacket for all seasons and weather conditions.';
                } else if (productId >= 301 && productId <= 330) {
                    // Sarees
                    category = 'Women';
                    const sareeTypes = ['Silk', 'Cotton', 'Georgette', 'Chiffon', 'Banarasi'];
                    title = sareeTypes[(productId - 301) % sareeTypes.length] + ' Saree';
                    images = [
                        'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&h=800&fit=crop',
                        'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800&h=800&fit=crop',
                        'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=800&h=800&fit=crop'
                    ];
                    basePrice = 1999;
                    description = 'Elegant traditional saree for special occasions and celebrations.';
                } else if (productId >= 331 && productId <= 360) {
                    // Kurtis
                    category = 'Women';
                    const kurtiStyles = ['Printed', 'Embroidered', 'Solid', 'A-Line', 'Straight'];
                    title = kurtiStyles[(productId - 331) % kurtiStyles.length] + ' Kurti';
                    images = [
                        'https://images.unsplash.com/photo-1583391733981-5afc8f8e5f8e?w=800&h=800&fit=crop',
                        'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=800&h=800&fit=crop',
                        'https://images.unsplash.com/photo-1564257577-d18f0c4c8f0e?w=800&h=800&fit=crop'
                    ];
                    basePrice = 899;
                    description = 'Stylish kurti for everyday wear and casual occasions.';
                } else if (productId >= 361 && productId <= 390) {
                    // Lehenga
                    category = 'Women';
                    title = 'Designer Lehenga';
                    images = [
                        'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&h=800&fit=crop',
                        'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=800&h=800&fit=crop',
                        'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800&h=800&fit=crop'
                    ];
                    basePrice = 4999;
                    description = 'Beautiful lehenga for weddings and grand celebrations.';
                } else if (productId >= 391 && productId <= 420) {
                    // Salwar Suits
                    category = 'Women';
                    const salwarStyles = ['Anarkali', 'Churidar', 'Palazzo', 'Straight Cut', 'Patiala'];
                    title = salwarStyles[(productId - 391) % salwarStyles.length] + ' Salwar Suit';
                    images = [
                        'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800&h=800&fit=crop',
                        'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=800&h=800&fit=crop',
                        'https://images.unsplash.com/photo-1583391733981-5afc8f8e5f8e?w=800&h=800&fit=crop'
                    ];
                    basePrice = 1599;
                    description = 'Comfortable salwar suit for all occasions.';
                } else if (productId >= 421 && productId <= 450) {
                    // Dresses
                    category = 'Women';
                    const dressStyles = ['Maxi', 'Midi', 'Mini', 'A-Line', 'Bodycon'];
                    title = dressStyles[(productId - 421) % dressStyles.length] + ' Dress';
                    images = [
                        'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&h=800&fit=crop',
                        'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800&h=800&fit=crop',
                        'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800&h=800&fit=crop'
                    ];
                    basePrice = 1299;
                    description = 'Trendy dress for parties and casual outings.';
                } else if (productId >= 451 && productId <= 480) {
                    // Tops
                    category = 'Women';
                    const topStyles = ['Crop', 'Tank', 'Blouse', 'Tunic', 'Peplum'];
                    title = topStyles[(productId - 451) % topStyles.length] + ' Top';
                    images = [
                        'https://images.unsplash.com/photo-1564257577-d18f0c4c8f0e?w=800&h=800&fit=crop',
                        'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=800&h=800&fit=crop',
                        'https://images.unsplash.com/photo-1618932260643-eee4a2f652a6?w=800&h=800&fit=crop'
                    ];
                    basePrice = 599;
                    description = 'Fashionable top for casual and formal wear.';
                } else if (productId >= 481 && productId <= 510) {
                    // Women's Jeans
                    category = 'Women';
                    const womenJeanStyles = ['Skinny', 'Boyfriend', 'High Waist', 'Bootcut', 'Flare'];
                    title = womenJeanStyles[(productId - 481) % womenJeanStyles.length] + ' Jeans';
                    images = [
                        'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&h=800&fit=crop',
                        'https://images.unsplash.com/photo-1582552938357-32b906d8081f?w=800&h=800&fit=crop',
                        'https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?w=800&h=800&fit=crop'
                    ];
                    basePrice = 1199;
                    description = 'Stylish denim jeans for women with perfect fit.';
                } else if (productId >= 511 && productId <= 540) {
                    // Skirts
                    category = 'Women';
                    const skirtStyles = ['Pleated', 'A-Line', 'Pencil', 'Maxi', 'Mini'];
                    title = skirtStyles[(productId - 511) % skirtStyles.length] + ' Skirt';
                    images = [
                        'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=800&h=800&fit=crop',
                        'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&h=800&fit=crop',
                        'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=800&h=800&fit=crop'
                    ];
                    basePrice = 799;
                    description = 'Elegant skirt for office and casual wear.';
                } else if (productId >= 541 && productId <= 720) {
                    // Kids items (Boys T-Shirts, Girls Dresses, Boys Shirts, Girls Tops, Shorts, Jeans)
                    category = 'Kids';
                    title = 'Kids Fashion Item';
                    images = [
                        'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=800&h=800&fit=crop',
                        'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=800&h=800&fit=crop',
                        'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=800&h=800&fit=crop'
                    ];
                    basePrice = 499;
                    description = 'Comfortable and stylish clothing for kids.';
                } else if (productId >= 721 && productId <= 750) {
                    // Watches
                    category = 'Accessories';
                    const watchTypes = ['Analog', 'Digital', 'Smart', 'Chronograph', 'Sports'];
                    title = watchTypes[(productId - 721) % watchTypes.length] + ' Watch';
                    images = [
                        'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=800&fit=crop',
                        'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800&h=800&fit=crop',
                        'https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=800&h=800&fit=crop'
                    ];
                    basePrice = 1999;
                    description = 'Stylish watch for every occasion with precision timekeeping.';
                } else if (productId >= 751 && productId <= 780) {
                    // Bags
                    category = 'Accessories';
                    const bagTypes = ['Backpack', 'Messenger', 'Tote', 'Laptop', 'Travel'];
                    title = bagTypes[(productId - 751) % bagTypes.length] + ' Bag';
                    images = [
                        'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&h=800&fit=crop',
                        'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&h=800&fit=crop',
                        'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=800&fit=crop'
                    ];
                    basePrice = 1499;
                    description = 'Durable and stylish bag for daily use and travel.';
                } else if (productId >= 781 && productId <= 810) {
                    // Belts
                    category = 'Accessories';
                    title = 'Leather Belt';
                    images = [
                        'https://images.unsplash.com/photo-1624222247344-550fb60583bb?w=800&h=800&fit=crop',
                        'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=800&fit=crop',
                        'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&h=800&fit=crop'
                    ];
                    basePrice = 599;
                    description = 'Premium quality belt for men with elegant design.';
                } else if (productId >= 811 && productId <= 840) {
                    // Wallets
                    category = 'Accessories';
                    const walletTypes = ['Leather', 'Bi-fold', 'Tri-fold', 'Card Holder', 'Money Clip'];
                    title = walletTypes[(productId - 811) % walletTypes.length] + ' Wallet';
                    images = [
                        'https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&h=800&fit=crop',
                        'https://images.unsplash.com/photo-1591561954557-26941169b49e?w=800&h=800&fit=crop',
                        'https://images.unsplash.com/photo-1608528062107-d8b2f2c8e8e7?w=800&h=800&fit=crop'
                    ];
                    basePrice = 799;
                    description = 'Sleek wallet with multiple compartments for cards and cash.';
                } else if (productId >= 841 && productId <= 870) {
                    // Sunglasses
                    category = 'Accessories';
                    const sunglassStyles = ['Aviator', 'Wayfarer', 'Round', 'Cat Eye', 'Sports'];
                    title = sunglassStyles[(productId - 841) % sunglassStyles.length] + ' Sunglasses';
                    images = [
                        'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&h=800&fit=crop',
                        'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&h=800&fit=crop',
                        'https://images.unsplash.com/photo-1508296695146-257a814070b4?w=800&h=800&fit=crop'
                    ];
                    basePrice = 999;
                    description = 'UV protection sunglasses with stylish design.';
                } else if (productId >= 871 && productId <= 900) {
                    // Jewelry
                    category = 'Accessories';
                    const jewelryTypes = ['Necklace', 'Bracelet', 'Earrings', 'Ring', 'Pendant'];
                    title = jewelryTypes[(productId - 871) % jewelryTypes.length];
                    images = [
                        'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&h=800&fit=crop',
                        'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&h=800&fit=crop',
                        'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&h=800&fit=crop'
                    ];
                    basePrice = 2999;
                    description = 'Elegant jewelry for special occasions and daily wear.';
                } else if (productId >= 901 && productId <= 930) {
                    // Caps
                    category = 'Accessories';
                    const capStyles = ['Baseball', 'Snapback', 'Trucker', 'Beanie', 'Sports'];
                    title = capStyles[(productId - 901) % capStyles.length] + ' Cap';
                    images = [
                        'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&h=800&fit=crop',
                        'https://images.unsplash.com/photo-1575428652377-a2d80e2277fc?w=800&h=800&fit=crop',
                        'https://images.unsplash.com/photo-1521369909029-2afed882baee?w=800&h=800&fit=crop'
                    ];
                    basePrice = 499;
                    description = 'Trendy cap for casual wear and sun protection.';
                } else if (productId >= 931 && productId <= 960) {
                    // Scarves
                    category = 'Accessories';
                    const scarfTypes = ['Silk', 'Wool', 'Cotton', 'Pashmina', 'Printed'];
                    title = scarfTypes[(productId - 931) % scarfTypes.length] + ' Scarf';
                    images = [
                        'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=800&h=800&fit=crop',
                        'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=800&h=800&fit=crop',
                        'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=800&h=800&fit=crop'
                    ];
                    basePrice = 699;
                    description = 'Elegant scarf for all seasons and occasions.';
                } else if (productId >= 961 && productId <= 990) {
                    // Sneakers
                    category = 'Footwear';
                    const sneakerStyles = ['Classic', 'High-Top', 'Low-Top', 'Running', 'Casual'];
                    title = sneakerStyles[(productId - 961) % sneakerStyles.length] + ' Sneakers';
                    images = [
                        'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=800&fit=crop',
                        'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&h=800&fit=crop',
                        'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=800&h=800&fit=crop'
                    ];
                    basePrice = 1999;
                    description = 'Comfortable sneakers for everyday wear and sports.';
                } else if (productId >= 991 && productId <= 1020) {
                    // Formal Shoes
                    category = 'Footwear';
                    const formalStyles = ['Oxford', 'Derby', 'Loafer', 'Brogue', 'Monk Strap'];
                    title = formalStyles[(productId - 991) % formalStyles.length] + ' Formal Shoes';
                    images = [
                        'https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=800&h=800&fit=crop',
                        'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=800&h=800&fit=crop',
                        'https://images.unsplash.com/photo-1582897085656-c636d006a246?w=800&h=800&fit=crop'
                    ];
                    basePrice = 2499;
                    description = 'Elegant formal shoes for office and special events.';
                } else if (productId >= 1021 && productId <= 1050) {
                    // Sandals
                    category = 'Footwear';
                    const sandalStyles = ['Leather', 'Casual', 'Sports', 'Flip-Flop', 'Slide'];
                    const sandalColors = ['Brown', 'Black', 'Tan', 'Blue', 'Grey'];
                    title = sandalStyles[(productId - 1021) % sandalStyles.length] + ' ' + sandalColors[(productId - 1021) % sandalColors.length] + ' Sandals';
                    images = [
                        'https://images.unsplash.com/photo-1603487742131-4160ec999306?w=800&h=800&fit=crop',
                        'https://images.unsplash.com/photo-1560343090-f0409e92791a?w=800&h=800&fit=crop',
                        'https://images.unsplash.com/photo-1603487742131-4160ec999306?w=800&h=800&fit=crop'
                    ];
                    basePrice = 799;
                    description = 'Comfortable sandals perfect for summer and casual wear.';
                } else if (productId >= 1081 && productId <= 1110) {
                    // Boots
                    category = 'Footwear';
                    const bootStyles = ['Chelsea', 'Combat', 'Hiking', 'Ankle', 'Work'];
                    title = bootStyles[(productId - 1081) % bootStyles.length] + ' Boots';
                    images = [
                        'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=800&h=800&fit=crop',
                        'https://images.unsplash.com/photo-1542840410-3092f99611a3?w=800&h=800&fit=crop',
                        'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=800&h=800&fit=crop'
                    ];
                    basePrice = 2999;
                    description = 'Durable boots for all terrains and weather conditions.';
                } else if (productId >= 1111 && productId <= 1140) {
                    // Sports Shoes
                    category = 'Footwear';
                    const sportsTypes = ['Running', 'Training', 'Basketball', 'Football', 'Tennis'];
                    title = sportsTypes[(productId - 1111) % sportsTypes.length] + ' Sports Shoes';
                    images = [
                        'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&h=800&fit=crop',
                        'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=800&fit=crop',
                        'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&h=800&fit=crop'
                    ];
                    basePrice = 2499;
                    description = 'High-performance sports shoes for athletes and fitness enthusiasts.';
                } else if (productId >= 1141 && productId <= 1170) {
                    // Latest Fashion
                    category = 'Fashion';
                    title = 'Latest Fashion Collection';
                    images = [
                        'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&h=800&fit=crop',
                        'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&h=800&fit=crop',
                        'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800&h=800&fit=crop'
                    ];
                    basePrice = 2499;
                    description = 'Latest fashion trends for 2026 - stay ahead in style.';
                } else if (productId >= 1171 && productId <= 1200) {
                    // Trending Now
                    category = 'Fashion';
                    title = 'Trending Fashion Item';
                    images = [
                        'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&h=800&fit=crop',
                        'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&h=800&fit=crop',
                        'https://images.unsplash.com/photo-1558769132-cb1aea3c8565?w=800&h=800&fit=crop'
                    ];
                    basePrice = 1999;
                    description = 'Most trending items right now - be part of the trend.';
                } else {
                    // Fallback for any other IDs
                    category = 'Products';
                    title = `Premium Product ${productId}`;
                    images = [
                        'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&h=800&fit=crop',
                        'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&h=800&fit=crop',
                        'https://images.unsplash.com/photo-1603252109303-2751441dd157?w=800&h=800&fit=crop'
                    ];
                    basePrice = 999;
                    description = 'Premium quality product with excellent features.';
                }

                // Create product data with category-specific images
                const productImages = [
                    images[0],
                    images[1] || images[0],
                    images[2] || images[1] || images[0],
                    images[0]
                ];

                productData = {
                    id: productId,
                    title: title,
                    price: basePrice + ((productId % 30) * 50),
                    originalPrice: Math.floor((basePrice + ((productId % 30) * 50)) * 1.5),
                    discount: 33,
                    rating: 4.3 + ((productId % 7) * 0.1),
                    reviews: 150 + (productId % 50),
                    description: description,
                    images: productImages,
                    thumbnail: images[0],
                    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
                    colors: [
                        { name: 'Original', hex: '#3B82F6' },
                        { name: 'Black', hex: '#000000' },
                        { name: 'White', hex: '#FFFFFF' },
                        { name: 'Grey', hex: '#6B7280' }
                    ],
                    stock: 25 + (productId % 15),
                    category: category,
                    brand: 'ShopNow',
                    sku: `SN-PROD-${String(productId).padStart(4, '0')}`
                };
            }

            // Add common specifications and features
            productData.specifications = {
                'Material': '100% Premium Cotton',
                'Fit': 'Regular Fit',
                'Sleeve': 'Full Sleeve',
                'Pattern': 'Solid',
                'Collar': 'Spread Collar',
                'Care': 'Machine Wash',
                'Country of Origin': 'India'
            };

            productData.features = [
                'Premium Quality Fabric',
                'Breathable and Comfortable',
                'Perfect for All Seasons',
                'Easy to Maintain',
                'Wrinkle Resistant',
                'Fade Resistant Colors'
            ];

            setProduct(productData);
            setSelectedSize(productData.sizes[1]); // Default to M
            setSelectedColor(productData.colors[0].name); // Default to first color
            setLoading(false);

            // Generate related products (4 random products from nearby IDs)
            const relatedIds = [];
            for (let i = 0; i < 4; i++) {
                let relatedId = productId + i + 1;
                if (relatedId === productId) relatedId++;
                relatedIds.push(relatedId);
            }

            const related = relatedIds.map((rid, idx) => ({
                id: rid,
                title: `Related Product ${rid}`,
                price: 999 + (rid * 10),
                rating: 4.3 + (idx * 0.1),
                image: `https://images.unsplash.com/photo-${['1602810318383-e386cc2a3ccf', '1596755094514-f87e34085b2c', '1603252109303-2751441dd157', '1620012253295-c15cc3e65df4'][idx]}?w=400&h=400&fit=crop`
            }));

            setRelatedProducts(related);
        }, 500);
    }, [id]);

    const handleAddToCart = () => {
        if (!selectedSize) {
            alert('Please select a size');
            return;
        }
        addItem({
            id: product.id,
            title: product.title,
            price: product.price,
            img: product.images[0],
            qty: quantity,
            size: selectedSize,
            color: selectedColor
        });

        // Show success toast
        const toast = document.createElement('div');
        toast.className = 'fixed top-20 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in';
        toast.innerHTML = `
            <div class="flex items-center gap-2">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                </svg>
                <span>Added to cart!</span>
            </div>
        `;
        document.body.appendChild(toast);
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transition = 'opacity 0.3s';
            setTimeout(() => toast.remove(), 300);
        }, 2000);
    };

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: product.title,
                text: `Check out ${product.title}`,
                url: window.location.href
            });
        } else {
            // Fallback: copy to clipboard
            navigator.clipboard.writeText(window.location.href);
            alert('Link copied to clipboard!');
        }
    };

    const handleMouseMove = (e) => {
        if (!showZoom) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setZoomPosition({ x, y });
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600 dark:text-gray-400">Loading product...</p>
                </div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Product not found</h2>
                    <button onClick={() => navigate('/products')} className="mt-4 text-indigo-600 hover:text-indigo-700">
                        Back to Products
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Breadcrumb */}
                <nav className="flex items-center gap-2 text-sm mb-6 text-gray-600 dark:text-gray-400">
                    <Link to="/" className="hover:text-indigo-600 dark:hover:text-indigo-400">Home</Link>
                    <span>/</span>
                    <Link to="/products" className="hover:text-indigo-600 dark:hover:text-indigo-400">Products</Link>
                    <span>/</span>
                    <Link to={`/products?category=${product.category}`} className="hover:text-indigo-600 dark:hover:text-indigo-400">{product.category}</Link>
                    <span>/</span>
                    <span className="text-gray-900 dark:text-white font-medium">{product.title}</span>
                </nav>

                {/* Product Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                    {/* Image Gallery */}
                    <div className="space-y-4">
                        {/* Main Image */}
                        <div
                            className="relative bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg aspect-square cursor-zoom-in"
                            onMouseEnter={() => setShowZoom(true)}
                            onMouseLeave={() => setShowZoom(false)}
                            onMouseMove={handleMouseMove}
                        >
                            <img
                                src={product.images[selectedImage]}
                                alt={product.title}
                                className="w-full h-full object-cover"
                                style={showZoom ? {
                                    transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                                    transform: 'scale(2)'
                                } : {}}
                            />
                            {product.discount > 0 && (
                                <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                                    {product.discount}% OFF
                                </div>
                            )}
                            <button
                                onClick={() => {
                                    if (isInWishlist(product.id)) {
                                        removeFromWishlist(product.id);
                                    } else {
                                        addToWishlist({
                                            id: product.id,
                                            title: product.title,
                                            price: product.price,
                                            image: product.images[0],
                                            rating: product.rating,
                                            stock: product.stock
                                        });
                                    }
                                }}
                                className="absolute top-4 right-4 bg-white dark:bg-gray-800 p-2 rounded-full shadow-lg hover:scale-110 transition-transform"
                                title={isInWishlist(product.id) ? "Remove from wishlist" : "Add to wishlist"}
                            >
                                <Heart className={`w-6 h-6 ${isInWishlist(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-600 dark:text-gray-400'}`} />
                            </button>
                        </div>

                        {/* Thumbnail Images */}
                        <div className="grid grid-cols-4 gap-4">
                            {product.images.map((image, index) => (
                                <button
                                    key={index}
                                    onClick={() => setSelectedImage(index)}
                                    className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${selectedImage === index
                                        ? 'border-indigo-600 dark:border-indigo-400 shadow-lg'
                                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                                        }`}
                                >
                                    <img src={image} alt={`${product.title} ${index + 1}`} className="w-full h-full object-cover" />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="space-y-6">
                        {/* Title & Brand */}
                        <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{product.brand}</p>
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{product.title}</h1>

                            {/* Rating */}
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-1">
                                    <div className="flex">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`w-5 h-5 ${i < Math.floor(product.rating)
                                                    ? 'fill-yellow-400 text-yellow-400'
                                                    : 'text-gray-300 dark:text-gray-600'
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                    <span className="text-sm font-medium text-gray-900 dark:text-white ml-1">{product.rating}</span>
                                </div>
                                <span className="text-sm text-gray-600 dark:text-gray-400">({product.reviews} reviews)</span>
                            </div>
                        </div>

                        {/* Price */}
                        <div className="flex items-baseline gap-3">
                            <span className="text-4xl font-bold text-indigo-600 dark:text-indigo-400">₹{product.price}</span>
                            {product.originalPrice && (
                                <>
                                    <span className="text-2xl text-gray-400 dark:text-gray-500 line-through">₹{product.originalPrice}</span>
                                    <span className="text-green-600 dark:text-green-400 font-semibold">Save ₹{product.originalPrice - product.price}</span>
                                </>
                            )}
                        </div>

                        {/* Stock Status */}
                        <div className="flex items-center gap-2">
                            {product.stock > 0 ? (
                                <>
                                    <Check className="w-5 h-5 text-green-600" />
                                    <span className="text-green-600 dark:text-green-400 font-medium">In Stock ({product.stock} available)</span>
                                </>
                            ) : (
                                <>
                                    <X className="w-5 h-5 text-red-600" />
                                    <span className="text-red-600 dark:text-red-400 font-medium">Out of Stock</span>
                                </>
                            )}
                        </div>

                        {/* Color Selection */}
                        <div>
                            <label className="block text-sm font-medium text-gray-900 dark:text-white mb-3">
                                Color: <span className="text-indigo-600 dark:text-indigo-400">{selectedColor}</span>
                            </label>
                            <div className="flex gap-3">
                                {product.colors.map((color) => (
                                    <button
                                        key={color.name}
                                        onClick={() => setSelectedColor(color.name)}
                                        className={`w-10 h-10 rounded-full border-2 transition-all ${selectedColor === color.name
                                            ? 'border-indigo-600 dark:border-indigo-400 scale-110 shadow-lg'
                                            : 'border-gray-300 dark:border-gray-600 hover:scale-105'
                                            }`}
                                        style={{ backgroundColor: color.hex }}
                                        title={color.name}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Size Selection */}
                        <div>
                            <label className="block text-sm font-medium text-gray-900 dark:text-white mb-3">
                                Size: <span className="text-indigo-600 dark:text-indigo-400">{selectedSize}</span>
                            </label>
                            <div className="flex gap-3">
                                {product.sizes.map((size) => (
                                    <button
                                        key={size}
                                        onClick={() => setSelectedSize(size)}
                                        className={`px-6 py-3 rounded-lg border-2 font-medium transition-all ${selectedSize === size
                                            ? 'border-indigo-600 dark:border-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400'
                                            : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-gray-400 dark:hover:border-gray-500'
                                            }`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Quantity */}
                        <div>
                            <label className="block text-sm font-medium text-gray-900 dark:text-white mb-3">Quantity</label>
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="w-10 h-10 rounded-lg border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                >
                                    -
                                </button>
                                <span className="w-16 text-center text-lg font-semibold text-gray-900 dark:text-white">{quantity}</span>
                                <button
                                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                                    className="w-10 h-10 rounded-lg border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-4">
                            <button
                                onClick={handleAddToCart}
                                disabled={product.stock === 0}
                                className="flex-1 bg-indigo-600 text-white py-4 rounded-lg font-semibold hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                            >
                                <ShoppingCart className="w-5 h-5" />
                                Add to Cart
                            </button>
                            <button
                                onClick={handleShare}
                                className="px-6 py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                            >
                                <Share2 className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Features */}
                        <div className="grid grid-cols-3 gap-4 pt-6 border-t dark:border-gray-700">
                            <div className="flex flex-col items-center text-center">
                                <Truck className="w-8 h-8 text-indigo-600 dark:text-indigo-400 mb-2" />
                                <span className="text-xs text-gray-600 dark:text-gray-400">Free Delivery</span>
                            </div>
                            <div className="flex flex-col items-center text-center">
                                <RotateCcw className="w-8 h-8 text-indigo-600 dark:text-indigo-400 mb-2" />
                                <span className="text-xs text-gray-600 dark:text-gray-400">7 Days Return</span>
                            </div>
                            <div className="flex flex-col items-center text-center">
                                <Shield className="w-8 h-8 text-indigo-600 dark:text-indigo-400 mb-2" />
                                <span className="text-xs text-gray-600 dark:text-gray-400">Warranty</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabs Section */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-12">
                    {/* Tab Headers */}
                    <div className="flex gap-6 border-b dark:border-gray-700 mb-6">
                        {['description', 'specifications', 'reviews'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`pb-4 px-2 font-medium capitalize transition-colors ${activeTab === tab
                                    ? 'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400'
                                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    {/* Tab Content */}
                    <div className="text-gray-700 dark:text-gray-300">
                        {activeTab === 'description' && (
                            <div className="space-y-4">
                                <p className="text-lg leading-relaxed">{product.description}</p>
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Key Features:</h3>
                                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        {product.features.map((feature, index) => (
                                            <li key={index} className="flex items-start gap-2">
                                                <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        )}

                        {activeTab === 'specifications' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {Object.entries(product.specifications).map(([key, value]) => (
                                    <div key={key} className="flex justify-between py-3 border-b dark:border-gray-700">
                                        <span className="font-medium text-gray-900 dark:text-white">{key}:</span>
                                        <span className="text-gray-600 dark:text-gray-400">{value}</span>
                                    </div>
                                ))}
                                <div className="flex justify-between py-3 border-b dark:border-gray-700">
                                    <span className="font-medium text-gray-900 dark:text-white">SKU:</span>
                                    <span className="text-gray-600 dark:text-gray-400">{product.sku}</span>
                                </div>
                            </div>
                        )}

                        {activeTab === 'reviews' && (
                            <ProductReviews productId={product.id} />
                        )}
                    </div>
                </div>

                {/* Related Products */}
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">You May Also Like</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {relatedProducts.map((relatedProduct) => (
                            <Link
                                key={relatedProduct.id}
                                to={`/product/${relatedProduct.id}`}
                                className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow group"
                            >
                                <div className="aspect-square overflow-hidden">
                                    <img
                                        src={relatedProduct.image}
                                        alt={relatedProduct.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                    />
                                </div>
                                <div className="p-4">
                                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">{relatedProduct.title}</h3>
                                    <div className="flex items-center justify-between">
                                        <span className="text-lg font-bold text-indigo-600 dark:text-indigo-400">₹{relatedProduct.price}</span>
                                        <div className="flex items-center gap-1">
                                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                            <span className="text-sm text-gray-600 dark:text-gray-400">{relatedProduct.rating}</span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
