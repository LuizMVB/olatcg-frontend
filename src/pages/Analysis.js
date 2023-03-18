import { Tab, Tabs } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { getMessage } from "../services/MessageService";

const Analysis = () => {
    const navigateTo = useNavigate();
    const location = useLocation();
    const [value, setValue] = useState(location.pathname.includes('/analysis/homology') ? 'HOMOLOGY' : 'ALIGNMENT');

    const onComponentMount = () => {
        if(location.pathname === '/analysis'){
            navigateTo('/analysis/alignment');
        }
    }

    useEffect(() => {
        onComponentMount();
    }, [location, navigateTo])

    return <>
        <Box sx={{ mx: 4, mt: 4, borderBottom: 1 }}>
            <Tabs 
                value={value} 
                onChange={(event, newValue) => setValue(newValue)} 
                aria-label="analysis tabs"
                sx={{ 
                    bgcolor: 'primary.light', 
                    borderTopRightRadius: 2, 
                    borderTopLeftRadius: 2, 
                    borderColor: 'divider' 
                }}
            >
                <Tab 
                    label={getMessage('common.label.alignment')} 
                    value="ALIGNMENT" 
                    onClick={() => navigateTo('/analysis/alignment')} 
                    sx={{fontSize: 25}}
                />
                <Tab 
                    label={getMessage('common.label.homology')} 
                    value="HOMOLOGY" 
                    onClick={() => navigateTo('/analysis/homology')}
                    sx={{fontSize: 25}}
                />
            </Tabs>
        </Box>
        <br/>
        <Outlet />
    </>
};

export { Analysis };