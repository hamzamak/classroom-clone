import axios from 'axios';
import secureLocalStorage from 'react-secure-storage';
const API = axios.create({ baseURL: 'https://classroom-yepp.onrender.com' })

// intercept requests  before they are handled by then or catch
API.interceptors.request.use((req)=> {
    if(secureLocalStorage.getItem('token'))  {
         req.headers.authorization = `Bearer ${secureLocalStorage.getItem('token')}`
    }
    return req ;
})


export const fetchRooms = (userId) => API.get(`/rooms/${userId}`); // fetchRooms by userId
export const fetchRoom = (id) => API.get(`/rooms/getRoom/${id}`);  // fetchRoom by id room
export const fetchRoomsBySearch = (SearchQuery) => API.get(`/rooms/getRooms/search?searchQuery=${SearchQuery.search || 'none'}&tags=${SearchQuery.tags}&userId=${SearchQuery.userId}&isProfesseur=${SearchQuery.isProfesseur}`);
export const createRoom = (formData) => API.post('/rooms/createRoom', formData);
export const joinRoom = (formData) => API.post('/rooms/rejoindre', formData);
export const updateCour = (id, updatedCour) => API.patch(`/cours/${id}`, updatedCour);
export const addChapitre = (formData) => API.post(`/rooms/addChapitre`, formData);

export const fetchChapitre = (id) => API.get(`/chapitres/${id}`);
export const deleteChapitre = (data) => API.post(`/chapitres/delete`, data);
export const updateChapitre = (data) => API.patch(`/chapitres/update`, data);

export const consultChapitreByEtudiant = (data) => API.post(`/rooms/consulter`, data);
export const deleteEtudiants = (data) => API.post(`/rooms/deleteEtudiants`, data);

export const askfor_new_codeRoom = (idRoom) => API.patch(`/rooms/askfor_new_codeRoom`, idRoom);
export const updateTheme = (data) => API.put(`/cours/updateTheme`, data);
export const fetchThemes = () => API.get(`/cours/all/themes`);

export const addComment = (data) => API.post(`/rooms/addComment`,data);
export const getComments = (id) => API.get(`/rooms/getComments/${id}`);
export const deleteComment = (id) => API.delete(`/rooms/deleteComment/${id}`);

export const deleteComments_ByIdChapitre = (id) => API.delete(`/rooms/deleteComments/${id}`);


export const signIn = (formData) => API.post(`/users/signin`, formData);
export const signUp = (formData) => API.post(`/users/signup`, formData);