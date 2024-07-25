import React, { useState } from 'react'
import { useFetch } from '../../hooks/useFetch'
import Container from '../../components/container/Container'
import { Button, Skeleton, Typography } from 'antd'
import { Loading } from '../../utils'
import AllProducsts from '../../components/all_products/AllProducsts'
import { Link, Navigate } from 'react-router-dom'


const { Title } = Typography
const Home = () => {
  const [{ payload }, loading] = useFetch("/product/all")
  const [step, setStep] = useState(1)

  let count = 4


  return (
    <Container>
      <div className='my-12 flex flex-col  gap-8'>
        <div className='flex items-center justify-between'>
        <Title level={2}  >All Products</Title>
        <Button   type='primary' className='w-[150px] text-xl'><Link to="/auth">Login</Link></Button>
        </div>
        <div className='flex flex-wrap gap-12  mt-12 '>
          {
            loading
              ?
              Array.from({ length: 4 }).map((_, index) => (
                <div className="flex flex-col gap-5 items-center" key={index}>
                  <Skeleton.Image active style={{ width: "300px", height: "300px" }} />
                  <Skeleton.Input active className="skeloton_input" style={{ width: "250px", height: "30px" }} />
                  <Skeleton.Input active className="skeloton_input" style={{ width: "200px", height: "20px" }} />
                  <Skeleton.Input active className="skeloton_input" style={{ width: "250px", height: "20px" }} />

                </div>
              ))
              :
              payload && payload.slice(0, count * step).map((product) => <AllProducsts key={product._id} allData={product} />)
          }
        </div>
        <div className='flex justify-center'>
          {
            payload && payload.length > count * step
              ?
              <Button onClick={() => setStep(step + 1)} type="primary">Show More</Button>
              :
              <Button onClick={() => setStep(step - (count - 2 ))} type="primary">Show Less</Button>
          }
        </div>
      </div>
    </Container>
  )
}

export default Home
