import { useContext, useEffect, useState } from 'react';
import { useAuth } from '../Shared/AuthContext';
import { AdvancedImage } from '@cloudinary/react';
import { Link } from 'react-router';
import Countdown from 'react-countdown';

function ForgotPasswordPage() {
    const { cld } = useAuth();
    const restore_password_image = cld.image("restore_password_icon_qdzoys")
    const { baseUrl } = useAuth();
    const [email, setEmail] = useState("");

    const [sendingStatus, setSendingStatus] = useState("not sent");

    const [buttonText, setButtonText] = useState("Надіслати інструкцію");

    const [error, setError] = useState("");
    
    interface RendererProps {
        minutes: number,
        seconds: number,
        completed: boolean
    }
    
    const renderer = ({ minutes, seconds, completed }: RendererProps) => {
        if (completed) {
            // Render a completed state
            setSendingStatus("send again");
            return;
        } else {
            // Render a countdown
            return <span>{minutes}:{seconds.toString().padStart(2, '0')}</span>;
        }
    };


    useEffect(() => {
        if(sendingStatus === "not sent"){
            return;
        }

        if(sendingStatus === "sending"){
            setButtonText("Надсилання...");
        } else if(sendingStatus === "blocked"){
            setButtonText("Надіслати повторно");
        } else if(sendingStatus === "unauthorized"){
            setError("this email is not registered");
        } else if(sendingStatus === "error"){
            setError("unexpected error. please try again later");
            setButtonText("Надіслати повторно");
        }
    }, [sendingStatus])

    return (
        <div id="authorize_page_container">
            <div className="auth_form vertical_container">
                <h1 className="large_heading auth_page_heading">Відновлення пароля</h1>

                <span className='auth_medium_text'>
                    Вам на пошту буде надіслано інструкцію<br/>
                    з відновлення пароля
                </span>

                <form onSubmit={(e) => {
                    e.preventDefault();
                    setSendingStatus("sending")
                    forgotPassword();
                }}>
                    <div id='restore_password_input_container' className='auth_input_container vertical_container'>
                        <div className="auth_input_wrapper horizontal_container">
                            <div className="auth_input_image_wrapper vertical_container">
                                <AdvancedImage cldImg={restore_password_image} />
                            </div>
                            <input type="email" required className="text_input auth_input auth_medium_heading" placeholder="Ел. пошта" onChange={(e) => setEmail(e.target.value)} />
                        </div>
                    </div>
        
                    <div id='send_email_button' className="horizontal_container" style={sendingStatus === "blocked" ? {filter: 'grayscale()'} : undefined}>
                        {sendingStatus === "blocked" && 
                            <div className="auth_input_image_wrapper vertical_container">
                                {/* <AdvancedImage cldImg={restore_password_image} /> */}
                                <Countdown date={Date.now() + 1 * 60 * 1000} renderer={renderer}/>
                            </div>
                        }
                        {/* <input type="email" required className="text_input auth_input auth_medium_heading" placeholder="Ел. пошта" onChange={(e) => setEmail(e.target.value)} /> */}
                        <input type='submit' disabled={sendingStatus === "blocked" || sendingStatus === "sending"} className={`auth_button auth_medium_heading ${sendingStatus === "blocked" || sendingStatus == "sending"? "disabled_button" : ""}`} value={buttonText}></input>
    
                    </div>
                    
                    {error && <span className="small_text error_text">{error}</span>}
                </form>


                <span className='auth_medium_text'><Link to={"/login"}>Назад до входу</Link></span>
            </div>
        </div>
    );

    async function forgotPassword() {
        try{
            const response = await fetch(`${baseUrl}/user/forgot-password`, {
                method: 'POST',
                headers: {
                    "Content-Type": 'application/json' 
                },
                body: JSON.stringify(email)

            });

            if(response.ok){
                setSendingStatus("blocked")
                setError("");
            } else if(response.status === 401){
                setSendingStatus("unauthorized")
            }
        }
        catch(err){
            console.error("error: ", err);
            setSendingStatus("error")
        }
    }
}

export default ForgotPasswordPage;










// import { useContext, useEffect, useState } from 'react';
// import { useAuth } from '../Shared/AuthContext';
// import { AdvancedImage } from '@cloudinary/react';
// import { Link } from 'react-router-dom'; // Fixed import - should be react-router-dom
// import { Cloudinary } from '@cloudinary/url-gen';

// // Define types for your component
// type SendingStatus = 'not sent' | 'sending' | 'sent' | 'unauthorized' | 'error';

// interface useAuthType {
//   cld: Cloudinary;
//   baseUrl: string;
// }

// function ForgotPasswordPage() {
//     const { cld, baseUrl } = useAuth() as useAuthType;
//     const restore_password_image = cld.image("restore_password_icon_qdzoys");
//     const [email, setEmail] = useState<string>("");
//     const [sendingStatus, setSendingStatus] = useState<SendingStatus>("not sent");

//     useEffect(() => {
//         if (sendingStatus === "not sent") {
//             return;
//         }

//         // Consider using a switch statement for better readability
//         switch (sendingStatus) {
//             case "sending":
//                 console.log("sending");
//                 break;
//             case "sent":
//                 console.log("sent");
//                 break;
//             case "unauthorized":
//                 console.log("unauthorized");
//                 break;
//             case "error":
//                 console.log("sending error");
//                 break;
//         }
//     }, [sendingStatus]);

//     const forgotPassword = async (): Promise<void> => {
//         try {
//             const response = await fetch(`${baseUrl}/user/forgot-password`, {
//                 method: 'POST',
//                 headers: {
//                     "Content-Type": 'application/json' 
//                 },
//                 body: JSON.stringify({ email }) // Fixed - should send object with email property
//             });

//             if (response.ok) {
//                 setSendingStatus("sent");
//                 const data = await response.json();
//                 console.log(data.message);
//             } else if (response.status === 401) {
//                 setSendingStatus("unauthorized");
//             }
//         } catch (err) {
//             console.error(err);
//             setSendingStatus("error");
//         }
//     };

//     return (
//         <div id="authorize_page_container">
//             <div className="auth_form vertical_container">
//                 <h1 className="large_heading auth_page_heading">Відновлення пароля</h1>

//                 <span className='auth_medium_text'>
//                     Вам на пошту буде надіслано інструкцію<br />
//                     з відновлення пароля
//                 </span>

//                 <form onSubmit={(e: React.FormEvent) => {
//                     e.preventDefault();
//                     setSendingStatus("sending");
//                     forgotPassword();
//                 }}>
//                     <div id='restore_password_input_container' className='auth_input_container vertical_container'>
//                         <div className="auth_input_wrapper horizontal_container">
//                             <div className="auth_input_image_wrapper vertical_container">
//                                 <AdvancedImage cldImg={restore_password_image} />
//                             </div>
//                             <input 
//                                 type="email" 
//                                 required 
//                                 className="text_input auth_input auth_medium_heading" 
//                                 placeholder="Ел. пошта" 
//                                 onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} 
//                                 value={email}
//                             />
//                         </div>
//                     </div>
        
//                     <input 
//                         type='submit' 
//                         className='auth_button auth_medium_heading' 
//                         value={"Надіслати інструкцію"}
//                         disabled={sendingStatus === "sending"} // Add loading state
//                     />
//                 </form>

//                 <span className='auth_medium_text'>
//                     <Link to="/login">Назад до входу</Link>
//                 </span>
//             </div>
//         </div>
//     );
// }

// export default ForgotPasswordPage;