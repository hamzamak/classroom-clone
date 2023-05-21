import { Avatar, Divider, ListItem, ListItemAvatar, ListItemButton, ListItemText, Menu, MenuItem, Typography } from '@mui/material'
import React from 'react'
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { delete_comment } from '../../actions/comments';
import { getUserFromJWT } from '../../utils/User';

function Comment({ comment }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch()

  //const user = JSON.parse(localStorage.getItem('user'))
  const user = getUserFromJWT()
  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    dispatch(delete_comment(comment._id))
    setAnchorEl(null);
  };



  return (
    <>
      <ListItem alignItems="flex-start" sx={{ display: "flex", justifyContent: "space-between", flexDirection: "row" }}>
        <>
          <ListItemAvatar>
            <Avatar sx={{ color: "#fff", backgroundColor: "#78a" }} >{comment?.owner.firstName.charAt(0).toUpperCase()}</Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={comment?.owner.firstName + " " + comment?.owner.lastName}
            secondary={
              <>
                <Typography
                  sx={{ display: "inline" }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  {moment(comment?.createdAt).format("DD MMM YYYY , h:mm:ss a")}
                </Typography>
                <br />
                <Typography component="span" style={{ wordBreak: 'break-word' }}>

                  {
                    comment?.content
                  }

                </Typography>

              </>
            }
          />
        </>

        {
          user?.isProfesseur && (

            <div >

              <ListItemButton onClick={handleOpenMenu}>
                <MoreVertOutlinedIcon />
              </ListItemButton>
            </div>
          )
        }
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem onClick={handleDelete}>Supprimer</MenuItem>
        </Menu>



      </ListItem>
      <Divider variant="inset" />
    </>
  )
}

export default Comment