import { Layout } from "../../components/Layout/Layout";
import { Box } from "../../components/Box/Box";
import { Input } from "../../components/Input/Input";
import { Button } from "../../components/Button/Button"

export function Login() {
    return (
        <Layout slogan="登录到我们的平台">
            <Box>
                <form className="bg-white px-8 pt-8 pb-6 rounded-lg shadow-lg grid gap-4 md:w-96 w-full">
                    <Input type="email" id="email" label="邮箱"/>
                    <Input type="password" id="password" label="密码"/>
                    <div className="">
                        <a href="\request-password-reset" className="text-linkedin font-bold hover:bg-linkedin/20 hover-rounded-full hover:underline rounded-full p-2">忘记密码？</a>
                    </div>
                    <label className="flex gap-1 text-md">
                        <input className="w-5 h-5" type="checkbox" value=""/>
                        保持登录状态
                    </label>
                    <Button outline={false} text="登录" type="submit"></Button>
                </form>
                <div className="text-center text-lg">
                    没有领英帐号？
                    <a href="\signup" className="text-linkedin font-bold hover:bg-linkedin/20 hover-rounded-full hover:underline rounded-full p-2">立即加入</a>
                </div>
            </Box>
        </Layout>
    )
}
