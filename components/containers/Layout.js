import { Layout } from "antd";
import Nav from "../header/Nav";
const { Header, Footer, Content } = Layout;

const AppLayout = ({ children }) => {
  return (
    <Layout className="wrapper" data-testid="app-wrapper">
      <Header>
        <Nav />
      </Header>
      <Content>
        <div className="site-layout-content">{children}</div>
      </Content>
      <Footer>Bus Stop Finder ©2021</Footer>
    </Layout>
  );
};

export default AppLayout;
