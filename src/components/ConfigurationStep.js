import { Box, MenuItem, Select, Slider, Stack, Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useStepForm from "../hooks/useStepForm";
import AlignmentTypeEnum from "../infra/enums/AlignmentTypeEnum";
import SequenceTypeEnum from "../infra/enums/SequenceTypeEnum"
import { getMessage } from "../services/MessageService";

const ConfigurationStep = ({hasSequenceType}) => {
    const [handleInputChange] = useStepForm();
    const stepForm = useSelector(state => state.stepForm)
    const dispatch = useDispatch();
    const sequenceTypes = SequenceTypeEnum.getSelectStructure();
    const alignmentTypes = AlignmentTypeEnum.getSelectStructure();

    useEffect(() => {
        const payload = {
            matchScore: stepForm.matchScore ? stepForm.matchScore : 10,
            mismatchScore: stepForm.mismatchScore ? stepForm.mismatchScore : 10,
            sequenceType: stepForm.sequenceType ? stepForm.sequenceType : 'DNA',
        };

        if(hasSequenceType){
            payload.sequenceType = stepForm.alignmentType ? stepForm.alignmentType : 'GLOBAL';
        }

        dispatch({
            type: 'UPDATE_STEP_FORM',
            payload: payload,
        });
    }, [dispatch, stepForm, hasSequenceType]);

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
                    id="matchScore"
                    name="matchScore"
                    value={stepForm.matchScore ? stepForm.matchScore : 10}
                    max={20}
                    aria-label="Default" 
                    valueLabelDisplay="auto"
                    onChange={handleInputChange}
                />
            </Box>
            <Box sx={{width: 400, textAlign: 'center'}}>
                <Typography gutterBottom>
                    {getMessage('alignment.input.label.mismatchScore')}
                </Typography>
                <Slider 
                    id="mismatchScore"
                    name="mismatchScore"
                    value={stepForm.mismatchScore ? stepForm.mismatchScore : 10} 
                    max={20}
                    aria-label="Default" 
                    valueLabelDisplay="auto" 
                    onChange={handleInputChange}
                />
            </Box>
            <Stack direction="row" spacing={3}>
                <Box sx={{width: 200, textAlign: 'center'}}>
                    <Typography gutterBottom>
                        {getMessage('alignment.input.label.sequenceType')}
                    </Typography>
                    <Select
                        id="sequenceType"
                        name="sequenceType"
                        value={stepForm.sequenceType ? stepForm.sequenceType : 'DNA'}
                        onChange={handleInputChange}
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
                {hasSequenceType && 
                    <Box sx={{width: 200, textAlign: 'center'}}>
                        <Typography gutterBottom>
                            {getMessage('alignment.input.label.alignmentType')}
                        </Typography>
                        <Select
                            id="alignmentType"
                            name="alignmentType"
                            value={stepForm.alignmentType ? stepForm.alignmentType : 'GLOBAL'}
                            onChange={handleInputChange}
                        >
                            {
                                alignmentTypes.map((type, index) =>
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
                }
            </Stack>
        </Stack>
    </>
}

export default ConfigurationStep;