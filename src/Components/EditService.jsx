import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import TextField from "@mui/material/TextField";
import  styled  from "styled-components";
import axios from "axios";
import { useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
import Box from "@mui/material/Box";


const Main = styled.div`
    margin-top:2%;
    margin-bottom:10%;

    & .profile {
      text-align: left;
      font-size: 20px;
      padding: 1%;
      color:#8bc34a;
    }
    & .inn{
        width:60%;
        margin-bottom:2%;
    }
    & .btn{
        cursor: pointer;
        width:20%;
        float:left;
        margin-left:20%;
        background-color:#8bc34a;
        font-weight:600;
    }
    & p{
        color:red;
        text-align:left;
        margin-left:20%;
        margin-top:-1%;
        font-size:10px;
    }
    & .psub{
        color:red;
        text-align:left;
        margin-top:0%;
        margin-left:0%;
        font-size:10px;
    }
    & .boxes{
        text-align:left; 
        margin-left:20%;
        margin-bottom:2%;
        color:#787878;
    }
    & input[type="radio"],input[type="checkbox"]{
        margin-left:2%;
    }
    & input[type="submit"]{
        cursor: pointer;
        color:white;
    }

`;

export const EditService = () => {

  const token = useSelector((store)=>store.token) || JSON.parse(localStorage.getItem("token"));

  const [data,setData] = React.useState({});

  const {id} = useParams();

  let initalState;

  if(Object.keys(data).length != 0){
    initalState = {
      Url:data.Url,
      Name:data.Name,
      City:data.City,
      Address:data.Address,
      Cost:data.Cost,
      Verified:data.Verified,
      Rating:data.Rating,
      Summary: data.Summary,
      NumberOfPets: data.NumberOfPets,
      AcceptedPetTypes:data.AcceptedPetTypesdata,
      AcceptedPetSize:data.AcceptedPetSize,
      AdultSupervision:data.AdultSupervision,
      PlaceWhereLeftUnsupervised:data.PlaceWhereLeftUnsupervised,
      PlaceForSleep:data.PlaceForSleep,
      PottyBreaks:data.PottyBreaks,
      WalksPerDay:data.WalksPerDay,
      TypeOfHome:data.TypeOfHome,
      OutdoorArea:data.OutdoorArea,
      EmergencyTransport:data.EmergencyTransport,
  }
  };

const reducer = (state,{type,payload})=>{
    switch(type){
        case "Url":
            return {...state,Url:payload};
        case "Name":
            return {...state,Name:payload};
        case "City":
            return {...state,City:payload};
        case "Address":
            return {...state,Address:payload};
        case "Cost":
            return {...state,Cost:payload};
        case "Verified":
            return {...state,Verified:payload};
        case "Rating":
            return {...state,Rating:payload};
        case "Summary":
            return {...state,Summary:payload};
        case "NumberOfPets":
            return {...state,NumberOfPets:payload};
        case "AcceptedPetTypes":
            return {...state,AcceptedPetTypes:payload};
        case "AcceptedPetSize":
            return {...state,AcceptedPetSize:payload};
        case "AdultSupervision":
            return {...state,AdultSupervision:payload};
        case "PlaceWhereLeftUnsupervised":
            return {...state,PlaceWhereLeftUnsupervised:payload};
        case "PlaceForSleep":
            return {...state,PlaceForSleep:payload};
        case "PottyBreaks":
            return {...state,PottyBreaks:payload};
        case "WalksPerDay":
            return {...state,WalksPerDay:payload};
        case "TypeOfHome":
            return {...state,TypeOfHome:payload};
        case "OutdoorArea":
            return {...state,OutdoorArea:payload};
        case "EmergencyTransport":
            return {...state,EmergencyTransport:payload};
        default:
            return state;
    }
}

    const [state,dispatch] = React.useReducer(reducer,initalState);


  useEffect(()=>{
    getData();
  },[])

  const getData = () => {
    axios.get(`https://petbacker.herokuapp.com/services/${id}`,{
        headers: {
          'Authorization': `Bearer ${token}` 
        }}).then((res)=>{
        setData(res.data);
        }).catch((err)=>{alert(err.message)})
    };


  const onSubmit = (e) => {
    e.preventDefault();
    axios.post(`https://petbacker.herokuapp.com/services/${id}`, data,{
      headers: {
        'Authorization': `Bearer ${token}` 
      }}).then(()=>{
        alert("Data updated successfully");
    }).catch((err)=>{
      alert("Something went wrong")
    })
  };



  if(token == "" || token == null){
    return <Navigate to={"/login"}/>
  }

  return (
      <Main>
        <Box sx={{ width: "100%", backgroundColor: "#f3f4f6" }}>
        <p className="profile">Update Pet Sitter Info</p>
      </Box>
    <form>
    <div>
        <TextField
        value={state && state.Url}
          id="outlined-basic"
          className="inn"
          label="Image Url"
          variant="outlined"
          onChange={(e)=>dispatch({type:"Url",payload:e.target.value})}
        />
      </div>
    <div>
        <TextField
        value={state && state.Name}
          id="outlined-basic"
          className="inn"
          label="Name"
          variant="outlined"
          onChange={(e)=>dispatch({type:"Name",payload:e.target.value})}
        />
      </div>
      <div>
      <TextField
        value={state && state.City}
          id="outlined-basic"
          className="inn"
          label="City"
          variant="outlined"
          onChange={(e)=>dispatch({type:"City",payload:e.target.value})}
        />
      </div>
      <div>
      <TextField
      value={state && state.Address}
          id="outlined-basic"
          className="inn"
          label="Address"
          variant="outlined"
          onChange={(e)=>dispatch({type:"Address",payload:e.target.value})}
        />
      </div>
      <div>
      <TextField
      value={state && state.Cost}
          id="outlined-basic"
          className="inn"
          type={"number"}
          label="Cost"
          variant="outlined"
          onChange={(e)=>dispatch({type:"Cost",payload:e.target.value})}
        />
      </div>
      <div className="boxes">
          <label htmlFor="" >Verified</label>
         <label htmlFor="Verified">
                    <input
                        type="radio"
                        name="Verified"
                        value={state && state.Verified}
                        id="outlined-basic"
                        variant="outlined"
                        onChange={(e)=>dispatch({type:"Verified",payload:e.target.value})}
                    />
                    Yes
                </label>
                <label htmlFor="Verified">
                    <input
                        type="radio"
                        name="Verified"
                        value={state && state.Verified}
                        id="outlined-basic"
                        variant="outlined"
                        onChange={(e)=>dispatch({type:"Verified",payload:e.target.value})}
                    />
                    No
                </label>
      </div>
      <div>
      <TextField
      value={state && state.Rating}
          id="outlined-basic"
          className="inn"
          type={"number"}
          label="Rating"
          variant="outlined"
          onChange={(e)=>dispatch({type:"Rating",payload:e.target.value})}
        />
      </div>
      <div>
        <TextField
        value={state && state.Summary}
          id="outlined-multiline-flexible"
          className="inn"
          label="Summary"
          multiline
          maxRows={4}
          variant="outlined"
          onChange={(e)=>dispatch({type:"Summary",payload:e.target.value})}
        />
      </div>
      <div>
        <TextField
            className="inn"
            type={"number"}
          id="outlined-basic"
          label="Number of pets that will be watched at one time"
          variant="outlined"
          value={state && state.NumberOfPets}
          onChange={(e)=>dispatch({type:"NumberOfPets",payload:e.target.value})}
        />
      </div>
      <div className="boxes">
      <label htmlFor="AcceptedPetTypes" >Accepted Pet Types</label>
      <label htmlFor="AcceptedPetTypes">
                    <input
                    defaultValue={state && state.AcceptedPetTypes[0]}
                        type="checkbox"
                        name="AcceptedPetTypes"
                        value="dog"
                        id="outlined-basic"
                        variant="outlined"
                        onChange={(e)=>dispatch({type:"AcceptedPetTypes",payload:e.target.value})}

                    />
                    Dogs
                </label>
                <label htmlFor="AcceptedPetTypes">
                    <input
                    defaultValue={state && state.AcceptedPetTypes[1]}
                        type="checkbox"
                        name="AcceptedPetTypes"
                        value="cat"
                        id="outlined-basic"
                        variant="outlined"
                        onChange={(e)=>dispatch({type:"AcceptedPetTypes",payload:e.target.value})}
                    />
                    Cat
                </label>
                <label htmlFor="AcceptedPetTypes">
                    <input
                    defaultValue={state && state.AcceptedPetTypes[2]}
                        type="checkbox"
                        name="AcceptedPetTypes"
                        value="bird"
                        id="outlined-basic"
                        variant="outlined"
                        onChange={(e)=>dispatch({type:"AcceptedPetTypes",payload:e.target.value})}
                    />
                    Bird
                </label>
                <label htmlFor="AcceptedPetTypes">
                    <input
                    defaultValue={state && state.AcceptedPetTypes[3]}
                        type="checkbox"
                        name="AcceptedPetTypes"
                        value="snake"
                        id="outlined-basic"
                        variant="outlined"
                        onChange={(e)=>dispatch({type:"AcceptedPetTypes",payload:e.target.value})}
                    />
                    Reptile
                </label>
      </div>
      <div className="boxes">
      <label htmlFor="AcceptedPetSize" >Accepted Pet size</label>
      <label htmlFor="AcceptedPetSize">
                    <input
                    defaultValue={state && state.AcceptedPetSize[0]}
                        type="checkbox"
                        name="AcceptedPetSize"
                        value="1-5Kg"
                        id="outlined-basic"
                        variant="outlined"
                        onChange={(e)=>dispatch({type:"AcceptedPetSize",payload:e.target.value})}
                    />
                    1-5Kg
                </label>
                <label htmlFor="AcceptedPetSize">
                    <input
                    defaultValue={state && state.AcceptedPetSize[1]}
                        type="checkbox"
                        name="AcceptedPetSize"
                        value="5-10Kg"
                        id="outlined-basic"
                        variant="outlined"
                        onChange={(e)=>dispatch({type:"AcceptedPetSize",payload:e.target.value})}
                    />
                    5-10Kg
                </label>
                <label htmlFor="AcceptedPetSize">
                    <input
                    defaultValue={state && state.AcceptedPetSize[2]}
                        type="checkbox"
                        name="AcceptedPetSize"
                        value="10-20Kg"
                        id="outlined-basic"
                        variant="outlined"
                        onChange={(e)=>dispatch({type:"AcceptedPetSize",payload:e.target.value})}
                    />
                    10-20Kg
                </label>
                <label htmlFor="AcceptedPetSize">
                    <input
                    defaultValue={state && state.AcceptedPetSize[3]}
                        type="checkbox"
                        name="AcceptedPetSize"
                        value="20-40Kg"
                        id="outlined-basic"
                        variant="outlined"
                        onChange={(e)=>dispatch({type:"AcceptedPetSize",payload:e.target.value})}
                    />
                    20-40Kg
                </label>
      </div>
      <div>
        <TextField
        value={state && state.AdultSupervision}
        className="inn"
          id="outlined-basic"
          label="Level of adult supervision"
          variant="outlined"
          type="text"
          onChange={(e)=>dispatch({type:"AdultSupervision",payload:e.target.value})}
        />
      </div>
      <div>
        <TextField
        value={state && state.PlaceWhereLeftUnsupervised}
        className="inn"
          id="outlined-basic"
          label="The place your pet will be if they are left unsupervised at home"
          variant="outlined"
          onChange={(e)=>dispatch({type:"PlaceWhereLeftUnsupervised",payload:e.target.value})}
        />
      </div>
      <div>
        <TextField
        value={state && state.PlaceForSleep}
        className="inn"
          id="outlined-basic"
          label="The place your pet will sleep at night"
          variant="outlined"
          onChange={(e)=>dispatch({type:"PlaceForSleep",payload:e.target.value})}
        />
      </div>
      <div>
        <TextField
         value={state && state.PottyBreaks}
        className="inn"
          id="outlined-basic"
          label="The number of potty breaks provided per day"
          variant="outlined"
          type="number"
          onChange={(e)=>dispatch({type:"PottyBreaks",payload:e.target.value})}
        />
      </div>
      <div>
        <TextField
        value={state && state.WalksPerDay}
        className="inn"
          id="outlined-basic"
          type="number"
          label="The number of walks provided per day"
          variant="outlined"
          onChange={(e)=>dispatch({type:"WalksPerDay",payload:e.target.value})}
        />
      </div>
      <div>
        <TextField
        value={state && state.TypeOfHome}
        className="inn"
          id="outlined-basic"
          label="The type of home I stay in"
          variant="outlined"
          onChange={(e)=>dispatch({type:"TypeOfHome",payload:e.target.value})}
        />
      </div>
      <div className="boxes">
          <label htmlFor="" >My outdoor area size</label>
         <label htmlFor="OutdoorArea">
                    <input
                    defaultValue={state && state.OutdoorArea}
                        type="radio"
                        name="OutdoorArea"
                        value="Large"
                        id="outlined-basic"
                        variant="outlined"
                        onChange={(e)=>dispatch({type:"OutdoorArea",payload:e.target.value})}
                    />
                    Large
                </label>
                <label htmlFor="OutdoorArea">
                    <input
                    defaultValue={state && state.OutdoorArea}
                        type="radio"
                        name="OutdoorArea"
                        value="Medium"
                        id="outlined-basic"
                        variant="outlined"
                        onChange={(e)=>dispatch({type:"OutdoorArea",payload:e.target.value})}
                    />
                    Medium
                </label>
                <label htmlFor="OutdoorArea">
                    <input
                    defaultValue={state && state.OutdoorArea}
                        type="radio"
                        name="OutdoorArea"
                        value="Small"
                        id="outlined-basic"
                        variant="outlined"
                        onChange={(e)=>dispatch({type:"OutdoorArea",payload:e.target.value})}
                    />
                    Small
                </label>
                <label htmlFor="OutdoorArea">
                    <input
                    defaultValue={state && state.OutdoorArea}
                        type="radio"
                        name="OutdoorArea"
                        value="Not-available"
                        id="outlined-basic"
                        variant="outlined"
                        onChange={(e)=>dispatch({type:"OutdoorArea",payload:e.target.value})}
                    />
                    Not-available
                </label>
      </div>
      <div className="boxes">
          <label htmlFor="" >Emergency Transport</label>
         <label htmlFor="EmergencyTransport">
                    <input
                    defaultValue={state && state.EmergencyTransport}
                        type="radio"
                        name="EmergencyTransport"
                        value="Yes"
                        id="outlined-basic"
                        variant="outlined"
                        onChange={(e)=>dispatch({type:"EmergencyTransport",payload:e.target.value})}
                    />
                    Yes
                </label>
                <label htmlFor="EmergencyTransport">
                    <input
                    defaultValue={state && state.EmergencyTransport}
                        type="radio"
                        name="EmergencyTransport"
                        value="No"
                        id="outlined-basic"
                        variant="outlined"
                        onChange={(e)=>dispatch({type:"EmergencyTransport",payload:e.target.value})}
                    />
                    No
                </label>
      </div>
      <TextField type={"submit"} onClick={onSubmit} value={"Update Pet Sitter"} className="btn"/>
    </form>
    </Main>
  );
};
