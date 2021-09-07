import React, { useEffect, useState } from 'react'
import { Tabs, Tab, Card, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import AddMovie from './AddMovie'
import MovieSelect from './MovieSelect'
import MoviesTasks from './MoviesTasks'
import useModal from '../../hooks/useModal';
import MovieDetail from './MovieDetail';
import { activeMovie } from '../../actions/movieAction';

const ShowMovies = () => {

    const dispatch = useDispatch()
    const { isShowing, toggle, isShowing2, toggle2 } = useModal()
    const [peliState, setPeliState] = useState([])

    const AllPelis = async () => {

        const url = 'https://api.themoviedb.org/3/movie/popular?api_key=4af50007c18dec110dc0b6a86966a25a&language=es-MX&page=1'
        const resp = await fetch(url)
        const data = await resp.json()
        const result = data.results
        setPeliState(result)

    }

    useEffect(() => {
        AllPelis()
    }, [])

    const handleDetail = (data) => {
        dispatch(activeMovie(data.id, data))
        toggle2()
    }


    const { movie } = useSelector(state => state.movie)
    const imgUrl = 'https://image.tmdb.org/t/p/w500'


    return (
        <Tabs defaultActiveKey="home" id="uncontrolled-tab-example" className="mb-3">
            <Tab eventKey="home" title="Home">
                <Row xs={1} md={4} className="g-4">
                    {peliState.map(item => (
                        <Col className="Card" key={item.id} onClick={() => handleDetail(item)}>
                            <Card style={{ width: '18rem' }} className="b-0">
                                <Card.Img className="CardImg" variant="top" src={imgUrl + item.poster_path} />
                            </Card>
                        </Col>
                    ))}
                </Row>
                <MovieDetail isShowing={isShowing2}
                    hide={toggle2} section='principal'/>
            </Tab>
            <Tab eventKey="favoritas" title="Favoritas">
                {
                    (movie.length > 0)
                        ? <div >
                            <MoviesTasks />
                            <div className="App w-100 d-flex justify-content-center mt-4 mb-5">
                                <button className="button-default mx-auto" onClick={toggle}>Agregar</button>
                                <AddMovie
                                    isShowing={isShowing}
                                    hide={toggle}
                                    non = 'New'
                                />
                            </div>
                        </div>
                        : <div className="d-flex align-items-center flex-column mb-5">
                            <MovieSelect />
                            <div className="App mt-n5">

                                <button className="button-default" onClick={toggle}>Agregar</button>
                                <AddMovie
                                    isShowing={isShowing}
                                    hide={toggle}
                                    non = 'New'
                                />
                            </div>
                        </div>

                }
            </Tab>
        </Tabs>
    )
}

export default ShowMovies
