import Nav from "../header/Nav";

const Layout = ({ children }) => {
  console.log("RENDERING Layout");
  return (
    <div className="wrapper" data-testid="app-wrapper">
      <Nav />
      <main className="main">{children}</main>
    </div>
  );
};

export default Layout;
