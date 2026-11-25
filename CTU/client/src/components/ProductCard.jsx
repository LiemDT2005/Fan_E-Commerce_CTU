import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Star } from 'lucide-react';

export default function ProductCard({
  product,
  onAdd,
  showDescription = false,
  showRating = false,
  showDetailsButton = false,
}) {
  return (
    <div className="rounded-xl bg-surface-container-lowest border border-outline-variant/25 hover:border-outline-variant/60 overflow-hidden flex flex-col justify-between transition-colors group">
      <div>
        <Link to={`/products/${product.id}`} className="block relative aspect-square overflow-hidden bg-surface-container">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
          />
          {product.badge && (
            <span className="absolute top-3 left-3 bg-[#241914]/85 backdrop-blur-sm text-[#f9efe4] text-[10px] font-medium px-2.5 py-1 rounded-md uppercase tracking-wider">
              {product.badge}
            </span>
          )}
        </Link>

        <div className="p-5">
          <div className="flex items-center justify-between text-[11px] font-medium text-on-surface-variant uppercase tracking-wider">
            <span className="truncate">{product.categoryName}</span>
            {showRating && product.rating && (
              <span className="flex items-center gap-1 text-amber-700 font-semibold flex-shrink-0">
                <Star size={13} strokeWidth={1.75} className="fill-amber-600 text-amber-600" />
                {product.rating}
              </span>
            )}
          </div>

          <Link to={`/products/${product.id}`}>
            <h3 className="font-semibold text-sm text-on-surface mt-1.5 line-clamp-2 hover:text-primary transition-colors leading-snug">
              {product.name}
            </h3>
          </Link>

          {showDescription && product.description && (
            <p className="text-xs text-on-surface-variant mt-2 line-clamp-2 leading-relaxed">
              {product.description}
            </p>
          )}

          <div className="flex items-baseline gap-2 mt-3.5">
            <span className="text-base font-bold text-primary">
              {product.price.toLocaleString('en-US')} VND
            </span>
            {product.originalPrice > product.price && (
              <span className="text-xs text-on-surface-variant/70 line-through">
                {product.originalPrice.toLocaleString('en-US')} VND
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="px-5 pb-5 pt-0 flex gap-2">
        {showDetailsButton && (
          <Link
            to={`/products/${product.id}`}
            className="flex-1 py-2.5 rounded-lg border border-outline-variant/40 hover:border-primary/40 hover:bg-surface-container-low text-on-surface text-xs font-medium transition-colors text-center"
          >
            Details
          </Link>
        )}
        <button
          type="button"
          onClick={() => onAdd(product)}
          className={`${
            showDetailsButton ? 'px-4' : 'w-full'
          } py-2.5 rounded-lg bg-surface-container-low hover:bg-primary hover:text-on-primary text-on-surface border border-outline-variant/25 hover:border-primary text-xs font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer`}
        >
          <ShoppingBag size={15} strokeWidth={1.75} />
          <span>{showDetailsButton ? 'Buy' : 'Add to Cart'}</span>
        </button>
      </div>
    </div>
  );
}
