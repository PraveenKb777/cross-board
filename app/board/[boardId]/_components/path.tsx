import { getSvgPathFromStroke } from "@/lib/utils";
import { getStroke } from "perfect-freehand";
interface IPathProps {
  x: number;
  y: number;
  points: number[][];
  fill: string;
  onPointerDown?: (e: React.PointerEvent) => void;
  stroke?: string;
}

export default function Path({
  fill,
  points,
  x,
  y,
  onPointerDown,
  stroke,
}: IPathProps) {
  console.log("firing");
  return (
    <path
      className="drop-shadow-md"
      onPointerDown={onPointerDown}
      d={getSvgPathFromStroke(
        getStroke(points, {
          size: 16,
          thinning: 0.5,
          streamline: 0.5,
          smoothing: 0.5,
        })
      )}
      style={{
        transform: `translate(
        ${x}px,${y}px
    )`,
      }}
      x={0}
      y={0}
      fill={fill}
      stroke={stroke}
      strokeWidth={1}
    />
  );
}
