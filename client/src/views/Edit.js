import "./Create_Edit.css";
import {Link} from "react-router-dom";
import editImg from "./images/edit.png";
import React,{useState, useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";

const Edit=()=>{
    const navigate = useNavigate();
    const {id} = useParams();
    const [feErrors, setFeErrors] = useState("");
    const [beErrors, setBeErrors] = useState("");
    const [updateForm, setUpdateForm] = useState({
        petName: "",
        petType: "",
        petDescription: "",
        skill1: "",
        skill2: "",
        skill3: ""
    });

    const onChangeHandler = (e) => {
        setUpdateForm({
            ...updateForm,
            [e.target.name]: e.target.value
        })

        if (e.target.value.length < 3 && (e.target.name === "petName" || e.target.name === "petType" || e.target.name === "petDescription")){
            setFeErrors("(*) Mandatory fields can't be less than 3 characters!");
        }
        else {
            setFeErrors("");
        }
    }

    useEffect(() => {
        axios.get(`http://localhost:8000/api/pets/${id}`)
            .then(res =>
                {console.log(res.data.results);
                    setUpdateForm({
                        petName: res.data.results.petName,
                        petType: res.data.results.petType,
                        petDescription: res.data.results.petDescription,
                        skill1: res.data.results.skill1,
                        skill2: res.data.results.skill2,
                        skill3: res.data.results.skill3
                    })})
            .catch(err => console.log(err))
    }, []);

    const onSubmitHandler=(e)=>{
        e.preventDefault();
        if (updateForm.petName === "" || updateForm.petType === "" || updateForm.petDescription === ""){
            setFeErrors("(*) Mandatory fields can't be empty!");
        }
        else if ( (updateForm.petDescription.length < 3 && updateForm.petDescription === "") || (updateForm.petName.length < 3 && updateForm.petName === "")|| (updateForm.petType.length < 3 && updateForm.petType === "")){
            setFeErrors("(*) Mandatory fields can't be less than 3 characters!");
        }
        else if (feErrors !== ""){
            navigate("/pets/new");
        }
        else{ 
        axios.patch(`http://localhost:8000/api/pets/${id}/update`, updateForm)
            .then(res=>{
                console.log(res);
                navigate("/");})
            .catch(err=>{
                console.log(err.response.data);
                setBeErrors(err.response.data.err.errors.petName.kind);
                console.log(beErrors);
                navigate(`/pets/${id}/edit`);
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
        <h3>Edit {updateForm.petName}</h3>
        <div className="Create-Pet">
            <form className="Form" onSubmit={onSubmitHandler}>
                <div className="Left-Form">
                    <div className="Left-Input">
                        <label>Pet Name:</label>
                        <input type="text" name="petName" value={updateForm.petName} onChange={onChangeHandler}/>
                        {   
                            beErrors ?
                            <p style={{color:"red", fontWeight: "bold", fontSize: "20px"}}>Pet name must be unique!</p>
                            :
                            ""
                        }
                    </div>
                    <div className="Left-Input">
                        <label>Pet Type:</label>
                        <input type="text" name="petType" value={updateForm.petType} onChange={onChangeHandler}/>
                    </div>
                    <div className="Left-Input">
                        <label>Pet Description:</label>
                        <input type="text" name="petDescription" value={updateForm.petDescription} onChange={onChangeHandler}/>
                    </div>
                    <div className="Left-Input">
                        <button id="Add-Btn"><img src={editImg} alt="Edit Img"/>Edit Pet</button>
                    </div>
                </div>
                <div className="Right-Form">
                    <p style={{fontWeight: "bold", alignSelf: "flex-start", marginLeft: "1.7em"}}>Skills(optional):</p>
                    <div className="Right-Input">
                        <label>Skill 1:</label>
                        <input type="text" name="skill1" value={updateForm.skill1} onChange={onChangeHandler}/>
                    </div>
                    <div className="Right-Input">
                        <label>Skill 2:</label>
                        <input type="text" name="skill2" value={updateForm.skill2} onChange={onChangeHandler}/>
                    </div>
                    <div className="Right-Input">
                        <label>Skill 3:</label>
                        <input type="text" name="skill3" value={updateForm.skill3} onChange={onChangeHandler}/>
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

export default Edit;