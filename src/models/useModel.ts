import { useState } from "react";

export default function Model() {
  const [popupDisplay, setPopupDisplay] = useState(false);
  const showPopup = () => {
    setPopupDisplay(true);
  }
  const hidenPopup = () => {
    setPopupDisplay(false);
  }

  return { popupDisplay, showPopup, hidenPopup };
};