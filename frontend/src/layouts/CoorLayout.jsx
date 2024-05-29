import { Outlet } from 'react-router-dom'

const CoorLayout = () => {
    return (
        <>
            <main >
                <div >
                    <Outlet />
                </div>
            </main>
        </>
    )
}

export default CoorLayout
