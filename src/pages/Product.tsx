import ProductPageTemplate from '../components/templates/ProductPageTemplate'

function Product() {
  console.log("this page called....")
  return (
    <div className='max-w-7xl mx-auto'>
      <ProductPageTemplate/>
    </div>
  )
}

export default Product