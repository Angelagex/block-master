import ReactDOM from 'react-dom';
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { MovieNew, startUploading, clearMovie, Edit } from '../../actions/movieAction';
import { useForm } from '../../hooks/useForm'

const AddMovie = ({ isShowing, hide, non }) => {

  const dispatch = useDispatch()
  let file = "";
  const { active } = useSelector(state => state.movie)
  const [formValue, handleInputChange, reset] = useForm(active)
  const activeId = useRef(active.id)

  useEffect(() => {
    if (active.id !== activeId.current) {
      reset(active)
    }
    activeId.current = active.id
  }, [active])


  const { title, overview } = formValue
  

  const handleFileChange = (e) => {
    file = e.target.files[0];
    if (file) {
      dispatch(startUploading(file))
    }
  }


  const handleNewMovie = (e) => {
    e.preventDefault();
    if (non === 'New') {
      dispatch(MovieNew(formValue))
      reset()
      hide()
    } else if (non == 'notNew') {
      dispatch(Edit(formValue, active.url))
    }
    dispatch(clearMovie())
  }

  const handlePictureClick = () => {
    document.querySelector('#fileSelector').click();
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
          <h2>Agrega una nueva pelicula</h2>
          <div className="card container text-center">
            <form className="card-body " onSubmit={handleNewMovie}>
              <div className="form-group">
                <input
                  type="text"
                  name="title"
                  className="form-control mt-1"
                  placeholder="Title"
                  value={title}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <input
                  type="text"
                  name="overview"
                  className="form-control mt-1"
                  placeholder="Overview"
                  value={overview}
                  onChange={handleInputChange}
                />
              </div>

              <input
                id="fileSelector"
                type="file"
                name="file"
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />
              <div>
                <input
                  type="button"
                  className="btn border-bottom shadow-sm"
                  value="Picture"
                  onClick={handlePictureClick}
                />
              </div>

              <button type="submit" className="btn btn-primary mt-2">
                Save
              </button>
            </form>
          </div>
        </div>
      </div>
    </React.Fragment>, document.body
  ) : null;
}
export default AddMovie;
