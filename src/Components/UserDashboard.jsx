import Box from "@mui/material/Box";
import styled from "styled-components";
import Stack from "@mui/material/Stack";
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from "axios";
import { useSelector } from "react-redux";
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import { Link, Navigate } from "react-router-dom";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

const Main = styled.div`

    & a{
        text-decoration:none;
        color:black;
    }

  & .dashboard {
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
    flex: 3;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
      rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
    border-radius: 5px;
    margin-right: 2%;
    padding: 1%;
  }
`;


export const UserDashboard = () => {

    const token = useSelector((store) => store.token) || JSON.parse(localStorage.getItem("token"));
    let userData = useSelector((store) => store.userData);

    if(userData.length === 0){
      userData = JSON.parse(localStorage.getItem("user"));
    }

    const [data,setData] = React.useState([]);

    React.useEffect(()=>{
        getData();
      },[])
    
      const getData = () => {
        axios.get(`https://petbacker-backend.onrender.com/petdetails/${userData._id}`,{
            headers: {
              'Authorization': `Bearer ${token}` 
            }}).then((res)=>{
            setData(res.data);
            }).catch((err)=>{alert(err.message)})
        };

        const deleteEntry = (id)=>{
          axios.delete(`https://petbacker-backend.onrender.com/petdetails/${id}`,{
              headers: {
                'Authorization': `Bearer ${token}` 
              }}).then(()=>{
                getData();
              }).catch((err)=>{alert(err.message)})
        }

        if (token == "" || token == null) {
            return <Navigate to={"/login"} />;
        }


    return <Main>
        <Box sx={{ width: "100%", backgroundColor: "#f3f4f6" }}>
        <p className="dashboard">Dashboard</p>
      </Box>
      <Box sx={{ width: "100%" }}>
        
        <Stack className="ParentprofileInfo" direction="row" spacing={20}>
          <div className="profileInfo1">
            <h4>Reservation</h4>
            <p>See all status of Reservation</p>
          </div>
          <div className="profileInfo2">
            
            <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell>Pet Sitter</TableCell>
                    <TableCell align="center">Cost</TableCell>
                    <TableCell align="center">Date</TableCell>
                    <TableCell align="center">Time</TableCell>
                    <TableCell align="center">Status</TableCell>
                    <TableCell align="center">Contact</TableCell>
                    <TableCell align="center">Cancel</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {data.map((row) => (
                    <TableRow
                    key={row._id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                    <TableCell component="th" scope="row">
                        {row.name}
                    </TableCell>
                    <TableCell align="center">INR {row.cost}/Day</TableCell>
                    <TableCell align="center">{row.date}</TableCell>
                    <TableCell align="center">{row.time}</TableCell>
                    <TableCell align="center">{row.status === "true"? <CheckCircleIcon sx={{color:"green"}}/> : 
                    <HourglassBottomIcon sx={{color:"red"}}/>
                    }</TableCell>
                    <TableCell align="center">{row.status === "true"? <Link to={"/*"}>Call Now</Link>  : <>-</>}</TableCell>
                    <TableCell align="center" style={{cursor:"pointer"}} onClick={()=>deleteEntry(row._id)}><CancelIcon sx={{color:"red"}}/></TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>

          </div>
        </Stack>
      
      </Box>
    </Main>
}