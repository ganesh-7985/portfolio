import React, { useState, useEffect } from "react";
import DesktopMenu from "./Headercomp/DesktopMenu";
import Logo from "./Headercomp/Logo";
import IconMenu from "./Headercomp/IconMenu";
import MobileMenu from "./Headercomp/MobileMenu";

const Navbar = ({ finishedLoading }) => {
  const [rotate, setRotate] = useState(false);
  const [ShowElement, setShowElement] = useState(false);
  const [changeBackground, setchangeBackground] = useState(false);

  const changeNavbarBackground = () => {
    if (window.scrollY >= 80) setchangeBackground(true);
    else setchangeBackground(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", changeNavbarBackground);
  }, []);

  return (
    <div className="relative flex flex-row justify-between items-center w-full py-5 sm:py-2 p-4 bg-slate-950">
      <a href="#main" className="pl-5">
        <Logo finishedLoading={finishedLoading} />
      </a>
      <DesktopMenu finishedLoading={finishedLoading} />
      <IconMenu
        rotate={rotate}
        setRotate={setRotate}
        setShowElement={setShowElement}
        ShowElement={ShowElement}
        finishedLoading={finishedLoading}
      />
      <MobileMenu rotate={rotate} setRotate={setRotate} setShowElement={setShowElement} ShowElement={ShowElement} />
    </div>
  );
};

export default Navbar;
