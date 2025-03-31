import { Box } from "../../components/Box/Box";
import { Input } from "../../components/Input/Input";
import { Button } from "../../components/Button/Button"
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthentication } from "../../contexts/AuthenticationContextProvider";

export function Signup() {
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { signup } = useAuthentication();

    const doSignup = async (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true)
        const email = e.currentTarget.email.value;
        const password = e.currentTarget.password.value;
        try {
            await signup(email, password);
            navigate("/authentication/verify-email");
        } catch (e) {
            console.log(e);
            if (e instanceof Error) {
                setErrorMessage(e.message);
            } else {
                setErrorMessage("未知错误，请稍候重试");
            }
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div>
            <Box>
                <span className="font-bold text-[32px]">成就职业人生</span>
                <form onSubmit={doSignup}
                      className="justify-self-center bg-white px-8 pt-8 pb-6 rounded-lg sm:shadow-lg grid gap-4 sm:w-96 w-full">
                    <Input type="email" name="email" label="邮箱" required />
                    <Input type="password" name="password" label="密码" required />
                    {errorMessage && <p className="text-red-600">{errorMessage}</p>}
                    <p className="text-xs text-center text-gray-500">
                        点击“同意并加入或继续”，即表示您同意遵守领英的
                        <a href="" className="text-linkedin font-bold hover:underline">《用户协议》</a>、
                        <a href="" className="text-linkedin font-bold hover:underline">《隐私政策》</a>及
                        <a href="" className="text-linkedin font-bold hover:underline">《Cookie 政策》</a>。
                    </p>
                    <Button outline={false} type="submit"
                            disabled={isLoading}>
                        同意并加入
                    </Button>

                    <div className="w-full justify-self-center flex items-center">
                        <div className="flex-grow border-t border-gray-300"></div>
                        <span className="px-3 text-gray-700 text-sm">或者</span>
                        <div className="flex-grow border-t border-gray-300"></div>
                    </div>

                    <p className="justify-self-center">
                        已有领英账号？
                        <a href="\login" className="text-linkedin font-bold hover:bg-linkedin/20 hover-rounded-full hover:underline rounded-full p-2">
                            立即登录
                        </a>
                    </p>
                </form>
                <div className="text-center text-lg">
                    想创建公司主页？
                    <a href="" className="text-linkedin font-bold hover:bg-linkedin/20 hover-rounded-full hover:underline rounded-full p-2">获得帮助</a>
                </div>
            </Box>
        </div>
    )
}
