import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import OlatcgLoader from "../components/OlatcgLoader";
import OlatcgSnackbar from "../components/OlatcgSnackbar";
import useRequest from "../hooks/useRequest";
import { API_ROUTES } from "../routes/Routes";
import { getMessage } from "../services/MessageService";
import OlatcgNodata from "../components/OlatcgNoData";

const HomologyAnalysis = () => {

    const location = useLocation();
    const navigateTo = useNavigate();
    const [makeRequest] = useRequest();
    const [rows, setRows] = useState([]);
    const [columns, setColumns] = useState([]);
    const [isLoading, showLoader] = useState(false);
    const [isSnackbarOpened, openSnackbar] = useState(false);
    const [statusSnackbar, setStatusSanckbar] = useState('error');
    const [msgSnackbar, setMsgSnackbar] = useState('');
    const [info, setInfo] = useState(false)

    const showSnackbar = (msg, status) => {
        setMsgSnackbar(msg);
        setStatusSanckbar(status);
        openSnackbar(true);
    }

    const onSuccessGetAlignmentAnalysis = (response) => {
        if (response.length === 0){
            setInfo(true)} 
        setColumns([{id: 'id', label: getMessage('alignmentAnalysis.label.id')},
                    {id: 'status', label: getMessage('alignmentAnalysis.label.status')},
                    {id: 'action', label: getMessage('alignmentAnalysis.label.action')}]);

        setRows(response.map((alnAnalysis, index) => {
            return {
                code: index,
                id: alnAnalysis.id,
                status: alnAnalysis.status,
                action: <Button onClick={() => navigateTo(location.pathname + '/' + alnAnalysis.id)}>
                    {getMessage('common.label.details')}
                </Button>
            };
        }));
        showLoader(false);
    }

    const onFailureGetAlignmentAnalysis = (error) => {
        showSnackbar(getMessage(error.errorDescription), 'error');
        showLoader(false);
    }

    useEffect(() => {
        showLoader(true);
        makeRequest(API_ROUTES.SEARCH_ANALYSIS_BY_TYPE + '?type=TAXONOMY', 'GET', null, onSuccessGetAlignmentAnalysis, onFailureGetAlignmentAnalysis);

        // eslint-disable-next-line
    }, []);
    
   

    if(location.pathname === '/analysis/homology'){
        
    
        
        return <>
            <Box sx={{px: 4, pb: 8}}>{info ? <OlatcgNodata />: 
                <Paper sx={{ width: '100%', overflow: 'hidden', bgcolor: 'primary.light' }}>
                    <TableContainer sx={{ maxHeight: '60vh' }}>
                        <Table stickyHeader aria-label="sticky table" >
                            <TableHead>
                                <TableRow>
                                    {columns.map((column) => (
                                        <TableCell
                                            key={column.id}
                                            align={'center'}
                                            sx={{bgcolor: 'primary.main'}}
                                        >
                                            {column.label}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row) => {
                                    return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                        {columns.map((column) => {
                                        const value = row[column.id];
                                        return (
                                            <TableCell 
                                                key={column.id} 
                                                align="center" 
                                                sx={{ 
                                                        maxWidth: 150, 
                                                        verticalAlign: 'center'
                                                    }}
                                            >
                                                {value}
                                            </TableCell>
                                        );})}
                                    </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>}
            </Box>
            <OlatcgSnackbar
                isOpened={isSnackbarOpened} 
                onClose={() => openSnackbar(false)}
                status={statusSnackbar}
                msg={msgSnackbar} 
            />
            <OlatcgLoader show={isLoading}/>
        </>
    }

    return <Outlet />
};

export { HomologyAnalysis };