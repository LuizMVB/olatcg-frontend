import { JoinInner, Science } from "@mui/icons-material";
import { Box, Button, IconButton, Stack, TextField, Tooltip, Typography } from "@mui/material";
import { useState } from "react";
import { getMessage } from "../services/MessageService";

const Alignment = () => {
    const [alignmentForm, setAlignmentForm] = useState({});
    const [colorAlignIcon, setColorAlignIcon] = useState('');

    const handleInputChange = (event) => {
        const target = event.target;
        const name = target.name;
        const value = target.value;

        setAlignmentForm(Object.assign(alignmentForm, { [name]: value }));
    }

    return <>
        <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '50ch' },
            }}
            noValidate
            autoComplete="off"
        >   
            <Stack 
                direction="column"
            >
                <Typography 
                    variant="h4" 
                    component="div"
                    textAlign="center"
                    sx={{bgcolor: 'secondary.main', borderRadius: 2, mx: 2}}
                >
                    {getMessage('alignment.input.label.firstSequence')}
                </Typography>
                <TextField
                    name="sequenceA"
                    multiline
                    focused
                    rows={15}
                    onChange={handleInputChange}
                />
            </Stack>
            <Tooltip 
                title={getMessage('alignment.button.tooltip.text.align')}
                sx={{p: 2, bgcolor: 'primary.main'}}   
                onMouseMove={() => setColorAlignIcon("primary")}
                onMouseLeave={() => setColorAlignIcon()} 
            >
                <IconButton>
                    <Science sx={{ fontSize: 50 }} color={colorAlignIcon} />
                </IconButton>
            </Tooltip>
            <Stack direction="column">
                <Typography 
                    variant="h4" 
                    component="div"
                    textAlign="center"
                    sx={{bgcolor: 'secondary.main', borderRadius: 2, mx: 2}}
                >
                    {getMessage('alignment.input.label.secondSequence')}
                </Typography>
                <TextField
                    name="sequenceB"
                    multiline
                    focused
                    rows={15}
                    onChange={handleInputChange}
                />
            </Stack>
        </Stack>
    </>
}

export default Alignment;