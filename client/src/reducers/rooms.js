import { FETCH_ROOMS, ACTIVE_ROOM, START_LOADING,ADD_CHAPITRE, END_LOADING, CREATE_ROOM, JOIN_ROOM, LOGOUT, FETCH_BY_SEARCH, UPDATE_COUR, FETCH_CHAPITRE, VIEW_CHAPITRE, DELETE_ETUDIANTS, NEW_CODE, DELETE_CHAPITRE, UPDATE_CHAPITRE, UPDATE_THEME, FETCH_THEMES, FETCH_COMMENTS, ADD_COMMENTS, DELETE_COMMENT, DELETE_COMMENTS } from '../constants/actionTypes';
import  secureLocalStorage  from  "react-secure-storage";
//activeRoom facult car on va travailler avec secureLocalStorage

const roomReducers = (state = { isLoading: false, rooms: [] , activeRoom: null,comments:[] }, action) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, isLoading: true };
    case END_LOADING:
      return { ...state, isLoading: false };

      case FETCH_THEMES: 
      secureLocalStorage.setItem('themes',  action?.payload  ); 
      return {
        ...state
      }
    case FETCH_ROOMS:
      if(!secureLocalStorage.getItem('activeRoom') && action?.payload[0])
      secureLocalStorage.setItem('activeRoom',  action?.payload[0]  ); 
     
      return {
        ...state,
        rooms: action.payload,
      
      }
      case ACTIVE_ROOM : 
      secureLocalStorage.setItem('activeRoom', action?.payload);
      return { 
        ...state,  activeRoom : action?.payload 
      }

      case CREATE_ROOM : 
      secureLocalStorage.setItem('activeRoom', action?.payload);
      return { ...state, rooms: [...state.rooms, action?.payload] };
      
      case JOIN_ROOM : 
      secureLocalStorage.setItem('activeRoom', action?.payload);
      return { ...state, rooms: [...state.rooms, action?.payload] };
      case LOGOUT:
        secureLocalStorage.clear();
        return {...state, isLoading: false, rooms: [] , activeRoom: null };
    case FETCH_BY_SEARCH:
      return {
        ...state,
        rooms: action.payload,
      }
 
    case UPDATE_COUR:
    
      let updatedRoom = state.rooms.find((room) => room.cour._id === action.payload._id );
      updatedRoom.cour = action.payload
      return {
        ...state,
        rooms: state.rooms.map((room) => (room.cour._id === action.payload._id ? updatedRoom: room)), 
       }
       case ADD_CHAPITRE : 
       secureLocalStorage.setItem('activeRoom', action?.payload);
       return { ...state, rooms: state.rooms.map((room) => (room._id === action.payload._id ? action?.payload: room))};
       
       case FETCH_CHAPITRE: 
       return {
        ...state , chapitre : action.payload
       }
       case FETCH_COMMENTS: 
       return {
        ...state , comments : action.payload
       }

       case ADD_COMMENTS: 
       return {
        ...state , comments : [...state.comments, action?.payload]
       }

       case DELETE_COMMENT: 
       return {
        ...state , comments : state.comments.filter((comment) => comment._id !== action.payload._id) 
       }

       case DELETE_COMMENTS: 
       return {
        ...state , comments : []
       }


       case DELETE_CHAPITRE : 
       secureLocalStorage.setItem('activeRoom', action?.payload);
       return { ...state, rooms: state.rooms.map((room) => (room._id === action.payload._id ? action?.payload: room))};

       case UPDATE_CHAPITRE : 
       secureLocalStorage.setItem('activeRoom', action?.payload);
       return { ...state, rooms: state.rooms.map((room) => (room._id === action.payload._id ? action?.payload: room))};


       case VIEW_CHAPITRE : 
       secureLocalStorage.setItem('activeRoom', action?.payload);
       return { ...state, rooms: state.rooms.map((room) => (room._id === action.payload._id ? action?.payload: room))};

       case DELETE_ETUDIANTS : 
       secureLocalStorage.setItem('activeRoom', action?.payload);
       return { ...state, rooms: state.rooms.map((room) => (room._id === action.payload._id ? action?.payload: room))};

       case NEW_CODE : 
       secureLocalStorage.setItem('activeRoom', action?.payload);
       return { ...state, rooms: state.rooms.map((room) => (room._id === action.payload._id ? action?.payload: room))};

       case UPDATE_THEME :
        secureLocalStorage.setItem('activeRoom', action?.payload);
       return { ...state, rooms: state.rooms.map((room) => (room._id === action.payload._id ? action?.payload: room))};


    default:
      return state;
  }
};

export default roomReducers