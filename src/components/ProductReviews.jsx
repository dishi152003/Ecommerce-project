import { useState } from 'react';
import { Star, ThumbsUp, User, CheckCircle } from 'lucide-react';
import { useToast } from '../contexts/ToastContext';

export default function ProductReviews({ productId }) {
    const { success } = useToast();
    const [reviews, setReviews] = useState([
        {
            id: 1,
            userName: 'Sarah Johnson',
            rating: 5,
            date: 'Jan 10, 2026',
            verified: true,
            comment: 'Absolutely love this product! The quality is outstanding and it arrived faster than expected. Highly recommend!',
            helpful: 24,
            images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&h=100&fit=crop']
        },
        {
            id: 2,
            userName: 'Michael Chen',
            rating: 4,
            date: 'Jan 8, 2026',
            verified: true,
            comment: 'Great product overall. The only minor issue is the sizing runs a bit small, so I recommend ordering one size up.',
            helpful: 15,
            images: []
        },
        {
            id: 3,
            userName: 'Emily Rodriguez',
            rating: 5,
            date: 'Jan 5, 2026',
            verified: false,
            comment: 'Perfect! Exactly as described. The color is vibrant and the material feels premium.',
            helpful: 8,
            images: []
        }
    ]);

    const [showReviewForm, setShowReviewForm] = useState(false);
    const [newReview, setNewReview] = useState({
        rating: 5,
        comment: ''
    });

    const averageRating = (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1);

    const ratingDistribution = [5, 4, 3, 2, 1].map(rating => ({
        rating,
        count: reviews.filter(r => r.rating === rating).length,
        percentage: (reviews.filter(r => r.rating === rating).length / reviews.length) * 100
    }));

    const handleSubmitReview = (e) => {
        e.preventDefault();
        if (!newReview.comment.trim()) return;

        const review = {
            id: reviews.length + 1,
            userName: 'You',
            rating: newReview.rating,
            date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            verified: false,
            comment: newReview.comment,
            helpful: 0,
            images: []
        };

        setReviews([review, ...reviews]);
        setNewReview({ rating: 5, comment: '' });
        setShowReviewForm(false);
        success('Review submitted successfully!');
    };

    const handleHelpful = (reviewId) => {
        setReviews(reviews.map(r =>
            r.id === reviewId ? { ...r, helpful: r.helpful + 1 } : r
        ));
        success('Thanks for your feedback!');
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 md:p-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                    Customer Reviews
                </h2>
                <button
                    onClick={() => setShowReviewForm(!showReviewForm)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                    Write a Review
                </button>
            </div>

            {/* Rating Summary */}
            <div className="grid md:grid-cols-2 gap-8 mb-8 pb-8 border-b border-gray-200 dark:border-gray-700">
                {/* Average Rating */}
                <div className="text-center md:text-left">
                    <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                        <span className="text-5xl font-bold text-gray-900 dark:text-white">{averageRating}</span>
                        <div>
                            <div className="flex gap-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <Star
                                        key={star}
                                        className={`w-5 h-5 ${star <= Math.round(averageRating)
                                            ? 'fill-yellow-400 text-yellow-400'
                                            : 'text-gray-300 dark:text-gray-600'
                                            }`}
                                    />
                                ))}
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                Based on {reviews.length} reviews
                            </p>
                        </div>
                    </div>
                </div>

                {/* Rating Distribution */}
                <div className="space-y-2">
                    {ratingDistribution.map(({ rating, count, percentage }) => (
                        <div key={rating} className="flex items-center gap-3">
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 w-12">
                                {rating} star
                            </span>
                            <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-yellow-400 transition-all duration-500"
                                    style={{ width: `${percentage}%` }}
                                ></div>
                            </div>
                            <span className="text-sm text-gray-600 dark:text-gray-400 w-8">{count}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Review Form */}
            {showReviewForm && (
                <div className="mb-8 p-6 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-800 rounded-xl animate-fade-in border-2 border-blue-200 dark:border-blue-900">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Write Your Review</h3>
                    <form onSubmit={handleSubmitReview} className="space-y-4">
                        {/* Rating */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                Your Rating *
                            </label>
                            <div className="flex gap-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        type="button"
                                        onClick={() => setNewReview({ ...newReview, rating: star })}
                                        className="transition-transform hover:scale-125 active:scale-95"
                                    >
                                        <Star
                                            className={`w-10 h-10 ${star <= newReview.rating
                                                ? 'fill-yellow-400 text-yellow-400 drop-shadow-lg'
                                                : 'text-gray-300 dark:text-gray-600'
                                                }`}
                                        />
                                    </button>
                                ))}
                                <span className="ml-2 text-sm font-medium text-gray-600 dark:text-gray-400 self-center">
                                    {newReview.rating === 5 ? '⭐ Excellent!' :
                                        newReview.rating === 4 ? '👍 Good' :
                                            newReview.rating === 3 ? '😊 Average' :
                                                newReview.rating === 2 ? '😕 Below Average' :
                                                    '👎 Poor'}
                                </span>
                            </div>
                        </div>

                        {/* Comment */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                Your Review * (minimum 10 characters)
                            </label>
                            <textarea
                                value={newReview.comment}
                                onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                                rows="5"
                                className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none"
                                placeholder="Share your experience with this product... What did you like? What could be improved?"
                                required
                                minLength={10}
                            ></textarea>
                            <div className="flex justify-between items-center mt-2">
                                <span className={`text-sm ${newReview.comment.length < 10 ? 'text-red-500' : 'text-green-600 dark:text-green-400'}`}>
                                    {newReview.comment.length < 10
                                        ? `${10 - newReview.comment.length} more characters needed`
                                        : '✓ Looks good!'}
                                </span>
                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                    {newReview.comment.length} / 500 characters
                                </span>
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="flex gap-3 pt-2">
                            <button
                                type="submit"
                                disabled={newReview.comment.length < 10}
                                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-bold hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg"
                            >
                                Submit Review
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    setShowReviewForm(false);
                                    setNewReview({ rating: 5, comment: '' });
                                }}
                                className="px-6 py-3 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-semibold hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Reviews List */}
            <div className="space-y-6">
                {reviews.map((review) => (
                    <div
                        key={review.id}
                        className="p-6 bg-gray-50 dark:bg-gray-700 rounded-xl hover:shadow-md transition-shadow"
                    >
                        {/* Header */}
                        <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                                    <User className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <span className="font-semibold text-gray-900 dark:text-white">
                                            {review.userName}
                                        </span>
                                        {review.verified && (
                                            <div className="flex items-center gap-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-0.5 rounded-full text-xs">
                                                <CheckCircle className="w-3 h-3" />
                                                Verified
                                            </div>
                                        )}
                                    </div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">{review.date}</p>
                                </div>
                            </div>
                            <div className="flex gap-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <Star
                                        key={star}
                                        className={`w-4 h-4 ${star <= review.rating
                                            ? 'fill-yellow-400 text-yellow-400'
                                            : 'text-gray-300 dark:text-gray-600'
                                            }`}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Comment */}
                        <p className="text-gray-700 dark:text-gray-300 mb-3">{review.comment}</p>

                        {/* Images */}
                        {review.images.length > 0 && (
                            <div className="flex gap-2 mb-3">
                                {review.images.map((img, idx) => (
                                    <img
                                        key={idx}
                                        src={img}
                                        alt="Review"
                                        className="w-20 h-20 object-cover rounded-lg cursor-pointer hover:scale-105 transition-transform"
                                    />
                                ))}
                            </div>
                        )}

                        {/* Helpful */}
                        <button
                            onClick={() => handleHelpful(review.id)}
                            className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        >
                            <ThumbsUp className="w-4 h-4" />
                            Helpful ({review.helpful})
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
