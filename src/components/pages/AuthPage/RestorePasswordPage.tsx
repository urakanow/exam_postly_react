import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router";
import { useAuth } from "../../Shared/AuthContext/AuthContext";
import { AdvancedImage } from '@cloudinary/react';
import { Link } from 'react-router';
import './style.css';
import Error from "../../Shared/Error/Error";
import AuthInputField from "./AuthInputField";

function RestorePasswordPage() {
    const { cld, baseUrl } = useAuth();
    const password_image = cld.image("password_icon_vilhyw")

    const [ searchParams ] = useSearchParams();
    const token = searchParams.get('token');
    const navigate = useNavigate();

    const [newPassword, setNewPassword] = useState("");

    const [sendingStatus, setSendingStatus] = useState("not sent");

    const [error, setError] = useState("");

    useEffect(() => {
        if(token == undefined){
            console.log("undefined")
        }
        validateToken();
    }, [])


    return (
        <div id="authorize_page_container">
            <div className="auth_form vertical_container">
                <h1 className="large_heading auth_page_heading">Створення пароля</h1>

                <span className='auth_medium_text'>
                    {sendingStatus === "unauthorized" ? (
                    <>
                        Виникла проблема з вашим запитом.<br />
                        Будь ласка поверніться до сторінки входу<br />
                        та слідуйте інструкціям
                    </>
                    ) : ( sendingStatus === "success" ? (
                        <>
                            Ваш пароль відновлено.<br />
                            Повертайтеся на сторінку входу
                        </>
                    ) : (
                        <>
                            введіть новий пароль
                        </>
                    )
                    )}
                </span>

                {sendingStatus === "unauthorized" || sendingStatus === "success"? (
                    <button className='auth_button auth_medium_heading' onClick={() => navigate("/login")}>Повернутися</button>
                ) : (
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        setSendingStatus("sending")
                        restorePassword();
                    }}>
                        <AuthInputField type="password" cldImg={password_image} placeholder="Новий пароль"
                        onChange={(e) => setNewPassword(e.target.value)} />
            
                        <input type='submit' disabled={sendingStatus === "sending"} className={`auth_button auth_medium_heading ${sendingStatus === "sending" ? "disabled_button" : ""}`} value={"Змінити пароль"}></input>

                        {error && <Error text={error} />}
                    </form>
                )}

                {sendingStatus !== "unauthorized" && sendingStatus !== "success" && <span className='auth_medium_text'><Link to={"/login"}>Назад до входу</Link></span>}
            </div>
        </div>
    );

    async function validateToken() {
        try{
            const response = await fetch(`${baseUrl}/user/validate-restore-token`, {
                method: 'POST',
                headers: {
                    "Content-Type": 'application/json' 
                },
                body: JSON.stringify(token)
            });

            if(response.ok){
                const data = await response.json();
                setSendingStatus("validated")
            }
            else if(response.status === 401){
                setError("token invalid or expired");
                setSendingStatus("unauthorized");
            }
        }
        catch(err){
            console.error("error when validating token: ", err);
            setSendingStatus("error");
            setError("unexpected error. please try again later");
        }
    }

    async function restorePassword(){
        try{
            const response = await fetch(`${baseUrl}/user/restore-password`, {
                method: 'POST',
                headers: {
                    "Content-Type": 'application/json' 
                },
                body: JSON.stringify({ token, newPassword })
            });

            if(response.ok){
                setSendingStatus("success")
            }
            else if(response.status === 401){
                setError("token invalid or expired");
                setSendingStatus("unauthorized");
            }
        }
        catch(err){
            console.error("error when validating token: ", err);
            setSendingStatus("error");
            setError("unexpected server error. please try again later");
        }
    }    
}

export default RestorePasswordPage;