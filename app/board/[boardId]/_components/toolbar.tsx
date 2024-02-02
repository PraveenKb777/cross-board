import {
  Circle,
  MousePointer2,
  Pencil,
  Redo2,
  Square,
  StickyNote,
  Type,
  Undo2,
} from "lucide-react";
import ToolBtn from "./tool-btn";
import { CanvasMode, CanvasState, LayerType } from "@/types/canvas";

interface IToolbarProp {
  canvasState: CanvasState;
  setCanvasState: (newState: CanvasState) => void;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
}

export default function Toolbar({
  canRedo,
  canUndo,
  canvasState,
  redo,
  setCanvasState,
  undo,
}: IToolbarProp) {
  return (
    <div className=" absolute top-[50%] -translate-y-[50%] left-2 flex flex-col gap-y-4">
      <div className="bg-white rounded-md p-1.5 gap-y-1 flex-col flex items-center shadow-md">
        <ToolBtn
          label="Select"
          isActive={
            canvasState.mode === CanvasMode.None ||
            canvasState.mode === CanvasMode.Translating ||
            canvasState.mode === CanvasMode.SelectionNet ||
            canvasState.mode === CanvasMode.Pressing ||
            canvasState.mode === CanvasMode.Resizing
          }
          icon={MousePointer2}
          onClick={() => {
            setCanvasState({ mode: CanvasMode.None });
          }}
        />
        <ToolBtn
          label="Text"
          isActive={
            canvasState.mode === CanvasMode.Inserting &&
            canvasState.layerType === LayerType.Text
          }
          icon={Type}
          onClick={() => {
            setCanvasState({
              mode: CanvasMode.Inserting,
              layerType: LayerType.Text,
            });
          }}
        />
        <ToolBtn
          label="Sticky Notes"
          isActive={
            canvasState.mode === CanvasMode.Inserting &&
            canvasState.layerType === LayerType.Note
          }
          icon={StickyNote}
          onClick={() => {
            setCanvasState({
              mode: CanvasMode.Inserting,
              layerType: LayerType.Note,
            });
          }}
        />
        <ToolBtn
          label="Rectangle"
          isActive={
            canvasState.mode === CanvasMode.Inserting &&
            canvasState.layerType === LayerType.Rectangle
          }
          icon={Square}
          onClick={() => {
            setCanvasState({
              mode: CanvasMode.Inserting,
              layerType: LayerType.Rectangle,
            });
          }}
        />
        <ToolBtn
          label="Ellipse"
          isActive={
            canvasState.mode === CanvasMode.Inserting &&
            canvasState.layerType === LayerType.Ellipse
          }
          icon={Circle}
          onClick={() => {
            setCanvasState({
              mode: CanvasMode.Inserting,
              layerType: LayerType.Ellipse,
            });
          }}
        />
        <ToolBtn
          label="Pen"
          isActive={canvasState.mode === CanvasMode.Pencil}
          icon={Pencil}
          onClick={() => {
            setCanvasState({
              mode: CanvasMode.Pencil,
            });
          }}
        />
      </div>
      <div className=" bg-white rounded-md p-1.5 flex flex-col items-center shadow-md">
        <ToolBtn
          label="Undo"
          isActive={false}
          icon={Undo2}
          isDisabled={!canUndo}
          onClick={undo}
        />
        <ToolBtn
          label="Redo"
          isActive={false}
          icon={Redo2}
          isDisabled={!canRedo}
          onClick={redo}
        />
      </div>
    </div>
  );
}

export const ToolBarSkeleton = () => {
  return (
    <div className=" absolute top-[50%] -translate-y-[50%] left-2 flex flex-col gap-y-4 bg-white h-[360px] w-[52px] shadow-md rounded-md "></div>
  );
};
