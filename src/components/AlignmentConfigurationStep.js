import { useState } from "react";
import { OlatcgStep } from "./OlatcgStep";
import { Box, MenuItem, Select, Slider, Stack, Typography } from "@mui/material";
import { getMessage } from "../services/MessageService";
import SequenceTypeEnum from "../infra/enums/SequenceTypeEnum";
import AlignmentTypeEnum from "../infra/enums/AlignmentTypeEnum";

const AlignmentConfigurationStep = ({next}) => {

    const [isNextShowed, showNext] = useState(false);
    const [openPenalty, setOpenPenalty] = useState(10);
    const [extensionPenalty, setExtensionPenalty] = useState(10);
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
                            {getMessage('alignment.input.label.openPenalty')}
                        </Typography>
                        <Slider 
                            id="openPenalty"
                            name="openPenalty"
                            value={openPenalty}
                            max={20}
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
                            max={20}
                            aria-label="Default" 
                            valueLabelDisplay="auto" 
                            onChange={event => setExtensionPenalty(event.target.value)}
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
                                id="PI_ROUTES.ALIGN"
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
            openPenalty: openPenalty,
            extensionPenalty: extensionPenalty,
            sequenceType: sequenceType,
            alignmentType: alignmentType
        })}
    </>
}

export { AlignmentConfigurationStep };