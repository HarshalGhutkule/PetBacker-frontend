import Box from "@mui/material/Box";
import styled from "styled-components";
import Stack from "@mui/material/Stack";
import { useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useReducer, useState } from "react";
import { userData } from "../Redux/action";
import { Navigate } from "react-router-dom";

const Main = styled.div`
  & .profile {
    text-align: left;
    font-size: 20px;
    padding: 1%;
  }
  & .ParentprofileInfo {
    display: flex;
    justify-content: space-around;
    border-bottom: 1px solid #e5e7eb;
    padding: 2%;
  }
  & .profileInfo1 {
    flex: 0.5;
    text-align: left;
    margin-left: 2%;
  }
  & .profileInfo2 {
    flex: 1;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
      rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
    border-radius: 5px;
    margin-right: 2%;
    padding: 1%;
  }
  & .btn {
    background-color: #8bc34a;
    width: 30%;
  }
  & input[type="submit"] {
    cursor: pointer;
    color: white;
  }
  & .ProfileInput {
    width: 60%;
    float: left;
  }
`;

export const Profile = () => {

let user = useSelector((store)=>store.userData);
if(user.length === 0){
  user = JSON.parse(localStorage.getItem("user"))
}

const token = useSelector((store)=>store.token) || JSON.parse(localStorage.getItem("token"));

const [error,setError] = useState(false);

const [userState, setUserState] = useState(user);

const reduxDispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();


  const getData = ()=>{
      axios.get(`https://petbacker.herokuapp.com/users/${user._id}`,{
        headers: {
          'Authorization': `Bearer ${token}` 
        }}).then((res)=>{
        setUserState(res.data);
        reduxDispatch(userData(res.data));
      })
  }

    useState(()=>{
        getData();
    },[])

  const onSubmit = (data) => {
    axios.patch(`https://petbacker.herokuapp.com/users/${user._id}`,data,{
        headers: {
          'Authorization': `Bearer ${token}` 
        }}).then(()=>{
        getData();
        alert("Saved!");
    }).catch(()=>alert("Something went wrong"))
  };

  const initialState = {
      Password:"",
      NewPassword:"",
      ConfirmPassword:"",
  }

  const reducer = (state,{type,payload})=>{
    switch(type){
        case "AddPassword":
            return {...state, Password:payload};
        case "AddNewPassword":
            return {...state, NewPassword:payload};
        case "ConfirmPassword":
            return {...state, ConfirmPassword:payload};
        default:
            return state;
    }
  } 

  const [state,dispatch] = useReducer(reducer,initialState);

  const {Password,NewPassword,ConfirmPassword} = state;

  const changePassword = (e) => {
    e.preventDefault();

    if(state.NewPassword != state.ConfirmPassword){
        setError(true);
    }
    else{
        axios.patch(`https://petbacker.herokuapp.com/reset/${user._id}`,state,{
        headers: {
          'Authorization': `Bearer ${token}`
        }}).then((res)=>{
            if (res.data.status !== "ok") {
                alert(res.data.message);
            }
            else{
                setError(false);
                dispatch({type:"AddPassword",payload:""})
                dispatch({type:"AddNewPassword",payload:""})
                dispatch({type:"ConfirmPassword",payload:""})
                alert("Saved!");
            }
        }).catch(()=>alert("Password is not strong"))
        }
  };

  if(token == "" || token == null){
    return <Navigate to={"/login"}/>
  }

  return (
    <Main>
      <Box sx={{ width: "100%", backgroundColor: "#f3f4f6" }}>
        <p className="profile">Profile</p>
      </Box>
      <Box sx={{ width: "100%" }}>
        <Stack className="ParentprofileInfo" direction="row" spacing={20}>
          <div className="profileInfo1">
            <h4>Profile Information</h4>
            <p>Update your account's profile information and email address.</p>
          </div>
          <div className="profileInfo2">
            <form onSubmit={handleSubmit(onSubmit)}>
              <TextField
              defaultValue={userState.FirstName}
                className="ProfileInput"
                type={"text"}
                id="outlined-basic"
                label="First Name"
                variant="outlined"
                {...register("FirstName")}
              />
              {errors.FirstName && <p>This field is required</p>}
              <br />
              <br />
              <br />
              <br />
              <TextField
              defaultValue={userState.LastName}
                className="ProfileInput"
                type={"text"}
                id="outlined-basic"
                label="Last Name"
                variant="outlined"
                {...register("LastName")}
              />
              {errors.LastName && <p>This field is required</p>}
              <br />
              <br />
              <br />
              <br />
              <TextField
              defaultValue={userState.Email}
              className="ProfileInput"
                type={"text"}
                id="outlined-basic"
                label="Email"
                variant="outlined"
                {...register("Email")}
              />
              {errors.Email && <p>This field is required</p>}
              <br />
              <br />
              <TextField
                className="btn"
                id="outlined-basic"
                variant="outlined"
                type="submit"
                value={"Save"}
              />
            </form>
          </div>
        </Stack>
      </Box>

      <Box sx={{ width: "100%" }}>
        <Stack className="ParentprofileInfo" direction="row" spacing={20}>
          <div className="profileInfo1">
            <h4>Update Password</h4>
            <p>Ensure your account is using a long, random password to stay secure.</p>
          </div>
          <div className="profileInfo2">
            <form onSubmit={changePassword}>
              <TextField
              value={Password}
                className="ProfileInput"
                type={"password"}
                id="outlined-basic"
                label="Current Password"
                variant="outlined"
                onChange={(e)=>dispatch({type:"AddPassword",payload:e.target.value})}
              />
              <br />
              <br />
              <br />
              <br />
              <TextField
              value={NewPassword}
                className="ProfileInput"
                type={"password"}
                id="outlined-basic"
                label="New Password"
                variant="outlined"
                onChange={(e)=>dispatch({type:"AddNewPassword",payload:e.target.value})}
              />
              <br />
              <br />
              <br />
              <br />
              <TextField
              value={ConfirmPassword}
              className="ProfileInput"
                type={"password"}
                id="outlined-basic"
                label="Confirm Password"
                variant="outlined"
                onChange={(e)=>dispatch({type:"ConfirmPassword",payload:e.target.value})}
              />
              {error ? <p>Passwords does not match</p> : <></>}
              <br />
              <br />
              <TextField
                className="btn"
                id="outlined-basic"
                variant="outlined"
                type="submit"
                value={"Save"}
              />
            </form>
          </div>
        </Stack>
      </Box>
    </Main>
  );
};
