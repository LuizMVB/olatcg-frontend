import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { blue, green, orange, red } from "@mui/material/colors";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import OlatcgLoader from "../components/OlatcgLoader";
import OlatcgSnackbar from "../components/OlatcgSnackbar";
import useRequest from "../hooks/useRequest";
import { API_ROUTES } from "../routes/Routes";
import { getMessage } from "../services/MessageService";


const HomologyAnalysisDetails = () => {
    let { idAnalysis } = useParams();
    const [makeRequest] = useRequest();
    const [isLoading, showLoader] = useState(false);
    const [isSnackbarOpened, openSnackbar] = useState(false);
    const [statusSnackbar, setStatusSanckbar] = useState('error');
    const [msgSnackbar, setMsgSnackbar] = useState('');

    const showSnackbar = (msg, status) => {
        setMsgSnackbar(msg);
        setStatusSanckbar(status);
        openSnackbar(true);
    }


    function getData( status, type, alignments, inputAlignment, inputSequence, inputSequenceId, score, similarity, taxonomy) {
        return { status, type, alignments, inputAlignment, inputSequence, inputSequenceId, score, similarity, taxonomy};
    }

    const rows = [
        

    ];

    const onSuccessGetAlignmentByIdAnalysis = (response) => {
        console.log("sucesso")
        getData(fetch(API_ROUTES.GET_TAXONOMY_BY_ID_ANALYSIS + '?idAnalysis=' + idAnalysis)
        .then(response => response.json())
        .then(data => console.log(data)))
    }

    const onFailureGetAlignmentByIdAnalysis = (error) => {
        showSnackbar(getMessage(error.errorDescription), 'error');
        showLoader(false);
    }

    useEffect(() => {
        console.log(`/something/${idAnalysis}`);
        makeRequest(API_ROUTES.GET_TAXONOMY_BY_ID_ANALYSIS + '?idAnalysis=' + idAnalysis, 'GET', null, onSuccessGetAlignmentByIdAnalysis, onFailureGetAlignmentByIdAnalysis);
    }, [idAnalysis]);

    return <>
         <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                {/*<OlatcgHomologyTable idAnalysis={idAnalysis}/>*/}
                    <TableRow>
                        <TableCell TableCell align="center">
                            Alignments
                        </TableCell>
                        <TableCell align="center">
                            Score
                        </TableCell>
                        <TableCell align="center">
                            Similarity
                        </TableCell>
                        <TableCell align="center">
                            Status
                        </TableCell>
                        <TableCell align="center">
                            Type
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                        <TableRow
                            sx={{ '&:last-child td, &:last-child th':
                                { border: 0 } }}
                        >
                            <TableCell component="th" scope="row" TableCell align="center">
                            {idAnalysis}
                            </TableCell>
                            <TableCell align="center">
                            {idAnalysis}
                            </TableCell>
                            <TableCell align="center">
                            {idAnalysis}
                            </TableCell>
                            <TableCell align="center">
                            {idAnalysis}
                            </TableCell>
                            <TableCell align="center">
                            {idAnalysis}
                            </TableCell>
                        </TableRow>
                    
                </TableBody>
            </Table>
                    </TableContainer>
    </>
}

export { HomologyAnalysisDetails };