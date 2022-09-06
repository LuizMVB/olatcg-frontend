import { Science } from "@mui/icons-material";
import { Grid, IconButton, TextField, Tooltip, Typography } from "@mui/material";
import { useState } from "react";
import { getMessage } from "../../services/MessageService";

const SequenceInputStep = ({ handleInputChange, seqInputA, seqInputB }) => {
    const [colorAlignIcon, setColorAlignIcon] = useState('');

    return <>
        <Grid container
            component="form"
            noValidate
            autoComplete="off"
            spacing={0}
        >   
            <Grid item xs={5}>
                <Typography 
                    variant="h4"
                    sx={{textAlign: 'center'}}
                >
                    {getMessage('alignment.input.label.firstSequence')}
                </Typography>
                <TextField
                    name="sequenceA"
                    defaultValue={seqInputA ? seqInputA : ''}
                    rows={10}
                    sx={{width: '100%'}}
                    onChange={handleInputChange}
                    multiline
                    focused
                />
            </Grid>
            <Grid item xs={2} sx={{textAlign: 'center'}}>
                <Tooltip 
                    title={getMessage('alignment.button.tooltip.text.align')}
                    sx={{mt: 16, bgcolor: 'primary.main'}}   
                    onMouseMove={() => setColorAlignIcon("primary")}
                    onMouseLeave={() => setColorAlignIcon()} 
                >
                    <IconButton>
                        <Science sx={{ fontSize: 50 }} color={colorAlignIcon} />
                    </IconButton>
                </Tooltip>
            </Grid>
            <Grid item xs={5}>
                <Typography 
                    variant="h4"
                    sx={{textAlign: 'center'}}
                >
                    {getMessage('alignment.input.label.secondSequence')}
                </Typography>
                <TextField
                    name="sequenceB"
                    defaultValue={seqInputB ? seqInputB : ''}
                    rows={10}
                    sx={{width: '100%'}}
                    onChange={handleInputChange}
                    multiline
                    focused
                />
            </Grid>
        </Grid>
    </>
}

export default SequenceInputStep;