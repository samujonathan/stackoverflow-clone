import { Grid, IconButton, ToggleButton, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import { NavBar } from '../Screen';
import Question_part from './Question_part';

function Question_Page({ user }) {

    const params = useParams();
    return (
        <>
        <NavBar user={user}/>
        <div style={{ margin: "3rem" }}>
            <Question_part params={params} user={user}/>
            
        </div>
        </>
        
    )
}

export default Question_Page;