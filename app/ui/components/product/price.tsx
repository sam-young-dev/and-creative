export const Price = ({ variant }: any) => {
  return (
    <p className="text-gray-900 text-base">{variant.usdPrice.price} {variant.usdPrice.currency}</p>
  )
}