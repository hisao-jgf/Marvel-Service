import errorGif from './error.gif';

const ErrorMessage = () => {
    return (
        <img src={errorGif} alt="Error-Bot" style={{display: "block", width: "250px", height: "250px", margin: "0 auto", objectFit: "contain"}}/>
    )
}

export default ErrorMessage;