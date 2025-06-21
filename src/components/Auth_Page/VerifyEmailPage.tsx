import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { useAuth } from "../Shared/AuthContext";

function VerifyEmailPage() {
    const { baseUrl } = useAuth();
    const [ searchParams ] = useSearchParams();
    const token = searchParams.get('token');

    const [isVerified, setIsVerified] = useState("not sent");

    useEffect(() => {
        validateToken();
    }, [])

    return (
        <div id="authorize_page_container">
            <div className="auth_form vertical_container">
                <h1 className="large_heading auth_page_heading">Верифікація</h1>

                <span className='auth_medium_text'>
                    {isVerified === "success" &&
                        <>
                            Акаунт верифіковано успішно.<br />
                            Тепер можете продовжувати покупки.<br /><br />
                            Команда Шукайка бажає вам <br />
                            приємного та вигідного шопінгу!
                        </>
                    }

                    {isVerified === "error" &&
                        <>
                            Виникла проблема з верифікацією.<br />
                            Будь ласка, спробуйте пізніше
                        </>
                    }


                    {isVerified === "not sent" &&
                        <>
                            Зачекайте...
                        </>
                    }
                </span>
            </div>
        </div>
    );

    async function validateToken(){
        console.log("hallo")
        try{
            const response = await fetch(`${baseUrl}/user/verify-email`, {
                method: 'POST',
                headers: {
                    "Content-Type": 'application/json' 
                },
                body: JSON.stringify(token)
            });

            if(response.ok){
                setIsVerified("success");
                console.log("suc")
            }
            else{
                setIsVerified("error");
                console.log("error")
            }
        }
        catch(err){
            console.error("error when validating token: ", err);
            setIsVerified("error"); 
        }
    }
}

export default VerifyEmailPage;