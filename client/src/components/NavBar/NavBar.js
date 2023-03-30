import { AppBar, Avatar, Box, Button, IconButton, Toolbar, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import * as CustomStyles from './styles'
import logo from '../../images/logoApp.png'
import { useLocation, useNavigate } from 'react-router-dom';
import CustomDrawer from '../DrawerNavigation/CustomDrawer';
import { useDispatch } from 'react-redux';
import { LOGOUT } from '../../constants/actionTypes';
import decode from 'jwt-decode'
function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))
  const dispatch = useDispatch()

  useEffect(() => {

    let token = user?.token

    if (token) {
      const decodedToken = decode(token)
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        logOut()

      }
    }

    setUser(JSON.parse(localStorage.getItem('user')))
  }, [location])

  const logOut = () => {
    dispatch({ type: LOGOUT })
    setUser(null)
    navigate('/auth')

  }


  return (
    <AppBar sx={{ ...CustomStyles.appBar }} position="static" color="inherit">
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>

        {
          user && (
            <IconButton sx={{ ...CustomStyles.absoluteBtnDrawer }} >

              <CustomDrawer />
            </IconButton>
          )
        }
        <div style={{ ...CustomStyles.brandContainer }} >
          <img sx={{ ...CustomStyles.image }} src={logo} alt="logo" height="90px" />

        </div>
      </div>
      <Toolbar >

        {
          user && (

            <Box sx={{ ...CustomStyles.profile }} >
              <Avatar sx={{ ...CustomStyles.purple }}  >{user.result?.firstName.charAt(0).toUpperCase()}</Avatar>
              <Typography sx={{ ...CustomStyles.userName }} variant='h6'>{user.result?.firstName + " " + user.result?.lastName} </Typography>
              <Button variant='contained' sx={{ ...CustomStyles.logout }} color='secondary' onClick={logOut} >Logout</Button>
            </Box>
          )

        }


      </Toolbar>
    </AppBar>
  )
}

export default Navbar