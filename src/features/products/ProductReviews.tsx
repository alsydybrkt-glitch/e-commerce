"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "@/shared/i18n/useTranslation";
import { StarRating } from "@/shared/ui/StarRating";
import { Interactive } from "@/shared/ui/Interactive";

const MOCK_REVIEWS = [
  {
    id: 1,
    author: "Alice Wonderland",
    rating: 5,
    date: "2025-10-14",
    content: "Absolutely phenomenal product! The build quality exceeded my expectations and the delivery was incredibly fast. Highly recommended.",
  },
  {
    id: 2,
    author: "Bob Builder",
    rating: 4,
    date: "2025-09-02",
    content: "Great value for the price. It does exactly what it says on the tin. Deducting one star because the packaging could be slightly better.",
  },
];

export function ProductReviews({ productId }:  { productId?: string | number }) {
  const { t } = useTranslation();
  const [reviews, setReviews] = useState(MOCK_REVIEWS);
  const [newReview, setNewReview] = useState("");
  const [newRating, setNewRating] = useState(5);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.trim()) return;

    setReviews([
      {
        id: Date.now(),
        author: "Guest User",
        rating: newRating,
        date: new Date().toISOString().split("T")[0],
        content: newReview,
      },
      ...reviews,
    ]);
    setNewReview("");
    setNewRating(5);
  };

  return (
    <section className="mt-12 rounded-[32px] bg-slate-50/50 p-6 sm:p-10 dark:bg-slate-900/40 dark:ring-1 dark:ring-slate-800">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Customer Reviews</h2>
        <div className="flex items-center gap-2">
           <StarRating rating={4.5} />
           <span className="text-sm font-bold text-slate-500">(4.5)</span>
        </div>
      </div>
      
      {/* Add Review Form */}
      <form onSubmit={handleSubmit} className="mt-8 rounded-2xl bg-white p-6 shadow-sm dark:bg-slate-800/40 dark:ring-1 dark:ring-slate-700/50">
        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">Leave a Review</h3>
        <div className="mt-4 flex items-center gap-6">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Rating</label>
            <select 
              aria-label="Select rating"
              value={newRating} 
              onChange={(e) => setNewRating(Number(e.target.value))}
              className="rounded-xl border border-slate-200 bg-transparent px-3 py-2 text-sm font-medium focus:ring-2 focus:ring-brand-500 dark:border-slate-700 dark:text-white"
            >
              {[5, 4, 3, 2, 1].map((r) => (
                <option key={r} value={r} className="text-black">{r} Stars</option>
              ))}
            </select>
          </div>
        </div>
        <textarea
          value={newReview}
          onChange={(e) => setNewReview(e.target.value)}
          placeholder="What did you like or dislike?"
          className="mt-6 w-full min-h-24 rounded-2xl border border-slate-200 bg-transparent p-4 text-sm focus:border-brand-500 focus:outline-none dark:border-slate-700 dark:text-white dark:focus:border-brand-400"
          required
        />
        <Interactive className="mt-4 inline-block">
          <button type="submit" className="primary-btn px-8 py-3 text-sm font-bold">
            Post Review
          </button>
        </Interactive>
      </form>

      {/* Reviews List */}
      <div className="mt-10 space-y-6">
        <AnimatePresence mode="popLayout">
          {reviews.map((review, index) => (
            <motion.article 
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="rounded-2xl bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:bg-slate-800/30 dark:ring-1 dark:ring-slate-800"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 flex items-center justify-center rounded-full bg-brand-100 text-brand-600 font-bold dark:bg-brand-900/40 dark:text-brand-400">
                    {review.author[0]}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-slate-100">{review.author}</h4>
                    <p className="text-xs font-medium text-slate-400 mt-0.5">{review.date}</p>
                  </div>
                </div>
                <StarRating rating={review.rating} />
              </div>
              <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-300">
                {review.content}
              </p>
            </motion.article>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}
