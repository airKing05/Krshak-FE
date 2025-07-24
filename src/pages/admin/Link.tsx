import MarketCategoryLinkForm from "../../components/organisms/MarketCategoryLinkForm";
import MarketProductForm from "../../components/organisms/MarketProductForm";

export default function Link() {


  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Link Category to Market</h1>
      <MarketCategoryLinkForm/>
      <h1 className="text-2xl font-bold mb-4">Link Product to Market</h1>
      <MarketProductForm />
    </div>
  );
}
