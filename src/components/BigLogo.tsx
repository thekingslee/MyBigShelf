import { Link } from "react-router-dom";
import BigShelfLogo from "../assets/LOGO.svg";

const BigLogo = () => {
  return (
    <>
      <Link className="flex gap-1" to="/">
        <img src={BigShelfLogo} alt="BigShelf Logo" />
        <h3 className="font-headingFont font-semibold text-2xl text-custom-black_800 my-2">
          BigShelf
        </h3>
      </Link>
    </>
  );
};

export default BigLogo;
