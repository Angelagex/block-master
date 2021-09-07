import React, { useState } from 'react'
import { useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel'
import { Button } from 'react-bootstrap'
import { BsFillCaretRightFill, BsPlus } from "react-icons/bs";
import { useDispatch } from 'react-redux';
import { MovieNew } from '../../actions/movieAction';

const ControlledCarousel = () => {

  const [index, setIndex] = useState(0);

  

  const [Car1, setCar1] = useState({})
  const [Car2, setCar2] = useState({})
  const [Car3, setCar3] = useState({})

  const pelInfo = async () => {

    const url = 'https://api.themoviedb.org/3/movie/popular?api_key=4af50007c18dec110dc0b6a86966a25a&language=es-MX&page=1'
    const resp = await fetch(url)
    const data = await resp.json()
    const result = data.results
   
    setCar1(result[0])
    setCar2(result[1])
    setCar3(result[2])

  }

  const selectCar = (Car) => {
    if(Car===1) return Car1
    else if (Car===2) return Car2
    else if (Car===3) return Car3
  }

  const dispatch = useDispatch()
  const handleAddFav = (Car) => {
    dispatch(MovieNew(selectCar(Car)));
  }

  useEffect(() => {
    pelInfo()
  }, [])

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  const imgUrl = 'https://image.tmdb.org/t/p/w500'

  return (


    <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item>
        <img
          className="d-block w-50 mx-auto"
          src={imgUrl + Car1.backdrop_path}
          alt='Third slide'
        />

        <Carousel.Caption>
          <h3>{Car1.title}</h3>
          <Button variant="primary"><BsFillCaretRightFill /> Ver Ahora</Button>{'  '}
          <Button variant="warning" onClick={() => handleAddFav(1)}><BsPlus /> Favoritos</Button>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-50 mx-auto"
          src={imgUrl + Car2.backdrop_path}
          alt="Second slide"
        />

        <Carousel.Caption>
          <h3>{Car2.title}</h3>
          <Button variant="primary"><BsFillCaretRightFill /> Ver Ahora</Button>{'  '}
          <Button variant="warning" onClick={() => handleAddFav(2)}><BsPlus /> Favoritos</Button>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-50 mx-auto"
          src={imgUrl + Car3.backdrop_path}
          alt="Third slide"
        />

        <Carousel.Caption>  
          <h3>{Car3.title}</h3>
          <Button variant="primary"><BsFillCaretRightFill /> Ver Ahora</Button>{'  '}
          <Button variant="warning" onClick={() => handleAddFav(3)}><BsPlus /> Favoritos</Button>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default ControlledCarousel;
