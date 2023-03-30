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

export const gridContainer = {
    [theme.breakpoints.down('sm')]: {
        flexDirection: 'column-reverse',
    },

}