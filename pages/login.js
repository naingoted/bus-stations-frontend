import Head from "next/head";
import authService from "@/services/auth.service";
import { useRouter } from "next/router";
import { useAuthDispatch } from "@/contexts/authContext";
import { useAuthState } from "@/contexts/authContext";
import { Form, Input, Button, Checkbox, Row, Col } from "antd";
import Card from "@/components/common/Card";

const layout = {
  wrapperCol: {
    span: 24,
  },
};
const tailLayout = {
  wrapperCol: {
    span: 24,
  },
};

const Login = () => {
  const router = useRouter();
  const isLoggedIn = authService.isAuthenticated();
  const dispatch = useAuthDispatch();
  const { loading } = useAuthState();

  if (isLoggedIn) {
    router.push("/");
  }
  const onFinish = async (values) => {
    const response = await authService.doUserLogin(dispatch, values);
    if (response) {
      router.push("/");
    } else {
      alert("Please check your credentials and try agian");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return authService.isAuthenticated() ? null : (
    <Row justify="center" className="login card">
      <Head>
        <title>Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Form
        name="basic"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input placeholder="Username" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>

        <Form.Item name="remember" valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Row>
  );
};

export default Login;
