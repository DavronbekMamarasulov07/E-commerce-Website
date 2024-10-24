import {  Spin,Typography } from 'antd'
import { Suspense } from 'react'

const {Title} = Typography


export const Loading = () => {
    return (
        <div className='h-screen w-full flex items-center justify-center'>
            <Spin tip="Loading..." size='large' />
        </div>
    )
}

const SuspenseElement = ({children}) => {
    return (
        <Suspense fallback={<Loading/>}>
            {children}
        </Suspense>
    )
}


export const DashboardTitle = ({children}) => {

    return (
        <Title  level={2}>{children}</Title>
    )
}






export default SuspenseElement