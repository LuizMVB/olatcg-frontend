import { Box, MenuItem, Select, Slider, Stack, Typography } from "@mui/material";
import { useState } from "react";
import SequenceTypeEnum from "../../infra/enums/SequenceTypeEnum";
import { getMessage } from "../../services/MessageService";

const ConfigurationStep = ({ handleInputChange, matchScore, mismatchScore, selectedSequenceType }) => {
    const sequenceTypes = SequenceTypeEnum.getSelectStructure();
    console.log(sequenceTypes);
    const [sequenceTypeValue, setSequenceTypeValue] = useState(selectedSequenceType ? selectedSequenceType : "DNA");

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
                    defaultValue={matchScore ? matchScore : 10}
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
                    defaultValue={mismatchScore ? mismatchScore : 10} 
                    max={20}
                    aria-label="Default" 
                    valueLabelDisplay="auto" 
                    onChange={handleInputChange}
                />
            </Box>
            <Box sx={{width: 400, textAlign: 'center'}}>
                <Typography gutterBottom>
                    {getMessage('alignment.input.label.sequenceType')}
                </Typography>
                <Select
                    id="sequenceType"
                    name="sequenceType"
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

export default ConfigurationStep;