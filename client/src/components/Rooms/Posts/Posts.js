import { CircularProgress, Grid } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import Post from './Post/Post';
import { motion } from 'framer-motion';

const Posts = ({ setCurrentId }) => {
  const { rooms, isLoading } = useSelector((state) => state.roomReducers);
  const posts = [1, 2, 3, 4]

  if (!posts?.length && !isLoading) return 'no posts found'

  return (

    isLoading ? <CircularProgress /> : (
      <Grid container alignItems="stretch" spacing={3}>
        {rooms.map((room,index) => (
          <Grid key={room._id} item xs={12} sm={12} md={6} lg={3}>
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.22 }}
            >
              <Post room={room} setCurrentId={setCurrentId} />
            </motion.div>
          </Grid>
        ))}
      </Grid>
    )
  );
};

export default Posts;