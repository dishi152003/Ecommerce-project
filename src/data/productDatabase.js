// Product database for search functionality
// This includes TOP_PICKS and generates products based on ID ranges from ProductDetail.jsx

export const TOP_PICKS = [
    { id: 10001, title: 'Casual Sneakers', price: 3735, thumbnail: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop', category: 'Footwear', description: 'Comfortable casual sneakers perfect for everyday wear' },
    { id: 10002, title: 'Leather Jacket', price: 9960, thumbnail: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop', category: 'Men', description: 'Premium leather jacket for a stylish look' },
    { id: 10003, title: 'Gold Watch', price: 7055, thumbnail: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop', category: 'Accessories', description: 'Elegant gold watch for special occasions' },
    { id: 10004, title: 'Summer Dress', price: 2905, thumbnail: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=400&fit=crop', category: 'Women', description: 'Light and breezy summer dress' },
    { id: 10005, title: 'Designer Bag', price: 7470, thumbnail: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop', category: 'Accessories', description: 'Luxury designer bag for fashion enthusiasts' },
    { id: 10006, title: 'Denim Jeans', price: 4565, thumbnail: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400&h=400&fit=crop', category: 'Women', description: 'Classic denim jeans for casual wear' },
    { id: 10007, title: 'Running Shoes', price: 4980, thumbnail: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop', category: 'Footwear', description: 'High-performance running shoes' },
];

// Generate sample products based on categories
export const generateProductDatabase = () => {
    const products = [...TOP_PICKS];

    // Shirts (IDs 1-30)
    const shirtStyles = ['Classic White Oxford', 'Navy Blue Formal', 'Light Blue Casual', 'Black Slim Fit', 'Checkered Red & White'];
    for (let i = 1; i <= 30; i++) {
        products.push({
            id: i,
            title: `${shirtStyles[(i - 1) % shirtStyles.length]} Shirt`,
            price: 1299 + (i * 50),
            thumbnail: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&h=400&fit=crop',
            category: 'Men',
            description: 'Premium quality shirt for formal and casual wear'
        });
    }

    // T-Shirts (IDs 31-60)
    const tshirtStyles = ['Classic', 'V-Neck', 'Polo', 'Round Neck', 'Graphic'];
    for (let i = 31; i <= 60; i++) {
        products.push({
            id: i,
            title: `${tshirtStyles[(i - 31) % tshirtStyles.length]} T-Shirt`,
            price: 499 + ((i - 31) * 30),
            thumbnail: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
            category: 'Men',
            description: 'Comfortable cotton t-shirt for everyday wear'
        });
    }

    // Jeans (IDs 121-150)
    const jeanStyles = ['Slim Fit', 'Regular Fit', 'Skinny', 'Straight Fit', 'Relaxed Fit'];
    const jeanColors = ['Blue', 'Black', 'Grey', 'Light Blue', 'Dark Blue'];
    for (let i = 121; i <= 150; i++) {
        products.push({
            id: i,
            title: `${jeanStyles[(i - 121) % jeanStyles.length]} ${jeanColors[(i - 121) % jeanColors.length]} Jeans`,
            price: 1299 + ((i - 121) * 50),
            thumbnail: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop',
            category: 'Men',
            description: 'Premium denim jeans with perfect fit'
        });
    }

    // Sarees (IDs 301-330)
    const sareeTypes = ['Silk', 'Cotton', 'Georgette', 'Chiffon', 'Banarasi'];
    for (let i = 301; i <= 330; i++) {
        products.push({
            id: i,
            title: `${sareeTypes[(i - 301) % sareeTypes.length]} Saree`,
            price: 1999 + ((i - 301) * 100),
            thumbnail: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&h=400&fit=crop',
            category: 'Women',
            description: 'Elegant traditional saree for special occasions'
        });
    }

    // Kurtis (IDs 331-360)
    const kurtiStyles = ['Printed', 'Embroidered', 'Solid', 'A-Line', 'Straight'];
    for (let i = 331; i <= 360; i++) {
        products.push({
            id: i,
            title: `${kurtiStyles[(i - 331) % kurtiStyles.length]} Kurti`,
            price: 899 + ((i - 331) * 40),
            thumbnail: 'https://images.unsplash.com/photo-1583391733981-5afc8f8e5f8e?w=400&h=400&fit=crop',
            category: 'Women',
            description: 'Stylish kurti for everyday wear'
        });
    }

    // Dresses (IDs 421-450)
    const dressStyles = ['Maxi', 'Midi', 'Mini', 'A-Line', 'Bodycon'];
    for (let i = 421; i <= 450; i++) {
        products.push({
            id: i,
            title: `${dressStyles[(i - 421) % dressStyles.length]} Dress`,
            price: 1299 + ((i - 421) * 60),
            thumbnail: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=400&fit=crop',
            category: 'Women',
            description: 'Trendy dress for parties and casual outings'
        });
    }

    // Watches (IDs 721-750)
    const watchTypes = ['Analog', 'Digital', 'Smart', 'Chronograph', 'Sports'];
    for (let i = 721; i <= 750; i++) {
        products.push({
            id: i,
            title: `${watchTypes[(i - 721) % watchTypes.length]} Watch`,
            price: 1999 + ((i - 721) * 150),
            thumbnail: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
            category: 'Accessories',
            description: 'Stylish watch for every occasion'
        });
    }

    // Bags (IDs 751-780)
    const bagTypes = ['Backpack', 'Messenger', 'Tote', 'Laptop', 'Travel'];
    for (let i = 751; i <= 780; i++) {
        products.push({
            id: i,
            title: `${bagTypes[(i - 751) % bagTypes.length]} Bag`,
            price: 1499 + ((i - 751) * 100),
            thumbnail: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop',
            category: 'Accessories',
            description: 'Durable and stylish bag for daily use'
        });
    }

    // Sneakers (IDs 961-990)
    const sneakerStyles = ['Classic', 'High-Top', 'Low-Top', 'Running', 'Casual'];
    for (let i = 961; i <= 990; i++) {
        products.push({
            id: i,
            title: `${sneakerStyles[(i - 961) % sneakerStyles.length]} Sneakers`,
            price: 1999 + ((i - 961) * 80),
            thumbnail: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
            category: 'Footwear',
            description: 'Comfortable sneakers for everyday wear'
        });
    }

    // Formal Shoes (IDs 991-1020)
    const formalStyles = ['Oxford', 'Derby', 'Loafer', 'Brogue', 'Monk Strap'];
    for (let i = 991; i <= 1020; i++) {
        products.push({
            id: i,
            title: `${formalStyles[(i - 991) % formalStyles.length]} Formal Shoes`,
            price: 2499 + ((i - 991) * 100),
            thumbnail: 'https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=400&h=400&fit=crop',
            category: 'Footwear',
            description: 'Elegant formal shoes for office and events'
        });
    }

    // Sandals (IDs 1021-1050)
    const sandalStyles = ['Leather', 'Casual', 'Sports', 'Flip-Flop', 'Slide'];
    const sandalColors = ['Brown', 'Black', 'Tan', 'Blue', 'Grey'];
    for (let i = 1021; i <= 1050; i++) {
        products.push({
            id: i,
            title: `${sandalStyles[(i - 1021) % sandalStyles.length]} ${sandalColors[(i - 1021) % sandalColors.length]} Sandals`,
            price: 799 + ((i - 1021) * 50),
            thumbnail: 'https://images.unsplash.com/photo-1603487742131-4160ec999306?w=400&h=400&fit=crop',
            category: 'Footwear',
            description: 'Comfortable sandals for summer'
        });
    }

    return products;
};

// Search function
export const searchProducts = (query) => {
    if (!query || query.length < 2) return [];

    const allProducts = generateProductDatabase();
    const searchTerm = query.toLowerCase();

    return allProducts.filter(product =>
        product.title.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm)
    ).slice(0, 10); // Limit to 10 results
};
