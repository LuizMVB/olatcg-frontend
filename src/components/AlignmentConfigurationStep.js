import { useState } from "react";
import { OlatcgStep } from "./OlatcgStep";
import { Box, MenuItem, Select, Slider, Stack, TextField, Typography } from "@mui/material";
import { getMessage } from "../services/MessageService";
import SequenceTypeEnum from "../infra/enums/SequenceTypeEnum";
import AlignmentTypeEnum from "../infra/enums/AlignmentTypeEnum";

const AlignmentConfigurationStep = ({form, next}) => {

    const [isNextShowed, showNext] = useState(false);
    const [openPenalty, setOpenPenalty] = useState(0);
    const [extensionPenalty, setExtensionPenalty] = useState(0);
    const [matchScore, setMatchScore] = useState(0);
    const [mismatchScore, setMismatchScore] = useState(0);
    const [sequenceType, setSequenceType] = useState('DNA');
    const [alignmentType, setAlignmentType] = useState('global');
    
    const sequenceTypes = SequenceTypeEnum.getSelectStructure();
    const alignmentTypes = AlignmentTypeEnum.getSelectStructure();

    return <>
        {!isNextShowed ? 
            <OlatcgStep 
                onClickNext={() => showNext(true)}
                stepPosition={1}
            >
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="center"
                    spacing={6}
                >
                <Stack
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                    spacing={4}>
                    <Box sx={{width: 400, textAlign: 'center'}}>
                        <Typography gutterBottom>
                            {getMessage('alignment.input.label.openPenalty')}
                        </Typography>
                        <Slider 
                            id="openPenalty"
                            name="openPenalty"
                            value={openPenalty}
                            min={-20}
                            max={20}
                            sx={{width: '75%'}}
                            aria-label="Default" 
                            valueLabelDisplay="auto"
                            onChange={event => setOpenPenalty(event.target.value)}
                        />
                    </Box>
                    <Box sx={{width: 400, textAlign: 'center'}}>
                        <Typography gutterBottom>
                            {getMessage('alignment.input.label.extensionPenalty')}
                        </Typography>
                        <Slider 
                            id="extensionPenalty"
                            name="extensionPenalty"
                            value={extensionPenalty}
                            min={-20}
                            max={20}
                            sx={{width: '75%'}}
                            aria-label="Default" 
                            valueLabelDisplay="auto" 
                            onChange={event => setExtensionPenalty(event.target.value)}
                        />
                    </Box>
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
                    </Stack>
                    <Stack
                        direction="column"
                        alignItems="center"
                        justifyContent="center"
                        spacing={4}>
                        <Box sx={{width: 400, textAlign: 'center'}}>
                            <Typography gutterBottom>
                                {getMessage('alignment.input.label.matchScore')}
                            </Typography>
                            <Slider 
                                id="matchScore"
                                name="matchScore"
                                value={matchScore}
                                min={-20}
                                max={20}
                                sx={{width: '75%'}}
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
                                min={-20}
                                max={20}
                                sx={{width: '75%'}}
                                aria-label="Default" 
                                valueLabelDisplay="auto" 
                                onChange={event => setMismatchScore(event.target.value)}
                            />
                        </Box>
                        <Box sx={{width: 200, textAlign: 'center'}}>
                            <Typography gutterBottom>
                                {getMessage('alignment.input.label.alignmentType')}
                            </Typography>
                            <Select
                                id="PI_ROUTES.ALIGN"
                                name="mode"
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
            analysisTitle: form.analysisTitle,
            analysisDescription: form.analysisDescription,
            analysisType: form.analysisType,
            openPenalty: openPenalty,
            extensionPenalty: extensionPenalty,
            matchScore: matchScore,
            mismatchScore: mismatchScore,
            sequenceType: sequenceType,
            alignmentType: alignmentType
        })}
    </>
}

export { AlignmentConfigurationStep };