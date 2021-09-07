import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startLogout } from '../../actions/authAction'
import ControlledCarousel from './Carousel'
import ShowMovies from './ShowMovies'

const AppMovies = () => {

    const dispatch = useDispatch()
    const { name } = useSelector(state => state.auth)
    //  const { movie } = useSelector(state => state.movie)

    return (
        <div className="App">
            <div className=" d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 text-white border-bottom shadow-sm">
                <img src="https://res.cloudinary.com/dtxwpton0/image/upload/v1630479071/logo_oledph.png" />
                <nav className="my-2 my-md-0 mr-md-3 d-flex   ">
                    <a className="p-2 text-warning " href="/">
                        Menos valoradas
                    </a>
                    <a className="p-2 text-warning" href="/">
                        Mas Valoradas
                    </a>
                    <p className="p-2 text-warning" href="/"
                        onClick={() => dispatch(startLogout())}
                    >

                        Logout

                    </p>
                    <p className="p-2 text-warning d-flex" href="/">
                        {name}
                    </p>
                </nav>
            </div>

            <div className="container ">
                <div className="row mt-4">
                    <ControlledCarousel />
                    {/*<div className="col-md-4 text-center py-3">
                        <img src="https://res.cloudinary.com/db9wh5uvt/image/upload/c_thumb,w_200,g_face/v1622742996/x9min2yx30d4bbwgrzpk.png" className="App-logo " alt="logo" />
                        <AddMovie />
                    </div>*/}

                    <main>

                        <ShowMovies />


                    </main>

                </div>
            </div>
        </div>
    )
}

export default AppMovies
