import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Pagination, Typography } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import OlatcgSnackbar from "../components/OlatcgSnackbar";
import useRequest from "../hooks/useRequest";
import { API_ROUTES } from "../routes/Routes";
import { getMessage } from "../services/MessageService";
import OlatcgNodata from "../components/OlatcgNoData";
import OlatcgLoader from "../components/OlatcgLoader";
import AnalysisWorkflowModal from "../components/AnalysisWorkflowModal";
import LanOutlinedIcon from '@mui/icons-material/LanOutlined';



const ExperimentAnalysis = () => {

    const location = useLocation();
    const navigateTo = useNavigate();
    const [makeRequest] = useRequest();
    const [rows, setRows] = useState([]);
    const [columns, setColumns] = useState([]);
    
    const [experiments, setExperiments] = useState([]);
    const [expanded, setExpanded] = useState('n/a')

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

    const DisabledWorkflowButton = () => (<Button
        startIcon={<LanOutlinedIcon/>}
        variant='contained'
        sx={{display:'flex',
            width:'1.8rem',
            height:'1.4rem',
            minWidth:0,
            p:0,
            color:'primary.contrastText',
            backgroundColor:'primary',
            borderRadius: '0.2rem',
            textAlign:'center',
            "& .MuiButton-startIcon": {
                m:'auto',
            }
        }}
            disabled
    />)

    const analysisActionButton = (analysis) =>{
    let analysisNavigator = '';

    switch(analysis.type){
        case 'ALIGNMENT':
            analysisNavigator = 'alignment';
            break;
        case 'HOMOLOGY':
            analysisNavigator = 'homology';
            break;
        case 'TAXONOMY_TREE':
            analysisNavigator = 'phylogeneticTree';
            break;
        default:
            analysisNavigator = 'err'
    }

        if (analysis.status == 'EXECUTION_SUCCEEDED'){
            return <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                        <Button onClick={() => navigateTo('/analysis/'+ analysisNavigator + '/' + analysis.id)}>
                            {getMessage('common.label.details')}
                        </Button>
                        {analysis.generated_from_analysis === null ? 
                            <DisabledWorkflowButton/>
                            : <AnalysisWorkflowModal baseAnalysis={analysis}/>}
                    </div>
        } else if (analysis.status == 'WAITING_FOR_EXECUTION' || analysis.status == 'IN_EXECUTION'){
            return <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                        <Button disabled>
                            {getMessage('common.label.wait')}
                        </Button>
                        <DisabledWorkflowButton/>
                    </div>
        } else {
            return <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                        <Button disabled>
                            {getMessage('common.label.unavailable')}
                        </Button>
                        <DisabledWorkflowButton/>
                    </div>
        }
    }

    const getAnalysisType = (analysisType) => {
    
        switch(analysisType){
            case 'ALIGNMENT':
                return getMessage('common.label.alignment')
            case 'HOMOLOGY':
                return getMessage('common.label.homology')
            case 'TAXONOMY_TREE':
                return getMessage('phyloTree.label.tree');
            default:
                return
        }
    }

    const colorStatus = (status) =>{
        if (status == 'EXECUTION_SUCCEEDED'){
            return 'success.main'
        } else if (status == 'IN_EXECUTION'){
            return 'warning.main'
        } else if (status == 'WAITING_FOR_EXECUTION') {
            return '#000000'
        } else {
            return 'error.main'
        }
    }

    const backgroundColorStatus = (status) =>{
        if (status == 'EXECUTION_SUCCEEDED'){
            return 'success.light'
        } else if (status == 'IN_EXECUTION'){
            return 'warning.light'
        } else if (status == 'WAITING_FOR_EXECUTION') {
            return 'primary.light'
        } else {
            return 'error.light'
        }
    }

    const OnSuccessGetExperiments = (obj) => {
        if (obj.data.length === 0){
            setInfo(true)
        }

        setExperiments(obj.data.map((expAnalysis, index) => {
            return{
                index: index,
                id: expAnalysis.id,
                title: expAnalysis.title,
                description: expAnalysis.description,
                hasContent: expAnalysis?.analyses !== undefined,
                ...(expAnalysis.analyses !== undefined ? { analyses: expAnalysis.analyses } : {})
            }
        
        }))

        setColumns([{id: 'id', label: getMessage('alignmentAnalysis.label.id')},
                    {id: 'title', label: getMessage('alignmentAnalysis.label.title')},
                    {id: 'description', label: getMessage('alignmentAnalysisDetails.label.description')},
                    {id: 'type', label: getMessage('alignmentAnalysis.label.type')},
                    {id: 'status', label: getMessage('alignmentAnalysis.label.status')},
                    {id: 'action', label: getMessage('alignmentAnalysis.label.action')}]);


        setTotalPages(Math.ceil(obj.meta.total_pages/15));
        showLoader(false);
    }

    const handleAccordionExpansion = (panel) => (event, newExpanded) => { 
        setExpanded(newExpanded ? panel : false);

        setRows(experiments[panel].analyses.map((analysis, index) => {
            return {
                code: index,
                id: analysis.id,
                title: analysis.title,
                description: analysis.description,
                type: getAnalysisType(analysis.type),
                status: analysis.status,
                action: analysisActionButton(analysis)
                
            };
        }))
    }
  
    const OnFailureGetExperiments = (error) => {
        showSnackbar(getMessage(error.errorDescription), 'error');
        showLoader(false);
    }

    const onComponentMount = () => {
        showLoader(true);

        let url = API_ROUTES.BASE_EXPERIMENT + '?ordering=-id';

        makeRequest(url, 'GET', null, OnSuccessGetExperiments, OnFailureGetExperiments);
    }

    const handlePaginationChange = (e, page) => {
        showLoader(true);
        let url = API_ROUTES.BASE_EXPERIMENT + '?ordering=-id' + '&page=' + (page);

        makeRequest(url, 'GET', null, OnSuccessGetExperiments, OnFailureGetExperiments);
    }

    useEffect(() => {
        onComponentMount();
    }, []);

    if(location.pathname === '/analysis/experiments'){
        
        return <> 
         
            <Box sx={{px: 4, pb: 8}}>{info ? <OlatcgNodata />: 
                <Paper sx={{ width: '100%', overflow: 'hidden', bgcolor: 'primary.light' }}>
                    {experiments.map((exp) => (
                        <Accordion
                        expanded={expanded === exp.index && exp.hasContent}
                        onChange={handleAccordionExpansion(exp.index)}
                        disableGutters>
                            <AccordionSummary 
                            id={exp.index}
                            expandIcon={<ExpandMoreIcon sx={{color: 'primary.contrastText'}}/>}
                            disabled={!exp.hasContent}
                            sx={{height:'4.4rem', backgroundColor:'primary.main'}}>
                                <Typography component='span' variant="h5" sx={{ color: 'primary.contrastText', width: '33%' }}>
                                    ID {exp.id} - {exp.title}
                                </Typography>
                                <Typography component='span' variant="h6" sx={{ color: 'primary.contrastText' }}>
                                    {exp.description}
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails sx={{backgroundColor:'primary.light',
                                display: 'flex',
                                flexDirection: 'column'
                            }}>                                
                                {exp.hasContent ? (
                                    <TableContainer sx={{ maxHeight: '40vh', borderRadius: '0.6rem' }}>
                                        <Table stickyHeader aria-label="sticky table">
                                        
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
                                ) : (<></>)}

                                <Button 
                                variant='contained'
                                sx={{borderTopLeftRadius: "0px", borderTopRightRadius: "0px"}}
                                onClick={() => navigateTo('/analysis/alignment')}>
                                    {getMessage('experiment.button.label.viewMore')}
                                </Button>
                            </AccordionDetails>

                        </Accordion>
                    ))}

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

export { ExperimentAnalysis };