import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
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
    const [analysisName, setAnalysisName] = useState('');
    const [isAnalysisAvailable, setIsAnalysisAvailable] = useState(true);

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

const tablemaker = (obj)=> {
    /*if(obj.data.status == 'STARTED') {
        showSnackbar(getMessage('info.analysis.isnt.finished'), 'info');
        setTimeout(() => {
            showLoader(false);
            navigateTo('/analysis/homology');
        }, 5000);
        return;
    }*/

    setAnalysisName(obj.data.title);

    if(obj.data.taxonomies){
        setIsAnalysisAvailable(true)

        setColumns([
            {
                id: 'title',
                label: getMessage( 'alignmentAnalysis.label.title' )
            },
            {
                id: 'alignmentA',
                label: getMessage('olatcgHomologyTable.label.alignmentA' )
            },
            {
                id: 'alignmentB',
                label: getMessage('olatcgHomologyTable.label.alignmentB')
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

        setRows(obj.data.taxonomies.map((homoAnalysis, index) => {
            return {
                code: index + homoAnalysis.id,
                title: homoAnalysis.title,
                alignmentA: <AlertDialogSlide base = {homoAnalysis.alignments[0].biological_sequences[0].bases}/>,
                alignmentB: <AlertDialogSlide base = {homoAnalysis.alignments[0].biological_sequences[1].bases}/>,
                taxonomy: homoAnalysis.lineage/*,
                action: <Button onClick={() => navigateTo("/analysis/homology/tree/" + homoAnalysis.id)}>
                            {getMessage('common.label.show.tree')}
                        </Button>*/
            };

        }));
    } else {
        setIsAnalysisAvailable(false)

        setColumns([
            {
                id: 'type',
                label: getMessage('alignmentAnalysis.label.type')
            },
            {
                id: 'status',
                label: getMessage('alignmentAnalysis.label.status')
            },
        ]);

        setRows([{
            type: obj.data.type,
            status: obj.data.status           
        }]);

    }

    showLoader(false);

}
    
    return <>
        <Box sx={{ px: 4, my: 'auto'}}>
            <Paper sx={{ width: isAnalysisAvailable ? '96%' : '60%', overflow: 'hidden', bgcolor: 'primary.light', margin: 'auto'}}>
                <Typography component="div" variant="h4" sx={{backgroundColor: 'primary.dark', color: 'primary.contrastText', textAlign: 'center'}}>
                    ID {idAnalysis} - {analysisName}
                </Typography>
                {!isAnalysisAvailable && (
                    <Box 
                        sx={{height:'2.4rem',
                            border:2,
                            bgcolor: '#c9345555',
                            borderRadius:'0.6rem',
                            textAlign:'center',
                            verticalAlign:'center', 
                            position:'absolute',
                            bottom:'2.4rem', 
                            width:'60%', 
                            borderColor:'#feefef'
                            }}
                        >
                        <Typography variant='body1' sx={{my:'auto', fontStyle:'italic', color:'primary.contrastText'}}>
                            {getMessage('homologyTable.error')}
                        </Typography>
                    </Box>
                )}
                <TableContainer sx={{ maxHeight: '65vh' }}>
                    <Table stickyHeader aria-label="sticky table" >
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={'center'}
                                        sx={{bgcolor: 'primary.main',
                                            color: 'primary.contrastText'
                                        }}
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
                                        <TableCell key={column.id} align="center" sx={{wordWrap: 'break-word', bgcolor: 'primary.light', maxWidth: 150, verticalAlign: 'top'}}>
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

export { HomologyAnalysisDetails };