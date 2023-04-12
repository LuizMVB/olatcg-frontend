import React, { useEffect, useRef } from 'react';
import Phylocanvas from 'phylocanvas';

const PhylogeneticTree = ({ newickString }) => {
  const phyloCanvasRef = useRef(null);

  useEffect(() => {
    if (!phyloCanvasRef.current) return;

    const tree = Phylocanvas.createTree(phyloCanvasRef.current);
    tree.load(newickString);
    tree.setNodeSize(0);
    tree.setTextSize(12);
    tree.draw();
  }, [phyloCanvasRef, newickString]);

  return (
    <div
      ref={phyloCanvasRef}
      style={{ width: '100%', height: '600px', backgroundColor: 'white' }}
    />
  );
};

export { PhylogeneticTree };