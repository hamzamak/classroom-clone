import { FETCH_BY_SEARCH, START_LOADING, END_LOADING, FETCH_ROOMS, ACTIVE_ROOM, CREATE_ROOM, JOIN_ROOM, ADD_CHAPITRE, VIEW_CHAPITRE, DELETE_ETUDIANTS, NEW_CODE } from '../constants/actionTypes';
import Swal from 'sweetalert2';
import * as api from '../api/index.js';

export const getRoom = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchRoom(id);

    dispatch({ type: ACTIVE_ROOM, payload: data.room });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error.message);
  }
};

export const getRooms = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchRooms(id);
    dispatch({ type: FETCH_ROOMS, payload: data.rooms });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error.message);
  }
};


export const createRoom = (formaData) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.createRoom(formaData);
    dispatch({ type: CREATE_ROOM, payload: data.room });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const joinRoom = (formaData) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.joinRoom(formaData);
    if (data.roomExists) {

      if (data.deja_Rejoindre) {
        Swal.fire({
          icon: 'warning',
          title: 'Oops...',
          text: 'Vous avez deja inscrit dans cette room',
        })

      }
      else {
        dispatch({ type: JOIN_ROOM, payload: data.updatedRoom });
      }
    }
    else {
      Swal.fire({
        icon: 'error',
        title: 'Oups...',
        text: 'aucun room trouve avec ce code',

      })

    }
    dispatch({ type: END_LOADING });

  } catch (error) {
    console.log(error);
  }
};


export const getRoomsBySearch = (search) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data: { data } } = await api.fetchRoomsBySearch(search);
    dispatch({ type: FETCH_BY_SEARCH, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error.message);
  }
};

export const addChapitreToRoom = (formaData) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.addChapitre(formaData);
    dispatch({ type: ADD_CHAPITRE, payload: data.updatedRoom });
    dispatch({ type: END_LOADING });
    Swal.fire({
      title: 'Chapitre a ete cree',
      icon: 'success',
    })
  } catch (error) {
    console.log(error.message);
  }
};

export const consulterChapitre = (formaData) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.consultChapitreByEtudiant(formaData);
    dispatch({ type: VIEW_CHAPITRE, payload: data.updatedRoom });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};


export const deleteOne_Or_ManyEtudiants = (formaData) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.deleteEtudiants(formaData);
    dispatch({ type: DELETE_ETUDIANTS, payload: data.updatedRoom });

    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const generer_nouveau_codeRoom = (id) => async (dispatch) => {
  try {
   // dispatch({ type: START_LOADING });
    const { data } = await api.askfor_new_codeRoom(id);
    dispatch({ type: NEW_CODE, payload: data.updatedRoom });
  //  dispatch({ type: END_LOADING });

    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })

    Toast.fire({
      icon: 'success',
      title: 'code du cour est reinitialise '
    })
  } catch (error) {
    console.log(error);
  }
};
