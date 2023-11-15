'use client'

import React from 'react';
import { TreeView } from '@mui/x-tree-view/TreeView';
import { Box } from '@mui/material';

function FileExplorer({ data }) {
  return (
    <Box>
      <TreeView data={data} />
    </Box>
  );
}

export default FileExplorer;
