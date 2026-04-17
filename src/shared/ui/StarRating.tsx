import { memo } from "react";
import { FaStar, FaRegStar } from "react-icons/fa";
import { IoStarHalf } from "react-icons/io5";

function StarRatingComponent({ rating }: { rating: number }) {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      stars.push(<FaStar key={i} aria-hidden="true" />);
    } else if (rating >= i - 0.5) {
      stars.push(<IoStarHalf key={i} aria-hidden="true" />);
    } else {
      stars.push(<FaRegStar key={i} aria-hidden="true" />);
    }
  }

  return (
    <div
      className="mt-4 flex items-center gap-1 text-amber-400 dark:text-amber-300"
      role="img"
      aria-label={`Rating: ${rating} out of 5`}
    >
      {stars}
      <span className="ms-2 text-sm font-semibold text-slate-500 dark:text-slate-400">
        {rating}
      </span>
    </div>
  );
}

export const StarRating = memo(StarRatingComponent);
