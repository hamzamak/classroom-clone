import { AUTH } from '../constants/actionTypes';
import Swal from 'sweetalert2';
import * as api from '../api/index.js';

export const signup = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);
    dispatch({ type: AUTH, data })
    navigate('/')

  } catch (error) {
    console.log(error);
    Swal.fire({
      icon: 'warning',
      title: 'Oops...',
      text: 'Essayer un autre email',
    })
  }
};

export const signin = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);
    dispatch({ type: AUTH, data })
    navigate('/')
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'email or mot de passe est incorrecte',
    })

    console.log(error);
  }
};

