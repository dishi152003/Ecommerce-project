# Filter Sidebar Integration Guide

## Changes Needed in ProductListing.jsx

### 1. Add Import at the top (around line 5):
```javascript
import { SlidersHorizontal } from 'lucide-react';
import FilterSidebar from '../components/FilterSidebar';
```

### 2. Add filter logic after line 24 (after const [showFilters, setShowFilters] = useState(false);):
```javascript
// Apply filters and sorting
const getFilteredAndSortedProducts = () => {
    let filtered = [...products];
    
    // Apply price filter
    filtered = filtered.filter(p => 
        p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
    );
    
    // Apply rating filter
    if (filters.minRating > 0) {
        filtered = filtered.filter(p => (p.rating || 0) >= filters.minRating);
    }
    
    // Apply stock filter
    if (filters.inStock) {
        filtered = filtered.filter(p => p.stock > 0);
    }
    
    // Apply sorting
    switch(sortBy) {
        case 'price-low':
            filtered.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            filtered.sort((a, b) => b.price - a.price);
            break;
        case 'rating':
            filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
            break;
        case 'name-az':
            filtered.sort((a, b) => a.title.localeCompare(b.title));
            break;
        case 'name-za':
            filtered.sort((a, b) => b.title.localeCompare(a.title));
            break;
        default:
            // Keep default order
            break;
    }
    
    return filtered;
};

const filteredProducts = getFilteredAndSortedProducts();
```

### 3. Update pagination to use filteredProducts (around line 1125):
```javascript
// Change from:
const indexOfLastProduct = currentPage * productsPerPage;
const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
const totalPages = Math.ceil(products.length / productsPerPage);

// To:
const indexOfLastProduct = currentPage * productsPerPage;
const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
```

### 4. Add Filter Button and Sidebar before the products grid (around line 1120):
```javascript
{/* Add this BEFORE the products grid */}
<div className="mb-6 flex items-center justify-between">
    <div className="flex items-center gap-4">
        <button
            onClick={() => setShowFilters(!showFilters)}
            className="md:hidden flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md"
        >
            <SlidersHorizontal className="w-5 h-5" />
            <span>Filters</span>
        </button>
        <p className="text-gray-600 dark:text-gray-400">
            Showing {currentProducts.length} of {filteredProducts.length} products
        </p>
    </div>
</div>

{/* Wrap existing content in flex container */}
<div className="flex gap-6">
    {/* Filter Sidebar */}
    <FilterSidebar
        filters={filters}
        onFilterChange={setFilters}
        sortBy={sortBy}
        onSortChange={setSortBy}
        isOpen={showFilters}
        onClose={() => setShowFilters(false)}
    />
    
    {/* Products Grid - wrap existing grid here */}
    <div className="flex-1">
        {/* Your existing products grid code goes here */}
    </div>
</div>
```

## Summary of Features:
- ✅ Collapsible filter sections
- ✅ Price range filter with quick presets
- ✅ Rating filter (4.5★, 4.0★, 3.5★, 3.0★, All)
- ✅ Stock availability filter
- ✅ Sort by: Default, Price (Low/High), Rating, Name (A-Z/Z-A)
- ✅ Mobile responsive with overlay
- ✅ Clear all filters button
- ✅ Product count display
- ✅ Dark mode support
