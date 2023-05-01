import { Grid, IconButton, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';

import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import axios from 'axios';
import { useParams } from 'react-router';
import Question_vote from './Question_vote';

function Question_part({ params }) {

    const [ques, setQues] = useState([]);
    const [votes, setVote] = useState("");
    const created_date = ques?.created_date;
    const date = new Date(created_date);
    const user = JSON.parse(localStorage.getItem("user"));
    useEffect(() => {
        axios.get(`http://localhost:5000/questions/${params.id}`, { params: {
            user: `${user?.id}`
        } })
        .then((res) => {
            setQues(res.data[0][0]);
            if(res.data[1][0].vote == 1) {
                setVote("up_vote");
            } else if(res.data[1][0].vote == -1) {
                setVote("down_vote");
            }
        })
    }, [ques?.upvote_count]);

    

    return (
        <div>
            <Grid container spacing={0}>
                <Grid item xs={1}>
                    <Question_vote ques={ques} setQues={setQues} votes={votes} setVote={setVote}/>
                </Grid>
                <Grid item xs={8}>
                    <Typography variant='h5' >{ques?.title}</Typography>
                    <Typography >{date.toDateString()}</Typography>
                    <br />

                    <Typography >{ques?.question_text}</Typography>
                </Grid>
            </Grid>
        </div>
    )
}
export default Question_part;