import { useState } from "react";
import { OlatcgStep } from "./OlatcgStep";
import { Box, MenuItem, Select, Slider, Stack, Typography } from "@mui/material";
import { getMessage } from "../services/MessageService";
import SequenceTypeEnum from "../infra/enums/SequenceTypeEnum";
import AlignmentTypeEnum from "../infra/enums/AlignmentTypeEnum";

const AlignmentConfigurationStep = ({next}) => {

    const [isNextShowed, showNext] = useState(false);
    const [matchScore, setMatchScore] = useState(10);
    const [mismatchScore, setMismatchScore] = useState(10);
    const [sequenceType, setSequenceType] = useState('DNA');
    const [alignmentType, setAlignmentType] = useState('GLOBAL');
    
    const sequenceTypes = SequenceTypeEnum.getSelectStructure();
    const alignmentTypes = AlignmentTypeEnum.getSelectStructure();

    return <>
        {!isNextShowed ? 
            <OlatcgStep 
                onClickNext={() => showNext(true)}
                stepPosition={0}
            >
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
                            value={matchScore}
                            max={20}
                            aria-label="Default" 
                            valueLabelDisplay="auto"
                            onChange={event => setMatchScore(event.target.value)}
                        />
                    </Box>
                    <Box sx={{width: 400, textAlign: 'center'}}>
                        <Typography gutterBottom>
                            {getMessage('alignment.input.label.mismatchScore')}
                        </Typography>
                        <Slider 
                            id="mismatchScore"
                            name="mismatchScore"
                            value={mismatchScore} 
                            max={20}
                            aria-label="Default" 
                            valueLabelDisplay="auto" 
                            onChange={event => setMismatchScore(event.target.value)}
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
                                value={sequenceType}
                                onChange={event => setSequenceType(event.target.value)}
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
                        <Box sx={{width: 200, textAlign: 'center'}}>
                            <Typography gutterBottom>
                                {getMessage('alignment.input.label.alignmentType')}
                            </Typography>
                            <Select
                                id="alignmentType"
                                name="alignmentType"
                                value={alignmentType}
                                onChange={event => setAlignmentType(event.target.value)}
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
                    </Stack>
                </Stack>
            </OlatcgStep> 
        : next({
            matchScore: matchScore,
            mismatchScore: mismatchScore,
            sequenceType: sequenceType,
            alignmentType: alignmentType
        })}
    </>
}

export { AlignmentConfigurationStep };