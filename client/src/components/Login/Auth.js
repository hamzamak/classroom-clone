import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { FormControl, FormLabel, Paper, Radio, RadioGroup } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signin, signup } from '../../actions/auth';
import { getUserFromJWT } from '../../utils/User';
import Swal from 'sweetalert2';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props} sx={{fontFamily:"Poppins"}}>
            {'Copyright © '}
            <Link color="inherit" href="" style={{textDecoration: 'none'}} >
                Master Class
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme();

export default function Auth() {
    const [isSignUp, setIsSignUp] = React.useState(false);
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const initialState = { firstName: '', lastName: '', email: '', password: '', role: '' };
    const [formData, setFormData] = React.useState(initialState)
    const user = getUserFromJWT()
    const handleChange = (e) => {

        setFormData({ ...formData, [e.target.name]: e.target.value })

    }
    const handleSubmit = (event) => {
        event.preventDefault();
        if (!formData.email || !formData.password) {
            Swal.fire({
                icon: 'warning',
                title: 'Oops...',
                text: 'Please complete all fields !',
            })
        }
        else {

            if (isSignUp) {
                if (!formData.firstName || !formData.lastName || !formData.role) {
                    Swal.fire({
                        icon: 'warning',
                        title: 'Oops...',
                        text: 'Please complete all fields !',
                    })
                }
                else
                    dispatch(signup(formData, navigate))
            }
            else {
                dispatch(signin(formData, navigate))
            }
        }

    };

    const switchMode = () => {
        setIsSignUp(!isSignUp)

    }
    React.useEffect(() => {
        if (user) navigate('/')
    }, [])

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="sm" sx={{ mt: 2 }} >
                <Paper elevation={12} sx={{ padding: 4, pb: 5, borderRadius: 5 }}>
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 5,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }} className='gradient-custom-2'>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5" sx={{fontFamily:"Special Elite"}}>
                            {isSignUp ? 'Sign Up' : 'Sign In'}
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
                                {
                                    isSignUp && (
                                        <>
                                            <Grid item xs={12} sm={6}>
                                                <TextField 
                                                    autoComplete="given-name" name="firstName"
                                                    required={true} fullWidth id="firstName" label="First Name" autoFocus
                                                    onChange={handleChange}
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    required fullWidth id="lastName" label="Last Name" name="lastName" autoComplete="family-name"
                                                    onChange={handleChange}
                                                />
                                            </Grid>
                                        </>
                                    )
                                }
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email" onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        autoComplete="new-password" onChange={handleChange}
                                    />
                                </Grid>
                                {
                                    isSignUp && (

                                        <Grid item xs={12}>
                                            <FormControl>
                                                <FormLabel id="role-radio-buttons-group-label" required={true}>Sign as </FormLabel>
                                                <RadioGroup
                                                    row
                                                    aria-labelledby="role-radio-buttons-group-label"
                                                    name="role"
                                                    onChange={handleChange}
                                                >
                                                    <FormControlLabel value="professeur" control={<Radio />} label="Professeur" />
                                                    <FormControlLabel value="etudiant" control={<Radio />} label="Etudiant" />

                                                </RadioGroup>
                                            </FormControl>
                                        </Grid>
                                    )
                                }
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                className='gradient-custom'
                                sx={{ mt: 2, mb: 2,color:"white" }}
                            >
                                {isSignUp ? 'Sign Up' : 'Sign In'}
                            </Button>
                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <Button variant='outlined' onClick={switchMode} sx={{fontFamily:"Montserrat",mb:2}} >
                                        {isSignUp ? 'Already have An Account? Sign In' : "Don't have An Account? Sign Up"}
                                    </Button>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                    <Copyright sx={{ mt: 5 }} />
                </Paper>
            </Container>
        </ThemeProvider>
    );
}