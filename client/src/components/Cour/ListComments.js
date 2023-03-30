import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { Box, Divider, ListItem, Typography } from '@mui/material';
import Comment from './Comment';

export default function ListComments({comments}) {
  const [open, setOpen] = React.useState(true);
  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List
      sx={{ width: '100%' }}
      component="div"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader" sx={{display:"flex",justifyContent:"space-between" ,flexDirection:"row",alignItems:"center"}} >
          <Typography variant='h6' sx={{fontFamily:"Nunito"}}>Les commentaires </Typography> 
          <Box>
          <ListItemButton onClick={handleClick}>
          {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          </Box>
        </ListSubheader>
      }
    >
      <Divider variant="inset"  />

      <Collapse in={open} timeout="auto" unmountOnExit>

        <List component="div" disablePadding sx={{ maxHeight: 300,overflow: 'auto'}}>
        { 
         
           comments.length > 0 ? (
            comments.slice().reverse().map((item)=> 
            <Comment key={item._id} comment={item} />)
           ) :
           (
           <ListItem>
             Pas commentaires
           </ListItem>
           )
          }
      </List>
      </Collapse>
    </List>
  );
}