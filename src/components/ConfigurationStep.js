import { Box, MenuItem, Select, Slider, Stack, Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AlignmentTypeEnum from "../infra/enums/AlignmentTypeEnum";
import SequenceTypeEnum from "../infra/enums/SequenceTypeEnum"
import { stepFormActions } from "../redux/actions/stepFormActions";
import { getMessage } from "../services/MessageService";
import { selectors } from "../redux/constants/selectors";
import DatabaseTypeEnum from "../infra/enums/DatabaseTypesEnum";

const ConfigurationStep = ({hasAlignmentType, hasSequenceType, hasDabaseType}) => {
    const dispatch = useDispatch();
    const stepForm = useSelector(selectors.getSetpForm);
    const handleInputChange = event => dispatch(stepFormActions.addField(event));

    const sequenceTypes = SequenceTypeEnum.getSelectStructure();
    const alignmentTypes = AlignmentTypeEnum.getSelectStructure();
    const databaseTypes = DatabaseTypeEnum.getSelectStructure();

    useEffect(() => {
        const payload = {
            matchScore: stepForm.matchScore ? stepForm.matchScore : 10,
            mismatchScore: stepForm.mismatchScore ? stepForm.mismatchScore : 10,
        };

        if(hasAlignmentType){
            payload.alignmentType = stepForm.alignmentType ? stepForm.alignmentType : 'GLOBAL';
        }

        if(hasSequenceType){
            payload.sequenceType = stepForm.sequenceType ? stepForm.sequenceType : 'DNA';
        }

        if(hasDabaseType){
            payload.databaseType = stepForm.databaseType ? stepForm.databaseType : 'OLATCGDB';
        }

        dispatch(stepFormActions.update(payload));
    }, [dispatch, stepForm, hasAlignmentType, hasSequenceType, hasDabaseType]);

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
                {hasSequenceType &&
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
                </Box>}
                {hasAlignmentType && 
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
                {hasDabaseType && 
                    <Box sx={{width: 200, textAlign: 'center'}}>
                        <Typography gutterBottom>
                            {getMessage('homology.input.label.databaseType')}
                        </Typography>
                        <Select
                            id="databaseType"
                            name="databaseType"
                            value={stepForm.databaseType ? stepForm.databaseType : 'OLATCGDB'}
                            onChange={handleInputChange}
                        >
                            {
                                databaseTypes.map((type, index) =>
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