import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import OlatcgSnackbar from "../components/OlatcgSnackbar";
import useRequest from "../hooks/useRequest";
import { API_ROUTES } from "../routes/Routes";
import { getMessage } from "../services/MessageService";
import OlatcgNodata from "../components/OlatcgNoData";
import OlatcgLoader from "../components/OlatcgLoader";

const ExperimentTable = ({filters}) => {

    const [makeRequest] = useRequest();
    const [rows, setRows] = useState([]);
    const [columns, setColumns] = useState([]);
    const [isLoading, showLoader] = useState(false);
    const [isSnackbarOpened, openSnackbar] = useState(false);
    const [statusSnackbar, setStatusSanckbar] = useState('error');
    const [msgSnackbar, setMsgSnackbar] = useState('');
    const [info, setInfo] = useState(false);
    const [selectedPage, setSelectedPage] = useState(0);
    const [totalPages, setTotalPages] = useState();

    const showSnackbar = (msg, status) => {
        setMsgSnackbar(msg);
        setStatusSanckbar(status);
        openSnackbar(true);
    }

    const onComponentMount = () => {
        showLoader(true);
        let url = API_ROUTES.GET_EXPERIMENT;

        makeRequest(url, 'GET', null, onSuccessGetExperiment, onFailureGetExperiment);
    }

    const mountSearchURL = () => {
        showLoader(true);

        let url = API_ROUTES.GET_EXPERIMENT;
        if (filters.experiment_id != 0) {
            url += '&filter[id]=' + filters.experiment_id;
        }
        if (filters.experiment_title != '') {
            url += '&filter[title]=' + filters.experiment_title;
        }

       return url;
    }

    const search = () => {
        const url = mountSearchURL();
        makeRequest(url, 'GET', null, onSuccessGetExperiment, onFailureGetExperiment);
    }

    useEffect(() => {
        if (Object.keys(filters).length > 0){
            search();
        }
        else {
            onComponentMount();
        }
    }, [filters]);

    const onSuccessGetExperiment = (obj) => {
        if (obj.data.length === 0) {
            setInfo(true);
        }
        setColumns([{id: 'id', label: getMessage('olatcgExperimentTable.label.idExperiment')},
                    {id: 'title', label: getMessage('olatcgExperimentTable.label.titleExperiment')},
                    {id:'description', label: getMessage('olatcgExperimentTable.label.description')}
        ]);
        setRows(obj.data.map((experiment, index) => {
            return {
                code: index,
                id: experiment.id,
                title: experiment.title,
                description: experiment.description
            };
        }));

        setTotalPages(Math.ceil(obj.meta.total_pages/15));
        showLoader(false);
    }

    const onFailureGetExperiment = (error) => {
        showSnackbar(getMessage(error.errorDescription), 'error');
        showLoader(false);
    }

    const handlePaginationChange = (e, page) => {
        showLoader(true);
        let url = API_ROUTES.GET_EXPERIMENT;
        url += '&page=' + (page);

        makeRequest(url, 'GET', null, onSuccessGetExperiment, onFailureGetExperiment)
    }


    
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
                                            return (
                                                <TableCell 
                                                    key={column.id} 
                                                    align="center" 
                                                    sx={{ 
                                                            maxWidth: 150, 
                                                            verticalAlign: 'center',
                                                            backgroundColor: 'primary.light',
                                                            whiteSpace: 'pre-wrap',
                                                            wordBreak: 'break-word'
                                                        }}
                                                >
                                                    {value}
                                                </TableCell>
                                            );
                                        }
                                    )};
                                    </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>}
                <Box display="flex" justifyContent="center" mt={2}>
                    <Pagination 
                        count={totalPages} 
                        color="primary" 
                        onChange={handlePaginationChange}
                    />
                </Box>
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

export {ExperimentTable};