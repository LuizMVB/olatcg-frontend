import React, { useEffect, useRef } from 'react';
import Phylocanvas from 'phylocanvas';

const PhyloTree = ({ newick }) => {
    const treeContainerRef = useRef(null);

    useEffect(() => {
        if (treeContainerRef.current) {
            const tree = Phylocanvas.createTree(treeContainerRef.current);
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
        <div>
            <div ref={treeContainerRef}></div>
        </div>
    );
};

export default PhyloTree;