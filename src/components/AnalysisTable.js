import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useRequest from "../hooks/useRequest";
import { Box, Button, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { getMessage } from "../services/MessageService";
import { API_ROUTES } from "../routes/Routes";
import OlatcgNodata from "./OlatcgNoData";
import OlatcgSnackbar from "./OlatcgSnackbar";
import OlatcgLoader from "./OlatcgLoader";


const AnalysisTable = ({filters}) => {

    const navigateTo = useNavigate();
    const [makeRequest] = useRequest();
    const [rows, setRows] = useState([]);
    const [columns, setColumns] = useState([]);
    const [isLoading, showLoader] = useState(false);
    const [isSnackBarOpened, openSnackBar] = useState(false);
    const [statusSnackBar, setStatusSnackBar] = useState('error');
    const [msgSnackBar, setMsgSnackBar] = useState('');
    const [info, setInfo] = useState(false);
    const [totalPages, setTotalPages] = useState();

    const [experiments, setExperiments] = useState([]);

    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");


    const showSnackbar = (msg, status) => {
        setMsgSnackBar(msg);
        setStatusSnackBar(status);
        openSnackBar(true);
    }
    
    useEffect(() => {
        const onComponentMount = () => {
            showLoader(true);

            const token = '71d2d6378189409c33b3d804faadc0554a250b0b';
            
            let urlExperiment = API_ROUTES.GET_EXPERIMENT;

            if (filters.experiment_id || filters.experiment_title) {
                
                if (filters.experiment_id!==0 && filters.experiment_id !== undefined) {
                    urlExperiment += '&id__in=' + filters.experiment_id;
                }
                if (filters.experiment_title!=='' && filters.experiment_title !== undefined) {
                    urlExperiment += '&title__icontains=' + filters.experiment_title;
                }
            }
            
            console.log(urlExperiment);

            makeRequest(
                urlExperiment, 
                'GET', 
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Token ${token}`,
                    },
                }, 
                onSuccessGetExperiments, 
                onFailureGetExperiments );
        };

        onComponentMount();
    }, [filters]);    

    const onSuccessGetExperiments = (response) => {

        const token = '71d2d6378189409c33b3d804faadc0554a250b0b';

        setExperiments(response);
        response.forEach(experiment => {
            
            showLoader(true);
            let url;
            url = API_ROUTES.ANALYSIS_FROM_EXPERIMENT_ID;
            url = url.replace('{experiment_id}', experiment.id) + '?ordering=-id';

            if(filters.analysis_id){ 
                url += '&id__in=' + filters.analysis_id;
            }
            if(filters.analysis_title){
                url += '&title__icontains=' + filters.analysis_title;
            }
            if(filters.analysis_type?.length > 0){
                url += '&type__in=' + filters.analysis_type.join(',');
            }
            if(filters.analysis_status?.length > 0){
                url += '&status__in=' + filters.analysis_status.join(',');
            }

            makeRequest(
                url, 
                'GET', 
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Token ${token}`,
                    },
                }, 
                onSuccessGetAnalysis, 
                onFailureGetAnalysis );
        })
    }

    const onFailureGetExperiments = (error) => {
        showSnackbar(getMessage(error.errorDescription), 'error');
        showLoader(false);
        console.log(error);
    }

    
    const analysisActionButton = (status, id, type) => {
        if (status == 'SUCCEEDED') {
           return ( <Button onClick={() => {
            navigateTo(`/analysis/${id}`, {state: {type}});
            }} >
                {getMessage('common.label.details')}
            </Button> );
           
        }
        else if (status == 'WAITING' || status == 'IN_EXECUTION') {
            return <Button disabled>
                {getMessage('common.label.wait')}
            </Button>
        }
        else {
            return <Button sx={{color: 'error.main'}} disabled>
                {getMessage('common.label.unavailable')}
            </Button>
        }
    }

    const colorStatus = (status) => {
        if (status == 'SUCCEEDED') {
            return 'success.main'
        }
        else if (status == 'IN_EXECUTION') {
            return 'warning.main'
        }
        else if (status == 'WAITING') {
            return '#000000'
        }
        else {
            return 'error.main'
        }
    }

    const backgroundColorStatus = (status) => {
        if (status == 'SUCCEEDED') {
            return 'success.light'
        }
        else if (status == 'IN_EXECUTION') {
            return 'warning.light'
        }
        else if (status == 'WAITING') {
            return 'primary.light'
        }
        else {
            return 'error.light'
        }
    }

    const onSuccessGetAnalysis = (obj) => {
        if (obj.data.length === 0) {
            setInfo(true);
        }

        setColumns([{id: 'experiment', label: getMessage('olatcgAnalysisTable.label.idExperiment')},
                    {id: 'id', label: getMessage('olatcgAnalysisTable.label.idAnalysis')},
                    {id: 'title', label: getMessage('olatcgAnalysisTable.label.titleAnalysis')},
                    {id: 'description', label: getMessage('olatcgAnalysisTable.label.description')},
                    {id: 'type', label: getMessage('olatcgAnalysisTable.label.type')},
                    {id: 'status', label: getMessage('olatcgAnalysisTable.label.status')},
                    {id: 'action', label: getMessage('olatcgAnalysisTable.label.action')}]);
        setRows(obj.data.map((analysis, index) => {
            return {
                code: index, 
                experiment: analysis.experiment,
                id: analysis.id,
                title: analysis.title,
                description: analysis.description,
                type: analysis.type,
                status: analysis.status,
                action: analysisActionButton(analysis.status, analysis.id, analysis.type)
            };
        }));

        setTotalPages(Math.ceil(obj.meta.total_pages/15));
        showLoader(false);
    }

     const onFailureGetAnalysis = (error) => {
        showSnackbar(getMessage(error.errorDescription), 'error');
        showLoader(false);
    }

    const handlePaginationChange = (e, page) => {
        showLoader(true);
        let url = API_ROUTES.GET_ANALYSIS;
        url += '?ordering=-id' + '&page=' + (page);

        makeRequest(url, 'GET', null, onSuccessGetAnalysis, onFailureGetAnalysis);
    }

    return <>
        <Box sx={{px: 4, pb: 8}}> {info ? <OlatcgNodata />:
            <Paper sx={{ width: '100%', overflow: 'hidden', bgcolor: 'primary.light'}}>
                <TableContainer sx={{maxHeight: '60vh'}}>
                    <Table stickyHeader aria-label="sticy table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={'center'}
                                        sx={{bgcolor: 'primary.main', color: 'primary.contrastText'}}
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
                                            if (column.id == 'status'){
                                                return (
                                                    <TableCell 
                                                        key={column.id}
                                                        align="center"
                                                        sx={{
                                                            maxWidth: 150,
                                                            verticalAlign: 'center',
                                                            fontWeight: 'bold',
                                                            color: colorStatus(value),
                                                            backgroundColor: backgroundColorStatus(value),
                                                            whiteSpace: 'pre-wrap',
                                                            wordBreak: 'break-word'
                                                        }}
                                                    >
                                                        {value}
                                                    </TableCell>
                                                );
                                            } else {
                                                 return (
                                                    <TableCell 
                                                        key={column.id}
                                                        align="center"
                                                        sx={{
                                                            maxWidth: 150,
                                                            verticalAlign: 'center',
                                                            backgroundColor: backgroundColorStatus(row['status']),
                                                            whiteSpace: 'pre-wrap',
                                                            wordBreak: 'break-word'
                                                        }}
                                                    >
                                                        {value}
                                                    </TableCell>
                                                );
                                            }
                                        })}
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper> }
            <Box display="flex" justifyContent="center" mt={2}>
                <Pagination count={totalPages} color="primary" onChange={handlePaginationChange} />
            </Box>
        </Box>
        <OlatcgSnackbar isOpened={isSnackBarOpened} onClose={() => openSnackBar(false)} status={statusSnackBar} msg={msgSnackBar} />
        <OlatcgLoader show={isLoading} />
    </>

}

export {AnalysisTable}