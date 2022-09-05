import { Science } from "@mui/icons-material";
import { Box, Button, IconButton, MenuItem, Select, Slider, Stack, Step, StepLabel, Stepper, TextField, Tooltip, Typography } from "@mui/material";
import { useState } from "react";
import { getMessage } from "../services/MessageService";

import SequenceTypeEnum from "../infra/enums/SequenceTypeEnum";

const ConfigurationStep = ({ handleInputChange }) => {
    const sequenceTypes = SequenceTypeEnum.getSelectStructure();
    console.log(sequenceTypes);
    const [sequenceTypeValue, setSequenceTypeValue] = useState("DNA");

    return <>
        <Stack
            direction="column"
            alignItems="center"
            justifyContent="center"
            spacing={4}
        >
            <Box sx={{width: 400, textAlign: 'center'}}>
                <Typography gutterBottom>
                    {getMessage('alignment.input.label.matchScore')}
                </Typography>
                <Slider 
                    id="gapOpenPanaltyInput"
                    defaultValue={10} 
                    max={20}
                    aria-label="Default" 
                    valueLabelDisplay="auto" 
                />
            </Box>
            <Box sx={{width: 400, textAlign: 'center'}}>
                <Typography gutterBottom>
                    {getMessage('alignment.input.label.mismatchScore')}
                </Typography>
                <Slider 
                    id="gapOpenPanaltyInput"
                    defaultValue={10} 
                    max={20}
                    aria-label="Default" 
                    valueLabelDisplay="auto" 
                />
            </Box>
            <Box sx={{width: 400, textAlign: 'center'}}>
                <Typography gutterBottom>
                    {getMessage('alignment.input.label.sequenceType')}
                </Typography>
                <Select
                    id="sequenceTypeInput"
                    name="sequenceTypeInput"
                    value={sequenceTypeValue}
                    onChange={(event) => {
                        setSequenceTypeValue(event.target.value); 
                        handleInputChange(event);
                    }}
                >
                    {
                        sequenceTypes.map((type, index) =>
                            <MenuItem 
                                key={index} 
                                value={type.value}
                            >
                                {type.label}
                            </MenuItem>
                        )
                    }
                </Select>
            </Box>
        </Stack>
    </>
}

const SequenceInputStep = ({ handleInputChange }) => {
    const [colorAlignIcon, setColorAlignIcon] = useState('');

    return <>
        <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, mx: 4, width: '50ch' },
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
                    sx={{border: '1px inset', borderColor: 'primary.light', borderRadius: 2, mx: 2}}
                >
                    {getMessage('alignment.input.label.firstSequence')}
                </Typography>
                <TextField
                    name="sequenceA"
                    multiline
                    focused
                    rows={10}
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
                    sx={{border: '1px inset', borderColor: 'primary.light', borderRadius: 2, mx: 2}}
                >
                    {getMessage('alignment.input.label.secondSequence')}
                </Typography>
                <TextField
                    name="sequenceB"
                    multiline
                    focused
                    rows={10}
                    onChange={handleInputChange}
                />
            </Stack>
        </Stack>
    </>
}

const FollowYourResultsStep = () => {
    return <>
        <h1>Follow your results step</h1>
    </>
}

const Alignment = () => {
    const [actualStep, setActualStep] = useState(0);
    const [alignmentForm, setAlignmentForm] = useState({});

    const handleInputChange = (event) => {
        console.log(event.target);
        const target = event.target;
        const name = target.name;
        const value = target.value;

        setAlignmentForm(Object.assign(alignmentForm, { [name]: value }));
    }

    const stepLabels = [
        getMessage('alignment.step0.label'),
        getMessage('alignment.step1.label'),
        getMessage('alignment.step2.label')
    ]

    const goToNextStep = () => {
        if(actualStep < 2){
            setActualStep(actualStep + 1);
        }
    }

    return <>
        <Stepper sx={{py: 4}} activeStep={actualStep} alternativeLabel>
            {stepLabels.map((label, stepKey) => 
                <Step key={stepKey}>
                    <StepLabel>{label}</StepLabel>
                </Step>
            )}
        </Stepper>
        <Box sx={{align: 'center'}}>
            {actualStep === 0 ? 
                <ConfigurationStep handleInputChange={handleInputChange}/>
            : actualStep === 1 ?
                <SequenceInputStep handleInputChange={handleInputChange} />
            : <FollowYourResultsStep/>}
            <Button 
                variant="outlined"
                onClick={goToNextStep} 
                sx={{position: 'fixed', bottom: 60, right: 150}}
            >
                {getMessage('steper.button.label')}
            </Button>
        </Box>
    </>
}

export default Alignment;