import { Layout } from "../../components/Layout/Layout"
import { Box } from "../../components/Box/Box";
import { Input } from "../../components/Input/Input";
import { Button } from "../../components/Button/Button"
import { useNavigate } from "react-router-dom";

export function ResetPassword() {
    const navigate = useNavigate();

    return (
        <Layout>
            <Box>
                <form className="justify-self-center bg-white px-8 pt-8 pb-6 rounded-lg md:shadow-lg grid gap-4 md:w-96 w-full">
                    <h2 className="font-bold text-3xl mb-6">忘记密码</h2>
                    <Input type="email" id="email" label="邮箱"/>
                    <p className="text-sm">如果此邮箱或电话号码与已有领英帐号匹配，我们将发送验证码到此邮箱或电话。</p>
                    <Button outline={false}  type="submit" onClick={() => navigate("/verify-email")}>
                        下一步
                    </Button>
                    <Button outline={true} type="button" onClick={() => navigate("/login")}>
                        返回
                    </Button>
                </form>
            </Box>
        </Layout>
    )
}
