import { Container, Grid, Grow } from '@mui/material';
import React, { useEffect, useState } from 'react'
import Form from '../../components/Rooms/Form/Form';
import Posts from '../../components/Rooms/Posts/Posts';
import SearchForm from '../../components/Rooms/Form/SearchForm';
import * as CustomStyles from './styles'
import { useDispatch } from 'react-redux';
import { getRooms, getRoomsBySearch } from '../../actions/rooms';
import { useNavigate } from 'react-router-dom';
import { fetchAllThemes } from '../../actions/cours';
import { getUserFromJWT } from '../../utils/User';
import { motion } from 'framer-motion';

function Room() {
  const isLoading = false
  const [currentId, setCurrentId] = useState(0);
  const posts = [1, 2, 3]
  const [searchByTitle, setSearchByTitre] = useState('')
  const user = getUserFromJWT()
  const userId = user?._id
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [tags, setTags] = useState([])

  const searchPost = () => {
    if (searchByTitle.trim() || tags) {
      // dispatch(getRoomsBySearch({ search: searchByTitle, tags: tags.join(','), isProfesseur: user?.result?.isProfesseur, userId: userId })) // we cannot just pass an array of tags to url we should transform into string 
      dispatch(getRoomsBySearch({ search: searchByTitle, tags: tags.join(','), isProfesseur: user?.isProfesseur, userId: userId }))
      navigate(`/cours/search?searchQuery=${searchByTitle || 'none'}&tags=${tags.join(',')}`)
    }
    else {
      navigate('/')
    }

  }

  useEffect(() => {
    if (user) {
      dispatch(getRooms(userId))
      dispatch(fetchAllThemes())
    }
    else navigate('/auth')
  }, [dispatch])

  if (!posts?.length && !isLoading) return 'no posts found'

  return (
    <Grow in>
      <Container maxWidth='xl'>
        <Grid container justifyContent="space-between" alignItems="stretch" spacing={3} sx={{ ...CustomStyles.gridContainer }} >
          <Grid item xs={12} sm={6} md={9}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
            >
              <SearchForm searchPost={searchPost} tags={tags} setTags={setTags} searchByTitle={searchByTitle} setSearchByTitre={setSearchByTitre} />
            </motion.div>
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.4, ease: 'easeOut' }}
            >
              <Form currentId={currentId} setCurrentId={setCurrentId} />
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </Grow>
  )
}

export default Room