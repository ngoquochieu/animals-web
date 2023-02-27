import axios from "axios"
import Header from "../Layout/Header"
import Footer from "../Layout/Footer"
import Pagination from "../Pagination/Pagination"
import { useEffect, useState } from "react"
import notImg from "../../image/Image_not_available.png"
import {FaHeart} from 'react-icons/fa'
import queryString from 'query-string'
import { useNavigate } from "react-router-dom"

function Home () {
    const navigate = useNavigate()
    const [animals, setAnimails] = useState([])
    const [pagination, setPagination] = useState({
        current_page: 1,
        count_per_page: 20,
        total_pages:1
    })
    const [filter, setFilter] = useState({
        page:1,
        limit: pagination.count_per_page
    })
    window.addEventListener('load', () => {
        localStorage.removeItem('access_token')
        navigate('/')
    })

    /*Get data from API*/
    useEffect(() => {
        const accessToken = localStorage.getItem('access_token')
        let config = {
            headers: {
                'Authorization':'Bearer ' + accessToken,
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept':'application/json'
            }
        }
        axiosAnimals(config)
        
    }, [filter])
    
    // Function get data from API
    const axiosAnimals = async (config) => {
        try {
            const paramString = queryString.stringify(filter)
            const url = `https://api.petfinder.com/v2/animals?${paramString}`
            const data = await axios.get(url, config)
            setAnimails(data.data.animals)
            setPagination(data.data.pagination)
        } catch (error) {
            console.log(error)
        }
    }      
    
    function handlePhoto (animal) {
        if(animal.photos.length !== 0)
            return <img src={animal.photos[0].large} alt = ""/>
        else
            return <img src={notImg} alt=""/>
    }
    
    function handlePageChange(newPage) {
        setFilter({...filter, page: newPage})
    }

    function render() {
        if(animals.length > 0) {
            return animals.map(animal => {
                return <>
                    <div className="animal">
                        <button className="btn-like"><FaHeart/></button>
                        {handlePhoto(animal)}
                        <div className="content-animal">
                            <div className="name-animal">
                                {animal.name}
                            </div>
                            <div className="info-animal">
                               {animal.age} - {animal.breeds.primary}
                            </div>
                        </div>
                    </div>
                </>
          
            })
        }
    }
    return <>
        <div className="home">
            <Header animals = {pagination.total_count}/>
            <div className="container">
                <div className="content">
                    <div className="left-container">
                        <ul className="filter">
                            <div className="type-animals">AGE</div>
                            <li>
                                <div>Any</div>
                                <ul className="sub-filter">
                                    <li>Puppy</li>
                                    <li>Young</li>
                                    <li>Adult</li>
                                    <li>Senior</li>
                                </ul>
                            </li>
                            <div className="type-animals">Size</div>
                            <li>
                                <div>Any</div>
                                <ul className="sub-filter">
                                    <li>Small</li>
                                    <li>Medium</li>
                                    <li>Large</li>
                                    <li>Extra Large</li>
                                </ul>
                            </li>
                            <div className="type-animals">Gender</div>
                            <li>
                                <div>Any</div>
                                <ul className="sub-filter">
                                    <li>Male</li>
                                    <li>Female</li>
                                </ul>
                            </li>
                            <div className="type-animals">Coat Length</div>
                            <li>
                                <div>Any</div>
                                <ul className="sub-filter">
                                    <li>Hairless</li>
                                    <li>Short</li>
                                    <li>Medium</li>
                                    <li>Long</li>
                                    <li>Wire</li>
                                    <li>Curly</li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                    <div className="right-container">        
                        {render()}
                        <Pagination
                            pagination = {pagination}
                            onPageChange = {handlePageChange}
                        />        
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    </>
}

export default Home