import React, { useEffect, useState } from "react";
import { useForm} from "react-hook-form";
import TextField from "@mui/material/TextField";
import styled from "styled-components";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Button from '@mui/material/Button';
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useSelector } from "react-redux";

const Main = styled.div`
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  width: 50%;
  margin: auto;
  border-radius: 10px;
  margin-top: 2%;
  padding: 2%;
  & p{
        color:red;
        text-align:left;
        margin-left:20%;
        font-size:10px;
        line-height:0%;
    }
    & .btn{
        width:50%;
        background-color:#8bc34a;
    }
    & input[type="submit"]{
        cursor: pointer;
        color:white;
    }
    & h2{
        color:#8bc34a;
    }
    & .inputAll{
        width: 80%;
    }
    & .labelofdate{
        margin-left:70px;
        float:left;
        color:#838383;
        margin-bottom:10px;
    }
`;

const PetDetailSchema = yup.object().shape({
    name:yup.string(),
    cost:yup.string(),
    onboard: yup.string().required(),
    typeOfPet: yup.string().required(),
  breed: yup.string().required(),
  sizeOfPet: yup.string().required(),
  date: yup.string().required(),
  time: yup.string().required(),
  numberOfNights:yup.number().required().positive().integer(),
  address:yup.string().required(),
  pickup:yup.string().required(),
});

export const PetDetail = () => {

    const token = useSelector((store) => store.token) || JSON.parse(localStorage.getItem("token"));

    const [dataof,setDataof] = useState({});

    const {id} = useParams();

    useEffect(()=>{
        getData();
      },[])
    
      const getData = () => {
        axios.get(`https://petbacker.herokuapp.com/services/${id}`,{
            headers: {
              'Authorization': `Bearer ${token}` 
            }}).then((res)=>{
            setDataof(res.data);
            }).catch((err)=>{alert(err.message)})
        };

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(PetDetailSchema),
  });

  
    console.log("1",errors)
  

  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log(data);
    data.name = dataof.Name;
    data.cost = dataof.Cost;
    axios.post("https://petbacker.herokuapp.com/petdetails", data,{
        headers: {
          'Authorization': `Bearer ${token}` 
        }}).then(()=>{
        alert("Detail added successfully");
        navigate("/UserDashboard");
    }).catch((err)=>{
        alert("Something went wrong");
    })
  };

  if (token == "" || token == null) {
    return <Navigate to={"/login"} />;
  }

  return (
    <Main>
        <h2>Pet Detail</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField className="inputAll"
          type={"text"}
          defaultValue={dataof.Name}
          id="outlined-basic"
          value={dataof.Name}
          variant="outlined"
          label="Pet sitter name"
          disabled
          InputLabelProps={{ shrink: true }}
          {...register("name")}
        />
        <br />
        <br />
        <TextField className="inputAll"
          type={"number"}
          defaultValue={dataof.Cost}
          disabled
          id="outlined-basic"
          value={dataof.Cost}
          variant="outlined"
          label="Cost per day"
          InputLabelProps={{ shrink: true }}
          {...register("cost")}
        />
        <br />
        <br />
        <Box sx={{margin:"auto"}}  className="inputAll">
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">How many pets do you need to board?</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="How many pets do you need to board?"
              {...register("onboard")}
            >
              <MenuItem value={"1"}>1</MenuItem>
              <MenuItem value={"2"}>2</MenuItem>
              <MenuItem value={"3"}>3</MenuItem>
              <MenuItem value={"4"}>4</MenuItem>
              <MenuItem value={"5"}>5</MenuItem>
              <MenuItem value={"6"}>6</MenuItem>
              <MenuItem value={"7"}>7</MenuItem>
              <MenuItem value={"8"}>8</MenuItem>
            </Select>
          </FormControl>
        </Box>
        {errors.onboard && <p>{errors.onboard.message}</p>}
        <br />
        <Box sx={{margin:"auto"}}  className="inputAll">
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">What type of pet is it?</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="What type of pet is it?"
              {...register("typeOfPet")}
            >
              <MenuItem value={"dog"}>Dog</MenuItem>
              <MenuItem value={"cat"}>Cat</MenuItem>
              <MenuItem value={"bird"}>Bird</MenuItem>
              <MenuItem value={"reptile"}>Reptile</MenuItem>
            </Select>
          </FormControl>
        </Box>
        {errors.typeOfPet && <p>{errors.typeOfPet.message}</p>}
        <br />
        <TextField className="inputAll"
          type={"text"}
          id="outlined-basic"
          label="What breed is it?"
          variant="outlined"
          {...register("breed")}
        />
        {errors.breed && <p>{errors.breed.message}</p>}
        <br />
        <br />
        <Box sx={{margin:"auto"}}  className="inputAll">
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">What is the size of your pet?</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="What is the size of your pet?"
              {...register("sizeOfPet")}
            >
              <MenuItem value={"1-5Kg"}>1-5Kg</MenuItem>
              <MenuItem value={"5-10Kg"}>5-10Kg</MenuItem>
              <MenuItem value={"10-20Kg"}>10-20Kg</MenuItem>
              <MenuItem value={"20-40Kg"}>20-40Kg</MenuItem>
            </Select>
          </FormControl>
        </Box>
        {errors.sizeOfPet && <p>{errors.sizeOfPet.message}</p>}
        <br />
        <label htmlFor="" className="labelofdate">Please pick starting date of the service.</label>
        <TextField className="inputAll"
          type={"date"}
          id="outlined-basic"
          variant="outlined"
          {...register("date")}
        />
        {errors.date && <p>{errors.date.message}</p>}
        <br />
        <br />
        <TextField className="inputAll"
          type={"time"}
          id="outlined-basic"
          variant="outlined"
          {...register("time")}
        />
        {errors.time && <p>{errors.time.message}</p>}
        <br />
        <br />
        <TextField className="inputAll"
          type={"number"}
          id="outlined-basic"
          variant="outlined"
          label="Number of nights required?"
          {...register("numberOfNights")}
        />
        {errors.numberOfNights && <p>{errors.numberOfNights.message}</p>}
        <br />
        <br />
        <TextField className="inputAll"
          type={"text"}
          id="outlined-basic"
          variant="outlined"
          label="Where do you need the service?"
          {...register("address")}
        />
        {errors.address && <p>{errors.address.message}</p>}
        <br />
        <br />
        <Box sx={{margin:"auto"}}  className="inputAll">
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Do you need pet pickup services?</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Do you need pet pickup services?"
              {...register("pickup")}
            >
              <MenuItem value={"Yes"}>Yes</MenuItem>
              <MenuItem value={"No"}>No</MenuItem>
            </Select>
          </FormControl>
        </Box>
        {errors.pickup && <p>{errors.pickup.message}</p>}
        <br />
        <TextField className="btn" id="outlined-basic" variant="outlined" type="submit" value={"Submit"}/>
      </form>
    </Main>
  );
};
