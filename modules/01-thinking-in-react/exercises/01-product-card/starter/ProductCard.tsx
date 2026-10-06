type ProductCardProps = {
  name: string
  price: number
  imageUrl: string
  description?: string
  currency?: string
}

// TODO: destructure the remaining props (give `currency` a default of 'USD').
export function ProductCard({ name }: ProductCardProps) {
  return (
    <article className="product-card">
      {/* TODO: make the name a level-2 heading */}
      <div>{name}</div>

      {/* TODO: render the image with a meaningful alt text */}

      {/* TODO: render the price formatted as currency (e.g. "$12.50") */}

      {/* TODO: render the description, but only if there is one */}
    </article>
  )
}
