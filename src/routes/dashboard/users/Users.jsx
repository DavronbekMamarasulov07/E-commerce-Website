import React from 'react'
import { Button,Typography } from 'antd'
import TableComponent from '../../../components/table/Table'
import { useFetch } from '../../../hooks/useFetch'

const { Title } = Typography

const Users = () => {

  const [data, loading] = useFetch("/auth/users")
  console.log(data)
  return (
    <div>
      
      <>
        <TableComponent  title={"User"} data={data} loading={loading}> </TableComponent>
      </>
    </div>
  )
}

export default Users
