import { useSelector } from "react-redux";

import UnloggedIn from "./UnloggedIn";
import LoggedIn from "./logged-in";

const Header = () => {
  const isLoggedIn = Boolean(
    useSelector((state) => state.user && state.isVerified)
  );
  return (
    <header className="sticky top-0 z-50 w-full">
      {isLoggedIn && <LoggedIn />}
      {!isLoggedIn && <UnloggedIn />}
    </header>
  );
};
export default Header;
