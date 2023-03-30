import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import secureLocalStorage from 'react-secure-storage';
export default function ListeImages({setCurrentTheme,currentTheme}) {
  const themes = secureLocalStorage.getItem('themes')
  const widthList = window.innerWidth <=855 ? 310 : 1010
  const colList = window.innerWidth <=855 ? 1 : 3
  
  const handleChangeId= (e,image)=> {
    e.stopPropagation();
    setCurrentTheme(image)
  }
  return (
    <ImageList sx={{  width: widthList, height: 350 , padding : 2 }} gap={4} cols={colList} >
      {themes.map((item,index) => (
        <ImageListItem key={index}  sx={{ bgcolor: '#fff' }}  >
          <img  onClick={(e)=> handleChangeId(e,item.image)}
            src={`${item.image}?w=248&fit=crop&auto=format`}
            srcSet={`${item.image}?w=248&fit=crop&auto=format&dpr=2 2x`}
            alt={`Image theme du cour${index+1}`}
            loading="lazy"
            style= {{cursor : 'pointer', height: 110, borderRadius : 10  }}
            
          />
          <ImageListItemBar
        
          position="top"
          // title={item.title}
            actionIcon={
              <IconButton
              
                aria-label={`is selected ${item.title}`}
              >
              {( currentTheme=== item.image) && <CheckCircleIcon color='success' /> } 
              </IconButton>
            }
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}
