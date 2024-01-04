import { Image } from "@crystallize/reactjs-components";
import Link from "~/bridge/ui/Link";
import { Price as CrystallizePrice } from "../../lib/pricing/pricing-component";

export default function Card({ name, variant, path, image, imageSizes }: any) {
  return (
    <Link to={path} className="max-w-sm rounded overflow-hidden shadow-md">
      <Image className="w-full" {...image} sizes={imageSizes} />
      <div className="px-6 py-4 flex flex-column">
        <div className="font-bold text-xl mb-2">{name}</div>
        <CrystallizePrice currencyCode="USD">
          {variant.usdPrice.price}
        </CrystallizePrice>
      </div>
      <footer className="footer px-6 pb-4">
        <button className="w-full bg-transparent hover:bg-gray-900 text-gray-900 font-semibold hover:text-gray-100 py-2 px-4 border border-gray-900 hover:border-transparent rounded-full">
          SHOP NOW
        </button>
      </footer>
    </Link>
  )
}