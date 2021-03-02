const Nav = () => {
  console.log("RENDERING Nav");
  return (
    <nav className="nav-bar">
      <div className="container">
        <div className="logo">
          <span>UpTimeMonitor</span>
        </div>
        <div className="info">
          <div className="info__title">Service status</div>
          <div className="info__last-update">Last updated : 07:18:26</div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
