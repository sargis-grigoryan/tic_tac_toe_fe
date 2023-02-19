import { IconButton, Snackbar, Tooltip } from '@mui/material'
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useState } from 'react'

const CopyToClipboardButton = ({ text }: { text: string }) => {
    const [open, setOpen] = useState(false)
    const handleClick = () => {
        setOpen(true)
        navigator.clipboard.writeText(text)
    }

    return (
        <>
            <Tooltip title="Copy to clipboard" placement="top">
                <IconButton onClick={handleClick} color="primary">
                    <ContentCopyIcon />
                </IconButton>
            </Tooltip>
            <Snackbar
                open={open}
                onClose={() => setOpen(false)}
                autoHideDuration={2000}
                message="Copied to clipboard"
            />
        </>
    )
}

export default CopyToClipboardButton