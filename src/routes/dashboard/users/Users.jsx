import TableComponent from "../../../components/table/Table";
import { useFetch } from "../../../hooks/useFetch";
import { DashboardTitle } from "../../../utils";

const Users = () => {

  const [data, loading] = useFetch("/product/all")
 

  return (
    <div>
      <>
        <div className="flex justify-between items-center">
          <DashboardTitle > Users</DashboardTitle>
          
        </div>
        <TableComponent ></TableComponent>
       
      </>
    </div>
  )
}

export default Users
