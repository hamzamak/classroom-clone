import { START_LOADING, END_LOADING, FETCH_CHAPITRE, DELETE_CHAPITRE, UPDATE_CHAPITRE } from '../constants/actionTypes';
import * as api from '../api/index.js';
import Swal from 'sweetalert2';

export const getChapitreById = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchChapitre(id);

    dispatch({ type: FETCH_CHAPITRE, payload: data.chapitre });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error.message);
    dispatch({ type: END_LOADING });
  }
};

export const deleteChapitre = (formData) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.deleteChapitre(formData);

    dispatch({ type: DELETE_CHAPITRE, payload: data.updatedRoom });

    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error.message);
  }
};


export const updateChapitre = (formData) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.updateChapitre(formData);

    dispatch({ type: UPDATE_CHAPITRE, payload: data.updatedRoom });
    Swal.fire({
      title: 'Chapitre a ete modifiee',
      icon: 'success',
    })

    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error.message);
  }
};