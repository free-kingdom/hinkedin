import { Box } from "../../components/Box/Box";
import { Input } from "../../components/Input/Input";
import { Button } from "../../components/Button/Button"
import { useNavigate } from "react-router-dom";
import { FormEvent, useState } from "react";

export function ResetPassword() {
    const [errorMessage, setErrorMessage] = useState("");
    const [isEmailSent, setIsEmailSent] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const sendPasswordResetToken = async (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            const email = e.currentTarget.email.value;
            const response = await fetch (import.meta.env.VITE_API_URL + `/api/authentication/send-password-reset-token?email=${email}`, {
                method: "PUT",
            });
            if (response.ok) {
                setErrorMessage("");
                setIsEmailSent(true);
                setEmail(email);
            } else {
                const { message } = await response.json();
                setErrorMessage(message);
            }
        } catch (e) {
            console.log(e);
            setErrorMessage("出错了，请稍候重试");
        } finally {
            setIsLoading(false);
        }
    }

    const resetPassword = async (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const code = e.currentTarget.code.value;
        const password = e.currentTarget.password.value;
        // console.log(code, password);
        try {
            setIsLoading(true);
            const response = await fetch(import.meta.env.VITE_API_URL + `/api/authentication/reset-password?token=${code}&email=${email}&password=${password}`, {
                method: "PUT"
            });
            if (response.ok) {
                setErrorMessage("");
                navigate("/authentication/login");
            } else {
                const { message } = await response.json();
                setErrorMessage(message);
            }
        } catch (e) {
            console.log(e);
            setErrorMessage("出错了，请稍候重试");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div>
            <Box>
                {!isEmailSent ?
                 (<form onSubmit={sendPasswordResetToken}
                        className="justify-self-center bg-white px-8 pt-8 pb-6 rounded-lg sm:shadow-lg grid gap-4 sm:w-96 w-full">
                     <h2 className="font-bold text-3xl mb-6">忘记密码</h2>
                     <Input type="email" name="email" label="邮箱" required />
                     <p className="text-sm">如果此邮箱或电话号码与已有领英帐号匹配，我们将发送验证码到此邮箱或电话。</p>
                     <Button outline={false}  type="submit" disabled={isLoading}>
                         下一步
                     </Button>
                     <Button outline={true} type="button" onClick={() => navigate("/authentication/login")}>
                         返回
                     </Button>
                 </form>) : (
                     <form onSubmit={resetPassword}
                           className="justify-self-center bg-white px-8 pt-8 pb-6 rounded-lg md:shadow-lg grid gap-4 md:w-96 w-full">
                         <h2 className="font-bold text-3xl mb-6">忘记密码</h2>
                         <Input key="1" type="text" name="code" label="验证码" required />
                         <Input type="password" name="password" label="重置密码" required />
                         {errorMessage && <p className="text-red-600">{errorMessage}</p>}

                         <span className="flex text-sm">
                             <p className="">验证码已发送到邮箱，没有收到?</p>
                             <button type="button"
                                     className="font-semibold text-linkedin hover:cursor-pointer inline px-2 rounded-full"
                                     disabled={isLoading}
                                     onClick={() => alert("not impl")}>
                                 重新发送
                             </button>
                         </span>
                         <Button outline={false}  type="submit" disabled={isLoading}>
                             提交
                         </Button>
                         <Button outline={true} type="button"
                                 onClick={() => {
                                     setErrorMessage("");
                                     setIsEmailSent(false);
                                 }}>
                             返回
                         </Button>
                     </form>
                )}
            </Box>
        </div>
    )
}
