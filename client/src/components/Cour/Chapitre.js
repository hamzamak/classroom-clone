import { Avatar, Container, IconButton, Menu, MenuItem, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import secureLocalStorage from 'react-secure-storage';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { consulterChapitre } from '../../actions/rooms';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import RemoveDoneIcon from '@mui/icons-material/RemoveDone';
import { deleteChapitre } from '../../actions/chapitres';
import { delete_comments_by_chapitre } from '../../actions/comments';
import { getUserFromJWT } from '../../utils/User';
function Chapitre({ chapitre, setCurrentChapId, setValue }) {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const activeRoom = secureLocalStorage.getItem('activeRoom')
    const user = getUserFromJWT()
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleOpenMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleUpdate = () => {
        setCurrentChapId(chapitre._id)
        setAnchorEl(null);
        setValue(1)

    };

    const handleDelete = () => {
        dispatch(delete_comments_by_chapitre(chapitre._id))
        dispatch(deleteChapitre({ id: chapitre._id, idRoom: activeRoom._id }))
        setAnchorEl(null);
    };

    const toDetail = () => {
        if (!user?.isProfesseur) dispatch(consulterChapitre({ chapitreId: chapitre._id, idRoom: activeRoom._id, userId: user?._id }))

        navigate(`/active_cour/chaptire/${chapitre._id}`)
    }
    const isChapitreSeenByEtudiant = () => {
        const etudiants = activeRoom?.etudiants;
        for (let i = 0; i < etudiants.length; i++) {
            if (etudiants[i].etudiant?._id === user?._id) {
                for (let j = 0; j < etudiants[i]?.chapitresConsultees.length; j++) {
                    if (etudiants[i]?.chapitresConsultees[j]._id === chapitre._id)
                        return true
                }
            }
        }
        return false;
    }





    return (

        <Container sx={{
            justifyContent: 'space-between', display: 'flex', alignItems: "center", background: "#edf1f7", padding: 2,
            borderRadius: 3, mt: 2
        }}  >
            <div style={{ justifyContent: 'space-between', display: 'flex', alignItems: "center", cursor: 'pointer' }} onClick={toDetail}>
                <Avatar sx={{ bgcolor: "green", marginRight: 3 }}>
                    <DescriptionOutlinedIcon />

                </Avatar>


                <Box>
                    <Typography sx={{ wordBreak: 'break-word' }}>{activeRoom.professeur.lastName + ' ' + activeRoom.professeur.firstName} a publie un nouveau support du cour : {chapitre.titre}</Typography>
                    <Typography variant='subtitle2'>{moment(chapitre.createdAt).format('DD MMM YYYY')}</Typography>
                </Box>

            </div>
            {user?.isProfesseur ? (
                <IconButton onClick={handleOpenMenu}>
                    <MoreVertOutlinedIcon />
                </IconButton>

            ) : (
                <IconButton >
                    {

                        isChapitreSeenByEtudiant() ? (

                            <DoneAllIcon color="primary" sx={{ cursor: 'default' }} />
                        ) :
                            (
                                <RemoveDoneIcon sx={{ cursor: 'default' }} />
                            )
                    }
                </IconButton>
            )}
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={handleUpdate}>Modifier</MenuItem>
                <MenuItem onClick={handleDelete}>Supprimer</MenuItem>
            </Menu>
        </Container>

    )
}

export default Chapitre