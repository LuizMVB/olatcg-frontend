import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { blue, green, orange, red } from "@mui/material/colors";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import OlatcgLoader from "../components/OlatcgLoader";
import OlatcgSnackbar from "../components/OlatcgSnackbar";
import useRequest from "../hooks/useRequest";
import { API_ROUTES } from "../routes/Routes";
import { getMessage } from "../services/MessageService";
import AlertDialogSlide from "../components/OlatcgAlertDialogSlide";


const HomologyAnalysisDetails = () => {
    let { idAnalysis } = useParams();
    const [makeRequest] = useRequest();
    const [rows, setRows] = useState([]);
    const [columns, setColumns] = useState([]);
    const [isLoading, showLoader] = useState(false);
    const [isSnackbarOpened, openSnackbar] = useState(false);
    const [statusSnackbar, setStatusSanckbar] = useState('error');
    const [msgSnackbar, setMsgSnackbar] = useState('');
    const navigateTo = useNavigate();

    const showSnackbar = (msg, status) => {
        setMsgSnackbar(msg);
        setStatusSanckbar(status);
        openSnackbar(true);
    }
    const onFailureGetAlignmentByIdAnalysis = (error) => {
        showSnackbar(getMessage(error.errorDescription), 'error');
        showLoader(false);
    }

    useEffect(() => {
        showLoader(true);

        let url = API_ROUTES.GET_ANALYSIS_BY_ID;
        url = url.replace('{id}', idAnalysis);

        makeRequest(url, 'GET', null, tablemaker, onFailureGetAlignmentByIdAnalysis);
    }, [idAnalysis]);

const tablemaker = (response)=> {
    if(response.status == 'STARTED') {
        showSnackbar(getMessage('info.analysis.isnt.finished'), 'info');
        setTimeout(() => {
            showLoader(false);
            navigateTo('/analysis/homology');
        }, 5000);
        return;
    }

    setColumns([{
            id: 'alignmentA',
            label: getMessage('olatcgHomologyTable.label.alignmentA' )
        },
        {
            id: 'alignmentB',
            label: getMessage('olatcgHomologyTable.label.alignmentB')
        },
        {
            id: 'identityPercentage',
            label: getMessage('olatcgHomologyTable.label.identityPercentage'  ),
        },
        {
            id: 'sequenceA',
            label: getMessage('olatcgHomologyTable.label.sequenceA' )
        },
        {
            id: 'sequenceB',
            label: getMessage('olatcgHomologyTable.label.sequenceB' )
        },
        {
            id: 'taxonomy',
            label: getMessage('olatcgHomologyTable.label.taxonomy' )
        },
        // {
        //     id: 'action',
        //     label: getMessage('olatcgHomologyTable.label.action')
        // }
    ]);

    setRows(response.alignments.map((homoAnalysis, index) => {
        return {
            code: index + homoAnalysis.taxonomy.id,
            alignmentA: <AlertDialogSlide base = {homoAnalysis.alignmentA}/>,
            alignmentB: <AlertDialogSlide base = {homoAnalysis.alignmentB}/>,
            identityPercentage: (homoAnalysis.identityPercentage * 100).toString() + '%',
            sequenceA: <AlertDialogSlide base = {homoAnalysis.sequenceA}/>,
            sequenceB: <AlertDialogSlide base = {homoAnalysis.sequenceB}/>,
            taxonomy: homoAnalysis.taxonomy.name,
            action: <Button onClick={() => navigateTo("/analysis/homology/tree/" + homoAnalysis.id)}>
                        {getMessage('common.label.show.tree')}
                    </Button>
        };

    }));

    showLoader(false);

}
    
    
    return <>
        <Paper sx={{ width: '96%', overflow: 'hidden', bgcolor: 'primary.light', margin: 'auto'}}>
            <TableContainer sx={{ maxHeight: 550 }}>
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
                            <TableRow hover role="checkbox" key={row.code}>
                                {columns.map((column) => {
                                const value = row[column.id];
                                return (
                                    <TableCell key={column.id} align="center" sx={{wordWrap: 'break-word', maxWidth: 150, verticalAlign: 'top'}}>
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

export { HomologyAnalysisDetails };