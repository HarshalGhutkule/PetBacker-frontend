import React from "react";
import { useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import styled from "styled-components";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

const Main = styled.div`
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  width: 30%;
  margin: auto;
  border-radius: 10px;
  margin-top: 2%;
  padding: 2%;
  & .inputBox{
      width:70%;
  }
  & p{
        color:red;
        text-align:left;
        margin-left:20%;
        font-size:10px;
        line-height:0%;
    }
    & .btn{
        width:70%;
        background-color:#8bc34a;
    } 
    & input[type="submit"]{
        cursor: pointer;
        color:white;
    }
    & h2,a{
      color:#8bc34a;
    }
`;

const otpSchema = yup.object().shape({
  otpOfUser: yup.string().required(),
});

export const ConfirmOtp = () => {

const userOtp = useSelector((store) => store.userOtp);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(otpSchema),
  });

  const navigate = useNavigate();

  const onSubmit = (data) => {

    data.FirstName = userOtp.FirstName
    data.LastName = userOtp.LastName
    data.Email = userOtp.Email
    data.Password = userOtp.Password
    if(data.otpOfUser != userOtp.otp){
        alert("Please Enter Correct OTP");
    }
    else{
        delete data.otpOfUser;
        axios.post("https://petbacker.herokuapp.com/register", data).then(()=>{
        alert("Registration successful");
        navigate("/LogIn");
        }).catch(()=>{
            alert("Please Enter Correct OTP");
        })
    }
  };

  return (
    <Main>
        <h2>CONFIRM OTP</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField className="inputBox"
          type={"text"}
          id="outlined-basic"
          label="Enter OTP send on registered mail"
          variant="outlined"
          {...register("otpOfUser")}
        />
        {errors.otpOfUser && <p>{errors.otpOfUser.message}</p>}
        <br />
        <br />
        <TextField className="btn" id="outlined-basic" variant="outlined" type="submit" value={"CONFIRM"}/>
      </form>
    </Main>
  );
};
