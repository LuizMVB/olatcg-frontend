import React from 'react';
import PhyloTree from '../components/OlatcgPhyloTree';
import { Box } from '@mui/material';

const exampleNewick = '(Vaca:0.69395,(Gibão:0.36079,(Orangotango:0.33636,(Gorila:0.17147,(Chimpanzé:1.19268,Humano:0.11927):0.08386):0.06124):0.15057):0.54939, Rato:1.21460);';

const PhylogeneticTree = () => {
    return (
        <Box sx={{ px: 4 }}>
          <h1>Árvore Filogenética</h1>
          <PhyloTree newick={exampleNewick} />
        </Box>
      );
}

export default PhylogeneticTree;