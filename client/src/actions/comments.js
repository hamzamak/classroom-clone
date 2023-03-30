import * as api from '../api/index.js';
import { FETCH_COMMENTS, ADD_COMMENTS, DELETE_COMMENT, DELETE_COMMENTS } from '../constants/actionTypes.js';

export const fetchComments = (id) => async (dispatch) => {
  try {
    const { data } = await api.getComments(id);
    dispatch({ type: FETCH_COMMENTS, payload: data.comments });
  } catch (error) {
    console.log(error.message);
  }
};

export const add_comment = (id) => async (dispatch) => {
  try {
    const { data } = await api.addComment(id);
    dispatch({ type: ADD_COMMENTS, payload: data.comment });
  } catch (error) {
    console.log(error.message);
  }
};


export const delete_comment = (id) => async (dispatch) => {
  try {
    const { data } = await api.deleteComment(id);
    dispatch({ type: DELETE_COMMENT, payload: data.comment });
  } catch (error) {
    console.log(error.message);
  }
};

export const delete_comments_by_chapitre = (id) => async (dispatch) => {
  try {
    //  dispatch({ type: START_LOADING });
    await api.deleteComments_ByIdChapitre(id);

    dispatch({ type: DELETE_COMMENTS });
    //  console.log(data.comments)
    //   dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error.message);
  }
};
