import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import OlatcgSnackbar from "../components/OlatcgSnackbar";
import useRequest from "../hooks/useRequest";
import { API_ROUTES } from "../routes/Routes";
import { getMessage } from "../services/MessageService";
import OlatcgNodata from "../components/OlatcgNoData";
import OlatcgLoader from "../components/OlatcgLoader";

const AlignmentAnalysis = () => {

    const location = useLocation();
    const navigateTo = useNavigate();
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

    const onSuccessGetAlignmentAnalysis = (data, paginationAndSort) => {
        if (data.length === 0){
            setInfo(true)
        } 
        setColumns([{id: 'id', label: getMessage('alignmentAnalysis.label.id')},
                    {id: 'status', label: getMessage('alignmentAnalysis.label.status')},
                    {id: 'action', label: getMessage('alignmentAnalysis.label.action')}]);
        setRows(data.map((alnAnalysis, index) => {
            return {
                code: index,
                id: alnAnalysis.id,
                status: alnAnalysis.status,
                action: <Button onClick={() => navigateTo("/analysis/alignment/" + alnAnalysis.id)}>
                    {getMessage('common.label.details')}
                </Button>
                
            };
        }));

        setSelectedPage(paginationAndSort.pageNumber);
        setTotalPages(paginationAndSort.totalPages);
        showLoader(false);
    }
  
    const onFailureGetAlignmentAnalysis = (error) => {
        showSnackbar(getMessage(error.errorDescription), 'error');
        showLoader(false);
    }

    const onComponentMount = () => {
        showLoader(true);

        let url = API_ROUTES.SEARCH_ANALYSIS_BY_TYPE;
        url = url.replace('{value}', 'ALIGNMENT');

        makeRequest(url, 'GET', null, onSuccessGetAlignmentAnalysis, onFailureGetAlignmentAnalysis);
    }

    const handlePaginationChange = (e, page) => {
        showLoader(true);
        setSelectedPage(page);
        let url = API_ROUTES.SEARCH_ANALYSIS_BY_TYPE;
        url = url.replace('{value}', 'ALIGNMENT') + '?pageNumber=' + (page - 1) + '&pageSize=15&sort=DESC';

        makeRequest(url, 'GET', null, onSuccessGetAlignmentAnalysis, onFailureGetAlignmentAnalysis);
    }

    useEffect(() => {
        onComponentMount();
    }, []);

    if(location.pathname === '/analysis/alignment'){
        
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

    return <Outlet />
};

export { AlignmentAnalysis };