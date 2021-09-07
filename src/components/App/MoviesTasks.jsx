import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Card, Row, Col } from 'react-bootstrap'
import useModal from '../../hooks/useModal';
import MovieDetail from './MovieDetail';
import { activeMovie, Delete } from '../../actions/movieAction';
import AddMovie from './AddMovie';
import { BsTrash, BsPencil } from "react-icons/bs";

const MoviesTasks = () => {

    const dispatch = useDispatch()
    const { isShowing, toggle, isShowing3, toggle3 } = useModal();
    const { movie } = useSelector(state => state.movie)

    const handleDetail = (data) => {
        dispatch(activeMovie(data.id, data))
        toggle()
    }
    const handleEdit = (data) => {
        dispatch(activeMovie(data.id, data))
        toggle3()
    }

    const handleDelete = (id) => {
        dispatch(Delete(id))
    }

    return (
        <div>
            <Row xs={1} md={4} className="g-4">
                {movie.map(item => (
                    <Col className="Card" key={item.id} >
                        <Card style={{ width: '18rem' }} className="b-0">
                            <Card.Img className="CardImg" variant="top" src={item.url} onClick={() => handleDetail(item)}/>
                            <div className='d-flex position-relative'>
                                <button className="button-default button-edit position-absolute" onClick={() => handleEdit(item)}><BsPencil /></button>
                                <AddMovie
                                    isShowing={isShowing3}
                                    hide={toggle3}
                                    non='notNew'
                                />
                                <button className="button-default button-delete position-absolute" onClick={() => handleDelete(item.id)}><BsTrash /></button>
                            </div>
                        </Card>
                        <MovieDetail isShowing={isShowing}
                            hide={toggle} section='favorites' />
                    </Col>
                ))}
            </Row>

        </div>
    )
}

export default MoviesTasks
