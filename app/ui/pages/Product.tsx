import { useState } from "react";
import { useLocation } from "@remix-run/react";
import { ContentTransformer } from "@crystallize/reactjs-components";
import { Image } from "@crystallize/reactjs-components";
import { Price as CrystallizePrice } from "~/ui/lib/pricing/pricing-component";
import { useLocalCart } from "../hooks/useLocalCart";

export default ({ data }: { data: any }) => {
  const { product } = data;
  const location = useLocation();
  const primaryVariant =
    product.variants.find((variant: any) => variant.sku === location.hash.slice(1)) ??
    product.variants.find((variant: any) => variant.isDefault) ?? product.variants[0];
  const [selectedVariant, setSelectedVariant] = useState(primaryVariant);
  const attributes = product.variants.reduce((memo: Record<string, string[]>, variant: any) => {
    if (!variant.attributes) return;

    for (const attributeObject of variant.attributes) {
      const key = attributeObject.attribute.toLowerCase();
      const value = attributeObject.value.toLowerCase();
      if (!memo[key]) {
        memo[key] = [];
      }
      if (!memo[key].includes(value)) {
        memo[key].push(value);
      }
    }
    return memo;
  }, {});
  const { add } = useLocalCart();

  const onColorChange = (event: any) => {
    const value = (event.target as HTMLInputElement).value;
    const variant = getVariantByAttribute("color", value);
    if (variant) {
      setSelectedVariant(variant);
      window.location.hash = variant.sku;
    }
  }

  const getVariantByAttribute = (attributeKey: string, attributeValue: string) => {
    const variant = product.variants.find((variant: any) => {
      if (variant.attributes) {
        const attribute = variant?.attributes.find((attribute: any) => attribute.attribute.toLowerCase() === attributeKey);
        return attribute.value.toLowerCase() == attributeValue;
      }
    });

    return variant || null;
  }

  const addToCart = () => {
    const item = {
      name: selectedVariant.name,
      sku: selectedVariant.sku,
      price: selectedVariant.usdPrice.price
    }
    add(item);
  }

  return (
    <div className="min-h-[100vh] switcher">
      <div className="mb-4 flex items-center">
        <Image key={selectedVariant.images[0].url} {...selectedVariant.images[0]} sizes="(max-width: 500px) 300px, 700px" className="w-full" />
        {/* <ProductVariant variant={selectedVariant} /> */}
        {/* {product.variants?.map((variant: any) => <ProductVariant key={variant.sku} variant={variant} />)} */}
      </div>

      <div className="repel flow" data-repel-variant="vertical">
        <h3 className="sr-only">Reviews</h3>
        <div className="flex items-center">
          <div className="flex items-center">
            <svg className="text-orange-600 h-5 w-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clipRule="evenodd" />
            </svg>
            <svg className="text-orange-600 h-5 w-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clipRule="evenodd" />
            </svg>
            <svg className="text-orange-600 h-5 w-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clipRule="evenodd" />
            </svg>
            <svg className="text-orange-600 h-5 w-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clipRule="evenodd" />
            </svg>
            <svg className="text-gray-200 h-5 w-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clipRule="evenodd" />
            </svg>
          </div>
          <p className="sr-only">4 out of 5 stars</p>
          <a href="#" className="ml-3 text-sm font-medium text-gray-600 hover:text-gray-500">117 reviews</a>
        </div>

        <h1 className="text-3xl font-bold">{product.name}</h1>

        <CrystallizePrice currencyCode="USD">
          {selectedVariant.usdPrice.price}
        </CrystallizePrice>
        <p className="text-gray-700 text-base">Stock: {selectedVariant.stockLocations[0].stock}</p>

        <hr />
        <ContentTransformer json={product.summary?.content?.json} />
        <hr />

        <form className="flow">
          <h3 className="text-sm font-medium text-gray-900">Color</h3>

          <fieldset className="mt-4" onChange={(e) => onColorChange(e)}>
            <legend className="sr-only">Pack color</legend>
            <div className="flex items-center space-x-3">
              {attributes?.color?.map((color: any) => {
                const backgroundColor = color === "black" ? "bg-gray-900" : `bg-${color}`;

                const variant = product.variants?.find((variant: any) => {
                  const attribute = variant?.attributes.find((attribute: any) => attribute.attribute.toLowerCase() == "color");
                  return attribute.value.toLowerCase() == color;
                });
                var borderStyles = variant.sku === selectedVariant.sku
                  ? "border-orange-600"
                  : "border-black border-opacity-10";

                return (
                  <label key={color} className="relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none ring-orange-600">
                    <input type="radio" name="color-choice" value={color} className="sr-only" aria-labelledby={`color-choice-${color}-label`} />
                    <span id={`color-choice-${color}-label`} className="sr-only">{color}</span>
                    <span aria-hidden="true" className={`h-8 w-8 ${backgroundColor} rounded-full border ${borderStyles}`}></span>
                  </label>
                )
              })}
            </div>
          </fieldset>

          <button onClick={() => addToCart()} className="w-full bg-orange-500 hover:bg-orange-400 text-white font-bold py-2 px-4 rounded-full">
            ADD TO CART
          </button>
        </form>
      </div>
    </div>
  )
}