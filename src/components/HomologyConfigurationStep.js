import { useState } from "react";
import { OlatcgStep } from "./OlatcgStep";
import { Box, MenuItem, Select, Slider, TextField, Stack, Grid, Typography, Tooltip } from "@mui/material";
import HelpIcon from '@mui/icons-material/Help';
import { getMessage } from "../services/MessageService";
import DatabaseTypeEnum from "../infra/enums/DatabaseTypesEnum";
import SequenceTypeEnum from "../infra/enums/SequenceTypeEnum";


const HomologyConfigurationStep = ({form, next}) => {

    const [isNextShowed, showNext] = useState(false);
    const [openPenalty, setOpenPenalty] = useState(0);
    const [extensionPenalty, setExtensionPenalty] = useState(0);
    const [penalty, setPenalty] = useState(0);
    const [eValue, setEValue] = useState(0.001);
    const [databaseType, setDatabaseType] = useState('default');
    const [sequenceType, setSequenceType] = useState('DNA');

    //const databaseTypes = DatabaseTypeEnum.getSelectStructure();
    //const sequenceTypes = SequenceTypeEnum.getSelectStructure();    

    return <>
        {!isNextShowed ? 
            <OlatcgStep 
                onClickNext={() => showNext(true)}
                stepPosition={1}
                isNextDisabled={(!(eValue > 0) || !(penalty < 0))}
            >
                <Grid container
                    sx={{width:'80%',
                        alignItems:"center",
                        justifyContent:"center",
                        mx:'auto'}}>
                    <Grid item xs={6}>
                        <Box sx={{width: 320, textAlign: 'center', my:2, ml:'auto', mr:2}}>
                            <Typography gutterBottom>
                                {getMessage('alignment.input.label.openPenalty')}
                                <Tooltip title={getMessage('alignment.tooltip.openPenalty')} placement='top' arrow>
                                    <HelpIcon sx={{verticalAlign: 'middle',
                                        fontSize:'inherit',
                                        marginLeft: 0.6,
                                        color:'primary.main',
                                        '&:hover':{
                                            color: 'primary.light'
                                        }}}/>
                                </Tooltip>
                            </Typography>
                            <Slider 
                                id="openPenalty"
                                name="openPenalty"
                                value={openPenalty}
                                min={0}
                                max={20}
                                sx={{width: '75%'}}
                                aria-label="Default" 
                                valueLabelDisplay="auto"
                                onChange={event => setOpenPenalty(event.target.value)}
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={6}>
                        <Box sx={{width: 320, textAlign: 'center', my:2, ml:2, mr:'auto'}}>
                            <Typography gutterBottom>
                                {getMessage('homology.input.label.evalue')}
                                <Tooltip title={getMessage('homology.tooltip.evalue')} placement='top' arrow>
                                    <HelpIcon sx={{verticalAlign: 'middle',
                                        fontSize:'inherit',
                                        marginLeft: 0.6,
                                        color:'primary.main',
                                        '&:hover':{
                                            color: 'primary.light'
                                        }}}/>
                                </Tooltip>
                            </Typography>
                            <TextField
                                id="eValue"
                                name="eValue"
                                value={eValue}
                                type="number"
                                sx={{width: '75%',
                                    '& .MuiInputBase-root': {
                                      height: '2.4rem',
                                    },
                                    '& .MuiOutlinedInput-input': {
                                      height: '2.4rem',
                                    },}}
                                inputProps={{
                                    min: 0,
                                    step: 0.001
                                }}
                                onChange={event => setEValue(parseFloat(event.target.value))}
                                focused
                                required
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={6}>
                        <Box sx={{width: 320, textAlign: 'center', my:2, ml:'auto', mr:2}}>
                            <Typography gutterBottom>
                                {getMessage('alignment.input.label.extensionPenalty')}
                                <Tooltip title={getMessage('alignment.tooltip.extensionPenalty')} placement='top' arrow>
                                    <HelpIcon sx={{verticalAlign: 'middle',
                                        fontSize:'inherit',
                                        marginLeft: 0.6,
                                        color:'primary.main',
                                        '&:hover':{
                                            color: 'primary.light'
                                        }}}/>
                                </Tooltip>
                            </Typography>
                            <Slider 
                                id="extensionPenalty"
                                name="extensionPenalty"
                                value={extensionPenalty}
                                min={0}
                                max={20}
                                sx={{width: '75%'}}
                                aria-label="Default" 
                                valueLabelDisplay="auto" 
                                onChange={event => setExtensionPenalty(event.target.value)}
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={6}>
                        <Box sx={{width: 320, textAlign: 'center', my:2, ml:2, mr:'auto'}}>
                            <Typography gutterBottom>
                                {getMessage('homology.input.label.penalty')}
                                <Tooltip title={getMessage('homology.tooltip.penalty')} placement='top' arrow>
                                    <HelpIcon sx={{verticalAlign: 'middle',
                                        fontSize:'inherit',
                                        marginLeft: 0.6,
                                        color:'primary.main',
                                        '&:hover':{
                                            color: 'primary.light'
                                        }}}/>
                                </Tooltip>
                            </Typography>
                            <Slider 
                                id="penalty"
                                name="penalty"
                                value={penalty}
                                min={-5}
                                max={0}
                                sx={{width: '75%'}}
                                aria-label="Default" 
                                valueLabelDisplay="auto" 
                                marks
                                onChange={event => setPenalty(event.target.value)}
                            />
                        </Box>
                    </Grid>
                </Grid>
            </OlatcgStep> 
        : next({
            analysisTitle: form.analysisTitle,
            analysisDescription: form.analysisDescription,
            analysisType: form.analysisType,
            openPenalty: openPenalty,
            extensionPenalty: extensionPenalty,
            databaseType: databaseType,
            eValue: eValue,
            penalty: penalty,
            sequenceType: sequenceType
        })}
    </>
}

export { HomologyConfigurationStep };