import { Avatar, Divider, Grid, Link, ListItem, ListItemAvatar, ListItemButton, ListItemText, Toolbar, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react'


function Item(props) {
    const ques = props.ques;
    const date = new Date(ques?.created_date);
    return (
        <>
        <Grid container spacing={2}>
            <Grid item xs={1}>
                <p style={{color: '#272A2D'}}>{ques?.upvote_count} votes</p>
            </Grid>
            <Grid item xs={7}>
                <ListItem alignItems="flex-start">
                    <ListItemText
                        primary={<Link href={`http://localhost:3000/questions/${ques?.question_id}`} underline="hover" rel="noreferrer">{ques?.title}</Link>}
                        secondary={
                            <div>
                            <Typography 
                            display='flex' flexGrow={1}
                            sx={{ 
                                height: '18px',
                                width: '300px',
                                display: 'inline', 
                                overflow: 'hidden', 
                                whiteSpace:'nowrap', 
                                display:'inline-block', 
                                textOverflow: 'ellipsis' 
                        }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                                
                            >
                                {ques?.question_text}
                                
                            </Typography>
                            
                            </div>
                        }
                    />
                </ListItem>    
            </Grid>
            <Grid item xs={2}>
                <br />
                <br />
                <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="body2"
                    color="#272A2D"
                    textAlign={'center'}
                >
                    {<Link href="http://localhost:3000/" underline="hover" rel="noreferrer">{ques?.name}</Link>}
                </Typography>
            </Grid>
            <Grid item xs={2}>
                <br />
                <br />
                <Typography
                    sx={{ display: 'inline', fontSize: 12 }}
                    component="span"
                    variant="body2"

                    color="#272A2D"
                    textAlign={'center'}
                >
                    {date.toDateString()}
                </Typography>
            </Grid>
        </Grid>
        </>
    )
}


function Question(props) {
    const ques = props.ques;
    const ListItems = ques.map((q) => {
        return(
            <>
                <Item ques={q} />
                <Divider variant="inset" component="p" /> 
            </>          
        )
    })
    return (
        <div>
            {ListItems} 
        </div>
    )
}

export default Question;