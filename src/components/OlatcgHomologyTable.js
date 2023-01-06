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
        let valores = Object.values(response)
        console.log(valores[1])
        setColumns([{
            id: 'status',
            label: getMessage('olatcgHomologyTable.label.status')
        },
        {
            id: 'type',
            label: getMessage('olatcgHomologyTable.label.type')
        }]); 
        setRows(valores.map((index) => {
            return { 
                code: index,
                status: valores[1],
                type: valores[2],
            };
        }));
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
        makeRequest(API_ROUTES.GET_TAXONOMY_BY_ID_ANALYSIS + '?idAnalysis=' + idAnalysis, 'GET', null, onSuccessGetAlignmentByIdAnalysis, onFailureGetAlignmentByIdAnalysis);
        // eslint-disable-next-line
    }, [idAnalysis]);

    return <>
        <Paper sx={{ width: '100%', overflow: 'hidden', bgcolor: 'primary.light' }}>
            <Typography component="div" variant="h4" sx={{backgroundColor: 'primary.dark', p: 1}}>
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
                                    
                                    <TableCell key={column.id} align="center" sx={{wordWrap: 'break-word', maxWidth: 70, verticalAlign: 'top'}}>
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