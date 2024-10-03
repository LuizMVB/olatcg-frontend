import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import useRequest from "../hooks/useRequest";
import { API_ROUTES } from "../routes/Routes";
import { getMessage } from "../services/MessageService";
import OlatcgLoader from "./OlatcgLoader";
import OlatcgSnackbar from "./OlatcgSnackbar";

const OlatcgHomologyTable = ({idAnalysis}) => {
    const [makeRequest] = useRequest();
    const [rows, setRows] = useState([]);
    const [columns, setColumns] = useState([]);
    const [isLoading, showLoader] = useState(false);
    const [isSnackbarOpened, openSnackbar] = useState(false);
    const [statusSnackbar, setStatusSanckbar] = useState('error');
    const [msgSnackbar, setMsgSnackbar] = useState('');

    const onSuccessGetAlignmentByIdAnalysis = (response) => {
        setColumns([{
            id: 'status',
            label: getMessage('olatcgHomologyTable.label.status')
        },
        {
            id: 'type',
            label: getMessage('olatcgHomologyTable.label.type')
        }]); 
        setRows([{
            status: response.data.status,
            type: response.data.type
        }]);
        showLoader(false);
        
    }

    const showSnackbar = (msg, status) => {
        setMsgSnackbar(msg);
        setStatusSanckbar(status);
        openSnackbar(true);
    }

    const onFailureGetAlignmentByIdAnalysis = (error) => {
        setMsgSnackbar(error.errorDescription);
        showSnackbar(error.errorDescription, 'error');
        showLoader(true);
        setTimeout(() => {
            document.location.reload();
            showLoader(false);
        }, 5000);
    }

    useEffect(() => {
        showLoader(true);

        let url = API_ROUTES.GET_ANALYSIS_BY_ID;
        url = url.replace('{id}', idAnalysis);

        makeRequest(url, 'GET', null, onSuccessGetAlignmentByIdAnalysis, onFailureGetAlignmentByIdAnalysis);
        // eslint-disable-next-line
    }, [idAnalysis]);

    return <>
        <Paper sx={{ width: '100%', overflow: 'hidden', bgcolor: 'primary.light' }}>
            <Typography component="div" variant="h4" sx={{backgroundColor: 'primary.dark', p: 1, color: 'primary.contrastText'}}>
                {getMessage('alignment.followAnalysis.preview', idAnalysis)}
            </Typography>
            <TableContainer sx={{ maxHeight: 120 }}>
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
                        
                        {rows.slice(0,1).map((row) => {
                            return (
                            <TableRow hover role="checkbox" tabIndex={-2} key={row.index}>
                                {columns.map((column) => {
                                const value = row[column.id];
                                return (
                                    
                                    <TableCell key={column.id} align="center" sx={{wordWrap: 'break-word', fontSize:'1.2rem', maxWidth: 70, verticalAlign: 'top'}}>
                                        {value}
                                    </TableCell>
                                );
                                })}
                            </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
        <OlatcgSnackbar
            isOpened={isSnackbarOpened} 
            onClose={() => openSnackbar(false)}
            status={statusSnackbar}
            msg={msgSnackbar} 
        />
        <OlatcgLoader show={isLoading}/>
    </>
}

export default OlatcgHomologyTable;