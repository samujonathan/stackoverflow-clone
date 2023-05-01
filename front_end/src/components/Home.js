
import { React, useState, useEffect } from "react";
import { NavBar } from "./Screen";
import axios from 'axios';
import { Box, createTheme, Grid, ListItem, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import Question from "./Question";
import { fontWeight } from "@mui/system";
import Cookies from "js-cookie";


const Home = ({ user }) => {
  const [ques, setQues] = useState([]);
  const theme = createTheme();
  const [alignment, setAlignment] = useState('upvote_count');
  useEffect(() => {
    axios.get(`http://localhost:5000/questions?order_by=${alignment}`)
    .then((res) => {
      setQues(res.data);
    })
  }, []);

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
    axios.get(`http://localhost:5000/questions?order_by=${newAlignment}`)
    .then((res) =>{
      setQues(res.data);
    })
  };
  return (
    <>
    <NavBar user={user}/>
    
    <div style={{ textAlign: "center", margin: "3rem" }}>  

      <Grid container spacing={0} >
        <Grid item xs={1.5} >
          <h2 style={{ textAlign: "left", fontWeight: "bold"}} >Top Questions</h2>
        </Grid>
        <Grid item xs={6} >
          <ToggleButtonGroup
                value={alignment}
                exclusive
                onChange={handleAlignment}
                aria-label="order-by"
            >
              <ToggleButton value="upvote_count" aria-label="upvote_count">
                Votes
              </ToggleButton>
              <ToggleButton value="created_date" aria-label="date">
                Newest
              </ToggleButton>
          </ToggleButtonGroup>
        </Grid>
      </Grid>




      <Grid container spacing={0} >
      <Grid item xs={10} >
        <ListItem style={{
          padding: theme.spacing(1),
          textAlign: 'left',
          color: theme.palette.text.secondary,
        }}>
          <Question ques={ques} /> 
        </ListItem>

      </Grid>
      </Grid>
    </div>
    
    </>

  );
};

export default Home;