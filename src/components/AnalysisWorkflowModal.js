import { Box, Button, Card, CardActionArea, CardContent, CircularProgress, Divider, Modal, Paper, Tooltip, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useRequest from "../hooks/useRequest";
import { API_ROUTES } from "../routes/Routes";
import { getMessage } from "../services/MessageService";
import OlatcgLoader from "../components/OlatcgLoader";
import OlatcgSnackbar from "../components/OlatcgSnackbar";
import LanOutlinedIcon from '@mui/icons-material/LanOutlined';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const AnalysisWorkflowModal = ({ baseAnalysis }) =>{
    const navigateTo = useNavigate();
    const [makeRequest] = useRequest();
    const [isLoading, showLoader] = useState(false);
    const [isSnackbarOpened, openSnackbar] = useState(false);
    const [statusSnackbar, setStatusSanckbar] = useState('error');
    const [msgSnackbar, setMsgSnackbar] = useState('');
    const [open, setOpen] = useState(false);
    const [parentAnalysis, setParentAnalysis] = useState({id:0});
    const handleClose = () => setOpen(false);

    const showSnackbar = (msg, status) => {
        setMsgSnackbar(msg);
        setStatusSanckbar(status);
        openSnackbar(true);
    }

    const onSuccessSingleAnalysisRequest = (obj) =>{
        setParentAnalysis(obj.data)
        showLoader(false);
        setOpen(true)
    }

    const onFailureSingleAnalysisRequest = (error) =>{
        showSnackbar(error.errorDescription, 'error');
        showLoader(false);
    }

    const makeSingleAnalysisRequest = () =>{
        showLoader(true);

        let url = API_ROUTES.GET_ANALYSIS_BY_ID;
        url = url.replace('{id}', baseAnalysis.generated_from_analysis);

        makeRequest(url, 'GET', null, onSuccessSingleAnalysisRequest, onFailureSingleAnalysisRequest);
    }

    const handleWorkflowModal = () => {
        if(parentAnalysis.id == 0){
            makeSingleAnalysisRequest();
        } else {
            setOpen(true);
        }
    }

    const analysisCardAction = ({analysis}) => {
    
        switch(analysis.type){
            case 'ALIGNMENT':
                navigateTo('/analysis/alignment/' + analysis.id)
                break;
            case 'HOMOLOGY':
                navigateTo('/analysis/homology/' + analysis.id)
                break;
            case 'TAXONOMY_TREE':
                navigateTo('/analysis/phylogeneticTree/' + analysis.id)
                break;
            default:
                return
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


    const AnalysisCard = ({ analysis }) => (
        <Card variant='outlined' sx={{width:'28rem', maxWidth:'24vw', height:'14rem', maxHeight:'18vw', p:0, color:'primary.contrastText', backgroundColor:'primary.main', borderRadius:'1.6rem' }}>
            <CardActionArea onClick={() => analysisCardAction({analysis})} sx={{width:'100%', height:'100%'}} disabled={analysis.status !== 'EXECUTION_SUCCEEDED'}>
                <CardContent sx={{p:0}}>
                    <Typography variant="h4" sx={{textAlign: 'center',p:'0.6rem', m:0, mb:2, mt:'-0.6rem', backgroundColor:'primary.dark'}}>
                        {analysis.id + ' - ' + getAnalysisType(analysis.type)}
                    </Typography>
                    <Typography variant="h5" sx={{textAlign: 'center', p:2}}>
                        {analysis.title}
                    </Typography>
                    <Divider variant="middle" sx={{m:1, backgroundColor:'primary.contrastText'}}/>
                    <Typography variant="subtitle1" sx={{textAlign: 'center', p:2}}>
                        {analysis.description}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
    return <>

        <Tooltip title={getMessage('experiment.tooltip.label.relatedAnalysis')} placement='top' arrow>
            <Button
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
                    onClick={() => handleWorkflowModal()}
            />
        </Tooltip>


        <Modal open={open} onClose={handleClose}>
            <Paper sx={{backgroundColor:'primary.light', textAlign:'center', maxWidth:'60vw', maxHeight:'45vw', position:'absolute', top:'50%', left:'50%',transform: 'translate(-50%, -50%)', borderRadius:'2rem'}}>
                <Typography variant="h4" sx={{p:2,px:8, backgroundColor: 'primary.dark', color: 'primary.contrastText', textAlign: 'center', borderTopRightRadius:'2rem', borderTopLeftRadius:'2rem'}}>
                    {getMessage('common.label.workflow')}
                </Typography>
                    
                    {parentAnalysis.id === 0 ?
                        <CircularProgress color="inherit" /> : 
                        <Box sx={{p:'1rem', display:'flex', flexDirection:'column', textAlign:'center', justifyContent:'center', alignItems:'center'}}>
                            <AnalysisCard analysis={parentAnalysis}/>
                            <KeyboardArrowDownIcon sx={{fontSize: '1.6rem', m:3}}/>
                            <AnalysisCard analysis={baseAnalysis}/>
                        </Box>
                    }

            </Paper>
        </Modal>
        <OlatcgSnackbar
            isOpened={isSnackbarOpened} 
            onClose={() => openSnackbar(false)}
            status={statusSnackbar}
            msg={msgSnackbar} 
        />
        <OlatcgLoader show={isLoading}/>
    </>
}

export default AnalysisWorkflowModal