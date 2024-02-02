"use client";

import { colorToCss } from "@/lib/utils";
import { Color } from "@/types/canvas";

interface IColorPickerProps {
  onChange: (color: Color) => void;
}

export default function ColorPicker({ onChange }: IColorPickerProps) {
  return (
    <div className="flex flex-wrap gap-2 items-center max-w-[164px] pr-2 mr-2 border-r border-neutral-200">
      <ColorBtn color={{ r: 243, g: 82, b: 35 }} onClick={onChange} />
      <ColorBtn color={{ r: 255, g: 249, b: 177 }} onClick={onChange} />
      <ColorBtn color={{ r: 68, g: 202, b: 99 }} onClick={onChange} />
      <ColorBtn color={{ r: 39, g: 142, b: 237 }} onClick={onChange} />
      <ColorBtn color={{ r: 155, g: 105, b: 245 }} onClick={onChange} />
      <ColorBtn color={{ r: 252, g: 142, b: 42 }} onClick={onChange} />
      <ColorBtn color={{ r: 0, g: 0, b: 0 }} onClick={onChange} />
      <ColorBtn color={{ r: 255, g: 255, b: 255 }} onClick={onChange} />
    </div>
  );
}

interface IColorBtnProps {
  onClick: (color: Color) => void;
  color: Color;
}

export const ColorBtn = ({ color, onClick }: IColorBtnProps) => {
  return (
    <button
      className="w-8 h-8 flex items-center cursor-pointer justify-center hover:opacity-75 transition"
      onClick={() => onClick(color)}
    >
      <div
        className="h-8 w-8 rounded-md border border-neutral-300"
        style={{ background: colorToCss(color) }}
      />
    </button>
  );
};
