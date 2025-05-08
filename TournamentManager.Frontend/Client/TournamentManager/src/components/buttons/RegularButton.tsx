import { Button } from '@mui/material'

interface RegularButtonProps {
    text: string
    image: React.ReactNode
    onClick: () => void
}
export default function RegularButton({
    text,
    image,
    onClick,
}: RegularButtonProps) {
    return (
        <Button variant="contained" endIcon={image} onClick={onClick}>
            {text}
        </Button>
    )
}
