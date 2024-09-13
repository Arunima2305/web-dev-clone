import React, { useEffect } from 'react'
import './Home.scss'
import axios from 'axios'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { BiPlay } from 'react-icons/bi'
import { AiOutlinePlus } from 'react-icons/ai'

const apiKey="884b21cbefacb9e048cf78f0b727b3d5"
const url="https://api.themoviedb.org/3"
const imgUrl="https://image.tmdb.org/t/p/original"
const upcoming="upcoming"

const Card=({img})=>{
  return(
    
      <img src={img} className='card'alt="cover"/>
    
  )
}



const Row = ({title,arr}) => {

  return (
    <div className='row' >
      <h2>{title}</h2>
      <div>
        {arr.map((item,index)=>(

        <Card key={index} img={`${imgUrl}/${item.poster_path}`}/>))}
      </div>
    </div>
  )
}

const Home = () => {

  const [upcomingMovies,setUpcomingMovies]=useState([])
  const [popularMovies,setPopularMovies]=useState([])
  const [topRatedMovies,setTopRatedMovies]=useState([])
  const [nowPlayingMovies,setNowPlayingMovies]=useState([])
  const [genre,setGenre]=useState([])

  useEffect(() => {  
  const fetchUpcoming=async()=>{
    const { data:{results} } = await axios.get(`${url}/movie/${upcoming}?api_key=${apiKey}`)
    setUpcomingMovies(results)
  }  
  fetchUpcoming()  
  });


  useEffect(() => {  
    const fetchPopular=async()=>{
      const { data:{results} } = await axios.get(`${url}/movie/popular?api_key=${apiKey}`)
      setPopularMovies(results)
    }  
    fetchPopular()  
    });



    useEffect(() => {
      const fetchTopRated=async()=>{
        const { data:{results} } = await axios.get(`${url}/movie/top_rated?api_key=${apiKey}`)
        setTopRatedMovies(results)
      }  
      fetchTopRated()  
      });
      
      useEffect(() => {
        const fetchNowPlaying=async()=>{
          const { data:{results} } = await axios.get(`${url}/movie/now_playing?api_key=${apiKey}`)
          setNowPlayingMovies(results)
        }  
        fetchNowPlaying()  
        });


        useEffect(() => {
          const getAllGenre=async()=>{
            const { data:{genres} } = await axios.get(`${url}/genre/movie/list?api_key=${apiKey}`)
            setGenre(genres)
          }  
          getAllGenre()  
          });


  return (
    <section className="home">
        <div 
          className="banner" 
          style={{
            backgroundImage: popularMovies[0] ? `url(${imgUrl}/${popularMovies[0].poster_path})` :"rgb(1, 1, 1)",

          }}
        >
           {popularMovies[0] && <h1>{popularMovies[0].original_title}</h1>}
            {popularMovies[0] && <p>{popularMovies[0].overview}</p>}

                <div>
                    <button><BiPlay /> Play  </button>
                    <button>My List <AiOutlinePlus /> </button>
                </div>
            </div>



      
        



      <Row title={"Popular Now"}arr={popularMovies}/>
       <Row title={"Now Playing"}arr={nowPlayingMovies}/>
       <Row title={"Upcoming Movies"}arr={upcomingMovies}/>
      
       <Row title={"Top Rated"}arr={topRatedMovies}/>
         <div className="genreBox">
            {genre.map((item,index)=>(
            <Link to={`/genre/${item.id}`} key={index}>{item.name}</Link>
            ))}
         </div>



      
    </section>
  );
};

export default Home