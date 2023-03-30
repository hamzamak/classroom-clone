import { AUTH , LOGOUT} from '../constants/actionTypes';
import secureLocalStorage from 'react-secure-storage';

const authReducers = (state={authData : null} , action) => {
  switch (action.type) {
    case AUTH:
       localStorage.setItem('user', JSON.stringify({...action?.data}));
       return {...state , authData : action?.data}; 
    
       case LOGOUT:
        localStorage.clear();
        secureLocalStorage.clear()
         return {...state , authData : null };
        
    default:
      return state;
  }
};

export default authReducers
