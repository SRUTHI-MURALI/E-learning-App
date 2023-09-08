import React from 'react';
import { Dialog, DialogTitle, DialogContent, Typography, Button } from '@mui/material';

function AddCategory(props) {
    const { title, openPopup, setOpenPopup } = props;

  return (
    <div>
      
      <Dialog open={openPopUp} onClose={handleCloseDialog}>
        <DialogTitle>
          <div style={{ display: 'flex' }}>
            <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
              Dialog Title
            </Typography>
            <Button variant="outlined" color="secondary" onClick={handleCloseDialog}>
              Close
            </Button>
          </div>
        </DialogTitle>
        <DialogContent dividers>
          {/* Content of the dialog */}
          Children go here...
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddCategory;
