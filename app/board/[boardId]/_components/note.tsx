import { cn, colorToCss, getContrastingTextColor } from "@/lib/utils";
import { useMutation } from "@/liveblocks.config";
import { NoteLayer, TextLayer } from "@/types/canvas";
import { Kalam } from "next/font/google";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
const font = Kalam({
  subsets: ["latin"],
  weight: ["400"],
});

const calcFontSize = (width: number, height: number) => {
  const maxFontSize = 96;
  const scaleFactor = 0.15;
  const fontSizeBasedOnHeight = height * scaleFactor;
  const fontSizeBasedOnWidth = width * scaleFactor;

  return Math.min(fontSizeBasedOnHeight, fontSizeBasedOnWidth, maxFontSize);
};

interface INoteProps {
  id: string;
  layer: NoteLayer;
  onPointerDown: (e: React.PointerEvent, id: string) => void;
  selectionColor?: string;
}

export const Note = ({
  id,
  layer,
  onPointerDown,
  selectionColor,
}: INoteProps) => {
  const { fill, value, width, height, x, y } = layer;
  const updateValue = useMutation(({ storage }, newValue: string) => {
    const liveLayers = storage.get("layers");
    liveLayers.get(id)?.set("value", newValue);
  }, []);

  const handleContentChange = (e: ContentEditableEvent) => {
    updateValue(e.target.value);
  };

  return (
    <foreignObject
      x={x}
      y={y}
      width={width}
      height={height}
      onPointerDown={(e) => onPointerDown(e, id)}
      style={{
        backgroundColor: fill ? colorToCss(fill) : "#000",
        outline: selectionColor ? `1px solid ${selectionColor}` : "none",
      }}
      className="shadow-md drop-shadow-xl"
    >
      <ContentEditable
        className={cn(
          "h-full w-full flex items-center justify-center text-center outline-none",
          font.className
        )}
        html={value || "Text"}
        onChange={handleContentChange}
        style={{
          fontSize: calcFontSize(width, height),
          color: fill ? getContrastingTextColor(fill) : "#000",
        }}
      />
    </foreignObject>
  );
};
