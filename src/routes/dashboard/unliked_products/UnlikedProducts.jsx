import React from 'react'
import { useFetch } from '../../../hooks/useFetch'
import { DashboardTitle, Loading } from '../../../utils'

const UnlikedProducts = () => {
  const [data, loading] = useFetch("/product/most-popular")

  const filteredProducts = data?.payload?.filter(product => product.likes === 0)

  console.log(filteredProducts)

  return (
    <div>
      <DashboardTitle >Unliked Products 💔</DashboardTitle>

      <div className='flex flex-wrap gap-12 my-12 overflow-auto '>
        {
          loading
            ? <Loading />
            : filteredProducts && filteredProducts.length > 0
              ? filteredProducts.map((product) =>
                <></>
              )
              : <p>No products with 1 like found.</p>
        }
      </div>
    </div>
  )
}

export default UnlikedProducts
