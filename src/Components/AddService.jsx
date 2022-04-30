import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import TextField from "@mui/material/TextField";
import  styled  from "styled-components";
import axios from "axios";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Box from "@mui/material/Box";

const AddServiceSchema = yup.object().shape({
  Url:yup.string().required(),
  Name:yup.string().required(),
  City:yup.string().required(),
  Address:yup.string().required(),
  Cost:yup.number().required().positive().integer(),
  Verified:yup.string().required(),
  Rating:yup.number().required().positive().integer(),
  Summary: yup.string().required(),
  NumberOfPets: yup.number().required().positive().integer(),
  AcceptedPetTypes:yup.array().required(),
  AcceptedPetSize:yup.array().required(),
  AdultSupervision:yup.string().required(),
  PlaceWhereLeftUnsupervised:yup.string().required(),
  PlaceForSleep:yup.string().required(),
  PottyBreaks:yup.number().required().positive().integer(),
  WalksPerDay:yup.number().required().positive().integer(),
  TypeOfHome:yup.string().required(),
  OutdoorArea:yup.string().required(),
  EmergencyTransport:yup.string().required(),
});

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

export const AddService = () => {

  const token = useSelector((store)=>store.token) || JSON.parse(localStorage.getItem("token"));

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(AddServiceSchema),
  });


  const onSubmit = (data) => {
    axios.post("https://petbacker.herokuapp.com/services", data,{
      headers: {
        'Authorization': `Bearer ${token}` 
      }}).then(()=>{
        alert("Data added successfully");
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
        <p className="profile">Add Pet Sitter</p>
      </Box>
    <form onSubmit={handleSubmit(onSubmit)}>
    <div>
        <TextField
          id="outlined-basic"
          className="inn"
          label="Image Url"
          variant="outlined"
          {...register("Url")}
        />
        {errors.Url && <p>{errors.Url.message}</p>}
      </div>
    <div>
        <TextField
          id="outlined-basic"
          className="inn"
          label="Name"
          variant="outlined"
          {...register("Name")}
        />
        {errors.Name && <p>{errors.Name.message}</p>}
      </div>
      <div>
      <TextField
          id="outlined-basic"
          className="inn"
          label="City"
          variant="outlined"
          {...register("City")}
        />
        {errors.City && <p>{errors.City.message}</p>}
      </div>
      <div>
      <TextField
          id="outlined-basic"
          className="inn"
          label="Address"
          variant="outlined"
          {...register("Address")}
        />
        {errors.Address && <p>{errors.Address.message}</p>}
      </div>
      <div>
      <TextField
          id="outlined-basic"
          className="inn"
          type={"number"}
          label="Cost"
          variant="outlined"
          {...register("Cost")}
        />
        {errors.Cost && <p>{errors.Cost.message}</p>}
      </div>
      <div className="boxes">
          <label htmlFor="" >Verified</label>
         <label htmlFor="Verified">
                    <input
                        {...register("Verified")}
                        type="radio"
                        name="Verified"
                        value="Yes"
                        id="outlined-basic"
                        variant="outlined"
                    />
                    Yes
                </label>
                <label htmlFor="Verified">
                    <input
                        {...register("Verified")}
                        type="radio"
                        name="Verified"
                        value="No"
                        id="outlined-basic"
                        variant="outlined"
                    />
                    No
                </label>
        {errors.Verified && <p className="psub">{errors.Verified.message}</p>}
      </div>
      <div>
      <TextField
          id="outlined-basic"
          className="inn"
          type={"number"}
          label="Rating"
          variant="outlined"
          {...register("Rating")}
        />
        {errors.Rating && <p>{errors.Rating.message}</p>}
      </div>
      <div>
        <TextField
          id="outlined-multiline-flexible"
          className="inn"
          label="Summary"
          multiline
          maxRows={4}
          variant="outlined"
          {...register("Summary")}
        />
        {errors.Summary && <p>{errors.Summary.message}</p>}
      </div>
      <div>
        <TextField
            className="inn"
            type={"number"}
          id="outlined-basic"
          label="Number of pets that will be watched at one time"
          variant="outlined"
          {...register("NumberOfPets")}
        />
        {errors.NumberOfPets && <p>{errors.NumberOfPets.message}</p>}
      </div>
      <div className="boxes">
      <label htmlFor="AcceptedPetTypes" >Accepted Pet Types</label>
      <label htmlFor="AcceptedPetTypes">
                    <input
                        {...register("AcceptedPetTypes")}
                        type="checkbox"
                        name="AcceptedPetTypes"
                        value="dog"
                        id="outlined-basic"
                        variant="outlined"
                    />
                    Dogs
                </label>
                <label htmlFor="AcceptedPetTypes">
                    <input
                        {...register("AcceptedPetTypes")}
                        type="checkbox"
                        name="AcceptedPetTypes"
                        value="cat"
                        id="outlined-basic"
                        variant="outlined"
                    />
                    Cat
                </label>
                <label htmlFor="AcceptedPetTypes">
                    <input
                        {...register("AcceptedPetTypes")}
                        type="checkbox"
                        name="AcceptedPetTypes"
                        value="bird"
                        id="outlined-basic"
                        variant="outlined"
                    />
                    Bird
                </label>
                <label htmlFor="AcceptedPetTypes">
                    <input
                        {...register("AcceptedPetTypes")}
                        type="checkbox"
                        name="AcceptedPetTypes"
                        value="snake"
                        id="outlined-basic"
                        variant="outlined"
                    />
                    Reptile
                </label>
                {errors.AcceptedPetTypes && <p className="psub">{errors.AcceptedPetTypes.message}</p>}
      </div>
      <div className="boxes">
      <label htmlFor="AcceptedPetSize" >Accepted Pet size</label>
      <label htmlFor="AcceptedPetSize">
                    <input
                        {...register("AcceptedPetSize")}
                        type="checkbox"
                        name="AcceptedPetSize"
                        value="1-5Kg"
                        id="outlined-basic"
                        variant="outlined"
                    />
                    1-5Kg
                </label>
                <label htmlFor="AcceptedPetSize">
                    <input
                        {...register("AcceptedPetSize")}
                        type="checkbox"
                        name="AcceptedPetSize"
                        value="5-10Kg"
                        id="outlined-basic"
                        variant="outlined"
                    />
                    5-10Kg
                </label>
                <label htmlFor="AcceptedPetSize">
                    <input
                        {...register("AcceptedPetSize")}
                        type="checkbox"
                        name="AcceptedPetSize"
                        value="10-20Kg"
                        id="outlined-basic"
                        variant="outlined"
                    />
                    10-20Kg
                </label>
                <label htmlFor="AcceptedPetSize">
                    <input
                        {...register("AcceptedPetSize")}
                        type="checkbox"
                        name="AcceptedPetSize"
                        value="20-40Kg"
                        id="outlined-basic"
                        variant="outlined"
                    />
                    20-40Kg
                </label>
                {errors.AcceptedPetSize && <p className="psub">{errors.AcceptedPetSize.message}</p>}
      </div>
      <div>
        <TextField
        className="inn"
          id="outlined-basic"
          label="Level of adult supervision"
          variant="outlined"
          type="text"
          {...register("AdultSupervision")}
        />
        {errors.AdultSupervision && <p>{errors.AdultSupervision.message}</p>}
      </div>
      <div>
        <TextField
        className="inn"
          id="outlined-basic"
          label="The place your pet will be if they are left unsupervised at home"
          variant="outlined"
          {...register("PlaceWhereLeftUnsupervised")}
        />
        {errors.PlaceWhereLeftUnsupervised && <p>{errors.PlaceWhereLeftUnsupervised.message}</p>}
      </div>
      <div>
        <TextField
        className="inn"
          id="outlined-basic"
          label="The place your pet will sleep at night"
          variant="outlined"
          {...register("PlaceForSleep")}
        />
        {errors.PlaceForSleep && <p>{errors.PlaceForSleep.message}</p>}
      </div>
      <div>
        <TextField
        className="inn"
          id="outlined-basic"
          label="The number of potty breaks provided per day"
          variant="outlined"
          type="number"
          {...register("PottyBreaks")}
        />
        {errors.PottyBreaks && <p>{errors.PottyBreaks.message}</p>}
      </div>
      <div>
        <TextField
        className="inn"
          id="outlined-basic"
          type="number"
          label="The number of walks provided per day"
          variant="outlined"
          {...register("WalksPerDay")}
        />
        {errors.WalksPerDay && <p>{errors.WalksPerDay.message}</p>}
      </div>
      <div>
        <TextField
        className="inn"
          id="outlined-basic"
          label="The type of home I stay in"
          variant="outlined"
          
          {...register("TypeOfHome")}
        />
        {errors.TypeOfHome && <p>{errors.TypeOfHome.message}</p>}
      </div>
      <div className="boxes">
          <label htmlFor="" >My outdoor area size</label>
         <label htmlFor="OutdoorArea">
                    <input
                        {...register("OutdoorArea")}
                        type="radio"
                        name="OutdoorArea"
                        value="Large"
                        id="outlined-basic"
                        variant="outlined"
                    />
                    Large
                </label>
                <label htmlFor="OutdoorArea">
                    <input
                        {...register("OutdoorArea")}
                        type="radio"
                        name="OutdoorArea"
                        value="Medium"
                        id="outlined-basic"
                        variant="outlined"
                    />
                    Medium
                </label>
                <label htmlFor="OutdoorArea">
                    <input
                        {...register("OutdoorArea")}
                        type="radio"
                        name="OutdoorArea"
                        value="Small"
                        id="outlined-basic"
                        variant="outlined"
                    />
                    Small
                </label>
                <label htmlFor="OutdoorArea">
                    <input
                        {...register("OutdoorArea")}
                        type="radio"
                        name="OutdoorArea"
                        value="Not-available"
                        id="outlined-basic"
                        variant="outlined"
                    />
                    Not-available
                </label>
                {errors.OutdoorArea && <p className="psub">{errors.OutdoorArea.message}</p>}
      </div>
      <div className="boxes">
          <label htmlFor="" >Emergency Transport</label>
         <label htmlFor="EmergencyTransport">
                    <input
                        {...register("EmergencyTransport")}
                        type="radio"
                        name="EmergencyTransport"
                        value="Yes"
                        id="outlined-basic"
                        variant="outlined"
                    />
                    Yes
                </label>
                <label htmlFor="EmergencyTransport">
                    <input
                        {...register("EmergencyTransport")}
                        type="radio"
                        name="EmergencyTransport"
                        value="No"
                        id="outlined-basic"
                        variant="outlined"
                    />
                    No
                </label>
        {errors.EmergencyTransport && <p className="psub">{errors.EmergencyTransport.message}</p>}
      </div>
      <TextField type={"submit"} value={"Add Pet Sitter"} className="btn"/>
    </form>
    </Main>
  );
};
