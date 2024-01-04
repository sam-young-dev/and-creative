import Card from "~/ui/components/card/card";
import { useAppContext } from "../app-context/provider";

export default ({ data }: { data: any }) => {
  const { category } = data;
  const { path } = useAppContext();

  return (
    <div className="min-h-[100vh] container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold mb-4">{category.name}</h1>
      <div className="auto-grid">
        {category.products.map((product: any) => {
          return (
            <Card
              key={product.path}
              name={product.name}
              variant={product?.defaultVariant}
              path={path(product.path)}
              image={product?.defaultVariant.firstImage || ""}
              imageSizes="300px"
            />
          )
        })}
      </div>
    </div>
  )
}