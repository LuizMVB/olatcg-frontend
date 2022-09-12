import { NavigateBefore, NavigateNext } from "@mui/icons-material";
import { Grid, IconButton, Step, StepLabel, Stepper, Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMessage } from "../services/MessageService";

const StepByStep = ({ 
    steps
}) => {
    const [actualStep, setActualStep] = useState(0);
    const stepChangeConditions = useSelector(state => state.stepChangeConditions);
    const dispatch = useDispatch();

    useEffect(() => {
        return () => {
            dispatch({
                type: 'RETURN_TO_STEP_FORM_INITIAL_STATE'
            });
            dispatch({
                type: 'RETURN_TO_STEP_CHANGE_CONDITIONS_INITIAL_STATE'
            });
            dispatch({
                type: 'RETURN_STEP_REQUEST_TO_INITIAL_STATE'
            })
        }
    }, [dispatch]);

    return <>
        <Stepper sx={{py: 4}} activeStep={actualStep} alternativeLabel>
            {steps.map((step, stepKey) => 
                <Step key={stepKey}>
                    <StepLabel>{step.label}</StepLabel>
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
                        onClick={() => setActualStep(actualStep > 0 && stepChangeConditions.previous ? actualStep - 1 : 0)} 
                        disabled={actualStep === 0 || !stepChangeConditions.previous}
                    >
                        <NavigateBefore sx={{ fontSize: 50 }} />
                    </IconButton>
                </Tooltip>
            </Grid>
            <Grid item xs={8} sx={{bgcolor: '#f0f0f0', border: '1px outset #d6d6d6', p: 4}}>
                {steps[actualStep].content}
            </Grid>
            <Grid item xs={2}>
                <Tooltip 
                    title={getMessage('steper.button.label.next')}
                    sx={{position: 'fixed', bgcolor: 'primary.main', bottom: '40vh', right: '10vh'}}
                >
                    <IconButton 
                        onClick={() => setActualStep(actualStep < steps.length && stepChangeConditions.next ? actualStep + 1 : actualStep)} 
                        disabled={actualStep === steps.length - 1 || !stepChangeConditions.next}
                    >
                        <NavigateNext sx={{ fontSize: 50 }} />
                    </IconButton>
                </Tooltip>
            </Grid>
        </Grid>
    </>
}

export default StepByStep;