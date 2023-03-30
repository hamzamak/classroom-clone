import { Box, Button, CircularProgress, Divider, Paper, Typography } from '@mui/material'
import moment from 'moment'
import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { getChapitreById } from '../../actions/chapitres'
import parse from 'html-react-parser'
import SendCommentBox from './SendCommentBox'
import ListComments from './ListComments'
import * as CustomStyles from './styles'
import { fetchComments } from '../../actions/comments'
import CloseIcon from '@mui/icons-material/Close';
import secureLocalStorage from 'react-secure-storage'
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import {useReactToPrint} from 'react-to-print'
// import jsPDF from 'jspdf';
// import html2canvas from 'html2canvas';
function DetailChapitre() {
    const navigate = useNavigate()
    const { id } = useParams()
    const dispatch = useDispatch()
    const activeRoom = secureLocalStorage.getItem('activeRoom')
    const user = JSON.parse(localStorage.getItem('user'))
    const { chapitre, isLoading, comments } = useSelector(state => state.roomReducers)
    const reportTemplateRef = useRef(null);

  /*  const downloadPdfDocument = () => {
        html2canvas(reportTemplateRef.current,{
            allowTaint: true ,
            useCors: true ,
        })
          .then((canvas) => {
              
              const imgData = canvas.toDataURL('image/png');
              const pdf = new jsPDF({
                format: 'a4',
                unit: 'px',
                orientation: "landscape",
                
            });
             // pdf.setFontSize(1)
            //  var width = pdf.internal.pageSize.getWidth();
            //  var height = pdf.internal.pageSize.getHeight();
            //  console.log(height)
              pdf.addImage(imgData, 'JPEG', 0, 0);
              pdf.save(`${chapitre.titre}`);
          })
      }*/

      const handlePrint = useReactToPrint({
       content : ()=>reportTemplateRef.current,
       documentTitle : `${chapitre?.titre}` || "document",
       
      });

    useEffect(() => {
        if (!user) navigate('/auth')
        dispatch(getChapitreById(id))
        dispatch(fetchComments(id))
    }, [id, dispatch])


    if (isLoading) {
        return <Paper sx={{
            display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px', borderRadius: '15px',
            height: '39vh',
        }} elevation={6}>
            <CircularProgress size="7em" />
        </Paper>
    }
    if (!chapitre /* && !isLoading*/) {
        return (
            <Paper elevation={6} sx={{ padding: '20px', pt: '60px', pb: '60px', borderRadius: '15px' }}>

                <div style={{ borderRadius: '20px', margin: '10px', flex: 1, alignItems: "center", display: 'flex' }}>
                    <CloseIcon color='error' sx={{ fontSize: 70 }} />
                    <Typography variant="h3" component="h2" sx={{ fontFamily: 'Nunito', alignItems: "center" }}>chapitre introuvable</Typography>
                </div>
            </Paper>
        )

    } //ou redirect vers /active_Room

    return (
        <>
            <Paper elevation={6} style={{ padding: '20px', borderRadius: '15px', overflow: 'hidden' }}>
                <div>
                    <div style={{ borderRadius: '20px', margin: '10px', flex: 1 }}>
                        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                            <div>
                                <Typography sx={{ wordBreak: 'break-word' }} variant="h4" component="h2" fontFamily='Nunito'>{chapitre.titre}</Typography>
                                <Typography variant="body1">{moment(chapitre.createdAt).fromNow()}</Typography>
                            </div>
                            <Button variant='contained' sx={{ maxHeight: 40 }} startIcon={<FileDownloadIcon />} onClick={handlePrint}> Generer PDF</Button>
                        </div>
                        <Divider style={{ margin: '20px 0' }} />
                        <div style={{ wordBreak: 'break-word',padding:20 }} ref={reportTemplateRef}>{parse(chapitre.contenu)}</div>
                    </div>
                </div>
            </Paper>
            <Box sx={{ ...CustomStyles.commentBox }}>
                <SendCommentBox user={user} idChapitre={id} activeRoom={activeRoom} />
                <Paper style={{ padding: '20px', borderRadius: '15px', overflow: 'hidden' }} elevation={3}>
                    <ListComments comments={comments} />
                </Paper>
            </Box>
        </>
    )
}

export default DetailChapitre