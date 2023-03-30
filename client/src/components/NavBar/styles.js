import { deepPurple,amber } from "@mui/material/colors"
import { createTheme } from "@mui/material"

const theme = createTheme({
breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 960,
        lg: 1280,
        xl: 1920,
      },
    },
  })
// navbar


export const appBar= {
    borderRadius: 4,
    margin: '10px 0',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '5px 30px',
    flexDirection: { sm: 'column', md :"row"}
    //ou 
    // [theme.breakpoints.down('sm')]: {
    //   flexDirection: 'column',
    // },
  }
  export const heading= {
    color:  (theme) => theme.palette.primary.main,
    textDecoration: 'none',
    fontSize: '2em',
    fontWeight: 300,
  }
  export const image= {
    marginLeft: '10px',
    marginTop: '5px',
    
  }
 export const  toolbar= {
    display: 'flex',  
    justifyContent: 'flex-end',
  }
  export const profile= {
    display: 'flex',
    justifyContent: 'space-between',
       width: '400px',
    [theme.breakpoints.down('sm')]: {
        width: 'auto',
      }
  }
  export const logout= {
    marginLeft: '20px',
  }
  export const userName= {
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    fontFamily :"Nunito",
    textTransform: 'uppercase',
    fontWeight :"bold",
    [theme.breakpoints.down('sm')]: {
      marginLeft : 1,
        fontSize: '14px',
     },
    
  }
  export const brandContainer= {
    marginLeft : 25,
    display: 'flex',
    alignItems: 'center',
   
  }
 export const  purple= {
    color:  (theme) =>  theme.palette.getContrastText(deepPurple[500]),
    backgroundColor:  deepPurple[500],
  }

  export const absoluteBtnDrawer = {
    backgroundColor:  amber[900],
  }