import axios from "axios"
import { useEffect, useState } from "react"
import dog from "../../image/DOG.PNG"
import notImg from "../../image/Image_not_available.png"
import {FaHeart} from 'react-icons/fa'
import queryString from 'query-string'
// import {GrNext, GrPrevious} from 'react-icons/gr'
import Pagination from "./Pagination"
function Home () {
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
        setFilter({
            ...filter,
            page: newPage
        })
    }

    function render() {
        if(animals.length > 0) {
            return animals.map(animal => {
                // if (animal.photos.length > 0)
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
            <div className="header">
                <div className="content-header">
                    <div className="left-header">
                        <img src={dog} alt="" />
                        <p>75 Dogs</p>
                    </div>
                    <div className="right-header">
                        <button>SAVE SEARCH</button>
                    </div>
                </div>
               
            </div>
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
                            <div className="type-animals">gender</div>
                            <li>
                                <div>Any</div>
                                <ul className="sub-filter">
                                    <li>Male</li>
                                    <li>Female</li>
                                </ul>
                            </li>
                            <div className="type-animals">COAT LENGTH</div>
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
                        <Pagination
                            pagination = {pagination}
                            onPageChange = {handlePageChange}
                        />                      
                        {render()}
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default Home