import { useState } from "react";
import { OlatcgStep } from "./OlatcgStep";
import { Box, MenuItem, Select, Slider, Stack, Typography } from "@mui/material";
import { getMessage } from "../services/MessageService";
import DatabaseTypeEnum from "../infra/enums/DatabaseTypesEnum";

const HomologyConfigurationStep = ({next}) => {

    const [isNextShowed, showNext] = useState(false);
    const [form, setForm] = useState({
        matchScore: 10, 
        mismatchScore: 10, 
        databaseType: 'OLATCGDB', 
    });

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
                            {getMessage('alignment.input.label.matchScore')}
                        </Typography>
                        <Slider 
                            id="matchScore"
                            name="matchScore"
                            defaultValue={form.matchScore}
                            max={20}
                            aria-label="Default" 
                            valueLabelDisplay="auto"
                            onChange={event => form.matchScore = event.target.value}
                        />
                    </Box>
                    <Box sx={{width: 400, textAlign: 'center'}}>
                        <Typography gutterBottom>
                            {getMessage('alignment.input.label.mismatchScore')}
                        </Typography>
                        <Slider 
                            id="mismatchScore"
                            name="mismatchScore"
                            defaultValue={form.mismatchScore} 
                            max={20}
                            aria-label="Default" 
                            valueLabelDisplay="auto" 
                            onChange={event => form.mismatchScore = event.target.value}
                        />
                    </Box>
                    <Box sx={{width: 200, textAlign: 'center'}}>
                        <Typography gutterBottom>
                            {getMessage('homology.input.label.databaseType')}
                        </Typography>
                        <Select
                            id="databaseType"
                            name="databaseType"
                            value={form.databaseType ? form.databaseType : 'OLATCGDB'}
                            onChange={event => form.databaseType = event.target.value}
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
        : next(form)}
    </>
}

export { HomologyConfigurationStep };