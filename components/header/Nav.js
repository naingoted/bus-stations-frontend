import ActiveLink from "@/components/common/ActiveLink";
import authService from "@/services/auth.service";
import { useRouter } from "next/router";

const Nav = () => {
  const router = useRouter();
  const isLoggedIn = authService.isAuthenticated();
  const handleLogOut = () => {
    authService.doLogOut();
    router.push("/");
  };
  return (
    <nav>
      {isLoggedIn ? (
        <ul className="nav">
          <li>
            <ActiveLink activeClassName="active" href="/">
              <a className="nav-link">Home</a>
            </ActiveLink>
          </li>
          <li>
            <ActiveLink activeClassName="active" href="/bus/create">
              <a className="nav-link">Create Bus</a>
            </ActiveLink>
          </li>
          <li>
            <ActiveLink activeClassName="active" href="" as="/logout">
              <a className="nav-link" onClick={handleLogOut}>
                Log Out
              </a>
            </ActiveLink>
          </li>
        </ul>
      ) : null}
    </nav>
  );
};

export default Nav;
