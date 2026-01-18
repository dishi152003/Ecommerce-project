import { useState } from 'react';
import { X, SlidersHorizontal, ChevronDown, ChevronUp } from 'lucide-react';

export default function FilterSidebar({
    filters,
    onFilterChange,
    sortBy,
    onSortChange,
    isOpen,
    onClose
}) {
    const [expandedSections, setExpandedSections] = useState({
        price: true,
        rating: true,
        stock: true,
        sort: true
    });

    const toggleSection = (section) => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    const handlePriceChange = (type, value) => {
        const newRange = [...filters.priceRange];
        if (type === 'min') newRange[0] = Number(value);
        if (type === 'max') newRange[1] = Number(value);
        onFilterChange({ ...filters, priceRange: newRange });
    };

    const handleRatingChange = (rating) => {
        onFilterChange({ ...filters, minRating: rating });
    };

    const handleStockChange = (checked) => {
        onFilterChange({ ...filters, inStock: checked });
    };

    const clearFilters = () => {
        onFilterChange({
            priceRange: [0, 10000],
            minRating: 0,
            inStock: false
        });
        onSortChange('default');
    };

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <div className={`
                fixed md:sticky top-0 left-0 h-screen md:h-auto
                w-80 md:w-64 lg:w-72
                bg-white dark:bg-gray-800 
                shadow-2xl md:shadow-lg
                z-50 md:z-10
                transform transition-transform duration-300 ease-in-out
                ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
                overflow-y-auto
                border-r border-gray-200 dark:border-gray-700
            `}>
                {/* Header */}
                <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 flex items-center justify-between z-10">
                    <div className="flex items-center gap-2">
                        <SlidersHorizontal className="w-5 h-5 text-blue-600" />
                        <h2 className="text-lg font-bold text-gray-900 dark:text-white">Filters</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="md:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                    >
                        <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    </button>
                </div>

                <div className="p-4 space-y-6">
                    {/* Clear Filters Button */}
                    <button
                        onClick={clearFilters}
                        className="w-full py-2 px-4 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors font-medium text-sm"
                    >
                        Clear All Filters
                    </button>

                    {/* Sort By */}
                    <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
                        <button
                            onClick={() => toggleSection('sort')}
                            className="w-full flex items-center justify-between mb-3"
                        >
                            <h3 className="font-semibold text-gray-900 dark:text-white">Sort By</h3>
                            {expandedSections.sort ? (
                                <ChevronUp className="w-4 h-4 text-gray-600" />
                            ) : (
                                <ChevronDown className="w-4 h-4 text-gray-600" />
                            )}
                        </button>
                        {expandedSections.sort && (
                            <div className="space-y-2">
                                {[
                                    { value: 'default', label: 'Default' },
                                    { value: 'price-low', label: 'Price: Low to High' },
                                    { value: 'price-high', label: 'Price: High to Low' },
                                    { value: 'rating', label: 'Highest Rated' },
                                    { value: 'name-az', label: 'Name: A to Z' },
                                    { value: 'name-za', label: 'Name: Z to A' }
                                ].map(option => (
                                    <label key={option.value} className="flex items-center gap-2 cursor-pointer group">
                                        <input
                                            type="radio"
                                            name="sort"
                                            value={option.value}
                                            checked={sortBy === option.value}
                                            onChange={(e) => onSortChange(e.target.value)}
                                            className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                                        />
                                        <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                                            {option.label}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Price Range */}
                    <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
                        <button
                            onClick={() => toggleSection('price')}
                            className="w-full flex items-center justify-between mb-3"
                        >
                            <h3 className="font-semibold text-gray-900 dark:text-white">Price Range</h3>
                            {expandedSections.price ? (
                                <ChevronUp className="w-4 h-4 text-gray-600" />
                            ) : (
                                <ChevronDown className="w-4 h-4 text-gray-600" />
                            )}
                        </button>
                        {expandedSections.price && (
                            <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                    <input
                                        type="number"
                                        placeholder="Min"
                                        value={filters.priceRange[0]}
                                        onChange={(e) => handlePriceChange('min', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                    <span className="text-gray-500">-</span>
                                    <input
                                        type="number"
                                        placeholder="Max"
                                        value={filters.priceRange[1]}
                                        onChange={(e) => handlePriceChange('max', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">
                                    ₹{filters.priceRange[0].toLocaleString('en-IN')} - ₹{filters.priceRange[1].toLocaleString('en-IN')}
                                </div>
                                {/* Quick Price Filters */}
                                <div className="flex flex-wrap gap-2">
                                    {[
                                        { label: 'Under ₹500', range: [0, 500] },
                                        { label: '₹500-₹1000', range: [500, 1000] },
                                        { label: '₹1000-₹2000', range: [1000, 2000] },
                                        { label: 'Above ₹2000', range: [2000, 10000] }
                                    ].map(preset => (
                                        <button
                                            key={preset.label}
                                            onClick={() => onFilterChange({ ...filters, priceRange: preset.range })}
                                            className="px-3 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                                        >
                                            {preset.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Rating Filter */}
                    <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
                        <button
                            onClick={() => toggleSection('rating')}
                            className="w-full flex items-center justify-between mb-3"
                        >
                            <h3 className="font-semibold text-gray-900 dark:text-white">Minimum Rating</h3>
                            {expandedSections.rating ? (
                                <ChevronUp className="w-4 h-4 text-gray-600" />
                            ) : (
                                <ChevronDown className="w-4 h-4 text-gray-600" />
                            )}
                        </button>
                        {expandedSections.rating && (
                            <div className="space-y-2">
                                {[4.5, 4.0, 3.5, 3.0, 0].map(rating => (
                                    <label key={rating} className="flex items-center gap-2 cursor-pointer group">
                                        <input
                                            type="radio"
                                            name="rating"
                                            checked={filters.minRating === rating}
                                            onChange={() => handleRatingChange(rating)}
                                            className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                                        />
                                        <div className="flex items-center gap-1">
                                            {rating > 0 ? (
                                                <>
                                                    <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                                                        {rating}
                                                    </span>
                                                    <span className="text-yellow-400">★</span>
                                                    <span className="text-sm text-gray-500 dark:text-gray-400">& above</span>
                                                </>
                                            ) : (
                                                <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                                                    All Ratings
                                                </span>
                                            )}
                                        </div>
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Stock Availability */}
                    <div className="pb-4">
                        <button
                            onClick={() => toggleSection('stock')}
                            className="w-full flex items-center justify-between mb-3"
                        >
                            <h3 className="font-semibold text-gray-900 dark:text-white">Availability</h3>
                            {expandedSections.stock ? (
                                <ChevronUp className="w-4 h-4 text-gray-600" />
                            ) : (
                                <ChevronDown className="w-4 h-4 text-gray-600" />
                            )}
                        </button>
                        {expandedSections.stock && (
                            <label className="flex items-center gap-2 cursor-pointer group">
                                <input
                                    type="checkbox"
                                    checked={filters.inStock}
                                    onChange={(e) => handleStockChange(e.target.checked)}
                                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                                />
                                <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                                    In Stock Only
                                </span>
                            </label>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
