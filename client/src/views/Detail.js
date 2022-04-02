import "./Detail.css";
import homeImg from "./images/home_logo.png";
import {Link, useParams} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import React, {useState, useEffect} from "react";
import axios from "axios";
import likeImg from "./images/like.png";

const Detail =()=>{

    const {id} = useParams();
    const navigate = useNavigate();
    const [pets, setPets] = useState([]);
    const [detail, setDetail] = useState([]);
    const [disable, setDisable] = useState(false);
    const [likes, setLikes] = useState(detail.likes);

    useEffect(() => {
        axios.get(`http://localhost:8000/api/pets/${id}`)
            .then(res =>
                {
                    console.log(res.data.results);
                    setDetail({
                        petName: res.data.results.petName,
                        petType: res.data.results.petType,
                        petDescription: res.data.results.petDescription,
                        skill1: res.data.results.skill1,
                        skill2: res.data.results.skill2,
                        skill3: res.data.results.skill3,
                        likes: res.data.results.likes
                    });
                    setLikes(res.data.results.likes);
                })
            .catch(err => console.log(err))
    }, []);

    useEffect(() => {
        axios.get("http://localhost:8000/api/pets/getAll")
            .then(res =>{
                    console.log(res.data);
                    console.log(res.data.results);
                    setPets(res.data.results);
                    })
            .catch(err => console.log(err))
    }, []);

    const onClickDelete = ()=>{
        axios.delete(`http://localhost:8000/api/pets/${id}/delete`)
            .then(res => {
                console.log(res);
                setPets(pets.filter(pet => pet._id !== id));
            })
            .catch(err => console.log(err));
            navigate("/");
    }
    useEffect(() => {
        axios.patch(`http://localhost:8000/api/pets/${id}/update`, {
            likes: likes
        })
            .then((res) => {
                console.log(res.data.results);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [likes]);

    const increment = (e) =>{
        e.preventDefault();
        console.log(disable);
        setLikes(likes+1);
        // window.location.reload(false);
        setDisable(!disable);
        console.log(disable);
    }

    return(
        <div className="Main-Div">
            <div className="Title">
                <h1 style={{fontSize: "50px"}}>Pet Shelter</h1>
                <p style={{marginTop: "3em", fontSize: "20px"}}><Link to="/">back to home</Link></p>
            </div>
            <div className="Detail">
                <h3>Details about: {detail.petName}</h3>
                <button id="Remove-Btn" onClick={onClickDelete}><img src={homeImg} alt="Home Img"/><span>Adopt {detail.petName}</span></button>
            </div>
            <div className="Wrapper">
                <div className="Info">
                    <h3>Pet Type: <span>{detail.petType}</span></h3>
                    <h3>Description: <span>{detail.petDescription}</span></h3>
                    <div className="Sub-Info">
                        <h3>Skills:</h3>
                        <div id="Skills">
                            <p className="skill">{detail.skill1}</p>
                            <p className="skill">{detail.skill2}</p>
                            <p className="skill">{detail.skill3}</p>
                        </div>
                    </div>
                </div>
                <div>
                    <button id="Like-Btn" onClick={increment}  disabled={disable}><img src={likeImg} alt="Like Img"/><span>Like {detail.petName}</span></button>
                    <span>{likes} Like(s)</span>
                </div>
            </div>
        </div>
    );
}

export default Detail;