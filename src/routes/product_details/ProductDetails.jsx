import { useParams } from "react-router-dom"
import { useFetch } from "../../hooks/useFetch"
import { Loading } from "../../utils";
import Details from "../../components/details/Details";
import Container from "../../components/container/Container";
import Navbar from "../../components/navbar/Navbar";



const ProductDetails = () => {
  const { productId } = useParams();
  const [{ payload }, loading] = useFetch(`/product/single-product/${productId} `)




  return (
    <div>
      <Navbar />
      <Container>
        <div >
          {
            loading
              ? <Loading />
              : <Details product={payload} key={payload?._id} />
          }
        </div>
      </Container>
    </div>
  )
}

export default ProductDetails
