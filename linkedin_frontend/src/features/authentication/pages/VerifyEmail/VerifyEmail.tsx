import { Layout } from "../../components/Layout/Layout"
import { Box } from "../../components/Box/Box";
import { Input } from "../../components/Input/Input";
import { Button } from "../../components/Button/Button"
import { FormEvent, useState } from "react";
import { useAuthentication } from "../../contexts/AuthenticationContextProvider";
import { useNavigate } from "react-router-dom";

export function VerifyEmail() {
    const [errorMessage, setErrorMessage] = useState("");
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { logout } = useAuthentication();
    const navigate = useNavigate();

    const validateEmail = (code: string) => {
        console.log(code);

    };

    const sendEmailValidateToken = async () => {
        setErrorMessage("");
        setIsLoading(true);
        try {
            const response = await fetch(import.meta.env.VITE_API_URL + "/api/authentication/send-email-verification-token", {
                headers: {"Authorization": `Bearer ${localStorage.getItem("token")}`}
            });
            if (response.ok) {
                setErrorMessage("");
                setMessage("")
            } else {
                const { message } = response.json();
                setErrorMessage(message);
            }
        } catch (e) {
            console.log(e);
            setErrorMessage("出错了，请稍候重试");
        } finally {
            setIsLoading(false);
        }
    };

    return  (
        <Layout>
            <Box>
                <form onSubmit={(e: FormEvent<HTMLFormElement>) => {
                    e.preventDefault();
                    setIsLoading(true);
                    validateEmail(e.currentTarget.code.value);
                }}
                      className="justify-self-center bg-white px-8 pt-8 pb-6 rounded-lg md:shadow-lg grid md:w-96 w-full">
                    <h2 className="font-bold text-2xl">输入6位验证码</h2>
                    <p className="mt-3 mb-6">
                        查看邮箱，获取验证码。
                        <button type="buttno"
                                className="font-semibold text-linkedin text-sm hover:bg-linkedin/10 inline px-2 py-1 rounded-full"
                                disabled={isLoading}
                                onClick={logout}
                        >
                            更改
                        </button>
                    </p>
                    <Input type="text" name="code" label="6位验证码" required />
                    <span className="mt-2 mb-4">
                        <button type="button"
                                className="font-semibold text-linkedin text-sm hover:bg-linkedin/10 inline px-2 py-1 rounded-full"
                                disabled={isLoading}
                                onClick={sendEmailValidateToken}
                        >
                            重新发送
                        </button>
                    </span>
                    {errorMessage && <p className="text-red-600">{errorMessage}</p>}
                    <Button outline={false} type="submit" disabled={isLoading}>
                        提交
                    </Button>
                    <p className="text-sm text-gray-600 mt-4">
                        如果您在收件箱中没找到邮件，请查看垃圾邮箱。如果垃圾邮箱中也没有，可能是邮箱地址未确认，或者邮箱地址与已有领英帐号不匹配。
                    </p>
                    <span className="mt-1">
                        <button
                            className="font-semibold text-linkedin text-sm hover:bg-linkedin/10 inline px-2 py-1 rounded-full"
                            onClick={()=>{alert("not impl")}}>
                            无法查看此邮件？
                        </button>
                    </span>
                </form>
            </Box>
        </Layout>
    )
}
