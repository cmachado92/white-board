import React, { useState } from "react";
import { SwatchesPicker } from "react-color";

export default function ColorPicker({ color, setColor }) {
  const [colorHexCode, setColorHexCode] = useState(color);

  const handleChange = (e) => {
    setColorHexCode(e.hex);
    setColor(e.hex);
  };
  return (
    <div>
      <SwatchesPicker color={colorHexCode} onChange={handleChange} />
    </div>
  );
}
