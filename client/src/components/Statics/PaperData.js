import { Box, LinearProgress, Paper, Typography } from '@mui/material'
import React from 'react'


function PaperData({ color, data, title, icon, displayProgress, value }) {
  return (
    <Paper sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', padding: 2, borderRadius: 2, justifyContent: "space-between" }} elevation={4}>
      <Box >
        <Typography variant='h6' sx={{ color: color, fontFamily: 'Nunito' }}>{title}</Typography>
        {
          displayProgress ? (

            <Box sx={{ display: 'flex', alignItems: 'center' }}>

              <Box sx={{ minWidth: 35 }}>
                <Typography sx={{ fontWeight: 'bold', fontFamily: 'Nunito', mr: 4 }}>{data}%</Typography>
              </Box>

              <Box sx={{ width: '100%', ml: 1 }}>
                <LinearProgress variant="determinate" value={parseFloat(value)} sx={{ borderRadius: 2, height: 8 }} />
              </Box>
            </Box>

          )
            : <Typography sx={{ fontWeight: 'bold', fontFamily: 'Nunito' }}>{data}</Typography>
        }



      </Box>
      {icon}
    </Paper>
  )
}

export default PaperData