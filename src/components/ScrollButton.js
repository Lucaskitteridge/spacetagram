import React, { useEffect } from "react";
import { FaAngleUp } from "react-icons/fa";
import useStateHelpers from "../helpers/stateHelpers";
import "./ScrollButton.css";

export default function ScrollButton() {
  const { showTopBtn, setShowTopBtn } = useStateHelpers();

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 400) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    });
  }, []);

  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="top-to-btm">
      {showTopBtn && (
        <FaAngleUp className="icon-pos icon-sty" onClick={goToTop} />
      )}
    </div>
  );
}
