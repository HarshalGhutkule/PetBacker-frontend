import * as React from "react";
import { styled as materialStyled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useSelector } from "react-redux";
import { Navigate, Link } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Pagination from '@mui/material/Pagination';

const Main = styled.div`
  & .features {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border:1px solid #c4c4c4;
      padding:1%;
  }
  & a{
    text-decoration:none;
    color:black;
  }
    & .btn{
        background-color:#8bc34a;
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


export const Home = () => {

  const token = useSelector((store) => store.token);

  let [data,setData] = React.useState([]);

  const [page, setPage] = React.useState(1);

  const [pageof, setPageof] = React.useState(1);

  let [verify, setVerify] = React.useState("");

  React.useEffect(() => {
    getData(pageof);
  }, []);

  
  const handleChange = (event) => {
    if(event.target.value === "default"){
      getData(pageof);
      setVerify("default");
    }
    else{
      data = data.filter((a)=>event.target.value == a.Verified);
      setData(data);
      setVerify(event.target.value);
    }
    
  };

  const searchBlock = (e)=>{

    if(e.target.value !== ""){
      axios.get(`https://petbacker-backend.onrender.com/city/${e.target.value}`,{
        headers: {
          'Authorization': `Bearer ${token}` 
        }}).then((res)=>{
        setData(res.data);
      }).catch((err)=>{alert(err.message)})
    }
    else{
      getData(pageof);
    }
  }

  const sorting = (a)=>{

    axios.get(`https://petbacker-backend.onrender.com?page=${pageof}&size=5&sort=${a}`,{
      headers: {
        'Authorization': `Bearer ${token}` 
      }}).then((res)=>{
      setData(res.data.service);
      setPage(res.data.totalPages)
    }).catch((err)=>{alert(err.message)})
    
  }

  const pagination = (event, value)=>{

    setPageof(value);
    getData(value);
    setVerify("");
   
  }

  const getData = (pageof) => {
    axios.get(`https://petbacker-backend.onrender.com?page=${pageof}&size=5`,{
      headers: {
        'Authorization': `Bearer ${token}` 
      }}).then((res)=>{
      setData(res.data.service);
      setPage(res.data.totalPages)
    }).catch((err)=>{alert(err.message)})
  };

  return (
    <Main>
      <div className="features">

      <TextField id="outlined-basic" label="Search by City" variant="outlined" onChange={searchBlock}/>

      <Pagination count={page} pageof={pageof} onChange={pagination}/>

        <ButtonGroup
          variant="contained"
          aria-label="outlined primary button group"
        >
          <Button className="btn" onClick={()=>sorting(1)}>Cost Asc</Button>
          <Button className="btn" onClick={()=>sorting(-1)}>Cost Desc</Button>
        </ButtonGroup>

      
        <Box sx={{ minWidth: 220 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Verified</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={verify}
              label="type"
              defaultValue={"default"}
              onChange={handleChange}
            >
              <MenuItem value={"default"}>Choose an option</MenuItem>
              <MenuItem value={"Yes"}>Yes</MenuItem>
              <MenuItem value={"No"}>No</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead sx={{ backgroundColor: "green" }}>
            <TableRow>
              <StyledTableCell>Image</StyledTableCell>
              <StyledTableCell align="center">Name</StyledTableCell>
              <StyledTableCell align="center">City</StyledTableCell>
              <StyledTableCell align="center">Address</StyledTableCell>
              <StyledTableCell align="center">Capacity</StyledTableCell>
              <StyledTableCell align="center">Cost per day</StyledTableCell>
              <StyledTableCell align="center">Verified</StyledTableCell>
              <StyledTableCell align="center">Rating</StyledTableCell>
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
            </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Main>
  );
};


