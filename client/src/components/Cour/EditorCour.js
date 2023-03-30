import React, { useState, useRef, useEffect } from 'react'
import SendIcon from '@mui/icons-material/Send';
import { Box, Button, Stack, TextField } from '@mui/material';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import { useDispatch } from 'react-redux';
import { addChapitreToRoom } from '../../actions/rooms';
import { updateChapitre } from '../../actions/chapitres';
import JoditEditor from 'jodit-react';

function EditorCour({ currentChapId, setCurrentChapId, currentChapitre, activeRoom }) {
  useEffect(() => {

    if (currentChapitre) {
      setTitreChap(currentChapitre?.titre)
      setHtmlContent(currentChapitre?.contenu)
    }
  }, [currentChapitre]);


  const editor = useRef(null);
  const config =
  {
    readonly: false, // all options from https://xdsoft.net/jodit/doc/
    height: 400,
    "disablePlugins": "file,about"
  }

  const [htmlContent, setHtmlContent] = useState('')

  const [titreChap, setTitreChap] = useState('')
  const [error, setError] = useState('')
  const dispatch = useDispatch()

  const handleSend = () => {
    if (titreChap.trim().length < 1) setError('titre ne doit pas etre vide')
    else if (htmlContent.length > 0) {
      setError('')
      if (currentChapId === 0) dispatch(addChapitreToRoom({ idRoom: activeRoom._id, titre: titreChap, contenu: htmlContent }))
      else dispatch(updateChapitre({ idRoom: activeRoom, titre: titreChap, contenu: htmlContent, id: currentChapitre._id }))
    }
  }

  const handleClear = () => {
    setHtmlContent('')
    setTitreChap('')
    setCurrentChapId(0)
  }

  return (
    <Box >
      <TextField fullWidth variant='outlined' label="titre du chapitre" required style={{ marginBottom: '20px' }}
        value={titreChap}
        onChange={(e) => setTitreChap(e.target.value)}
        helperText={error}
      />


      <JoditEditor
        ref={editor}
        value={htmlContent}
        config={config}
        tabIndex={1} // tabIndex of textarea
        onBlur={(newContent) => setHtmlContent(newContent)} // preferred to use only this option to update the content for performance reasons
      />

      <Stack direction="row" spacing={2} sx={{ justifyContent: "space-between", marginTop: 2 }} >
        <Button variant="contained" endIcon={<HighlightOffOutlinedIcon />} color="error" onClick={handleClear}>
          clear
        </Button>
        <Button variant="contained" endIcon={<SendIcon />} color="success" onClick={handleSend}>
          {currentChapId ? 'Update' : "send"}
        </Button>
      </Stack>

    </Box>
  )
}

export default EditorCour