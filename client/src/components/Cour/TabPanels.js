import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import TopicIcon from '@mui/icons-material/Topic';
import EditorCour from './EditorCour';
import Chapitres from './Chapitres';
import secureLocalStorage from 'react-secure-storage';
import { getUserFromJWT } from '../../utils/User';
function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};


export default function BasicTabs() {
    const [currentChapId, setCurrentChapId] = React.useState(0);

    const activeRoom = secureLocalStorage.getItem('activeRoom')
    const currentChapitre = currentChapId ? activeRoom.chapitres.find((chap) => chap._id === currentChapId) : null;

    const [value, setValue] = React.useState(0);

    const user = getUserFromJWT()
    const isProfesseur = user?.isProfesseur

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div >
            {
                isProfesseur ? <Box sx={{ width: '100%' }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value} onChange={handleChange} aria-label="gestion cours">
                            <Tab icon={<TopicIcon fontSize='large' />} label="Chapitres" sx={{ minWidth: "50%", fontFamily: 'Nunito' }} />
                            <Tab icon={<AddRoundedIcon fontSize='large' />} label="Ajouter des chapitres" sx={{ minWidth: "50%", fontFamily: 'Nunito' }} />

                        </Tabs>
                    </Box>
                    <TabPanel value={value} index={0} >
                        <Chapitres setCurrentChapId={setCurrentChapId} setValue={setValue} />
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <EditorCour currentChapitre={currentChapitre} currentChapId={currentChapId} setCurrentChapId={setCurrentChapId} activeRoom={activeRoom} />
                    </TabPanel>
                </Box>
                    :
                    <div style={{ marginTop: "20px" }}>
                        <Chapitres />
                    </div>
            }
        </div>


    )
}
