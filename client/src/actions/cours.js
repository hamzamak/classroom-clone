import Swal from 'sweetalert2';
import * as api from '../api/index.js';
import { END_LOADING, FETCH_THEMES, START_LOADING, UPDATE_COUR, UPDATE_THEME } from '../constants/actionTypes.js';

export const updateCour = (id, updatedCour) => async (dispatch) => {
  try {
    const { data } = await api.updateCour(id, updatedCour);

    dispatch({ type: UPDATE_COUR, payload: data.cour });
  } catch (error) {
    console.log(error.message);
  }
};

export const updateTheme = (dataform) => async (dispatch) => {
  try {
    const { data } = await api.updateTheme(dataform);
    dispatch({ type: START_LOADING });
    dispatch({ type: UPDATE_THEME, payload: data.updatedRoom });
    dispatch({ type: END_LOADING });
    Swal.fire('Theme est modifiee !', '', 'success')
  } catch (error) {
    console.log(error.message);
    Swal.fire('Une erreur est bloque la modification !', '', 'error')
  }
};


export const fetchAllThemes = () => async (dispatch) => {
  try {
    const { data } = await api.fetchThemes();
    dispatch({ type: FETCH_THEMES, payload: data.tabThemes });
  } catch (error) {
  }
};