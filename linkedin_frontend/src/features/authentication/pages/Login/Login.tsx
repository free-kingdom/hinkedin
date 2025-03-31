import { Box } from "../../components/Box/Box";
import { Input } from "../../components/Input/Input";
import { Button } from "../../components/Button/Button"
import { FormEvent, useState } from "react";
import { useAuthentication } from "../../contexts/AuthenticationContextProvider";
import { useLocation, useNavigate } from "react-router-dom";

export function Login() {
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const {login} = useAuthentication();
    const navigate = useNavigate();
    const location = useLocation();

    const doLogin = async (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        const email = e.currentTarget.email.value;
        const password = e.currentTarget.password.value;
        // console.log(email, password);
        try {
            await login(email, password);
            setErrorMessage("");
            const destination = location.state?.from || "/";
            navigate(destination);
        } catch (e) {
            if (e instanceof Error) {
                setErrorMessage(e.message);
            } else {
                setErrorMessage("未知错误");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <Box>
                <span className="font-bold text-[32px]">登录到领英</span>
                <form onSubmit={doLogin}
                      className="justify-self-center bg-white px-8 pt-8 pb-6 rounded-lg sm:shadow-lg grid gap-4 sm:w-96 w-full">
                    <Input type="email" name="email" label="邮箱" required onFocus={() => {setErrorMessage("")}}/>
                    <Input type="password" name="password" required autoComplete="current-password" label="密码"/>
                    {errorMessage && <p className="text-red-600">{errorMessage}</p>}
                    <div className="w-full">
                        <a href="/authentication/request-password-reset"
                           className="text-linkedin font-bold hover:bg-linkedin/20 hover-rounded-full hover:underline rounded-full p-2">
                            忘记密码？
                        </a>
                    </div>
                    <label className="flex gap-1 text-md">
                        <input className="w-5 h-5" type="checkbox" value=""/>
                        保持登录状态
                    </label>
                    <Button outline={false} type="submit" disabled={isLoading}>
                        {isLoading ? "..." : "登录"}
                    </Button>

                </form>
                <div className="text-center text-lg">
                    没有领英帐号？
                    <a href="/authentication/signup" className="text-linkedin font-bold hover:bg-linkedin/20 hover-rounded-full hover:underline rounded-full p-2">立即加入</a>
                </div>
            </Box>
        </div>
    )
}
