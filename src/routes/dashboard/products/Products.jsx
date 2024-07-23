
import TableComponent from "../../../components/table/Table";
import { useFetch } from "../../../hooks/useFetch";


const Products = () => {

  const [data, loading] = useFetch("/product/all")

  

  return (

    <>
      <TableComponent  title={"Product"} data={data} loading={loading}> </TableComponent>
      
    </>
  )
}



export default Products
