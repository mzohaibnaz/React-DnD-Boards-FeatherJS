import React from "react";
import BoardTile from "./BoardTile/BoardTile";
import { DropTarget } from "react-dnd";
import "./board.css";

const Board = (props) => {
  const { isOver, canDrop, connectDropTarget } = props;

  // const onDrop = ({ id, boardId }) => {
  //   //console.log(id + " - " + boardId);
  // };

  return connectDropTarget(
    <div className={isOver ? "card hovered" : "card"}>
      <header>{props.title || "Board"}</header>

      <div className="list scrollbar scroll-style-2 flex-container flex-wrap">
        {props.tiles.map((tile) => (
          <BoardTile
            key={tile._id}
            boardId={props._id}
            {...tile}
            // onDropped={onDrop}
          />
        ))}
      </div>
    </div>
  );
};

const Types = {
  CARD: "card",
};

/**
 * Specifies the drop target contract.
 * All methods are optional.
 */
const spec = {
  canDrop(props, monitor) {
    // You can disallow drop based on props or item
    //const item = monitor.getItem();
    return true;
    //return canMakeChessMove(item.fromPosition, props.position)
  },

  hover(props, monitor, component) {
    // This is fired very often and lets you perform side effects
    // in response to the hover. You can't handle enter and leave
    // here—if you need them, put monitor.isOver() into collect() so you
    // can use componentDidUpdate() to handle enter/leave.

    // You can access the coordinates if you need them
    const clientOffset = monitor.getClientOffset();
    //const componentRect = findDOMNode(component).getBoundingClientRect();

    // You can check whether we're over a nested drop target
    const isOnlyThisOne = monitor.isOver({ shallow: true });

    // You will receive hover() even for items for which canDrop() is false
    const canDrop = monitor.canDrop();
  },

  drop(props, monitor, component) {
    if (monitor.didDrop()) {
      // If you want, you can check whether some nested
      // target already handled drop
      return;
    }

    // Obtain the dragged item
    const item = monitor.getItem();
    if (item.boardId === props._id) return;

    props.onUpdate(item, props);
    //console.log(props);
    //console.log(item);
    // You can do something with it
    //ChessActions.movePiece(item.fromPosition, props.position)

    // You can also do nothing and return a drop result,
    // which will be available as monitor.getDropResult()
    // in the drag source's endDrag() method
    return { moved: true };
  },
};

/**
 * Specifies which props to inject into your component.
 */
function collect(connect, monitor) {
  return {
    // Call this function inside render()
    // to let React DnD handle the drag events:
    connectDropTarget: connect.dropTarget(),
    // You can ask the monitor about the current drag state:
    isOver: monitor.isOver(),
    isOverCurrent: monitor.isOver({ shallow: true }),
    canDrop: monitor.canDrop(),
    itemType: monitor.getItemType(),
  };
}

export default DropTarget(Types.CARD, spec, collect)(Board);
