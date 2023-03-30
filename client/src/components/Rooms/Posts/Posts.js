import { CircularProgress, Grid } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import Post from './Post/Post';

const Posts = ({ setCurrentId }) => {
  const { rooms, isLoading } = useSelector((state) => state.roomReducers);
  const posts = [1, 2, 3, 4]

  if (!posts?.length && !isLoading) return 'no posts found'

  return (

    isLoading ? <CircularProgress /> : (
      <Grid container alignItems="stretch" spacing={3}>
        {rooms.map((room) => (
          <Grid key={room._id} item xs={12} sm={12} md={6} lg={3}>
            <Post room={room} setCurrentId={setCurrentId} />
          </Grid>
        ))}
      </Grid>
    )
  );
};

export default Posts;