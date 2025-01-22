import React, { useEffect, useRef } from 'react';
import { Tooltip } from "@mui/material";
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import { getMessage } from "../services/MessageService";
import Phylocanvas from 'phylocanvas';

const OlatcgPhyloTree = ({ newick }) => {
    const treeContainerRef = useRef(null);

    useEffect(() => {
        if (treeContainerRef.current) {
            const tree = Phylocanvas.createTree(treeContainerRef.current);
            tree.setTreeType('rectangular');
            tree.load(newick);
        }

        // Limpa o conteúdo do container ao desmontar o componente
        return () => {
            if (treeContainerRef.current) {
                treeContainerRef.current.innerHTML = '';
            }
        };
    }, [newick]);

    return (
        <div style={{position:'relative'}}>
            <div ref={treeContainerRef} style={{
                zIndex: 1
            }}/>
            <Tooltip title={getMessage('phyloTreeAnalysis.tooltip')} 
            placement='top'
            sx={{
                position: 'absolute',
                left: '95%',
                bottom: '0.8rem',
                fontSize: '3rem',
                zIndex: 2,
                opacity: 0.4,
                '&:hover':{
                    opacity: 1,
                }
            }}
            followCursor> 
                <ZoomInIcon/>
            </Tooltip>

        </div>
    );
};

export default OlatcgPhyloTree;