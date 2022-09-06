import { NavigateNext, NavigateBefore } from "@mui/icons-material";
import { Grid, IconButton, Step, StepLabel, Stepper, Tooltip } from "@mui/material";
import { useState } from "react";
import { getMessage } from "../services/MessageService";

import ConfigurationStep from "../components/alignmentSteps/ConfigurationStep";
import SequenceInputStep from "../components/alignmentSteps/SequenceInputStep";
import FollowYourResultsStep from "../components/FollowYourResultStep";

const Alignment = () => {
    const [actualStep, setActualStep] = useState(0);
    const [alignmentForm, setAlignmentForm] = useState({});

    const handleInputChange = (event) => {
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

    return <>
        <Stepper sx={{py: 4}} activeStep={actualStep} alternativeLabel>
            {stepLabels.map((label, stepKey) => 
                <Step key={stepKey}>
                    <StepLabel>{label}</StepLabel>
                </Step>
            )}
        </Stepper>
        <Grid container>
            <Grid item xs={2} sx={{align: 'center'}}>
                <Tooltip 
                    title={getMessage('steper.button.label.previous')}
                    sx={{position: 'fixed', bgcolor: 'primary.main', bottom: '40vh', left: '10vh'}}
                >
                    <IconButton 
                        onClick={() => setActualStep(actualStep > 0 ? actualStep - 1 : 0)} 
                        disabled={actualStep === 0}
                    >
                        <NavigateBefore sx={{ fontSize: 50 }} />
                    </IconButton>
                </Tooltip>
            </Grid>
            <Grid item xs={8} sx={{bgcolor: '#f0f0f0', border: '1px outset #d6d6d6', p: 4}}>
                {actualStep === 0 ? 
                    <ConfigurationStep
                        handleInputChange={handleInputChange} 
                        matchScore={alignmentForm.matchScore}
                        mismatchScore={alignmentForm.mismatchScore}
                        selectedSequenceType={alignmentForm.sequenceType}
                    />
                : actualStep === 1 ?
                    <SequenceInputStep 
                        handleInputChange={handleInputChange} 
                        seqInputA={alignmentForm.sequenceA} 
                        seqInputB={alignmentForm.sequenceB}  
                    />
                : <FollowYourResultsStep/>}
            </Grid>
            <Grid item xs={2}>
                <Tooltip 
                    title={getMessage('steper.button.label.next')}
                    sx={{position: 'fixed', bgcolor: 'primary.main', bottom: '40vh', right: '10vh'}}
                >
                    <IconButton 
                        onClick={() => setActualStep(actualStep <= 2 ? actualStep + 1 : 2)} 
                        disabled={actualStep === 2}
                    >
                        <NavigateNext sx={{ fontSize: 50 }} />
                    </IconButton>
                </Tooltip>
            </Grid>
        </Grid>
    </>
}

export default Alignment;