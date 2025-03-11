import { Layout } from "../../components/Layout/Layout"
import { Box } from "../../components/Box/Box";
import { Input } from "../../components/Input/Input";
import { Button } from "../../components/Button/Button"

export function VerifyEmail() {
    return  (
        <Layout>
            <Box>
                <form className="justify-self-center bg-white px-8 pt-8 pb-6 rounded-lg md:shadow-lg grid md:w-96 w-full">
                    <h2 className="font-bold text-2xl">输入6位验证码</h2>
                    <p className="mt-3 mb-6">
                        查看邮箱，获取验证码。
                        <a href="\request-password-reset"
                           className="font-semibold text-linkedin text-sm hover:bg-linkedin/10 inline px-2 py-1 rounded-full">
                            更改
                        </a>
                    </p>
                    <Input type="text" id="text" label="6位验证码"/>
                    <span className="mt-2 mb-4">
                        <a href="\request-password-reset"
                           className="font-semibold text-linkedin text-sm hover:bg-linkedin/10 inline px-2 py-1 rounded-full">
                            重新发送
                        </a>
                    </span>
                    <Button outline={false} type="submit">
                        提交
                    </Button>
                    <p className="text-sm text-gray-600 mt-4">
                        如果您在收件箱中没找到邮件，请查看垃圾邮箱。如果垃圾邮箱中也没有，可能是邮箱地址未确认，或者邮箱地址与已有领英帐号不匹配。
                    </p>
                    <span className="mt-1">
                        <a href="" className="font-semibold text-linkedin text-sm hover:bg-linkedin/10 inline px-2 py-1 rounded-full">
                            无法查看此邮件？
                        </a>
                    </span>
                </form>
            </Box>
        </Layout>
    )
}
