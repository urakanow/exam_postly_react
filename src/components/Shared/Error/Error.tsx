import './style.css';

interface ErrorProps {
    text: string
}

function Error({ text }: ErrorProps) {
    return (
        <span className="small_text error_text">{text}</span>
    );
}

export default Error;