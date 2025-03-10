import { Layout } from "../../components/Layout/Layout"
import { Box } from "../../components/Box/Box";
import { Input } from "../../components/Input/Input";
import { Button } from "../../components/Button/Button"

export function Signup() {
    return (
        <Layout slogan="成就职业人生">
            <Box>
                <form className="bg-white px-8 pt-8 pb-6 rounded-lg shadow-lg grid gap-4 md:w-96 w-full">
                    <Input type="email" id="email" label="邮箱"/>
                    <Input type="password" id="password" label="密码"/>
                    <Input type="password" id="password" label="再次输入密码"/>
                    <label className="flex gap-1 text-md">
                        <input className="w-5 h-5" type="checkbox" value=""/>
                        保持登录状态
                    </label>
                    <Button outline={false} text="同意并加入" type="submit"></Button>
                </form>
                <div className="text-center text-lg">
                    想创建公司主页？
                    <a href="" className="text-linkedin font-bold hover:bg-linkedin/20 hover-rounded-full hover:underline rounded-full p-2">获得帮助</a>
                </div>
            </Box>
        </Layout>
    )
}
