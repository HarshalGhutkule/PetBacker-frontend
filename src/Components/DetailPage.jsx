import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { Link, Navigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import Button from '@mui/material/Button';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));


export const DetailPage = () => {

  const token = useSelector((store)=>store.token) || JSON.parse(localStorage.getItem("token"));

  const {id} = useParams();

  let [data,setData] = React.useState({});

  React.useEffect(()=>{
    getData(); 
  },[])

  const getData = ()=>{
    axios.get(`https://petbacker.herokuapp.com/services/${id}`,{
      headers: {
        'Authorization': `Bearer ${token}` 
      }}).then((res)=>{
      setData(res.data);
    })
  }

  if(Object.keys(data).length === 0) return;

  return (
    <div
      style={{
        display: "flex",
        width: "80%",
        margin: "auto",
        justifyContent: "space-evenly",
        gap: "10px",
        marginTop:"20px"
      }}
    >
      <div style={{ flex: 4 }}>
        <Box sx={{ width: "100%" }}>
          <Stack spacing={2}>
            <Item>
              <Stack direction="row" spacing={2}>
                <Avatar alt={data.Name} src="/static/images/avatar/1.jpg" />
                <p style={{ padding: "1.5%", fontWeight:"600" }}>Pet Boardings At Your Service @ {data.City} by {data.Name} </p>
              </Stack>
            </Item>
            <Item>
              <p style={{fontWeight:"600" }}>{data.Name} & Guest's Pets</p>
              <img
                src={data.Url}
                alt=""
              />
            </Item>
            <Item sx={{ textAlign: "left" }}>
              <h2>About Pet Boardings At Your Service</h2>
              <h4>Summary.</h4>
              <p>{data.Summary}</p>
              <br />
              <h4>Number of pets that will be watched at one time.</h4>
              <p>{data.NumberOfPets}</p>
              <br />
              <h4>Accepted Pet Types</h4>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={{ xs: 1, sm: 2, md: 4 }}
              >
                {data.AcceptedPetTypes.map((el)=>
                <Item>
                <p>{el}</p>
                <img
                  src={`https://storage.googleapis.com/petbacker/images/cms/k2-item/${el}.png`}
                  alt="Dogs"
                />
              </Item>
                )}
              </Stack>
              <br />
              <h4>Accepted Pet size</h4>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={{ xs: 1, sm: 2, md: 4 }}
              >
                {data.AcceptedPetSize.map((el)=>
                  <Item>
                  <p>{el}</p>
                  <img
                    src={`https://storage.googleapis.com/petbacker/images/cms/k2-item/${el == "1-5Kg" ? "icon_01" : el == "5-10Kg" ? "icon_03" : el == "10-20Kg" ? "icon_04" : el == "20-40Kg" ? "icon_02" : <></>}.png`}
                    alt="1-5kg"
                  />
                </Item>
                )}
              </Stack>
              <br />
              <h4>Level of adult supervision.</h4>
              <Stack
                direction={{ xs: "row", sm: "row" }}
                spacing={{ xs: 1, sm: 2, md: 4 }}
              >
                <Item>
                  <img
                    src="https://storage.googleapis.com/petbacker/images/cms/k2-item/adult-supervision.png"
                    alt="Dogs"
                  />
                </Item>
                <Item sx={{ padding: "3%" }}>
                  <p>{data.AdultSupervision}</p>
                </Item>
              </Stack>
              <br />
              <h4>
                The place your pet will be if they are left unsupervised at
                home.
              </h4>
              <Stack
                direction={{ xs: "row", sm: "row" }}
                spacing={{ xs: 1, sm: 2, md: 4 }}
              >
                <Item>
                  <img
                    src="https://storage.googleapis.com/petbacker/images/cms/k2-item/location.png"
                    alt="Dogs"
                  />
                </Item>
                <Item sx={{ padding: "3%" }}>
                  <p>{data.PlaceWhereLeftUnsupervised}</p>
                </Item>
              </Stack>
              <br />
              <h4>The place your pet will sleep at night.</h4>
              <Stack
                direction={{ xs: "row", sm: "row" }}
                spacing={{ xs: 1, sm: 2, md: 4 }}
              >
                <Item>
                  <img
                    src="https://storage.googleapis.com/petbacker/images/cms/k2-item/bed.png"
                    alt="Dogs"
                  />
                </Item>
                <Item sx={{ padding: "3%" }}>
                  <p>{data.PlaceForSleep}</p>
                </Item>
              </Stack>
              <br />
              <h4>The number of potty breaks provided per day.</h4>
              <Stack
                direction={{ xs: "row", sm: "row" }}
                spacing={{ xs: 1, sm: 2, md: 4 }}
              >
                <Item>
                  <img
                    src="https://storage.googleapis.com/petbacker/images/cms/k2-item/poop.png"
                    alt="Dogs"
                  />
                </Item>
                <Item sx={{ padding: "3%" }}>
                  <p>{data.PottyBreaks}</p>
                </Item>
              </Stack>
              <br />
              <h4>The number of walks provided per day.</h4>
              <Stack
                direction={{ xs: "row", sm: "row" }}
                spacing={{ xs: 1, sm: 2, md: 4 }}
              >
                <Item>
                  <img
                    src="https://storage.googleapis.com/petbacker/images/cms/k2-item/paw.png"
                    alt="Dogs"
                  />
                </Item>
                <Item sx={{ padding: "3%" }}>
                  <p>{data.WalksPerDay}</p>
                </Item>
              </Stack>
              <br />
              <h4>The type of home I stay in.</h4>
              <Stack
                direction={{ xs: "row", sm: "row" }}
                spacing={{ xs: 1, sm: 2, md: 4 }}
              >
                <Item>
                  <img
                    src="https://storage.googleapis.com/petbacker/images/cms/k2-item/house.png"
                    alt="Dogs"
                  />
                </Item>
                <Item sx={{ padding: "3%" }}>
                  <p>{data.TypeOfHome}</p>
                </Item>
              </Stack>
              <br />
              <h4>My outdoor area size.</h4>
              <Stack
                direction={{ xs: "row", sm: "row" }}
                spacing={{ xs: 1, sm: 2, md: 4 }}
              >
                <Item>
                  <img
                    src="https://storage.googleapis.com/petbacker/images/cms/k2-item/outdoor.png"
                    alt="Dogs"
                  />
                </Item>
                <Item sx={{ padding: "3%" }}>
                  <p>{data.OutdoorArea}</p>
                </Item>
              </Stack>
              <br />
              <h4>Emergency transport.</h4>
              <Stack
                direction={{ xs: "row", sm: "row" }}
                spacing={{ xs: 1, sm: 2, md: 4 }}
              >
                <Item>
                  <img
                    src="https://storage.googleapis.com/petbacker/images/cms/k2-item/car.png"
                    alt="Dogs"
                  />
                </Item>
                <Item sx={{ padding: "3%" }}>
                  <p>{data.EmergencyTransport}</p>
                </Item>
              </Stack>
            </Item>
          </Stack>
        </Box>
      </div>
      <div style={{ flex: 2 }}>
        <Box sx={{ width: "100%" }}>
          <Stack spacing={2}>
            <Item style={{fontWeight:"600" }}>Services & Rates</Item>
            <Item>
            <Stack
                direction={{ xs: "row", sm: "row" }}
                spacing={{ xs: 1, sm: 2, md: 5 }}
              >
                
                  <img
                    src="https://storage.googleapis.com/petbacker/images/cms/k2-item/meet-greet.png"
                    alt="Dogs"
                  />
                
                  <div style={{display:"block"}}>
                  <p>Talk & Greet</p>
                  <p>Get to know each other first.</p>
                  <Link style={{ textDecoration: "none"}} to={"/*"}><Button style={{backgroundColor:"#8bc34a",color:"white"}}>CONTACT</Button></Link>
                  </div>
              </Stack>
            </Item>
            <Item>
            <Stack
                direction={{ xs: "row", sm: "row" }}
                spacing={{ xs: 1, sm: 2, md: 7 }}
              >
                
                  <img
                    src="https://storage.googleapis.com/petbacker/images/cms/k2-item/pet-house-sitting.png"
                    alt="Dogs"
                  />
                <div style={{display:"block"}}>
                  <p>Pet Boarding</p>
                  <p>From INR {data.Cost} /night</p>
                  <Link style={{ textDecoration: "none"}} to={`/PetDetail/${data._id}`}><Button style={{backgroundColor:"#8bc34a",color:"white"}}>Make Reservation</Button></Link>
                </div>
              </Stack>
            </Item>
            <Item>
                <p>
                Book via Petbacker to enjoy Premium Insurance, 24/7 support, booking guarantee, safe cashless payments, photo updates and more!
                </p>
            </Item>
            <Item>
                <img src="https://storage.googleapis.com/petbacker/images/cms/icons/visa.svg" alt="visa" height={"60px"} width={"60px"}/>
                <img src="https://storage.googleapis.com/petbacker/images/cms/icons/mastercard.svg" alt="visa" height={"60px"} width={"60px"}/>
                <img src="https://storage.googleapis.com/petbacker/images/cms/icons/paypal.svg" alt="visa" height={"60px"} width={"60px"}/>
                <img src="https://storage.googleapis.com/petbacker/images/cms/icons/amex.svg" alt="visa" height={"60px"} width={"60px"}/>
            </Item>
          </Stack>
        </Box>
      </div>
    </div>
  );
};
