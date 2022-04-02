import "./Create_Edit.css";
import {Link} from "react-router-dom";
import outcomingImg from "./images/outcoming.png";
import React,{useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

const Create =()=>{
    //initialize state to keep track of the post request and errors
    const navigate = useNavigate();
    const [feErrors, setFeErrors] = useState("");
    const [beErrors, setBeErrors] = useState("");
    const [form, setForm] = useState({
        petName: "",
        petType: "",
        petDescription: "",
        skill1: "",
        skill2: "",
        skill3: ""
    });

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })

        if (e.target.value.length < 3 && (e.target.name === "petName" || e.target.name === "petType" || e.target.name === "petDescription")){
            setFeErrors("(*) Mandatory fields can't be less than 3 characters!");
        }
        else {
            setFeErrors("");
        }
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();
        if (form.petName === "" || form.petType === "" || form.petDescription === ""){
            setFeErrors("(*) Mandatory fields can't be empty!");
        }
        else if ( (form.petDescription.length < 3 && form.petDescription === "") || (form.petName.length < 3 && form.petName === "")|| (form.petType.length < 3 && form.petType === "")){
            setFeErrors("(*) Mandatory fields can't be less than 3 characters!");
        }
        else if (feErrors !== ""){
            navigate("/pets/new");
        }
        else{ 
        axios.post("http://localhost:8000/api/pets/new", form)
            .then(res => {
                console.log(res);
                navigate("/");
            })
            .catch(err => {
                console.log(err.response.data);
                setBeErrors(err.response.data.err.errors.petName.kind);
                console.log(err.response.data.err.errors.petName.kind);
                navigate("/pets/new");
                // alert("This Pet Name already exists!")
            });
            
        }
    }


    return(
        <div className="Main-Div">
            <div className="Title">
                <h1 style={{fontSize: "50px"}}>Pet Shelter</h1>
                <p style={{marginTop: "3em", fontSize: "20px"}}><Link to="/">back to home</Link></p>
            </div>
            <h3>Know a pet needing a home?</h3>
            <div className="Create-Pet">
                <form className="Form" onSubmit={onSubmitHandler}>
                    <div className="Left-Form">
                        <div className="Left-Input">
                            <label><span style={{color: "red"}}>*</span> Pet Name:</label>
                            <input type="text" name="petName" onChange={onChangeHandler}/>
                            {   
                                beErrors === "unique" ?
                                <p style={{color:"red", fontWeight: "bold", fontSize: "20px"}}>Name must be unique!</p>
                                :
                                ""
                            }
                        </div>
                        <div className="Left-Input">
                            <label><span style={{color: "red"}}>*</span> Pet Type:</label>
                            <input type="text" name="petType" onChange={onChangeHandler}/>
                            {   
                                beErrors ?
                                <p style={{color:"red", fontWeight: "bold", fontSize: "20px"}}>{beErrors.petType && beErrors.petType.message}</p>
                                :
                                ""
                            }
                        </div>
                        <div className="Left-Input">
                            <label><span style={{color: "red"}}>*</span> Pet Description:</label>
                            <input type="text" name="petDescription" onChange={onChangeHandler}/>
                            {   
                                beErrors ?
                                <p style={{color:"red", fontWeight: "bold", fontSize: "20px"}}>{beErrors.petDescription && beErrors.petType.message}</p>
                                :
                                ""
                            }
                        </div>
                        <div className="Left-Input">
                            <button id="Add-Btn"><img src={outcomingImg} alt="Outcoming Img"/>Add Pet</button>
                        </div>
                    </div>
                    <div className="Right-Form">
                        <p style={{fontWeight: "bold", alignSelf: "flex-start", marginLeft: "1.7em"}}>Skills(optional):</p>
                        <div className="Right-Input">
                            <label>Skill 1:</label>
                            <input type="text" name="skill1" onChange={onChangeHandler}/>
                        </div>
                        <div className="Right-Input">
                            <label>Skill 2:</label>
                            <input type="text" name="skill2" onChange={onChangeHandler}/>
                        </div>
                        <div className="Right-Input">
                            <label>Skill 3:</label>
                            <input type="text" name="skill3" onChange={onChangeHandler}/>
                        </div>
                    </div>
                </form>
                {
                    feErrors ? <p style={{color:"red", fontWeight: "bold", fontSize: "20px", textAlign: "center"}}>{feErrors}</p> : ''
                }
            </div>
        </div>
    );
}

export default Create;