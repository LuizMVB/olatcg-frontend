import { NavigateBefore, NavigateNext } from "@mui/icons-material";
import { Grid, IconButton, Step, StepLabel, Stepper, Tooltip } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { stepActualPositionActions } from "../redux/actions/stepActualPositionActions";
import { stepChangeConditionsActions } from "../redux/actions/stepChangeConditions";
import { stepFormActions } from "../redux/actions/stepFormActions";
import { stepResponseActions } from "../redux/actions/stepResponseActions";
import { selectors } from "../redux/constants/selectors";
import { getMessage } from "../services/MessageService";

const StepByStep = ({ 
    steps
}) => {    
    const stepChangeConditions = useSelector(selectors.getStepChangeConditions);
    const stepActualPosition = useSelector(selectors.getStepActualPosition);

    const dispatch = useDispatch();
    const handleSetStepActualPosition = position => dispatch(stepActualPositionActions.set(position));

    useEffect(() => {
        return () => {
            dispatch(stepFormActions.returnToInitialState());
            dispatch(stepChangeConditionsActions.returnToInitialState());
            dispatch(stepResponseActions.returnToInitialState());
        }
        
    }, [dispatch]);

    return <>
        <Stepper sx={{py: 4}} activeStep={stepActualPosition} alternativeLabel>
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
                        onClick={() => handleSetStepActualPosition(stepActualPosition > 0 && stepChangeConditions.previous ? stepActualPosition - 1 : 0)} 
                        disabled={stepActualPosition === 0 || !stepChangeConditions.previous}
                    >
                        <NavigateBefore sx={{ fontSize: 50 }} />
                    </IconButton>
                </Tooltip>
            </Grid>
            <Grid item xs={8} sx={{bgcolor: '#f0f0f0', border: '1px outset #d6d6d6', p: 4, mb: 6}}>
                {steps[stepActualPosition].content}
            </Grid>
            <Grid item xs={2}>
                <Tooltip 
                    title={getMessage('steper.button.label.next')}
                    sx={{position: 'fixed', bgcolor: 'primary.main', bottom: '40vh', right: '10vh'}}
                >
                    <IconButton 
                        onClick={() => handleSetStepActualPosition(stepActualPosition < steps.length && stepChangeConditions.next ? stepActualPosition + 1 : stepActualPosition)} 
                        disabled={stepActualPosition === steps.length - 1 || !stepChangeConditions.next}
                    >
                        <NavigateNext sx={{ fontSize: 50 }} />
                    </IconButton>
                </Tooltip>
            </Grid>
        </Grid>
    </>
}

export default StepByStep;