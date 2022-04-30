import React,{ useState } from "react";
import { useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import styled from "styled-components";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { addToken, userData } from "../Redux/action";
import { useDispatch } from "react-redux";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';

const Main = styled.div`
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  width: 25%;
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
        width:61%;
        background-color:#8bc34a;
    } 
    & input[type="submit"]{
        cursor: pointer;
        color:white;
    }
    & .visiblebtn{
      margin-left:65px;
    }
    & h2,h4,a{
      color:#8bc34a;
    }
`;

const LogInSchema = yup.object().shape({
  Email: yup.string().required().email(),
  Password: yup.string().required(),
});

export const LogIn = () => {

  const [show,setShow] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(LogInSchema),
  });

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const onSubmit = (data) => {
    axios.post("https://petbacker.herokuapp.com/login", data).then((res)=>{
        alert("Login successfully");
        dispatch(addToken(res.data.token));
        dispatch(userData(res.data.user));
        localStorage.setItem("token",JSON.stringify(res.data.token));
        localStorage.setItem("user",JSON.stringify(res.data.user));
        navigate("/");
    }).catch((err)=>{
        alert("Please try with another email or password");
    })
  };

  const changeShow = ()=>{
    setShow(!show);
  }

  return (
    <Main>
        <h2>LOG IN</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          type={"text"}
          id="outlined-basic"
          label="Email"
          variant="outlined"
          {...register("Email")}
        />
        {errors.Email && <p>{errors.Email.message}</p>}
        <br />
        <br />
        <TextField className="visiblebtn"
          type={show ? "password" : "type"}
          id="outlined-basic"
          label="Password"
          variant="outlined"
          {...register("Password")}
        />
        <Button sx={{height:"55px"}} onClick={changeShow}>{show ? <VisibilityOffIcon/> : <VisibilityIcon/>}</Button>
        {errors.Password && <p>{errors.Password.message}</p>}
        <br />
        <br />
        <TextField className="btn" id="outlined-basic" variant="outlined" type="submit" value={"Log In"}/>
      </form>
      <h4>Don't have a PetBacker account? <Link to={"/SignUp"}>Sign-up</Link></h4>
    </Main>
  );
};
