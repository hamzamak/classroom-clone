import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, IconButton, Paper, Toolbar, Typography } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Swal from 'sweetalert2';
import AddIcon from '@mui/icons-material/Add';
import PopOver from './PopOver';
import { useDispatch } from "react-redux";
import { deleteOne_Or_ManyEtudiants } from '../../actions/rooms';
import emailjs from '@emailjs/browser';
const columns = [

  { field: 'firstName', headerName: 'FirstName', width: 150 },
  { field: 'lastName', headerName: 'LastName', width: 150 },


  {
    field: 'fullName',
    headerName: 'Full Name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 180,
    valueGetter: (params) =>
      `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },

  { field: 'email', headerName: 'Email', width: 250 },

  {
    field: 'chapitres_consultees',
    headerName: 'Chapitres Consultees',
    type: 'number',
    width: 170,
    align: 'left',

  },
  {
    field: 'view_chapitres_consultees', headerName: 'Voir Les Chapitres Consultees', width: 250, sortable: false,
    renderCell: (params) => {
      return <PopOver dataChapitres={params.row.hiddenData} />;
    }

  },
  {
    field: 'hiddenData',
    hide: true

  },

];
function CustomToolbar({ selectedIds, dispatch, activeRoom }) {
  const swalInvite = () => {
    Swal.fire({
      title: 'Inviter un etudiant',
      html: `<input type="email" id="email" class="swal2-input" placeholder="Email*">
      <input type="text" id="code_cour" class="swal2-input" placeholder="Code du cour*" >`, //value=${activeRoom?.code_room}
      confirmButtonText: 'Send',
      focusConfirm: false,
      preConfirm: () => {
        const email = Swal.getPopup().querySelector('#email').value
        const code_cour = Swal.getPopup().querySelector('#code_cour').value
        if (!email || !code_cour || !(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
          Swal.showValidationMessage(`Essayer d'entrer un email et code cour valides`)
        }
        return { email: email, code_cour: code_cour }
      }
    }).then((result) => {
      var templateParams = {
        from_email: activeRoom?.professeur?.email,
        from_name: activeRoom?.professeur?.lastName + " " + activeRoom?.professeur?.firstName,
        to_email: result.value.email,
        code_room: result.value.code_cour
      }
      // ici on va utiliser emailjs
      emailjs.send(process.env.REACT_APP_EMAIL_SERVICE_ID, process.env.REACT_APP_EMAIL_TEMPLATE_ID, templateParams, process.env.REACT_APP_EMAIL_PUBLIC_KEY)
        .then((response) => {
          Swal.fire({
            title: "L'email est bien envoye",
            icon: 'success',
            showClass: {
              popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutUp'
            }
          })
        }, (err) => {
          Swal.fire({
            title: 'Oups ! une erreur  ',
            icon: 'error',
            showClass: {
              popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutUp'
            }
          })
        });

    }).catch((e) => {
      // pour eviter ces erreurs consoles comme EnhancedTable.js:90 Uncaught (in promise) TypeError: Cannot read properties of undefined (reading 'email')
    })

  }
  const deleteEtudiants = () => {

    // en effet nous supprimons etudiant(s) avec ses chapitres consultes cad champ etudiants du document room
    Swal.fire({
      title: `Vous voulez vraiment supprimer ${selectedIds.length >= 2 ? 'ces etudiants' : "l'etudiant(e)"}`,
      icon: 'warning',
      confirmButtonText: 'Oui , Continuer!',
      cancelButtonText: 'Non!',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteOne_Or_ManyEtudiants({ arrayIds: selectedIds, idRoom: activeRoom._id }))
        //appel du deleteByIdEtudiant from apis
        //*********************************** */
        Swal.fire(
          'Supprimee!',
          'Terminee',
          'success'
        )
        // console.log(selectedIds);
      }
    })
  }
  return (
    <Toolbar sx={{ display: 'flex', justifyContent: "space-between" }}>
      <Typography variant="h5" sx={{ fontFamily: 'Nunito', fontStyle: 'italic' }}> Etudiants</Typography>
      <div>

        {
          selectedIds.length > 0 ? (

            <IconButton
              onClick={deleteEtudiants}
              size="medium"
              edge="start"
              color="error"
              aria-label="delete"
              sx={{ mr: 2, ml: 2 }}
            >
              <DeleteForeverIcon fontSize='large' />
            </IconButton>
          )
            :
            (
              <Button variant="contained" style={{ fontFamily: 'Nunito', fontStyle: 'italic' }}
                endIcon={<AddIcon />} onClick={swalInvite}  >Inviter
              </Button>
            )
        }
      </div>

    </Toolbar>
  )
}

export default function DataTable({ activeRoom }) {
  const dispatch = useDispatch()
  const rows = activeRoom?.etudiants.map((e) =>
  ({
    id: e?._id, lastName: e.etudiant?.lastName, firstName: e.etudiant?.firstName, email: e.etudiant?.email,
    chapitres_consultees: e.chapitresConsultees.length, hiddenData: e.chapitresConsultees
  })
  )
  const [selectedIds, setselectedIds] = React.useState([])
  const [pageSize, setPageSize] = React.useState(5);
  return (
    <Paper sx={{ height: 370, width: '100%', marginTop: 4 }} elevation={4}>
      <DataGrid

        sx={{
          fontFamily: 'Nunito', '.css-78c6dr-MuiToolbar-root-MuiTablePagination-toolbar': {
            display: 'flex', alignItems: 'baseline', color: "black"
          }
        }}
        components={{
          Toolbar: CustomToolbar
        }}
        componentsProps={{ toolbar: { selectedIds, dispatch, activeRoom } }}
        rows={rows}
        columns={columns}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        rowsPerPageOptions={[5, 10, 20]}

        checkboxSelection
        onSelectionModelChange={(ids) => {
          setselectedIds(ids)
        }}

      />
    </Paper>
  );
}
