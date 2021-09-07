import React from 'react';
import ReactDOM from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-bootstrap'
import { BsFillCaretRightFill, BsPlus, BsFillTrashFill} from "react-icons/bs";
import { MovieNew } from '../../actions/movieAction';

const MovieDetail = ({ isShowing, hide, section }) => {


  const dispatch = useDispatch()
  const { active } = useSelector(state => state.movie)
  const imgUrl = 'https://image.tmdb.org/t/p/w500'
  const handleAddFav = (e) => {
    e.preventDefault();
    dispatch(MovieNew(active));
  }

  return isShowing ? ReactDOM.createPortal(
    <React.Fragment>
      <div className="modal-overlay" />
      <div className="modal-wrapper" aria-modal aria-hidden tabIndex={-1} role="dialog">
        <div className="modal">
          <div className="modal-header">
            <button type="button" className="modal-close-button" data-dismiss="modal" aria-label="Close" onClick={hide}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div>
            <div className="mov-detail">
              <div className="img-detail">
                <img src={(active.url) ? active.url : imgUrl + active.poster_path} alt="Poster" />
              </div>
              <div className="mov-description">
                <h2>{active.title}</h2>
                <p>{active.overview}</p>
                <div>
                {
                  (section == 'principal')
                    ? <div><Button variant="primary"><BsFillCaretRightFill /> Ver Ahora</Button>{'  '}
                      <Button variant="warning" onClick={handleAddFav}><BsPlus /> Favoritos</Button></div>
                    : <div><Button variant="primary"><BsFillCaretRightFill /> Ver Ahora</Button></div>
                }
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>, document.body
  ) : null;
}

export default MovieDetail;
