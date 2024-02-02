"use client";

interface ILayerPreviewProps {
  id: string;
  onLayerPointDown: (e: React.PointerEvent, layerId: string) => void;
  selectionColor?: string;
}
import { useStorage } from "@/liveblocks.config";
import { LayerType } from "@/types/canvas";
import React, { memo } from "react";
import { Rectangle } from "./rectangle";
import { Ellipse } from "./ellipse";
import { Text } from "./text";
import { Note } from "./note";
import Path from "./path";
import { colorToCss } from "@/lib/utils";

export const LayerPreview = memo(
  ({ id, onLayerPointDown, selectionColor }: ILayerPreviewProps) => {
    const layer = useStorage((root) => root.layers.get(id));

    if (!layer) {
      return null;
    }

    switch (layer.type) {
      case LayerType.Path:
        console.log("entered");
        return (
          <Path
            key={id}
            x={layer.x}
            y={layer.y}
            fill={layer.fill ? colorToCss(layer.fill) : "#000"}
            points={layer.points}
            onPointerDown={(e) => onLayerPointDown(e, id)}
            stroke={selectionColor}
          />
        );
      case LayerType.Note:
        return (
          <Note
            id={id}
            layer={layer}
            onPointerDown={onLayerPointDown}
            selectionColor={selectionColor}
          />
        );
      case LayerType.Text:
        return (
          <Text
            id={id}
            layer={layer}
            onPointerDown={onLayerPointDown}
            selectionColor={selectionColor}
          />
        );

      case LayerType.Ellipse:
        return (
          <Ellipse
            id={id}
            layer={layer}
            onPointerDown={onLayerPointDown}
            selectionColor={selectionColor}
          />
        );

      case LayerType.Rectangle:
        return (
          <Rectangle
            id={id}
            onPointerDown={onLayerPointDown}
            layer={layer}
            key={id}
            selectionColor={selectionColor}
          />
        );

      default:
        console.warn("Unknown layer");
        return null;
    }
  }
);

LayerPreview.displayName = "LayerPreview";
