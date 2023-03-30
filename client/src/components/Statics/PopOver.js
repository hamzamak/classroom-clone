import { Divider, Popover } from '@mui/material'
import React from 'react'
import Typography from '@mui/material/Typography';
import VisibilityIcon from '@mui/icons-material/Visibility';
function PopOver({ dataChapitres }) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;


  if (dataChapitres.length === 0) return null;

  return (
    <div>
      <VisibilityIcon aria-describedby={id} variant="contained" onClick={handleClick} sx={{ color: '#00b4ab', cursor: 'pointer' }} />
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}

        anchorOrigin={{
          vertical: 'center',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        {
          dataChapitres.map((chap, index) => (
            <div key={chap._id}>
              <Typography sx={{ p: 1.15, pr: 3, fontFamily: "Nunito" }}>{index + 1 + "- " + chap.titre}</Typography>
              <Divider />
            </div>

          ))
        }


      </Popover>
    </div>
  );
}
export default PopOver