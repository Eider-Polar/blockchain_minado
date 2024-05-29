import { Outlet } from 'react-router-dom'

const Authlayout = () => {
    return (
        <>
            <main>
                <div >
                    <Outlet />
                </div>
            </main>
        </>
    )
}

export default Authlayout
