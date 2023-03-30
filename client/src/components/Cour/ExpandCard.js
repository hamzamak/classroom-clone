import React, { useState } from 'react'
import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Collapse, IconButton, Popover, Tooltip, Typography } from '@mui/material'
import { red } from '@mui/material/colors';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';
import ContentCopyTwoToneIcon from '@mui/icons-material/ContentCopyTwoTone';
import { useSnackbar } from 'notistack';
import moment from 'moment';
import SyncIcon from '@mui/icons-material/Sync';
import secureLocalStorage from "react-secure-storage";
import { useDispatch } from 'react-redux';
import { generer_nouveau_codeRoom } from '../../actions/rooms';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import ListeImages from './ListeImages';
import Swal from 'sweetalert2';
import './styles.css'
import { updateTheme } from '../../actions/cours';
//notistack display notifications on your web apps 

//style
const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

function ExpandCard() {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {

        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setCurrentTheme(null)
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;


    const dispatch = useDispatch()
    const [currentTheme, setCurrentTheme] = useState(null)
    const user = JSON.parse(localStorage.getItem('user'))
    const activeRoom = secureLocalStorage.getItem('activeRoom')



    // for alert message for copy text *****************
    const { enqueueSnackbar } = useSnackbar();

    const handleClickVariant = (variant) => () => {
        // variant could be success, error, warning, info, or default
        navigator.clipboard.writeText(activeRoom?.code_room)
        enqueueSnackbar('copied to clipboard!', { variant });
    };
    // ***************************************************
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const generateNewCode = () => {
        dispatch(generer_nouveau_codeRoom({ idRoom: activeRoom?._id }))
    }

    const handlePersonnaliseTheme = (event) => {

        if (currentTheme) {
            dispatch(updateTheme({ theme: currentTheme, idRoom: activeRoom?._id, idCour: activeRoom?.cour._id }))
        }
        else {
            Swal.fire('choisir un theme !', '', 'error')
        }
        handleClose();
        setCurrentTheme(null)


    }
    return (


        <Card sx={{ borderRadius: 5 }} elevation={4}>
            <CardHeader

                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="cour">
                        {activeRoom?.cour?.titre.toUpperCase().charAt(0)}
                    </Avatar>
                }
                title={activeRoom?.cour?.titre}
                subheader={moment(activeRoom?.cour?.createdAt).format("DD MMM YYYY")} // date de creation du cour ou format('LL)

            />
            <CardMedia
                component="img"
                height="230"
                image={activeRoom?.cour?.theme || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'}
                alt="theme du cour"
            />
            <CardActions disableSpacing>
                {user?.result.isProfesseur && (
                    <>
                        <IconButton onClick={handleClickVariant('success')} >
                            <Tooltip title="copier le code du cour" arrow={true} >
                                <ContentCopyTwoToneIcon color='primary' />
                            </Tooltip>
                        </IconButton>

                        <IconButton aria-label="reload_code" onClick={generateNewCode}>
                            <Tooltip title="demander un nouveau code du cour" arrow={true} >
                                <SyncIcon color='primary' />
                            </Tooltip>
                        </IconButton>

                        <Button startIcon={<BorderColorIcon />} variant="outlined" onClick={handleClick} >
                            Personnaliser
                        </Button>
                        <Popover
                            id={id}
                            open={open}
                            anchorEl={anchorEl}
                            onClose={handleClose}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            transformOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                        >
                            <ListeImages setCurrentTheme={setCurrentTheme} currentTheme={currentTheme} />
                            <div id="actionPopover" >
                                <Button variant='contained' color="success" onClick={handlePersonnaliseTheme}>Changer</Button>
                                <Button variant='contained' color='warning' onClick={handleClose} >Annuler</Button>
                            </div>
                        </Popover>
                    </>

                )
                }
                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>

                    {user?.result.isProfesseur && (
                        <Typography sx={{ fontFamily: 'Nunito' }} variant='h6' color="crimson">code du cour : <span style={{ color: 'black', fontSize: '16px', fontFamily: 'Nunito' }}>{activeRoom?.code_room}</span></Typography>

                    )}
                    <Typography sx={{ fontFamily: 'Nunito' }} variant='h6' color="crimson">description :</Typography>
                    <Typography paragraph>{activeRoom?.cour.description ? activeRoom?.cour.description : "Pas de  description"}</Typography>

                </CardContent>
            </Collapse>
        </Card >



    )
}

export default ExpandCard