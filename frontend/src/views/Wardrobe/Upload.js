import React, { useState } from 'react'
import { DropzoneDialog } from 'material-ui-dropzone'
import Button from '@material-ui/core/Button';

export default function Upload() {
    const [open, setOpen] = useState(false);
    const [files, setFiles] = useState([]);

    const handleClose = () => {
        setOpen(false);
    }

    const handleSave = (files) => {
        //Saving files to state for further use and closing Modal.
        setFiles(files);
        setOpen(false);
    }

    const handleOpen = () => {
        setOpen(true);
    }

    return (
        <div>
            <Button onClick={handleOpen}>
                Add Clothes
                </Button>
            <DropzoneDialog
                open={open}
                onSave={handleSave}
                acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
                showPreviews={true}
                maxFileSize={5000000}
                onClose={handleClose}
            />
        </div>
    );
}