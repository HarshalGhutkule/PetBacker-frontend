import * as React from "react";
import { styled as materialStyled} from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";


const Main = styled.div`
  & a{
    text-decoration:none;
    color:black;
}
`;

const StyledTableCell = materialStyled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.yellowgreen,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = materialStyled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));


export const Dashboard = () => {

  const token = useSelector((store) => store.token) || JSON.parse(localStorage.getItem("token"));

  const [data,setData] = React.useState([]);

  React.useEffect(() => {
    getData();
  }, []);

  const getData = () => {
      axios.get("https://petbacker-backend.onrender.com/services").then((res)=>{
        setData(res.data);
      }).catch((err)=>{alert(err.message)})
  };

  const deleteEntry = (id)=>{
    axios.delete(`https://petbacker-backend.onrender.com/services/${id}`,{
        headers: {
          'Authorization': `Bearer ${token}` 
        }}).then(()=>{
          getData();
        }).catch((err)=>{alert(err.message)})
  }


  if (token == "" || token == null) {
    return <Navigate to={"/login"} />;
  }

  return (
    <Main>
      <br />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead sx={{ backgroundColor: "green" }}>
            <TableRow >
              <StyledTableCell>Image</StyledTableCell>
              <StyledTableCell align="center">Name</StyledTableCell>
              <StyledTableCell align="center">City</StyledTableCell>
              <StyledTableCell align="center">Address</StyledTableCell>
              <StyledTableCell align="center">Capacity</StyledTableCell>
              <StyledTableCell align="center">Cost per day</StyledTableCell>
              <StyledTableCell align="center">Verified</StyledTableCell>
              <StyledTableCell align="center">Rating</StyledTableCell>
              <StyledTableCell align="center">Update</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row,i) => (
              
              <StyledTableRow key={row._id} align="center">
                
                <StyledTableCell component="th" scope="row">
                <Link to={`/DetailPage/${row._id}`}><img src={row.Url} alt="image" height={"150px"}/></Link>
                </StyledTableCell>
                <StyledTableCell align="center" ><Link to={`/DetailPage/${row._id}`}>{row.Name}</Link></StyledTableCell>
                <StyledTableCell align="center"><Link to={`/DetailPage/${row._id}`}>{row.City}</Link></StyledTableCell>
                <StyledTableCell align="center"><Link to={`/DetailPage/${row._id}`}>{row.Address}</Link></StyledTableCell>
                <StyledTableCell align="center"><Link to={`/DetailPage/${row._id}`}>{row.NumberOfPets}</Link></StyledTableCell>
                <StyledTableCell align="center"><Link to={`/DetailPage/${row._id}`}>INR {row.Cost}/Day</Link></StyledTableCell>
                <StyledTableCell align="center"><Link to={`/DetailPage/${row._id}`}>{row.Verified}</Link></StyledTableCell>
                <StyledTableCell align="center"><Link to={`/DetailPage/${row._id}`}>{row.Rating}</Link></StyledTableCell>
                <StyledTableCell align="center"><Link to={`/EditService/${row._id}`}><b>Edit</b></Link></StyledTableCell>
                <StyledTableCell align="center" style={{cursor:"pointer"}} onClick={()=>deleteEntry(row._id)}><b>Delete</b></StyledTableCell>
              </StyledTableRow>
              
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Main>
  );
};
