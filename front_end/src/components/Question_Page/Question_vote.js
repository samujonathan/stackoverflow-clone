import { styled, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import React, { useState } from 'react'
import axios from 'axios';

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
    '& .MuiToggleButtonGroup-grouped': {
      margin: theme.spacing(0.5),
      border: 0,
      '&.Mui-disabled': {
        border: 0,
      },
      '&:not(:first-of-type)': {
        borderRadius: theme.shape.borderRadius,
      },
      '&:first-of-type': {
        borderRadius: theme.shape.borderRadius,
      },
    },
  }));

function Question_vote({ ques, setQues, votes, setVote}) {
    console.log(votes);
    const [voteCount, setVoteCount] = useState(0);
    const user = JSON.parse(localStorage.getItem("user"));
    var voted = false;
    if(votes != "") {
        voted = true;
    }
    const update_vote = (user_vote) => {
        axios({
            method: 'post',
            url: `http://localhost:5000/questions/update_vote`,
            data: {
                vote: user_vote,
                id: ques.question_id,
                user: user.id,
                count: ques.upvote_count,
                voted: voted
            }
        })
        .then((res) => {
            setQues(res.data[0]);
        })
        .catch((err) => {
            console.log(err);
        })
    }
    const handleClick = (event, newVote) => {
        console.log(votes, newVote)
        if(newVote == "up_vote") {
            setVote(newVote);
            update_vote("up_vote")
        } else if(newVote == "down_vote"){
            setVote(newVote);
            update_vote("down_vote");
        }
    }

    

    return (
        <div>
        <StyledToggleButtonGroup
            orientation='vertical'
            value={votes}
            exclusive
            onChange={handleClick}
            aria-label="order-by"
        >
            <ToggleButton value="up_vote" aria-label="up_vote" >
                <ArrowDropUpIcon/>
            </ToggleButton>
            <Typography sx={{ p: '2' }}>{ques?.upvote_count} votes</Typography>
            <ToggleButton value="down_vote" aria-label="down_vote">
                <ArrowDropDownIcon />
            </ToggleButton>
        </StyledToggleButtonGroup>
        </div>
    )
}

export default Question_vote;
