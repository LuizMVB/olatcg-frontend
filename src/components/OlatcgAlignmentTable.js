import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import useRequest from "../hooks/useRequest";
import { API_ROUTES } from "../routes/Routes";
import { getMessage } from "../services/MessageService";

const OlatcgAlignmentTable = ({idAnalysis}) => {
    const [makeRequest] = useRequest();
    const [rows, setRows] = useState([]);
    const [columns, setColumns] = useState([]);

    const onSuccessGetAlignmentByIdAnalysis = (response) => {
        setColumns([{
            id: 'alignmentA',
            label: getMessage('olatcgAlignmentTable.label.alignmentA')
        },
        {
            id: 'alignmentB',
            label: getMessage('olatcgAlignmentTable.label.alignmentB')
        },
        {
            id: 'score',
            label: getMessage('olatcgAlignmentTable.label.score')
        },
        {
            id: 'similarity',
            label: getMessage('olatcgAlignmentTable.label.similarity')
        },
        {
            id: 'status',
            label: getMessage('olatcgAlignmentTable.label.status')
        },
        {
            id: 'type',
            label: getMessage('olatcgAlignmentTable.label.type')
        }]);
        setRows(response.sequenceAlignmentAnalyses.map((alnAnalysis, index) => {
            return {
                code: index,
                alignmentA: alnAnalysis.alignmentA,
                alignmentB: alnAnalysis.alignmentB,
                score: alnAnalysis.score,
                similarity: alnAnalysis.similarity,
                status: alnAnalysis.status,
                type: alnAnalysis.type,
            };
        }));
    }

    useEffect(() => {
        makeRequest(API_ROUTES.GET_ALIGNMENT_BY_ID_ANALYSIS + '?idAnalysis=' + idAnalysis, 'GET', null, onSuccessGetAlignmentByIdAnalysis);
        // eslint-disable-next-line
    }, [idAnalysis]);

    return <>
        <Paper sx={{ width: '100%', overflow: 'hidden', bgcolor: 'primary.light' }}>
            <Typography component="div" variant="h4" sx={{backgroundColor: 'primary.dark', p: 1}}>
                {getMessage('alignment.followAnalysis.preview', idAnalysis)}
            </Typography>
            <TableContainer sx={{ maxHeight: 240 }}>
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
    </>
}

export default OlatcgAlignmentTable;