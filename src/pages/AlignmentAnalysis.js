import { Box, Button, Checkbox, FilledInput, FormControl, InputLabel, ListItemText, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, Pagination } from "@mui/material";
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

    const [searchFormData, setSearchFormData] = useState({
        textFieldTitle: "",
        selectFieldType: [
            'PAIRWISE_ALIGNMENT',
            'HOMOLOGY_SEARCH',
            'TAXONOMY_TREE',
        ],
        selectFieldStatus: [
            'SUCCEEDED',
            'STARTED',
            'WAITING',
            'ERROR',
        ],
    })

    const analysisType = [
        {
            label: getMessage('analysisField.label.type.alignment'),
            value: 'PAIRWISE_ALIGNMENT',
        },
        {
            label: getMessage('analysisField.label.type.homology'),
            value: 'HOMOLOGY_SEARCH',
        },
        {
            label: getMessage('analysisField.label.type.phyloTree'),
            value: 'TAXONOMY_TREE',
        },
    ]

    const analysisStatus = [
        { 
            label: getMessage('analysisField.label.status.success'),
            value:'SUCCEEDED',
        },
        {
            label: getMessage('analysisField.label.status.executing'),
            value: 'STARTED',
        },
        { 
            label: getMessage('analysisField.label.status.waiting'),
            value: 'WAITING',
        },
        {
            label: getMessage('analysisField.label.status.error'), 
            value:'ERROR',
        },
    ]

    const showSnackbar = (msg, status) => {
        setMsgSnackbar(msg);
        setStatusSanckbar(status);
        openSnackbar(true);
    }

    const analysisActionButton = (status, id) =>{
        if (status == analysisStatus[0].label){
            return <Button onClick={() => navigateTo(location.pathname + '/' + id)}>
                        {getMessage('common.label.details')}
                    </Button>
        } else if (status == analysisStatus[1].label || status == analysisStatus[2].label){
            return <Button disabled>
                        {getMessage('common.label.wait')}
                    </Button>
        } else {
            return <Button sx={{color:'error.main'}} disabled>
                        {getMessage('common.label.unavailable')}
                   </Button>
        }
    }

    const colorStatus = (status) =>{
        if (status == analysisStatus[0].label){
            return 'success.main'
        } else if (status == analysisStatus[1].label){
            return 'warning.main'
        } else if (status == analysisStatus[2].label) {
            return '#000000'
        } else {
            return 'error.main'
        }
    }

    const backgroundColorStatus = (status) =>{
        if (status == analysisStatus[0].label){
            return 'success.light'
        } else if (status == analysisStatus[1].label){
            return 'warning.light'
        } else if (status == analysisStatus[2].label) {
            return 'primary.light'
        } else {
            return 'error.light'
        }
    }

    const onSuccessGetAnalysis = (obj) => {
        if (obj.count == 0){
            setInfo(true)
        } else {
            setInfo(false)
        }

        setColumns([{id: 'id', label: getMessage('alignmentAnalysis.label.id')},
                    {id: 'title', label: getMessage('alignmentAnalysis.label.title')},
                    {id: 'description', label: getMessage('alignmentAnalysisDetails.label.description')},
                    {id: 'type', label: getMessage('alignmentAnalysis.label.type')},
                    {id: 'status', label: getMessage('alignmentAnalysis.label.status')},
                    {id: 'action', label: getMessage('alignmentAnalysis.label.action')}]);
        setRows(obj.results.map((anRes, index) => {
            let typeObj = analysisType.find(t => t.value === anRes.type).label
            if (typeObj === undefined) typeObj = '---'
            let statusObj = analysisStatus.find(s => s.value === anRes.status).label
            if (statusObj === undefined) statusObj = '---'

            return {
                code: index,
                id: anRes.id,
                title: anRes.title,
                description: anRes.description,
                type: typeObj,
                status: statusObj,
                action: analysisActionButton(statusObj, anRes.id)
                
            };
        }));

        setTotalPages(Math.ceil(obj.count/15));
        showLoader(false);
    }
  
    const onFailureGetAnalysis = (error) => {
        showSnackbar(getMessage(error.errorDescription), 'error');
        showLoader(false);
    }

    const handlePaginationChange = (e, page) => {
        showLoader(true);
        let url = API_ROUTES.ANALYSIS_LIST;
        url = url.replace('{analysis_type}', searchFormData.selectFieldType.join(','))
        + '&title__icontains=' + searchFormData.textFieldTitle
        + '&status__in=' + searchFormData.selectFieldStatus.join(',')
        + '&ordering=-id' 
        + '&page=' + (page);

        makeRequest(url, 'GET', null, onSuccessGetAnalysis, onFailureGetAnalysis);
    }

    const handleClick = () => {
        showLoader(true);
        let url = API_ROUTES.ANALYSIS_LIST;
        url = url.replace('{analysis_type}', searchFormData.selectFieldType.join(','))
            + '&title__icontains=' + searchFormData.textFieldTitle
            + '&status__in=' + searchFormData.selectFieldStatus.join(',')
            + '&ordering=-id'

        makeRequest(url, 'GET', null, onSuccessGetAnalysis, onFailureGetAnalysis);
    }

    const handleSearchFormChange = (e) => {
        setSearchFormData((val) => {
            return {
                ...val,
                [e.target.name]: e.target.value
            }
        })
    }

    const handleReset = (e) => {
        setSearchFormData({
            textFieldTitle: "",
            selectFieldType: [
                'PAIRWISE_ALIGNMENT',
                'HOMOLOGY_SEARCH',
                'TAXONOMY_TREE',
            ],
            selectFieldStatus: [
                'SUCCEEDED',
                'STARTED',
                'WAITING',
                'ERROR',
            ],
        })
    }

    const onComponentMount = () => {
        showLoader(true);

        let url = API_ROUTES.ANALYSIS_LIST;

        url = url.replace('{analysis_type}', searchFormData.selectFieldType.join(','))
            + '&title__icontains=' + searchFormData.textFieldTitle
            + '&status__in=' + searchFormData.selectFieldStatus.join(',')
            + '&ordering=-id';

        makeRequest(url, 'GET', null, onSuccessGetAnalysis, onFailureGetAnalysis);
    }

    useEffect(() => {
        onComponentMount();
    }, []);
    
    return <> 
        <Box 
            sx={{
                mx: 4,
                mt: 4,
                px:4,
                borderBottom: 1,
            }}>
            <Paper
                variant="outlined"
                elevation={0}
                sx={{ 
                    display: 'flex',
                    flexDirection: 'column',
                    width: '50%',
                    mb: 4,
                    ml: 4,
                    backgroundColor: '#e5f3f0',
                    //border: 1,
                    //borderColor: 'primary.main',
                    //borderRadius: '0.4rem'
                }}
            >
                <Box
                    sx={{
                        mt:2,
                        ml:4,
                    }}
                >
                    <Typography variant="h4" component="h4" sx={{
                        color: 'primary.main',
                        fontWeight: 'bold'
                    }}>
                        {getMessage('analysisField.title')}
                    </Typography>
                    <Typography variant="h6" component="h6" sx={{
                        color: 'primary.main',
                        mt: 1
                    }}>
                        {getMessage('analysisField.subtitle')}
                    </Typography>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '100%',
                    }}
                >
                    <Box sx={{
                        p:1,
                        px: 4
                        }}
                    >
                        <Typography variant="subtitle2" color="primary.main">
                            {getMessage('alignmentAnalysis.label.title')}
                        </Typography>
                        <TextField 
                            variant='outlined'
                            value={searchFormData.textFieldTitle}
                            name={'textFieldTitle'}
                            onChange={handleSearchFormChange}
                            placeholder={getMessage('olatcgAnalysisTable.label.titleAnalysis')}
                            sx={{
                                width: '100%'
                            }}
                        />
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            width: '100%',
                            alignItems: 'center',
                        }}
                    >
                        <Box sx={{
                            mr: 1,
                            ml: 4,
                            width: '50%',
                        }}
                        >
                            <Typography variant="subtitle2" color="primary.main">
                                {getMessage('alignmentAnalysis.label.type')}
                            </Typography>
                            <Select
                                multiple
                                value={searchFormData.selectFieldType}
                                name={'selectFieldType'}
                                onChange={handleSearchFormChange}
                                renderValue={(selected) => {
                                    if (selected.length >= 3) {
                                        return getMessage('analysisField.label.all')
                                    } else {
                                        return selected.join(', ')
                                    }
                                }}
                                sx={{
                                    width: '100%'
                                }}
                            >
                                {analysisType.map((checkType) => (
                                    <MenuItem key={checkType.value} value={checkType.value}>
                                        <Checkbox checked={searchFormData.selectFieldType.includes(checkType.value)}/>
                                        <ListItemText primary={checkType.label}/>
                                    </MenuItem>
                                ))}
                            </Select>
                        </Box>
                        
                        <Box sx={{
                            ml: 1,
                            mr: 4,
                            width: '50%',
                        }}
                        >
                            <Typography variant="subtitle2" color="primary.main">
                                {getMessage('alignmentAnalysis.label.status')}
                            </Typography>
                            <Select
                                multiple
                                value={searchFormData.selectFieldStatus}
                                name={'selectFieldStatus'}
                                onChange={handleSearchFormChange}
                                renderValue={(selected) => {
                                    if (selected.length >= 4){
                                        return getMessage('analysisField.label.all')
                                    } else {
                                        return selected.join(', ')
                                    }
                                }}
                                sx={{
                                    width:'100%'
                                }}
                            >
                                {analysisStatus.map((checkStatus) => (
                                    <MenuItem key={checkStatus.value} value={checkStatus.value}>
                                        <Checkbox checked={searchFormData.selectFieldStatus.includes(checkStatus.value)} />
                                        <ListItemText primary={checkStatus.label} />
                                    </MenuItem>
                                ))}
                            </Select>
                        </Box>
                    </Box>
                </Box>
                <Box 
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        m: 2,
                        ml: 4,
                        mr: 'auto',
                    }}
                >

                    {/* Submit button */}
                    <Button 
                        type="submit" 
                        size="large"
                        onClick={() => handleClick()}
                        sx={{
                            mr: 2,
                            alignSelf: 'center',
                            backgroundColor: 'primary.main',
                            color: 'primary.contrastText',
                            '&:hover': {
                                cursor: 'pointer'
                            }
                            }}
                    >
                        {getMessage('experimentField.label.submit')}
                    </Button>

                    {/* Reset button */}
                    <Button 
                        type="reset" 
                        size="large" 
                        onClick={() => handleReset()} 
                        sx={{
                        alignSelf: 'center',
                        backgroundColor: 'primary.main',
                        color: 'primary.contrastText',
                        '&:hover': {
                            cursor: 'pointer'
                        }
                    }}>
                        {getMessage('experimentField.label.reset')}
                    </Button>
                </Box>

            </Paper>
            <Box sx={{px: 4, pb: 8}}>{info ? <OlatcgNodata />: 
                <Paper sx={{ width: '100%', overflow: 'hidden', bgcolor: 'primary.light' }}>
                    <TableContainer sx={{ maxHeight: '80vh' }}>
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
                </Paper>}
                <Box display="flex" justifyContent="center" mt={2}>
                    <Pagination 
                        count={totalPages} 
                        color="primary" 
                        onChange={handlePaginationChange}
                    />
                </Box>
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
    
};

export { AlignmentAnalysis };