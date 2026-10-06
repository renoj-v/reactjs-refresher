// Lesson 01: REFERENCE SOLUTION.
// Read this after your tests pass. The comments explain *why* it is written this way.

type ProductCardProps = {
  name: string
  price: number
  imageUrl: string
  description?: string
  currency?: string
}

// Default values in the destructuring pattern are the idiomatic way to give
// optional props a fallback (the old `Component.defaultProps` is gone in React 19).
export function ProductCard({ name, price, imageUrl, description, currency = 'USD' }: ProductCardProps) {
  // Plain derived values can be computed right in the render body; they're
  // recalculated whenever props change, so they can never go stale.
  const formattedPrice = new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(price)

  return (
    <article className="product-card">
      {/* alt text describes the image for screen readers; the product name is the right description here */}
      <img src={imageUrl} alt={name} />
      <h2>{name}</h2>
      <p className="price">{formattedPrice}</p>
      {/* `description` is a string, so `description && …` is safe: an empty string
          renders nothing (unlike the number 0, which React would print). */}
      {description && <p className="description">{description}</p>}
    </article>
  )
}
