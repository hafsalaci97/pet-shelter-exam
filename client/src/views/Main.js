import "./Main.css";
import {Link} from "react-router-dom";
import React, {useState, useEffect} from "react";
import axios from "axios";


const Main=()=>{
    const [pets, setPets] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:8000/api/pets/getAll")
            .then(res => {
                console.log(res.data);
                setPets(res.data.results)
            })
            .catch(err => console.log(err))
    }, [])
    return(
        <div className="Main-Div">
            <div className="Title">
                <h1 style={{fontSize: "50px"}}>Pet Shelter</h1>
                <p style={{marginTop: "3em", fontSize: "20px"}}><Link to="/pets/new">add a pet to the shelter</Link></p>
            </div>
            <h3>These pets are looking for a good home.</h3>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>type</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            pets.map((pet, i)=>{
                                return(
                                    <tr key={i}>
                                        <td>{pet.petName}</td>
                                        <td>{pet.petType}</td>
                                        <td><Link to={`/pets/${pet._id}`}>details</Link> | <Link to={`/pets/${pet._id}/edit`}>edit</Link></td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Main;