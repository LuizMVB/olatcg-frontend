import { NavigateBefore, NavigateNext } from "@mui/icons-material";
import { Grid, IconButton, Step, StepLabel, Stepper, Tooltip } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useStepActualPosition from "../hooks/useStepActualPosition";
import { getMessage } from "../services/MessageService";

const StepByStep = ({ 
    steps
}) => {
    const [getStepActualPosition, setStepActualPosition] = useStepActualPosition();
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
                type: 'RETURN_STEP_RESPONSE_TO_INITIAL_STATE'
            })
        }
    }, [dispatch]);

    return <>
        <Stepper sx={{py: 4}} activeStep={getStepActualPosition()} alternativeLabel>
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
                        onClick={() => setStepActualPosition(getStepActualPosition() > 0 && stepChangeConditions.previous ? getStepActualPosition() - 1 : 0)} 
                        disabled={getStepActualPosition() === 0 || !stepChangeConditions.previous}
                    >
                        <NavigateBefore sx={{ fontSize: 50 }} />
                    </IconButton>
                </Tooltip>
            </Grid>
            <Grid item xs={8} sx={{bgcolor: '#f0f0f0', border: '1px outset #d6d6d6', p: 4, mb: 6}}>
                {steps[getStepActualPosition()].content}
            </Grid>
            <Grid item xs={2}>
                <Tooltip 
                    title={getMessage('steper.button.label.next')}
                    sx={{position: 'fixed', bgcolor: 'primary.main', bottom: '40vh', right: '10vh'}}
                >
                    <IconButton 
                        onClick={() => setStepActualPosition(getStepActualPosition() < steps.length && stepChangeConditions.next ? getStepActualPosition() + 1 : getStepActualPosition())} 
                        disabled={getStepActualPosition() === steps.length - 1 || !stepChangeConditions.next}
                    >
                        <NavigateNext sx={{ fontSize: 50 }} />
                    </IconButton>
                </Tooltip>
            </Grid>
        </Grid>
    </>
}

export default StepByStep;