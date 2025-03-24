import { Layout } from "../../components/Layout/Layout";
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
        <Layout slogan="登录到领英">
            <Box>
                <form onSubmit={doLogin}
                      className="justify-self-center bg-white px-8 pt-8 pb-6 rounded-lg md:shadow-lg grid gap-4 md:w-96 w-full">
                    <Input type="email" name="email" label="邮箱" required onFocus={() => {setErrorMessage("")}}/>
                    <Input type="password" name="password" required autoComplete="current-password" label="密码"/>
                    {errorMessage && <p className="text-red-600">{errorMessage}</p>}
                    <div className="w-full">
                        <a href="\request-password-reset"
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

                    <div className="w-full justify-self-center flex items-center">
                        <div className="flex-grow border-t border-gray-300"></div>
                        <span className="px-3 text-gray-700 text-sm">或者</span>
                        <div className="flex-grow border-t border-gray-300"></div>
                    </div>

                </form>
                <div className="text-center text-lg">
                    没有领英帐号？
                    <a href="\signup" className="text-linkedin font-bold hover:bg-linkedin/20 hover-rounded-full hover:underline rounded-full p-2">立即加入</a>
                </div>
            </Box>
        </Layout>
    )
}
