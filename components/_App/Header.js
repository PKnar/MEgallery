import { Icon } from "semantic-ui-react";
import Link from "next/link";
import Router from "next/router";
import NProgress from "nprogress";
import { handleLogout } from "../../utils/auth";

Router.onRouteChangeStart = () => NProgress.start();
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

function Header({ user }) {
  const isRoot = user && user.role === "root";

  const handleCloseNav = () => {
    document.getElementById("mySidenav").style.width = "0px";
  };

  const handleOpenNav = () => {
    document.getElementById("mySidenav").style.width = "250px";
  };

  return (
    <nav>
      <div id="mySidenav" className="sidenav">
        <a className="closebtn" onClick={handleCloseNav}>
          x
        </a>
        <Link href="/">
          <a>Home</a>
        </Link>
        <Link href="/image">
          <a>Gallery</a>
        </Link>

        {isRoot && (
          <>
            <Link href="/upload">
              <a>
                <Icon name="arrow up" />
                Upload
              </a>
            </Link>
            <a onClick={handleLogout}>
              <Icon name="sign out" />
              Logout
            </a>
          </>
        )}
      </div>
      <span className="sideSpan" onClick={handleOpenNav}>
        ☰
      </span>
      <Link href="/">
        <a className="mlinks">Home</a>
      </Link>
      <Link href="/image">
        <a className="mlinks">Gallery</a>
      </Link>

      {isRoot && (
        <>
          <Link href="/upload">
            <a className="mlinks">
              <Icon name="arrow up" />
              Upload
            </a>
          </Link>
          <a className="mlinks" onClick={handleLogout}>
            <Icon name="sign out" />
            Logout
          </a>
        </>
      )}
    </nav>
  );
}

export default Header;
