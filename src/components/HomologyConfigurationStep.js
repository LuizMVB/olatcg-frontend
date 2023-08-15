import { useState } from "react";
import { OlatcgStep } from "./OlatcgStep";
import { Box, MenuItem, Select, Slider, Stack, Typography } from "@mui/material";
import { getMessage } from "../services/MessageService";
import DatabaseTypeEnum from "../infra/enums/DatabaseTypesEnum";

const HomologyConfigurationStep = ({next}) => {

    const [isNextShowed, showNext] = useState(false);
    const [openPenalty, setOpenPenalty] = useState(10);
    const [extensionPenalty, setExtensionPenalty] = useState(10);
    const [databaseType, setDatabaseType] = useState('OLATCG');

    const databaseTypes = DatabaseTypeEnum.getSelectStructure();

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
                            defaultValue={openPenalty}
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
                            defaultValue={extensionPenalty} 
                            max={20}
                            aria-label="Default" 
                            valueLabelDisplay="auto" 
                            onChange={event => setExtensionPenalty(event.target.value)}
                        />
                    </Box>
                    <Box sx={{width: 200, textAlign: 'center'}}>
                        <Typography gutterBottom>
                            {getMessage('homology.input.label.databaseType')}
                        </Typography>
                        <Select
                            id="databaseType"
                            name="databaseType"
                            value={databaseType}
                            onChange={event => setDatabaseType(event.target.value)}
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
                </Stack>
            </OlatcgStep> 
        : next({
            openPenalty: openPenalty,
            extensionPenalty: extensionPenalty,
            databaseType: databaseType
        })}
    </>
}

export { HomologyConfigurationStep };