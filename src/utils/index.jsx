import {  Spin } from 'antd'
import { Suspense } from 'react'


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




export default SuspenseElement