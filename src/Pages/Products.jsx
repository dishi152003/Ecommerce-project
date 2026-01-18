import { useSearchParams, Link } from 'react-router-dom';

export default function Products() {
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category') || 'All Products';

  // Define subcategories for each main category
  const categoryData = {
    'Men': [
      { name: 'Shirts', img: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&h=400&fit=crop' },
      { name: 'T-Shirts', img: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop' },
      { name: 'Kurtas', img: 'https://images.unsplash.com/photo-1701365676249-9d7ab5022dec?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8a3VydGFzfGVufDB8fDB8fHww' },
      { name: 'Track Pants', img: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=400&h=400&fit=crop' },
      { name: 'Jeans', img: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop' },
      { name: 'Trousers', img: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400&h=400&fit=crop' },
      { name: 'Shorts', img: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=400&h=400&fit=crop' },
      { name: 'Dhotis', img: 'https://unsplash.com/photos/8TQ2e4em1z4/download?force=true' },
      { name: 'Lungis', img: 'data:image/jpeg;base64,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' },
      { name: 'Hero Jackets', img: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop' }
    ],
    'Women': [
      { name: 'Sarees', img: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&h=400&fit=crop' },
      { name: 'Kurtis', img: 'https://images.unsplash.com/photo-1583391733981-5afc8f8e5f8e?w=400&h=400&fit=crop' },
      { name: 'Lehenga', img: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=400&fit=crop' },
      { name: 'Salwar Suits', img: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=400&h=400&fit=crop' },
      { name: 'Dresses', img: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=400&fit=crop' },
      { name: 'Tops', img: 'https://images.unsplash.com/photo-1564257577-d18f0c4c8f0e?w=400&h=400&fit=crop' },
      { name: 'Jeans', img: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400&h=400&fit=crop' },
      { name: 'Skirts', img: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=400&h=400&fit=crop' }
    ],
    'Kids': [
      { name: 'Boys T-Shirts', img: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=400&h=400&fit=crop' },
      { name: 'Girls Dresses', img: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=400&h=400&fit=crop' },
      { name: 'Boys Shirts', img: 'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=400&h=400&fit=crop' },
      { name: 'Girls Tops', img: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=400&h=400&fit=crop' },
      { name: 'Shorts', img: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=400&h=400&fit=crop' },
      { name: 'Jeans', img: 'https://images.unsplash.com/photo-1582418702059-97ebafb35d09?w=400&h=400&fit=crop' }
    ],
    'Accessories': [
      { name: 'Watches', img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop' },
      { name: 'Bags', img: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop' },
      { name: 'Belts', img: 'https://images.unsplash.com/photo-1624222247344-550fb60583bb?w=400&h=400&fit=crop' },
      { name: 'Wallets', img: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=400&h=400&fit=crop' },
      { name: 'Sunglasses', img: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&h=400&fit=crop' },
      { name: 'Jewelry', img: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop' },
      { name: 'Caps', img: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400&h=400&fit=crop' },
      { name: 'Scarves', img: 'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=400&h=400&fit=crop' }
    ],
    'Footwear': [
      { name: 'Sneakers', img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop' },
      { name: 'Formal Shoes', img: 'https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=400&h=400&fit=crop' },
      { name: 'Sandals', img: 'https://images.unsplash.com/photo-1603487742131-4160ec999306?w=400&h=400&fit=crop' },
      { name: 'Boots', img: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=400&h=400&fit=crop' },
      { name: 'Sports Shoes', img: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop' }
    ],
    'New Arrivals': [
      { name: 'Latest Fashion', img: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&h=400&fit=crop' },
      { name: 'Trending Now', img: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&h=400&fit=crop' },
      { name: 'New Collection', img: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=400&h=400&fit=crop' },
      { name: 'Fresh Styles', img: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=400&fit=crop' },
      { name: 'Just Launched', img: 'https://images.unsplash.com/photo-1558769132-cb1aea3c8565?w=400&h=400&fit=crop' },
      { name: 'Season Special', img: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&h=400&fit=crop' }
    ]
  };

  const items = categoryData[category] || [];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="relative bg-cover bg-center bg-no-repeat py-16" style={{ backgroundImage: `url('/image%2014.jpg')` }}>
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative container mx-auto px-6 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">{category}</h1>
          <p className="text-white/90 text-lg">Explore our curated collection</p>
          <div className="mt-6">
            <Link to="/" className="text-white/80 hover:text-white">← Back to Home</Link>
          </div>
        </div>
      </div>

      {/* Top Picks Section */}
      <div className="container mx-auto px-6 py-12">
        <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-8">
          Top Picks for You
        </h2>

        {items.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {items.map((item, index) => (
              <CategoryCard key={index} item={item} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-600 text-lg">No items available for this category</p>
            <Link to="/" className="mt-4 inline-block text-blue-600 hover:text-blue-700">
              ← Back to Home
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

function CategoryCard({ item }) {
  return (
    <Link to={`/product-listing?subcategory=${encodeURIComponent(item.name)}`}>
      <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl flex flex-col cursor-pointer">
        {/* Image */}
        <div className="w-full h-32 bg-gray-100 overflow-hidden">
          <img
            src={item.img}
            alt={item.name}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
            loading="lazy"
            onError={(e) => {
              e.currentTarget.src = 'https://via.placeholder.com/400x400?text=' + encodeURIComponent(item.name);
            }}
          />
        </div>

        {/* Name */}
        <div className="p-3 text-center">
          <h3 className="font-semibold text-gray-800 text-sm">
            {item.name}
          </h3>
        </div>
      </div>
    </Link>
  );
}
