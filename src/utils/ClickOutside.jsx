import React, { Component, useEffect } from "react";

const ClickOutside = ({ children, onClick }) => {
  const refs = React.Children.map(children, () => React.createRef());
  const handleClick = (e) => {
    const isOutside = refs.every((ref) => {
      return !ref.current.contains(e.target);
    });
    if (isOutside) {
      onClick();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  });

  return React.Children.map(children, (element, idx) =>
    React.cloneElement(element, { ref: refs[idx] })
  );
};

export default ClickOutside;
