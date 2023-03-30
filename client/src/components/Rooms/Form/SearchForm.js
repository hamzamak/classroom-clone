import { AppBar, Button, TextField } from '@mui/material';
import React from 'react'
import { MuiChipsInput } from 'mui-chips-input'

function SearchForm({searchPost,tags, setTags,searchByTitle, setSearchByTitre }) {

  const handleAdd = (tag) => setTags([...tags, tag])
  const handleDelete = (tagToDelete) => setTags(tags.filter(tag => tagToDelete !== tag))
  return (
    <AppBar sx={{
        borderRadius: 4,
        marginBottom: '1rem',
        display: 'flex',
        padding: '16px',
      }} position="static" color='inherit'>
        <TextField name='search' variant='outlined' label="Search Courses" fullWidth value={searchByTitle}
          onChange={(e) => setSearchByTitre(e.target.value)}
        />
        <MuiChipsInput style={{ margin: '10px 0' }}
          value={tags}
          onAddChip={handleAdd}
          onDeleteChip={handleDelete}
          variant='outlined'
          label="Search Tags"
          hideClearAll
          fullWidth
        />
        <Button color='primary' variant='contained' onClick={searchPost} >Search</Button>
      </AppBar>
  )
}

export default SearchForm