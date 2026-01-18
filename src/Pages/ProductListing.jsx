import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';
import { Heart } from 'lucide-react';

export default function ProductListing() {
    const [searchParams] = useSearchParams();
    const subcategory = searchParams.get('subcategory');
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { addItem } = useCart();
    const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 10;

    // Filter and Sort States
    const [filters, setFilters] = useState({
        priceRange: [0, 10000],
        minRating: 0,
        inStock: false
    });
    const [sortBy, setSortBy] = useState('default');
    const [showFilters, setShowFilters] = useState(false);

    useEffect(() => {
        setLoading(true);
        setCurrentPage(1);

        // Load products based on subcategory
        setTimeout(() => {
            if (subcategory === 'Shirts') {
                // 30 Men's Shirts
                const shirtsProducts = [
                    { id: 1, title: 'Classic White Oxford Shirt', description: 'Timeless white oxford shirt perfect for formal occasions', price: 1299, rating: 4.5, stock: 25, thumbnail: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&h=400&fit=crop' },
                    { id: 2, title: 'Navy Blue Formal Shirt', description: 'Elegant navy blue shirt for office wear', price: 1199, rating: 4.3, stock: 30, thumbnail: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=400&fit=crop' },
                    { id: 3, title: 'Light Blue Casual Shirt', description: 'Comfortable light blue shirt for everyday wear', price: 999, rating: 4.6, stock: 40, thumbnail: 'https://images.unsplash.com/photo-1603252109303-2751441dd157?w=400&h=400&fit=crop' },
                    { id: 4, title: 'Black Slim Fit Shirt', description: 'Modern slim fit black shirt for a sleek look', price: 1399, rating: 4.7, stock: 20, thumbnail: 'https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?w=400&h=400&fit=crop' },
                    { id: 5, title: 'Checkered Red & White Shirt', description: 'Trendy checkered pattern shirt', price: 1099, rating: 4.4, stock: 35, thumbnail: 'https://images.unsplash.com/photo-1598032895397-b9372a5f4d8e?w=400&h=400&fit=crop' },
                    { id: 6, title: 'Grey Linen Shirt', description: 'Breathable linen shirt for summer', price: 1499, rating: 4.8, stock: 15, thumbnail: 'https://images.unsplash.com/photo-1594938291221-94f18cbb5660?w=400&h=400&fit=crop' },
                    { id: 7, title: 'Striped Blue Shirt', description: 'Classic striped design for smart casual look', price: 1149, rating: 4.2, stock: 28, thumbnail: 'https://images.unsplash.com/photo-1596755095514-f87e34085b2c?w=400&h=400&fit=crop' },
                    { id: 8, title: 'Pink Casual Shirt', description: 'Soft pink shirt for a fresh look', price: 1099, rating: 4.5, stock: 22, thumbnail: 'https://images.unsplash.com/photo-1603252109360-909baaf261c7?w=400&h=400&fit=crop' },
                    { id: 9, title: 'Maroon Party Shirt', description: 'Rich maroon color perfect for parties', price: 1599, rating: 4.6, stock: 18, thumbnail: 'https://images.unsplash.com/photo-1602810316498-ab67cf68c8e1?w=400&h=400&fit=crop' },
                    { id: 10, title: 'Denim Blue Shirt', description: 'Casual denim shirt for weekend outings', price: 1249, rating: 4.4, stock: 32, thumbnail: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=400&h=400&fit=crop' },
                    { id: 11, title: 'Green Olive Shirt', description: 'Earthy olive green for a rugged look', price: 1199, rating: 4.3, stock: 26, thumbnail: 'https://images.unsplash.com/photo-1603252109612-4e2d6c8d9e1d?w=400&h=400&fit=crop' },
                    { id: 12, title: 'Yellow Mustard Shirt', description: 'Bold mustard yellow statement piece', price: 1099, rating: 4.1, stock: 20, thumbnail: 'https://images.unsplash.com/photo-1603252109303-2751441dd157?w=400&h=400&fit=crop' },
                    { id: 13, title: 'Purple Formal Shirt', description: 'Sophisticated purple for special occasions', price: 1399, rating: 4.5, stock: 15, thumbnail: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&h=400&fit=crop' },
                    { id: 14, title: 'Beige Cotton Shirt', description: 'Comfortable beige cotton for all-day wear', price: 1149, rating: 4.6, stock: 30, thumbnail: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=400&fit=crop' },
                    { id: 15, title: 'Charcoal Grey Shirt', description: 'Versatile charcoal grey for any occasion', price: 1299, rating: 4.7, stock: 24, thumbnail: 'https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?w=400&h=400&fit=crop' },
                    { id: 16, title: 'Teal Blue Shirt', description: 'Vibrant teal blue for a modern look', price: 1199, rating: 4.4, stock: 28, thumbnail: 'https://images.unsplash.com/photo-1603252109303-2751441dd157?w=400&h=400&fit=crop' },
                    { id: 17, title: 'Brown Corduroy Shirt', description: 'Textured corduroy for winter style', price: 1599, rating: 4.8, stock: 12, thumbnail: 'https://images.unsplash.com/photo-1598032895397-b9372a5f4d8e?w=400&h=400&fit=crop' },
                    { id: 18, title: 'Cream Silk Blend Shirt', description: 'Luxurious silk blend for premium feel', price: 1899, rating: 4.9, stock: 10, thumbnail: 'https://images.unsplash.com/photo-1594938291221-94f18cbb5660?w=400&h=400&fit=crop' },
                    { id: 19, title: 'Sky Blue Shirt', description: 'Light sky blue for a fresh appearance', price: 1099, rating: 4.3, stock: 35, thumbnail: 'https://images.unsplash.com/photo-1596755095514-f87e34085b2c?w=400&h=400&fit=crop' },
                    { id: 20, title: 'Burgundy Wine Shirt', description: 'Deep burgundy for elegant evenings', price: 1449, rating: 4.6, stock: 18, thumbnail: 'https://images.unsplash.com/photo-1602810316498-ab67cf68c8e1?w=400&h=400&fit=crop' },
                    { id: 21, title: 'White Linen Shirt', description: 'Breathable white linen for summer', price: 1349, rating: 4.7, stock: 22, thumbnail: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&h=400&fit=crop' },
                    { id: 22, title: 'Indigo Denim Shirt', description: 'Classic indigo denim shirt', price: 1299, rating: 4.5, stock: 27, thumbnail: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=400&h=400&fit=crop' },
                    { id: 23, title: 'Mint Green Shirt', description: 'Refreshing mint green for spring', price: 1149, rating: 4.4, stock: 25, thumbnail: 'https://images.unsplash.com/photo-1603252109612-4e2d6c8d9e1d?w=400&h=400&fit=crop' },
                    { id: 24, title: 'Coral Pink Shirt', description: 'Trendy coral pink for casual wear', price: 1099, rating: 4.2, stock: 30, thumbnail: 'https://images.unsplash.com/photo-1603252109360-909baaf261c7?w=400&h=400&fit=crop' },
                    { id: 25, title: 'Slate Grey Shirt', description: 'Professional slate grey shirt', price: 1249, rating: 4.6, stock: 20, thumbnail: 'https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?w=400&h=400&fit=crop' },
                    { id: 26, title: 'Lavender Purple Shirt', description: 'Soft lavender for a unique style', price: 1199, rating: 4.3, stock: 16, thumbnail: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&h=400&fit=crop' },
                    { id: 27, title: 'Forest Green Shirt', description: 'Deep forest green outdoor shirt', price: 1349, rating: 4.5, stock: 23, thumbnail: 'https://images.unsplash.com/photo-1603252109612-4e2d6c8d9e1d?w=400&h=400&fit=crop' },
                    { id: 28, title: 'Peach Orange Shirt', description: 'Warm peach orange for summer vibes', price: 1099, rating: 4.4, stock: 28, thumbnail: 'https://images.unsplash.com/photo-1603252109303-2751441dd157?w=400&h=400&fit=crop' },
                    { id: 29, title: 'Steel Blue Shirt', description: 'Modern steel blue formal shirt', price: 1399, rating: 4.7, stock: 19, thumbnail: 'https://images.unsplash.com/photo-1596755095514-f87e34085b2c?w=400&h=400&fit=crop' },
                    { id: 30, title: 'Khaki Casual Shirt', description: 'Versatile khaki shirt for any occasion', price: 1149, rating: 4.5, stock: 31, thumbnail: 'https://images.unsplash.com/photo-1594938291221-94f18cbb5660?w=400&h=400&fit=crop' }
                ];
                setProducts(shirtsProducts);
            } else if (subcategory === 'T-Shirts') {
                // 30 Men's T-Shirts
                const tshirtsProducts = [
                    { id: 31, title: 'Classic White Crew Neck T-Shirt', description: 'Essential white cotton t-shirt for everyday wear', price: 499, rating: 4.5, stock: 50, thumbnail: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop' },
                    { id: 32, title: 'Black V-Neck T-Shirt', description: 'Sleek black v-neck for casual style', price: 549, rating: 4.6, stock: 45, thumbnail: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400&h=400&fit=crop' },
                    { id: 33, title: 'Navy Blue Polo T-Shirt', description: 'Classic polo style in navy blue', price: 799, rating: 4.7, stock: 35, thumbnail: 'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=400&h=400&fit=crop' },
                    { id: 34, title: 'Grey Melange Round Neck T-Shirt', description: 'Comfortable grey melange for casual days', price: 599, rating: 4.4, stock: 40, thumbnail: 'https://images.unsplash.com/photo-1622445275463-afa2ab738c34?w=400&h=400&fit=crop' },
                    { id: 35, title: 'Striped Red & White T-Shirt', description: 'Trendy striped pattern t-shirt', price: 649, rating: 4.3, stock: 30, thumbnail: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=400&h=400&fit=crop' },
                    { id: 36, title: 'Graphic Print T-Shirt - Adventure', description: 'Cool adventure graphic print', price: 699, rating: 4.8, stock: 25, thumbnail: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&h=400&fit=crop' },
                    { id: 37, title: 'Olive Green Henley T-Shirt', description: 'Stylish henley neck in olive green', price: 749, rating: 4.5, stock: 28, thumbnail: 'https://images.unsplash.com/photo-1627225924765-552d49cf47ad?w=400&h=400&fit=crop' },
                    { id: 38, title: 'Maroon Muscle Fit T-Shirt', description: 'Athletic muscle fit maroon tee', price: 899, rating: 4.6, stock: 20, thumbnail: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=400&h=400&fit=crop' },
                    { id: 39, title: 'Yellow Graphic T-Shirt - Music', description: 'Vibrant yellow with music graphics', price: 649, rating: 4.2, stock: 32, thumbnail: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&h=400&fit=crop' },
                    { id: 40, title: 'Sky Blue Pocket T-Shirt', description: 'Casual pocket tee in sky blue', price: 599, rating: 4.4, stock: 38, thumbnail: 'https://images.unsplash.com/photo-1622445275463-afa2ab738c34?w=400&h=400&fit=crop' },
                    { id: 41, title: 'Charcoal Longline T-Shirt', description: 'Modern longline cut in charcoal', price: 849, rating: 4.7, stock: 22, thumbnail: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400&h=400&fit=crop' },
                    { id: 42, title: 'White Oversized T-Shirt', description: 'Trendy oversized fit white tee', price: 799, rating: 4.5, stock: 35, thumbnail: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop' },
                    { id: 43, title: 'Burgundy Raglan T-Shirt', description: 'Sporty raglan sleeves in burgundy', price: 699, rating: 4.3, stock: 26, thumbnail: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=400&h=400&fit=crop' },
                    { id: 44, title: 'Mint Green Crew Neck T-Shirt', description: 'Fresh mint green for summer', price: 549, rating: 4.6, stock: 40, thumbnail: 'https://images.unsplash.com/photo-1622445275463-afa2ab738c34?w=400&h=400&fit=crop' },
                    { id: 45, title: 'Black Graphic T-Shirt - Skull', description: 'Edgy skull graphic on black', price: 749, rating: 4.8, stock: 24, thumbnail: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400&h=400&fit=crop' },
                    { id: 46, title: 'Orange Sports T-Shirt', description: 'Breathable sports tee in orange', price: 899, rating: 4.7, stock: 30, thumbnail: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&h=400&fit=crop' },
                    { id: 47, title: 'Purple Tie-Dye T-Shirt', description: 'Unique tie-dye pattern in purple', price: 799, rating: 4.4, stock: 18, thumbnail: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=400&h=400&fit=crop' },
                    { id: 48, title: 'Beige Premium Cotton T-Shirt', description: 'Luxury premium cotton in beige', price: 999, rating: 4.9, stock: 15, thumbnail: 'https://images.unsplash.com/photo-1622445275463-afa2ab738c34?w=400&h=400&fit=crop' },
                    { id: 49, title: 'Teal Ringer T-Shirt', description: 'Retro ringer style in teal', price: 649, rating: 4.3, stock: 28, thumbnail: 'https://images.unsplash.com/photo-1622445275463-afa2ab738c34?w=400&h=400&fit=crop' },
                    { id: 50, title: 'Coral Pink T-Shirt', description: 'Trendy coral pink casual tee', price: 599, rating: 4.5, stock: 33, thumbnail: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=400&h=400&fit=crop' },
                    { id: 51, title: 'Forest Green Camo T-Shirt', description: 'Military camo print in forest green', price: 749, rating: 4.6, stock: 25, thumbnail: 'https://images.unsplash.com/photo-1627225924765-552d49cf47ad?w=400&h=400&fit=crop' },
                    { id: 52, title: 'White Graphic T-Shirt - Vintage', description: 'Vintage graphic print on white', price: 699, rating: 4.4, stock: 30, thumbnail: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop' },
                    { id: 53, title: 'Indigo Dip-Dye T-Shirt', description: 'Artistic dip-dye effect in indigo', price: 849, rating: 4.7, stock: 20, thumbnail: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400&h=400&fit=crop' },
                    { id: 54, title: 'Red Striped Polo T-Shirt', description: 'Classic red striped polo', price: 799, rating: 4.5, stock: 27, thumbnail: 'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=400&h=400&fit=crop' },
                    { id: 55, title: 'Slate Grey V-Neck T-Shirt', description: 'Sophisticated slate grey v-neck', price: 599, rating: 4.3, stock: 35, thumbnail: 'https://images.unsplash.com/photo-1622445275463-afa2ab738c34?w=400&h=400&fit=crop' },
                    { id: 56, title: 'Lavender Crew Neck T-Shirt', description: 'Soft lavender for a unique look', price: 649, rating: 4.4, stock: 22, thumbnail: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=400&h=400&fit=crop' },
                    { id: 57, title: 'Khaki Pocket T-Shirt', description: 'Versatile khaki with chest pocket', price: 699, rating: 4.6, stock: 31, thumbnail: 'https://images.unsplash.com/photo-1622445275463-afa2ab738c34?w=400&h=400&fit=crop' },
                    { id: 58, title: 'Electric Blue Performance T-Shirt', description: 'High-performance athletic tee', price: 949, rating: 4.8, stock: 18, thumbnail: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&h=400&fit=crop' },
                    { id: 59, title: 'Charcoal Graphic T-Shirt - Urban', description: 'Urban street graphic design', price: 749, rating: 4.5, stock: 26, thumbnail: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400&h=400&fit=crop' },
                    { id: 60, title: 'Rust Orange Henley T-Shirt', description: 'Warm rust orange henley style', price: 799, rating: 4.7, stock: 24, thumbnail: 'https://images.unsplash.com/photo-1627225924765-552d49cf47ad?w=400&h=400&fit=crop' }
                ];
                setProducts(tshirtsProducts);
            } else if (subcategory === 'Kurtas') {
                // 30 Men's Kurtas
                const kurtasProducts = [
                    { id: 61, title: 'White Cotton Kurta', description: 'Classic white cotton kurta for festive occasions', price: 1499, rating: 4.6, stock: 30, thumbnail: 'https://images.unsplash.com/photo-1701365676249-9d7ab5022dec?w=400&h=400&fit=crop' },
                    { id: 62, title: 'Navy Blue Silk Kurta', description: 'Elegant navy blue silk kurta with mandarin collar', price: 2499, rating: 4.8, stock: 20, thumbnail: 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=400&h=400&fit=crop' },
                    { id: 63, title: 'Maroon Embroidered Kurta', description: 'Rich maroon kurta with intricate embroidery', price: 2999, rating: 4.9, stock: 15, thumbnail: 'https://images.unsplash.com/photo-1610976221000-c0c2d7e8c6f9?w=400&h=400&fit=crop' },
                    { id: 64, title: 'Cream Linen Kurta', description: 'Breathable cream linen kurta for summer', price: 1799, rating: 4.5, stock: 25, thumbnail: 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=400&h=400&fit=crop' },
                    { id: 65, title: 'Black Pathani Kurta', description: 'Traditional black pathani style kurta', price: 1899, rating: 4.7, stock: 22, thumbnail: 'https://images.unsplash.com/photo-1610976221000-c0c2d7e8c6f9?w=400&h=400&fit=crop' },
                    { id: 66, title: 'Green Printed Kurta', description: 'Vibrant green kurta with block prints', price: 1599, rating: 4.4, stock: 28, thumbnail: 'https://images.unsplash.com/photo-1701365676249-9d7ab5022dec?w=400&h=400&fit=crop' },
                    { id: 67, title: 'Beige Khadi Kurta', description: 'Handwoven khadi kurta in beige', price: 2199, rating: 4.8, stock: 18, thumbnail: 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=400&h=400&fit=crop' },
                    { id: 68, title: 'Pink Festive Kurta', description: 'Soft pink kurta perfect for celebrations', price: 1699, rating: 4.3, stock: 24, thumbnail: 'https://images.unsplash.com/photo-1610976221000-c0c2d7e8c6f9?w=400&h=400&fit=crop' },
                    { id: 69, title: 'Orange Bandhani Kurta', description: 'Traditional bandhani print in orange', price: 1999, rating: 4.6, stock: 20, thumbnail: 'https://images.unsplash.com/photo-1701365676249-9d7ab5022dec?w=400&h=400&fit=crop' },
                    { id: 70, title: 'Grey Nehru Collar Kurta', description: 'Modern grey kurta with nehru collar', price: 1799, rating: 4.5, stock: 26, thumbnail: 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=400&h=400&fit=crop' },
                    { id: 71, title: 'Royal Blue Silk Blend Kurta', description: 'Luxurious royal blue silk blend', price: 2799, rating: 4.9, stock: 12, thumbnail: 'https://images.unsplash.com/photo-1610976221000-c0c2d7e8c6f9?w=400&h=400&fit=crop' },
                    { id: 72, title: 'Yellow Cotton Kurta', description: 'Bright yellow cotton kurta for casual wear', price: 1399, rating: 4.4, stock: 30, thumbnail: 'https://images.unsplash.com/photo-1701365676249-9d7ab5022dec?w=400&h=400&fit=crop' },
                    { id: 73, title: 'Burgundy Velvet Kurta', description: 'Premium burgundy velvet for winter', price: 3499, rating: 4.8, stock: 10, thumbnail: 'https://images.unsplash.com/photo-1610976221000-c0c2d7e8c6f9?w=400&h=400&fit=crop' },
                    { id: 74, title: 'Mint Green Kurta', description: 'Refreshing mint green casual kurta', price: 1599, rating: 4.5, stock: 22, thumbnail: 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=400&h=400&fit=crop' },
                    { id: 75, title: 'Charcoal Grey Kurta', description: 'Sophisticated charcoal grey kurta', price: 1899, rating: 4.6, stock: 24, thumbnail: 'https://images.unsplash.com/photo-1701365676249-9d7ab5022dec?w=400&h=400&fit=crop' },
                    { id: 76, title: 'Peach Embroidered Kurta', description: 'Delicate peach with floral embroidery', price: 2299, rating: 4.7, stock: 18, thumbnail: 'https://images.unsplash.com/photo-1610976221000-c0c2d7e8c6f9?w=400&h=400&fit=crop' },
                    { id: 77, title: 'Indigo Dyed Kurta', description: 'Natural indigo dyed cotton kurta', price: 1999, rating: 4.5, stock: 20, thumbnail: 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=400&h=400&fit=crop' },
                    { id: 78, title: 'Lavender Kurta Set', description: 'Soft lavender kurta with churidar', price: 2599, rating: 4.8, stock: 16, thumbnail: 'https://images.unsplash.com/photo-1701365676249-9d7ab5022dec?w=400&h=400&fit=crop' },
                    { id: 79, title: 'Olive Green Kurta', description: 'Earthy olive green cotton kurta', price: 1699, rating: 4.4, stock: 25, thumbnail: 'https://images.unsplash.com/photo-1610976221000-c0c2d7e8c6f9?w=400&h=400&fit=crop' },
                    { id: 80, title: 'Teal Blue Kurta', description: 'Vibrant teal blue festive kurta', price: 1899, rating: 4.6, stock: 21, thumbnail: 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=400&h=400&fit=crop' },
                    { id: 81, title: 'Crimson Red Kurta', description: 'Bold crimson red for special occasions', price: 2199, rating: 4.7, stock: 17, thumbnail: 'https://images.unsplash.com/photo-1701365676249-9d7ab5022dec?w=400&h=400&fit=crop' },
                    { id: 82, title: 'Ivory White Kurta', description: 'Elegant ivory white silk kurta', price: 2399, rating: 4.8, stock: 19, thumbnail: 'https://images.unsplash.com/photo-1610976221000-c0c2d7e8c6f9?w=400&h=400&fit=crop' },
                    { id: 83, title: 'Mustard Yellow Kurta', description: 'Trendy mustard yellow cotton kurta', price: 1599, rating: 4.3, stock: 27, thumbnail: 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=400&h=400&fit=crop' },
                    { id: 84, title: 'Brown Chikankari Kurta', description: 'Lucknowi chikankari work in brown', price: 2899, rating: 4.9, stock: 14, thumbnail: 'https://images.unsplash.com/photo-1701365676249-9d7ab5022dec?w=400&h=400&fit=crop' },
                    { id: 85, title: 'Sky Blue Kurta', description: 'Light sky blue casual kurta', price: 1499, rating: 4.5, stock: 28, thumbnail: 'https://images.unsplash.com/photo-1610976221000-c0c2d7e8c6f9?w=400&h=400&fit=crop' },
                    { id: 86, title: 'Plum Purple Kurta', description: 'Rich plum purple silk kurta', price: 2499, rating: 4.7, stock: 15, thumbnail: 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=400&h=400&fit=crop' },
                    { id: 87, title: 'Coral Pink Kurta', description: 'Trendy coral pink for summer', price: 1699, rating: 4.4, stock: 23, thumbnail: 'https://images.unsplash.com/photo-1701365676249-9d7ab5022dec?w=400&h=400&fit=crop' },
                    { id: 88, title: 'Forest Green Kurta', description: 'Deep forest green cotton kurta', price: 1799, rating: 4.6, stock: 22, thumbnail: 'https://images.unsplash.com/photo-1610976221000-c0c2d7e8c6f9?w=400&h=400&fit=crop' },
                    { id: 89, title: 'Steel Grey Kurta', description: 'Modern steel grey kurta', price: 1899, rating: 4.5, stock: 20, thumbnail: 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=400&h=400&fit=crop' },
                    { id: 90, title: 'Golden Beige Kurta', description: 'Premium golden beige silk blend', price: 2999, rating: 4.8, stock: 13, thumbnail: 'https://images.unsplash.com/photo-1701365676249-9d7ab5022dec?w=400&h=400&fit=crop' }
                ];
                setProducts(kurtasProducts);
            } else if (subcategory === 'Track Pants') {
                // 30 Men's Track Pants
                const trackPantsProducts = [
                    { id: 91, title: 'Black Slim Fit Joggers', description: 'Comfortable black joggers with tapered fit', price: 899, rating: 4.6, stock: 35, thumbnail: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=400&h=400&fit=crop' },
                    { id: 92, title: 'Navy Blue Track Pants', description: 'Classic navy blue athletic track pants', price: 799, rating: 4.5, stock: 40, thumbnail: 'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=400&h=400&fit=crop' },
                    { id: 93, title: 'Grey Melange Joggers', description: 'Stylish grey melange joggers for casual wear', price: 949, rating: 4.7, stock: 30, thumbnail: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=400&h=400&fit=crop' },
                    { id: 94, title: 'Olive Green Cargo Joggers', description: 'Trendy cargo style joggers in olive', price: 1199, rating: 4.8, stock: 25, thumbnail: 'https://images.unsplash.com/photo-1555689502-c4b22d76c56f?w=400&h=400&fit=crop' },
                    { id: 95, title: 'Charcoal Athletic Pants', description: 'Performance charcoal track pants', price: 1099, rating: 4.6, stock: 28, thumbnail: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=400&h=400&fit=crop' },
                    { id: 96, title: 'White Striped Track Pants', description: 'Classic white with side stripes', price: 849, rating: 4.4, stock: 32, thumbnail: 'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=400&h=400&fit=crop' },
                    { id: 97, title: 'Maroon Fleece Joggers', description: 'Warm fleece joggers in maroon', price: 1149, rating: 4.7, stock: 22, thumbnail: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=400&h=400&fit=crop' },
                    { id: 98, title: 'Sky Blue Sports Track Pants', description: 'Breathable sports pants in sky blue', price: 999, rating: 4.5, stock: 27, thumbnail: 'https://images.unsplash.com/photo-1555689502-c4b22d76c56f?w=400&h=400&fit=crop' },
                    { id: 99, title: 'Camouflage Joggers', description: 'Military camo print joggers', price: 1049, rating: 4.6, stock: 24, thumbnail: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=400&h=400&fit=crop' },
                    { id: 100, title: 'Red Tapered Track Pants', description: 'Bold red tapered fit track pants', price: 899, rating: 4.3, stock: 30, thumbnail: 'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=400&h=400&fit=crop' },
                    { id: 101, title: 'Beige Cotton Joggers', description: 'Soft cotton joggers in beige', price: 949, rating: 4.5, stock: 28, thumbnail: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=400&h=400&fit=crop' },
                    { id: 102, title: 'Electric Blue Track Pants', description: 'Vibrant electric blue athletic pants', price: 1099, rating: 4.7, stock: 20, thumbnail: 'https://images.unsplash.com/photo-1555689502-c4b22d76c56f?w=400&h=400&fit=crop' },
                    { id: 103, title: 'Khaki Slim Joggers', description: 'Versatile khaki slim fit joggers', price: 899, rating: 4.4, stock: 33, thumbnail: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=400&h=400&fit=crop' },
                    { id: 104, title: 'Purple Performance Pants', description: 'High-performance purple track pants', price: 1249, rating: 4.8, stock: 18, thumbnail: 'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=400&h=400&fit=crop' },
                    { id: 105, title: 'Forest Green Joggers', description: 'Deep forest green casual joggers', price: 949, rating: 4.5, stock: 26, thumbnail: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=400&h=400&fit=crop' },
                    { id: 106, title: 'Burgundy Fleece Track Pants', description: 'Cozy burgundy fleece pants', price: 1149, rating: 4.6, stock: 22, thumbnail: 'https://images.unsplash.com/photo-1555689502-c4b22d76c56f?w=400&h=400&fit=crop' },
                    { id: 107, title: 'Teal Blue Joggers', description: 'Trendy teal blue joggers', price: 899, rating: 4.4, stock: 29, thumbnail: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=400&h=400&fit=crop' },
                    { id: 108, title: 'Orange Athletic Track Pants', description: 'Bold orange athletic pants', price: 1049, rating: 4.5, stock: 24, thumbnail: 'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=400&h=400&fit=crop' },
                    { id: 109, title: 'Slate Grey Joggers', description: 'Modern slate grey joggers', price: 949, rating: 4.6, stock: 31, thumbnail: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=400&h=400&fit=crop' },
                    { id: 110, title: 'Neon Green Track Pants', description: 'Eye-catching neon green pants', price: 999, rating: 4.3, stock: 20, thumbnail: 'https://images.unsplash.com/photo-1555689502-c4b22d76c56f?w=400&h=400&fit=crop' },
                    { id: 111, title: 'Indigo Denim Joggers', description: 'Stylish indigo denim joggers', price: 1299, rating: 4.7, stock: 19, thumbnail: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=400&h=400&fit=crop' },
                    { id: 112, title: 'Mustard Yellow Joggers', description: 'Trendy mustard yellow joggers', price: 899, rating: 4.4, stock: 27, thumbnail: 'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=400&h=400&fit=crop' },
                    { id: 113, title: 'Coral Pink Track Pants', description: 'Soft coral pink track pants', price: 949, rating: 4.5, stock: 23, thumbnail: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=400&h=400&fit=crop' },
                    { id: 114, title: 'Steel Blue Joggers', description: 'Sophisticated steel blue joggers', price: 1049, rating: 4.6, stock: 25, thumbnail: 'https://images.unsplash.com/photo-1555689502-c4b22d76c56f?w=400&h=400&fit=crop' },
                    { id: 115, title: 'Brown Cargo Track Pants', description: 'Utility brown cargo track pants', price: 1199, rating: 4.7, stock: 21, thumbnail: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=400&h=400&fit=crop' },
                    { id: 116, title: 'Mint Green Joggers', description: 'Fresh mint green casual joggers', price: 899, rating: 4.4, stock: 28, thumbnail: 'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=400&h=400&fit=crop' },
                    { id: 117, title: 'Crimson Red Track Pants', description: 'Bold crimson red athletic pants', price: 999, rating: 4.5, stock: 26, thumbnail: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=400&h=400&fit=crop' },
                    { id: 118, title: 'Lavender Joggers', description: 'Unique lavender colored joggers', price: 949, rating: 4.3, stock: 22, thumbnail: 'https://images.unsplash.com/photo-1555689502-c4b22d76c56f?w=400&h=400&fit=crop' },
                    { id: 119, title: 'Jet Black Premium Joggers', description: 'Premium quality jet black joggers', price: 1349, rating: 4.8, stock: 17, thumbnail: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=400&h=400&fit=crop' },
                    { id: 120, title: 'Ash Grey Track Pants', description: 'Classic ash grey track pants', price: 849, rating: 4.5, stock: 34, thumbnail: 'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=400&h=400&fit=crop' }
                ];
                setProducts(trackPantsProducts);
            } else if (subcategory === 'Jeans') {
                const jeansImages = [
                    'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1475178626620-a4d074967452?w=400&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=400&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1604176354204-9268737828e4?w=400&h=400&fit=crop'
                ];
                const jeansProducts = Array.from({ length: 30 }, (_, i) => ({
                    id: 121 + i,
                    title: ['Slim Fit', 'Regular Fit', 'Skinny', 'Straight Fit', 'Relaxed Fit', 'Bootcut', 'Tapered'][i % 7] + ' ' + ['Blue', 'Black', 'Grey', 'Light Blue', 'Dark Blue'][i % 5] + ' Jeans',
                    description: 'Premium quality denim jeans with perfect fit',
                    price: 1299 + (i * 50),
                    rating: 4.3 + (i % 7) * 0.1,
                    stock: 20 + (i % 15),
                    thumbnail: jeansImages[i % jeansImages.length]
                }));
                setProducts(jeansProducts);
            } else if (subcategory === 'Trousers') {
                const trousersImages = [
                    'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1594938291221-94f18cbb5660?w=400&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1624378440070-7b4ce0a5b441?w=400&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=400&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1598522325074-042db73aa4e6?w=400&h=400&fit=crop'
                ];
                const trousersProducts = Array.from({ length: 30 }, (_, i) => ({
                    id: 151 + i,
                    title: ['Formal', 'Casual', 'Chino', 'Pleated', 'Flat Front'][i % 5] + ' ' + ['Black', 'Navy', 'Grey', 'Beige', 'Brown'][i % 5] + ' Trousers',
                    description: 'Elegant trousers for office and formal occasions',
                    price: 1499 + (i * 60),
                    rating: 4.4 + (i % 6) * 0.1,
                    stock: 18 + (i % 12),
                    thumbnail: trousersImages[i % trousersImages.length]
                }));
                setProducts(trousersProducts);
            } else if (subcategory === 'Shorts') {
                const shortsImages = [
                    'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=400&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1555689502-c4b22d76c56f?w=400&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1519235106638-30cc49b5dbc5?w=400&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1598032895397-b9372a5f4d8e?w=400&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1591195851471-24a8d5226d0e?w=400&h=400&fit=crop'
                ];
                const shortsProducts = Array.from({ length: 30 }, (_, i) => ({
                    id: 181 + i,
                    title: ['Cargo', 'Denim', 'Chino', 'Athletic', 'Casual'][i % 5] + ' ' + ['Black', 'Khaki', 'Navy', 'Grey', 'Olive'][i % 5] + ' Shorts',
                    description: 'Comfortable shorts perfect for summer',
                    price: 699 + (i * 40),
                    rating: 4.3 + (i % 7) * 0.1,
                    stock: 25 + (i % 20),
                    thumbnail: shortsImages[i % shortsImages.length]
                }));
                setProducts(shortsProducts);
            } else if (subcategory === 'Dhotis') {
                const dhotisImages = [
                    'https://images.unsplash.com/photo-1610976221000-c0c2d7e8c6f9?w=400&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=400&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1701365676249-9d7ab5022dec?w=400&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1603252109303-2751441dd157?w=400&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&h=400&fit=crop'
                ];
                const dhotisProducts = Array.from({ length: 30 }, (_, i) => ({
                    id: 211 + i,
                    title: ['Traditional', 'Silk', 'Cotton', 'Festive', 'Wedding'][i % 5] + ' ' + ['White', 'Cream', 'Golden', 'Ivory', 'Off-White'][i % 5] + ' Dhoti',
                    description: 'Traditional Indian dhoti for ceremonies',
                    price: 899 + (i * 70),
                    rating: 4.5 + (i % 5) * 0.1,
                    stock: 15 + (i % 10),
                    thumbnail: dhotisImages[i % dhotisImages.length]
                }));
                setProducts(dhotisProducts);
            } else if (subcategory === 'Lungis') {
                const lungisImages = [
                    'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=400&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1603252109360-909baaf261c7?w=400&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=400&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1627225924765-552d49cf47ad?w=400&h=400&fit=crop'
                ];
                const lungisProducts = Array.from({ length: 30 }, (_, i) => ({
                    id: 241 + i,
                    title: ['Cotton', 'Checked', 'Striped', 'Printed', 'Solid'][i % 5] + ' ' + ['Blue', 'Green', 'Red', 'Yellow', 'Multi'][i % 5] + ' Lungi',
                    description: 'Comfortable traditional lungi for daily wear',
                    price: 399 + (i * 30),
                    rating: 4.2 + (i % 8) * 0.1,
                    stock: 30 + (i % 15),
                    thumbnail: lungisImages[i % lungisImages.length]
                }));
                setProducts(lungisProducts);
            } else if (subcategory === 'Hero Jackets') {
                const jacketsImages = [
                    'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1520975954732-35dd22299614?w=400&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=400&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1578932750294-f5075e85f44a?w=400&h=400&fit=crop'
                ];
                const jacketsProducts = Array.from({ length: 30 }, (_, i) => ({
                    id: 271 + i,
                    title: ['Leather', 'Denim', 'Bomber', 'Windcheater', 'Puffer'][i % 5] + ' ' + ['Black', 'Brown', 'Navy', 'Grey', 'Olive'][i % 5] + ' Jacket',
                    description: 'Stylish jacket for all seasons',
                    price: 2499 + (i * 100),
                    rating: 4.6 + (i % 4) * 0.1,
                    stock: 12 + (i % 8),
                    thumbnail: jacketsImages[i % jacketsImages.length]
                }));
                setProducts(jacketsProducts);
            } else if (subcategory === 'Sarees') {
                const sareesImages = [
                    'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=400&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=400&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1583391733981-5afc8f8e5f8e?w=400&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&h=400&fit=crop'
                ];
                const sareesProducts = Array.from({ length: 30 }, (_, i) => ({
                    id: 301 + i,
                    title: ['Silk', 'Cotton', 'Georgette', 'Chiffon', 'Banarasi'][i % 5] + ' ' + ['Red', 'Blue', 'Green', 'Pink', 'Golden'][i % 5] + ' Saree',
                    description: 'Elegant traditional saree for special occasions',
                    price: 1999 + (i * 80),
                    rating: 4.5 + (i % 5) * 0.1,
                    stock: 15 + (i % 12),
                    thumbnail: sareesImages[i % sareesImages.length]
                }));
                setProducts(sareesProducts);
            } else if (subcategory === 'Kurtis') {
                const kurtisImages = [
                    'https://images.unsplash.com/photo-1583391733981-5afc8f8e5f8e?w=400&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=400&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1564257577-d18f0c4c8f0e?w=400&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=400&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&h=400&fit=crop'
                ];
                const kurtisProducts = Array.from({ length: 30 }, (_, i) => ({
                    id: 331 + i,
                    title: ['Printed', 'Embroidered', 'Solid', 'A-Line', 'Straight'][i % 5] + ' ' + ['White', 'Black', 'Pink', 'Blue', 'Yellow'][i % 5] + ' Kurti',
                    description: 'Stylish kurti for everyday wear',
                    price: 899 + (i * 50),
                    rating: 4.4 + (i % 6) * 0.1,
                    stock: 20 + (i % 15),
                    thumbnail: kurtisImages[i % kurtisImages.length]
                }));
                setProducts(kurtisProducts);
            } else if (subcategory === 'Lehenga') {
                const lehengaImages = [
                    'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=400&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=400&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1583391733981-5afc8f8e5f8e?w=400&h=400&fit=crop'
                ];
                const lehengaProducts = Array.from({ length: 30 }, (_, i) => ({
                    id: 361 + i,
                    title: ['Bridal', 'Party', 'Embroidered', 'Designer', 'Festive'][i % 5] + ' ' + ['Red', 'Pink', 'Blue', 'Green', 'Golden'][i % 5] + ' Lehenga',
                    description: 'Beautiful lehenga for weddings and celebrations',
                    price: 4999 + (i * 150),
                    rating: 4.7 + (i % 3) * 0.1,
                    stock: 8 + (i % 8),
                    thumbnail: lehengaImages[i % lehengaImages.length]
                }));
                setProducts(lehengaProducts);
            } else if (subcategory === 'Salwar Suits') {
                const salwarImages = [
                    'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=400&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=400&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1583391733981-5afc8f8e5f8e?w=400&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1564257577-d18f0c4c8f0e?w=400&h=400&fit=crop'
                ];
                const salwarProducts = Array.from({ length: 30 }, (_, i) => ({
                    id: 391 + i,
                    title: ['Anarkali', 'Churidar', 'Palazzo', 'Straight Cut', 'Patiala'][i % 5] + ' ' + ['White', 'Pink', 'Blue', 'Green', 'Yellow'][i % 5] + ' Salwar Suit',
                    description: 'Comfortable salwar suit for all occasions',
                    price: 1599 + (i * 70),
                    rating: 4.5 + (i % 5) * 0.1,
                    stock: 18 + (i % 10),
                    thumbnail: salwarImages[i % salwarImages.length]
                }));
                setProducts(salwarProducts);
            } else if (subcategory === 'Dresses') {
                const dressesImages = [
                    'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=400&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=400&h=400&fit=crop'
                ];
                const dressesProducts = Array.from({ length: 30 }, (_, i) => ({
                    id: 421 + i,
                    title: ['Maxi', 'Midi', 'Mini', 'A-Line', 'Bodycon'][i % 5] + ' ' + ['Black', 'Red', 'Blue', 'White', 'Floral'][i % 5] + ' Dress',
                    description: 'Trendy dress for parties and casual outings',
                    price: 1299 + (i * 60),
                    rating: 4.4 + (i % 6) * 0.1,
                    stock: 22 + (i % 13),
                    thumbnail: dressesImages[i % dressesImages.length]
                }));
                setProducts(dressesProducts);
            } else if (subcategory === 'Tops') {
                const topsImages = [
                    'https://images.unsplash.com/photo-1564257577-d18f0c4c8f0e?w=400&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=400&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1618932260643-eee4a2f652a6?w=400&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=400&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=400&h=400&fit=crop'
                ];
                const topsProducts = Array.from({ length: 30 }, (_, i) => ({
                    id: 451 + i,
                    title: ['Crop', 'Tank', 'Blouse', 'Tunic', 'Peplum'][i % 5] + ' ' + ['White', 'Black', 'Pink', 'Blue', 'Striped'][i % 5] + ' Top',
                    description: 'Fashionable top for casual and formal wear',
                    price: 599 + (i * 40),
                    rating: 4.3 + (i % 7) * 0.1,
                    stock: 25 + (i % 18),
                    thumbnail: topsImages[i % topsImages.length]
                }));
                setProducts(topsProducts);
            } else if (subcategory === 'Jeans' && searchParams.get('category') === 'Women') {
                const womenJeansImages = [
                    'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1582552938357-32b906d8081f?w=400&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?w=400&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1475178626620-a4d074967452?w=400&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop'
                ];
                const womenJeansProducts = Array.from({ length: 30 }, (_, i) => ({
                    id: 481 + i,
                    title: ['Skinny', 'Boyfriend', 'High Waist', 'Bootcut', 'Flare'][i % 5] + ' ' + ['Blue', 'Black', 'Light Blue', 'Grey', 'White'][i % 5] + ' Jeans',
                    description: 'Stylish denim jeans for women',
                    price: 1199 + (i * 55),
                    rating: 4.5 + (i % 5) * 0.1,
                    stock: 20 + (i % 14),
                    thumbnail: womenJeansImages[i % womenJeansImages.length]
                }));
                setProducts(womenJeansProducts);
            } else if (subcategory === 'Skirts') {
                const skirtsImages = [
                    'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=400&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=400&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=400&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=400&h=400&fit=crop'
                ];
                const skirtsProducts = Array.from({ length: 30 }, (_, i) => ({
                    id: 511 + i,
                    title: ['Pleated', 'A-Line', 'Pencil', 'Maxi', 'Mini'][i % 5] + ' ' + ['Black', 'Red', 'Blue', 'White', 'Floral'][i % 5] + ' Skirt',
                    description: 'Elegant skirt for office and casual wear',
                    price: 799 + (i * 45),
                    rating: 4.4 + (i % 6) * 0.1,
                    stock: 18 + (i % 16),
                    thumbnail: skirtsImages[i % skirtsImages.length]
                }));
                setProducts(skirtsProducts);
            } else if (subcategory === 'Boys T-Shirts') {
                const boysTshirtsImages = [
                    'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=400&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=400&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=400&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=400&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1519689373023-dd07c7988603?w=400&h=400&fit=crop'
                ];
                const boysTshirtsProducts = Array.from({ length: 30 }, (_, i) => ({
                    id: 541 + i,
                    title: ['Graphic', 'Striped', 'Solid', 'Printed', 'Sports'][i % 5] + ' ' + ['Blue', 'Red', 'Green', 'Yellow', 'Black'][i % 5] + ' Boys T-Shirt',
                    description: 'Comfortable t-shirt for active boys',
                    price: 399 + (i * 30),
                    rating: 4.4 + (i % 6) * 0.1,
                    stock: 30 + (i % 20),
                    thumbnail: boysTshirtsImages[i % boysTshirtsImages.length]
                }));
                setProducts(boysTshirtsProducts);
            } else if (subcategory === 'Girls Dresses') {
                const girlsDressesImages = [
                    'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=400&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=400&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1612423284934-2850a4ea6b0f?w=400&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=400&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=400&h=400&fit=crop'
                ];
                const girlsDressesProducts = Array.from({ length: 30 }, (_, i) => ({
                    id: 571 + i,
                    title: ['Floral', 'Princess', 'Party', 'Casual', 'Frilly'][i % 5] + ' ' + ['Pink', 'Purple', 'Blue', 'White', 'Yellow'][i % 5] + ' Girls Dress',
                    description: 'Beautiful dress for little princesses',
                    price: 699 + (i * 40),
                    rating: 4.6 + (i % 4) * 0.1,
                    stock: 25 + (i % 15),
                    thumbnail: girlsDressesImages[i % girlsDressesImages.length]
                }));
                setProducts(girlsDressesProducts);
            } else if (subcategory === 'Boys Shirts') {
                const boysShirtsImages = [
                    'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=400&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=400&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=400&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=400&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1519689373023-dd07c7988603?w=400&h=400&fit=crop'
                ];
                const boysShirtsProducts = Array.from({ length: 30 }, (_, i) => ({
                    id: 601 + i,
                    title: ['Formal', 'Casual', 'Checkered', 'Striped', 'Denim'][i % 5] + ' ' + ['White', 'Blue', 'Black', 'Grey', 'Red'][i % 5] + ' Boys Shirt',
                    description: 'Smart shirt for boys',
                    price: 599 + (i * 35),
                    rating: 4.5 + (i % 5) * 0.1,
                    stock: 28 + (i % 12),
                    thumbnail: boysShirtsImages[i % boysShirtsImages.length]
                }));
                setProducts(boysShirtsProducts);
            } else if (subcategory === 'Girls Tops') {
                const girlsTopsImages = [
                    'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=400&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=400&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1612423284934-2850a4ea6b0f?w=400&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1564257577-d18f0c4c8f0e?w=400&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=400&h=400&fit=crop'
                ];
                const girlsTopsProducts = Array.from({ length: 30 }, (_, i) => ({
                    id: 631 + i,
                    title: ['Cute', 'Printed', 'Solid', 'Ruffled', 'Trendy'][i % 5] + ' ' + ['Pink', 'Purple', 'White', 'Blue', 'Yellow'][i % 5] + ' Girls Top',
                    description: 'Fashionable top for girls',
                    price: 449 + (i * 30),
                    rating: 4.4 + (i % 6) * 0.1,
                    stock: 32 + (i % 18),
                    thumbnail: girlsTopsImages[i % girlsTopsImages.length]
                }));
                setProducts(girlsTopsProducts);
            } else if (subcategory === 'Shorts' && searchParams.get('category') === 'Kids') {
                const kidsShortsImages = [
                    'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=400&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1555689502-c4b22d76c56f?w=400&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1519235106638-30cc49b5dbc5?w=400&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1598032895397-b9372a5f4d8e?w=400&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1591195851471-24a8d5226d0e?w=400&h=400&fit=crop'
                ];
                const kidsShortsProducts = Array.from({ length: 30 }, (_, i) => ({
                    id: 661 + i,
                    title: ['Denim', 'Cotton', 'Cargo', 'Athletic', 'Casual'][i % 5] + ' ' + ['Blue', 'Black', 'Khaki', 'Grey', 'Navy'][i % 5] + ' Kids Shorts',
                    description: 'Comfortable shorts for kids',
                    price: 399 + (i * 25),
                    rating: 4.3 + (i % 7) * 0.1,
                    stock: 35 + (i % 20),
                    thumbnail: kidsShortsImages[i % kidsShortsImages.length]
                }));
                setProducts(kidsShortsProducts);
            } else if (subcategory === 'Jeans' && searchParams.get('category') === 'Kids') {
                const kidsJeansImages = [
                    'https://images.unsplash.com/photo-1582418702059-97ebafb35d09?w=400&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1475178626620-a4d074967452?w=400&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1604176354204-9268737828e4?w=400&h=400&fit=crop'
                ];
                const kidsJeansProducts = Array.from({ length: 30 }, (_, i) => ({
                    id: 691 + i,
                    title: ['Slim Fit', 'Regular', 'Skinny', 'Relaxed', 'Straight'][i % 5] + ' ' + ['Blue', 'Black', 'Light Blue', 'Dark Blue', 'Grey'][i % 5] + ' Kids Jeans',
                    description: 'Durable denim jeans for kids',
                    price: 799 + (i * 40),
                    rating: 4.5 + (i % 5) * 0.1,
                    stock: 25 + (i % 15),
                    thumbnail: kidsJeansImages[i % kidsJeansImages.length]
                }));
                setProducts(kidsJeansProducts);
            } else if (subcategory === 'Watches') {
                const watchesImages = [
                    'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=400&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=400&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?w=400&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?w=400&h=400&fit=crop'
                ];
                const watchesProducts = Array.from({ length: 30 }, (_, i) => ({
                    id: 721 + i,
                    title: ['Analog', 'Digital', 'Smart', 'Chronograph', 'Sports'][i % 5] + ' ' + ['Black', 'Silver', 'Gold', 'Blue', 'Rose Gold'][i % 5] + ' Watch',
                    description: 'Stylish watch for every occasion',
                    price: 1999 + (i * 100),
                    rating: 4.5 + (i % 5) * 0.1,
                    stock: 15 + (i % 10),
                    thumbnail: watchesImages[i % watchesImages.length]
                }));
                setProducts(watchesProducts);
            } else if (subcategory === 'Bags') {
                const bagsImages = [
                    'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1491637639811-60e2756cc1c7?w=400&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=400&h=400&fit=crop'
                ];
                const bagsProducts = Array.from({ length: 30 }, (_, i) => ({
                    id: 751 + i,
                    title: ['Backpack', 'Messenger', 'Tote', 'Laptop', 'Travel'][i % 5] + ' ' + ['Black', 'Brown', 'Blue', 'Grey', 'Tan'][i % 5] + ' Bag',
                    description: 'Durable and stylish bag for daily use',
                    price: 1499 + (i * 80),
                    rating: 4.4 + (i % 6) * 0.1,
                    stock: 20 + (i % 12),
                    thumbnail: bagsImages[i % bagsImages.length]
                }));
                setProducts(bagsProducts);
            } else if (subcategory === 'Belts') {
                const beltsImages = [
                    'https://images.unsplash.com/photo-1624222247344-550fb60583bb?w=400&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1624222247344-550fb60583bb?w=400&h=400&fit=crop'
                ];
                const beltsProducts = Array.from({ length: 30 }, (_, i) => ({
                    id: 781 + i,
                    title: ['Leather', 'Canvas', 'Formal', 'Casual', 'Reversible'][i % 5] + ' ' + ['Black', 'Brown', 'Tan', 'Blue', 'Grey'][i % 5] + ' Belt',
                    description: 'Premium quality belt for men',
                    price: 599 + (i * 40),
                    rating: 4.3 + (i % 7) * 0.1,
                    stock: 25 + (i % 15),
                    thumbnail: beltsImages[i % beltsImages.length]
                }));
                setProducts(beltsProducts);
            } else if (subcategory === 'Wallets') {
                const walletsImages = [
                    'https://images.unsplash.com/photo-1627123424574-724758594e93?w=400&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1591561954557-26941169b49e?w=400&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1608528062107-d8b2f2c8e8e7?w=400&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1627123424574-724758594e93?w=400&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1591561954557-26941169b49e?w=400&h=400&fit=crop'
                ];
                const walletsProducts = Array.from({ length: 30 }, (_, i) => ({
                    id: 811 + i,
                    title: ['Leather', 'Bi-fold', 'Tri-fold', 'Card Holder', 'Money Clip'][i % 5] + ' ' + ['Black', 'Brown', 'Tan', 'Navy', 'Grey'][i % 5] + ' Wallet',
                    description: 'Sleek wallet with multiple compartments',
                    price: 799 + (i * 50),
                    rating: 4.5 + (i % 5) * 0.1,
                    stock: 22 + (i % 13),
                    thumbnail: walletsImages[i % walletsImages.length]
                }));
                setProducts(walletsProducts);
            } else if (subcategory === 'Sunglasses') {
                const sunglassesImages = [
                    'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1508296695146-257a814070b4?w=400&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=400&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1577803645773-f96470509666?w=400&h=400&fit=crop'
                ];
                const sunglassesProducts = Array.from({ length: 30 }, (_, i) => ({
                    id: 841 + i,
                    title: ['Aviator', 'Wayfarer', 'Round', 'Cat Eye', 'Sports'][i % 5] + ' ' + ['Black', 'Brown', 'Blue', 'Gold', 'Silver'][i % 5] + ' Sunglasses',
                    description: 'UV protection sunglasses with style',
                    price: 999 + (i * 60),
                    rating: 4.4 + (i % 6) * 0.1,
                    stock: 18 + (i % 14),
                    thumbnail: sunglassesImages[i % sunglassesImages.length]
                }));
                setProducts(sunglassesProducts);
            } else if (subcategory === 'Jewelry') {
                const jewelryImages = [
                    'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=400&h=400&fit=crop'
                ];
                const jewelryProducts = Array.from({ length: 30 }, (_, i) => ({
                    id: 871 + i,
                    title: ['Necklace', 'Bracelet', 'Earrings', 'Ring', 'Pendant'][i % 5] + ' ' + ['Gold', 'Silver', 'Diamond', 'Pearl', 'Rose Gold'][i % 5] + ' Jewelry',
                    description: 'Elegant jewelry for special occasions',
                    price: 2999 + (i * 120),
                    rating: 4.6 + (i % 4) * 0.1,
                    stock: 12 + (i % 8),
                    thumbnail: jewelryImages[i % jewelryImages.length]
                }));
                setProducts(jewelryProducts);
            } else if (subcategory === 'Caps') {
                const capsImages = [
                    'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1575428652377-a2d80e2277fc?w=400&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1521369909029-2afed882baee?w=400&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1575428652377-a2d80e2277fc?w=400&h=400&fit=crop'
                ];
                const capsProducts = Array.from({ length: 30 }, (_, i) => ({
                    id: 901 + i,
                    title: ['Baseball', 'Snapback', 'Trucker', 'Beanie', 'Sports'][i % 5] + ' ' + ['Black', 'Navy', 'Red', 'White', 'Grey'][i % 5] + ' Cap',
                    description: 'Trendy cap for casual wear',
                    price: 499 + (i * 30),
                    rating: 4.3 + (i % 7) * 0.1,
                    stock: 30 + (i % 18),
                    thumbnail: capsImages[i % capsImages.length]
                }));
                setProducts(capsProducts);
            } else if (subcategory === 'Scarves') {
                const scarvesImages = [
                    'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=400&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=400&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=400&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=400&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=400&h=400&fit=crop'
                ];
                const scarvesProducts = Array.from({ length: 30 }, (_, i) => ({
                    id: 931 + i,
                    title: ['Silk', 'Wool', 'Cotton', 'Pashmina', 'Printed'][i % 5] + ' ' + ['Red', 'Blue', 'Black', 'White', 'Multicolor'][i % 5] + ' Scarf',
                    description: 'Elegant scarf for all seasons',
                    price: 699 + (i * 45),
                    rating: 4.4 + (i % 6) * 0.1,
                    stock: 20 + (i % 16),
                    thumbnail: scarvesImages[i % scarvesImages.length]
                }));
                setProducts(scarvesProducts);
            } else if (subcategory === 'Sneakers') {
                const sneakersImages = [
                    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=400&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=400&h=400&fit=crop'
                ];
                const sneakersProducts = Array.from({ length: 30 }, (_, i) => ({
                    id: 961 + i,
                    title: ['Classic', 'High-Top', 'Low-Top', 'Running', 'Casual'][i % 5] + ' ' + ['White', 'Black', 'Red', 'Blue', 'Grey'][i % 5] + ' Sneakers',
                    description: 'Comfortable sneakers for everyday wear',
                    price: 1999 + (i * 90),
                    rating: 4.5 + (i % 5) * 0.1,
                    stock: 20 + (i % 12),
                    thumbnail: sneakersImages[i % sneakersImages.length]
                }));
                setProducts(sneakersProducts);
            } else if (subcategory === 'Formal Shoes') {
                const formalShoesImages = [
                    'https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=400&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=400&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1582897085656-c636d006a246?w=400&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=400&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=400&h=400&fit=crop'
                ];
                const formalShoesProducts = Array.from({ length: 30 }, (_, i) => ({
                    id: 991 + i,
                    title: ['Oxford', 'Derby', 'Loafer', 'Brogue', 'Monk Strap'][i % 5] + ' ' + ['Black', 'Brown', 'Tan', 'Burgundy', 'Navy'][i % 5] + ' Formal Shoes',
                    description: 'Elegant formal shoes for office and events',
                    price: 2499 + (i * 100),
                    rating: 4.6 + (i % 4) * 0.1,
                    stock: 15 + (i % 10),
                    thumbnail: formalShoesImages[i % formalShoesImages.length]
                }));
                setProducts(formalShoesProducts);
            } else if (subcategory === 'Sandals') {
                const sandalsImages = [
                    'https://images.unsplash.com/photo-1603487742131-4160ec999306?w=400&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1560343090-f0409e92791a?w=400&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1603487742131-4160ec999306?w=400&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1560343090-f0409e92791a?w=400&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1603487742131-4160ec999306?w=400&h=400&fit=crop'
                ];
                const sandalsProducts = Array.from({ length: 30 }, (_, i) => ({
                    id: 1021 + i,
                    title: ['Leather', 'Casual', 'Sports', 'Flip-Flop', 'Slide'][i % 5] + ' ' + ['Brown', 'Black', 'Tan', 'Blue', 'Grey'][i % 5] + ' Sandals',
                    description: 'Comfortable sandals for summer',
                    price: 799 + (i * 50),
                    rating: 4.3 + (i % 7) * 0.1,
                    stock: 25 + (i % 15),
                    thumbnail: sandalsImages[i % sandalsImages.length]
                }));
                setProducts(sandalsProducts);
            } else if (subcategory === 'Boots') {
                const bootsImages = [
                    'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=400&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1542840410-3092f99611a3?w=400&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=400&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=400&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1542840410-3092f99611a3?w=400&h=400&fit=crop'
                ];
                const bootsProducts = Array.from({ length: 30 }, (_, i) => ({
                    id: 1081 + i,
                    title: ['Chelsea', 'Combat', 'Hiking', 'Ankle', 'Work'][i % 5] + ' ' + ['Black', 'Brown', 'Tan', 'Grey', 'Olive'][i % 5] + ' Boots',
                    description: 'Durable boots for all terrains',
                    price: 2999 + (i * 120),
                    rating: 4.6 + (i % 4) * 0.1,
                    stock: 12 + (i % 8),
                    thumbnail: bootsImages[i % bootsImages.length]
                }));
                setProducts(bootsProducts);
            } else if (subcategory === 'Sports Shoes') {
                const sportsShoesImages = [
                    'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=400&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop'
                ];
                const sportsShoesProducts = Array.from({ length: 30 }, (_, i) => ({
                    id: 1111 + i,
                    title: ['Running', 'Training', 'Basketball', 'Football', 'Tennis'][i % 5] + ' ' + ['Black', 'White', 'Blue', 'Red', 'Green'][i % 5] + ' Sports Shoes',
                    description: 'High-performance sports shoes',
                    price: 2499 + (i * 110),
                    rating: 4.7 + (i % 3) * 0.1,
                    stock: 18 + (i % 11),
                    thumbnail: sportsShoesImages[i % sportsShoesImages.length]
                }));
                setProducts(sportsShoesProducts);
            } else if (subcategory === 'Latest Fashion') {
                const latestFashionImages = [
                    'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=400&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&h=400&fit=crop'
                ];
                const latestFashionProducts = Array.from({ length: 30 }, (_, i) => ({
                    id: 1141 + i,
                    title: ['Designer', 'Premium', 'Luxury', 'Trendy', 'Chic'][i % 5] + ' ' + ['Dress', 'Top', 'Jacket', 'Pants', 'Skirt'][i % 5] + ' - Latest Fashion',
                    description: 'Latest fashion trends for 2026',
                    price: 2499 + (i * 100),
                    rating: 4.6 + (i % 4) * 0.1,
                    stock: 15 + (i % 10),
                    thumbnail: latestFashionImages[i % latestFashionImages.length]
                }));
                setProducts(latestFashionProducts);
            } else if (subcategory === 'Trending Now') {
                const trendingNowImages = [
                    'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1558769132-cb1aea3c8565?w=400&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=400&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=400&fit=crop'
                ];
                const trendingNowProducts = Array.from({ length: 30 }, (_, i) => ({
                    id: 1171 + i,
                    title: ['Viral', 'Popular', 'Hot', 'Bestseller', 'Must-Have'][i % 5] + ' ' + ['Outfit', 'Ensemble', 'Look', 'Style', 'Wear'][i % 5] + ' - Trending',
                    description: 'Most trending items right now',
                    price: 1999 + (i * 90),
                    rating: 4.7 + (i % 3) * 0.1,
                    stock: 20 + (i % 12),
                    thumbnail: trendingNowImages[i % trendingNowImages.length]
                }));
                setProducts(trendingNowProducts);
            } else if (subcategory === 'New Collection') {
                const newCollectionImages = [
                    'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=400&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1558769132-cb1aea3c8565?w=400&h=400&fit=crop'
                ];
                const newCollectionProducts = Array.from({ length: 30 }, (_, i) => ({
                    id: 1201 + i,
                    title: ['Spring', 'Summer', 'Winter', 'Fall', 'Seasonal'][i % 5] + ' ' + ['Collection', 'Range', 'Series', 'Line', 'Edition'][i % 5] + ' 2026',
                    description: 'Brand new collection just arrived',
                    price: 2199 + (i * 95),
                    rating: 4.5 + (i % 5) * 0.1,
                    stock: 18 + (i % 11),
                    thumbnail: newCollectionImages[i % newCollectionImages.length]
                }));
                setProducts(newCollectionProducts);
            } else if (subcategory === 'Fresh Styles') {
                const freshStylesImages = [
                    'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=400&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&h=400&fit=crop'
                ];
                const freshStylesProducts = Array.from({ length: 30 }, (_, i) => ({
                    id: 1231 + i,
                    title: ['Modern', 'Contemporary', 'Fresh', 'New', 'Updated'][i % 5] + ' ' + ['Style', 'Fashion', 'Trend', 'Look', 'Vibe'][i % 5] + ' Item',
                    description: 'Fresh new styles for modern wardrobe',
                    price: 1799 + (i * 85),
                    rating: 4.4 + (i % 6) * 0.1,
                    stock: 22 + (i % 13),
                    thumbnail: freshStylesImages[i % freshStylesImages.length]
                }));
                setProducts(freshStylesProducts);
            } else if (subcategory === 'Just Launched') {
                const justLaunchedImages = [
                    'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=400&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=400&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=400&h=400&fit=crop'
                ];
                const justLaunchedProducts = Array.from({ length: 30 }, (_, i) => ({
                    id: 1261 + i,
                    title: ['Brand New', 'Just In', 'Newly Launched', 'Fresh Arrival', 'Latest Drop'][i % 5] + ' ' + ['Piece', 'Item', 'Product', 'Wear', 'Garment'][i % 5],
                    description: 'Just launched - be the first to own',
                    price: 2299 + (i * 105),
                    rating: 4.6 + (i % 4) * 0.1,
                    stock: 12 + (i % 8),
                    thumbnail: justLaunchedImages[i % justLaunchedImages.length]
                }));
                setProducts(justLaunchedProducts);
            } else if (subcategory === 'Season Special') {
                const seasonSpecialImages = [
                    'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1558769132-cb1aea3c8565?w=400&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=400&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&h=400&fit=crop'
                ];
                const seasonSpecialProducts = Array.from({ length: 30 }, (_, i) => ({
                    id: 1291 + i,
                    title: ['Limited', 'Exclusive', 'Special', 'Festive', 'Holiday'][i % 5] + ' ' + ['Edition', 'Collection', 'Offer', 'Range', 'Selection'][i % 5] + ' Item',
                    description: 'Special seasonal collection',
                    price: 2599 + (i * 110),
                    rating: 4.7 + (i % 3) * 0.1,
                    stock: 10 + (i % 7),
                    thumbnail: seasonSpecialImages[i % seasonSpecialImages.length]
                }));
                setProducts(seasonSpecialProducts);
            } else {
                setProducts([]);
            }
            setLoading(false);
        }, 500);
    }, [subcategory]);



    // Apply Filters and Sorting
    const getFilteredAndSortedProducts = () => {
        let filtered = [...products];

        // Apply price filter
        filtered = filtered.filter(p =>
            p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
        );

        // Apply rating filter
        if (filters.minRating > 0) {
            filtered = filtered.filter(p => p.rating >= filters.minRating);
        }

        // Apply stock filter
        if (filters.inStock) {
            filtered = filtered.filter(p => p.stock > 0);
        }

        // Apply sorting
        switch (sortBy) {
            case 'price-low':
                filtered.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                filtered.sort((a, b) => b.price - a.price);
                break;
            case 'rating':
                filtered.sort((a, b) => b.rating - a.rating);
                break;
            case 'newest':
                filtered.sort((a, b) => b.id - a.id);
                break;
            default:
                // Keep original order
                break;
        }

        return filtered;
    };

    const filteredProducts = getFilteredAndSortedProducts();

    // Pagination
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Handle Add to Cart
    const handleAddToCart = (product) => {
        addItem({
            id: product.id,
            title: product.title,
            price: product.price,
            img: product.thumbnail,
            qty: 1
        });
    };


    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading products...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">{subcategory || 'Products'}</h1>
                    <p className="mt-2 text-gray-600">{filteredProducts.length} products available</p>
                </div>

                {/* Interactive Filter Bar */}
                <div className="mb-6 bg-white rounded-lg shadow-md p-4">
                    <div className="flex flex-wrap items-center gap-3">
                        {/* Sort Dropdown - Moved to Start */}
                        <div className="relative">
                            <button
                                onClick={() => setShowFilters(showFilters === 'sort' ? false : 'sort')}
                                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors flex items-center gap-2"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
                                </svg>
                                Sort: {sortBy === 'default' ? 'Default' : sortBy.replace('-', ' ')}
                                <svg className={`w-4 h-4 transition-transform ${showFilters === 'sort' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            {showFilters === 'sort' && (
                                <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 p-3 z-50">
                                    <h3 className="font-semibold text-gray-900 mb-3">Sort By</h3>
                                    <div className="space-y-2">
                                        {[
                                            { value: 'default', label: 'Default' },
                                            { value: 'price-low', label: 'Price: Low to High' },
                                            { value: 'price-high', label: 'Price: High to Low' },
                                            { value: 'rating', label: 'Highest Rated' },
                                            { value: 'newest', label: 'Newest First' }
                                        ].map(option => (
                                            <button
                                                key={option.value}
                                                onClick={() => {
                                                    setSortBy(option.value);
                                                    setCurrentPage(1);
                                                    setShowFilters(false);
                                                }}
                                                className={`w-full text-left px-3 py-2 rounded-md transition-colors ${sortBy === option.value
                                                        ? 'bg-blue-600 text-white font-semibold'
                                                        : 'hover:bg-gray-100'
                                                    }`}
                                            >
                                                {option.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Price Range Dropdown */}
                        <div className="relative">
                            <button
                                onClick={() => setShowFilters(showFilters === 'price' ? false : 'price')}
                                className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${filters.priceRange[1] < 10000
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                                    }`}
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Price: ₹{filters.priceRange[0]}-₹{filters.priceRange[1]}
                                <svg className={`w-4 h-4 transition-transform ${showFilters === 'price' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            {showFilters === 'price' && (
                                <div className="absolute top-full left-0 mt-2 w-72 bg-white rounded-lg shadow-xl border border-gray-200 p-4 z-50">
                                    <h3 className="font-semibold text-gray-900 mb-3">Price Range</h3>
                                    <input
                                        type="range"
                                        min="0"
                                        max="10000"
                                        step="100"
                                        value={filters.priceRange[1]}
                                        onChange={(e) => {
                                            setFilters({
                                                ...filters,
                                                priceRange: [0, parseInt(e.target.value)]
                                            });
                                            setCurrentPage(1);
                                        }}
                                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                                    />
                                    <div className="flex justify-between text-sm text-gray-600 mt-2">
                                        <span>₹0</span>
                                        <span className="font-semibold text-blue-600">₹{filters.priceRange[1]}</span>
                                    </div>
                                    {/* Quick Price Buttons */}
                                    <div className="grid grid-cols-2 gap-2 mt-3">
                                        {[
                                            { label: 'Under ₹500', value: 500 },
                                            { label: '₹500-₹1000', value: 1000 },
                                            { label: '₹1000-₹2000', value: 2000 },
                                            { label: 'All Prices', value: 10000 }
                                        ].map(preset => (
                                            <button
                                                key={preset.label}
                                                onClick={() => {
                                                    setFilters({ ...filters, priceRange: [0, preset.value] });
                                                    setCurrentPage(1);
                                                    setShowFilters(false);
                                                }}
                                                className="px-3 py-1.5 text-xs bg-gray-100 hover:bg-blue-100 hover:text-blue-600 rounded-md transition-colors"
                                            >
                                                {preset.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Rating Dropdown */}
                        <div className="relative">
                            <button
                                onClick={() => setShowFilters(showFilters === 'rating' ? false : 'rating')}
                                className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${filters.minRating > 0
                                        ? 'bg-yellow-500 text-white'
                                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                                    }`}
                            >
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                                {filters.minRating > 0 ? `${filters.minRating}+ ⭐` : 'All Ratings'}
                                <svg className={`w-4 h-4 transition-transform ${showFilters === 'rating' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            {showFilters === 'rating' && (
                                <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 p-3 z-50">
                                    <h3 className="font-semibold text-gray-900 mb-3">Minimum Rating</h3>
                                    <div className="space-y-2">
                                        {[
                                            { value: 4, label: '4+ ⭐' },
                                            { value: 3, label: '3+ ⭐' },
                                            { value: 2, label: '2+ ⭐' },
                                            { value: 1, label: '1+ ⭐' },
                                            { value: 0, label: 'All Ratings' }
                                        ].map(rating => (
                                            <button
                                                key={rating.value}
                                                onClick={() => {
                                                    setFilters({ ...filters, minRating: rating.value });
                                                    setCurrentPage(1);
                                                    setShowFilters(false);
                                                }}
                                                className={`w-full text-left px-3 py-2 rounded-md transition-colors ${filters.minRating === rating.value
                                                        ? 'bg-yellow-500 text-white font-semibold'
                                                        : 'hover:bg-gray-100'
                                                    }`}
                                            >
                                                {rating.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Stock Filter Toggle */}
                        <button
                            onClick={() => {
                                setFilters({ ...filters, inStock: !filters.inStock });
                                setCurrentPage(1);
                            }}
                            className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${filters.inStock
                                    ? 'bg-green-600 text-white'
                                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                                }`}
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            In Stock Only
                        </button>

                        {/* Clear All Filters Button - Moved to End */}
                        <button
                            onClick={() => {
                                setFilters({
                                    priceRange: [0, 10000],
                                    minRating: 0,
                                    inStock: false
                                });
                                setSortBy('default');
                                setCurrentPage(1);
                            }}
                            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors flex items-center gap-2 ml-auto"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            Clear All
                        </button>
                    </div>

                    {/* Active Filters Display */}
                    {(filters.priceRange[1] < 10000 || filters.minRating > 0 || filters.inStock || sortBy !== 'default') && (
                        <div className="mt-3 pt-3 border-t border-gray-200 flex flex-wrap gap-2">
                            <span className="text-sm text-gray-600 font-medium">Active Filters:</span>
                            {filters.priceRange[1] < 10000 && (
                                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                                    Price: ₹0-₹{filters.priceRange[1]}
                                </span>
                            )}
                            {filters.minRating > 0 && (
                                <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm">
                                    {filters.minRating}+ ⭐
                                </span>
                            )}
                            {filters.inStock && (
                                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                                    In Stock
                                </span>
                            )}
                            {sortBy !== 'default' && (
                                <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                                    Sorted: {sortBy.replace('-', ' ')}
                                </span>
                            )}
                        </div>
                    )}
                </div>

                {/* Main Content */}
                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Products Grid */}
                    <div className="flex-1">
                        {currentProducts.length === 0 ? (
                            <div className="text-center py-12 bg-white rounded-lg shadow-md">
                                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                                </svg>
                                <h3 className="mt-2 text-sm font-medium text-gray-900">No products found</h3>
                                <p className="mt-1 text-sm text-gray-500">Try adjusting your filters</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                {currentProducts.map((product) => (
                                    <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
                                        {/* Product Image */}
                                        <div className="relative h-64 bg-gray-200">
                                            {/* Wishlist Button */}
                                            <button
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    if (isInWishlist(product.id)) {
                                                        removeFromWishlist(product.id);
                                                    } else {
                                                        addToWishlist({
                                                            id: product.id,
                                                            title: product.title,
                                                            price: product.price,
                                                            image: product.thumbnail || product.images?.[0],
                                                            rating: product.rating,
                                                            stock: product.stock
                                                        });
                                                    }
                                                }}
                                                className="absolute top-3 right-3 z-10 bg-white p-2 rounded-full shadow-lg hover:scale-110 transition-transform"
                                                title={isInWishlist(product.id) ? "Remove from wishlist" : "Add to wishlist"}
                                            >
                                                <Heart
                                                    className={`w-5 h-5 ${isInWishlist(product.id)
                                                        ? 'fill-red-500 text-red-500'
                                                        : 'text-gray-600'
                                                        }`}
                                                />
                                            </button>

                                            {product.thumbnail || product.images?.[0] ? (
                                                <img
                                                    src={product.thumbnail || product.images[0]}
                                                    alt={product.title}
                                                    className="w-full h-full object-cover"
                                                    onError={(e) => {
                                                        e.target.src = 'https://via.placeholder.com/400x400?text=No+Image';
                                                    }}
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-gray-400">
                                                    <svg className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                    </svg>
                                                </div>
                                            )}
                                        </div>

                                        {/* Product Info */}
                                        <div className="p-4">
                                            <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                                                {product.title}
                                            </h3>
                                            <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                                                {product.description}
                                            </p>

                                            {/* Price and Rating */}
                                            <div className="flex items-center justify-between mb-3">
                                                <span className="text-2xl font-bold text-indigo-600">
                                                    ₹{product.price}
                                                </span>
                                                {product.rating && (
                                                    <div className="flex items-center">
                                                        <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                        </svg>
                                                        <span className="ml-1 text-sm text-gray-600">{product.rating}</span>
                                                    </div>
                                                )}
                                            </div>


                                            {/* Stock Status */}
                                            {product.stock && (
                                                <p className="text-sm text-gray-500 mb-3">
                                                    {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                                                </p>
                                            )}

                                            {/* Buttons */}
                                            <div className="flex gap-2">
                                                {/* View Details Button */}
                                                <Link
                                                    to={`/product/${product.id}`}
                                                    className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-200 transition-colors duration-200 font-medium border border-gray-300 text-center"
                                                >
                                                    View Details
                                                </Link>

                                                {/* Add to Cart Button */}
                                                <button
                                                    onClick={() => {
                                                        handleAddToCart(product);
                                                        // Show success message
                                                        const toast = document.createElement('div');
                                                        toast.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in';
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
                                                    }}
                                                    className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors duration-200 font-medium"
                                                >
                                                    Add to Cart
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="mt-8 flex justify-center">
                                <nav className="inline-flex rounded-md shadow-sm -space-x-px">
                                    <button
                                        onClick={() => paginate(currentPage - 1)}
                                        disabled={currentPage === 1}
                                        className={`relative inline-flex items-center px-4 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${currentPage === 1
                                            ? 'text-gray-300 cursor-not-allowed'
                                            : 'text-gray-700 hover:bg-gray-50'
                                            }`}
                                    >
                                        Previous
                                    </button>
                                    {[...Array(totalPages)].map((_, index) => (
                                        <button
                                            key={index + 1}
                                            onClick={() => paginate(index + 1)}
                                            className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium ${currentPage === index + 1
                                                ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                                                : 'bg-white text-gray-700 hover:bg-gray-50'
                                                }`}
                                        >
                                            {index + 1}
                                        </button>
                                    ))}
                                    <button
                                        onClick={() => paginate(currentPage + 1)}
                                        disabled={currentPage === totalPages}
                                        className={`relative inline-flex items-center px-4 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${currentPage === totalPages
                                            ? 'text-gray-300 cursor-not-allowed'
                                            : 'text-gray-700 hover:bg-gray-50'
                                            }`}
                                    >
                                        Next
                                    </button>
                                </nav>
                            </div>
                        )}
                    </div>
                </div >
            </div >
        </div >
    );
}
