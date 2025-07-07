import './style.css';

interface RegularButtonProps{
    text: string,
    id?: string,
    onClick: () => void
}

function RegularButton({ text, id, onClick }: RegularButtonProps) {
    return (
        <button className="green_button" onClick={onClick} id={id !== undefined ? id : undefined}>
            {text}
        </button>
    );
}

export default RegularButton;