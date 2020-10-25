import React, { Component } from "react";
import { DragSource } from "react-dnd";
import "./BoardTile.css";
const BoardTile = (props) => {
  // These props are injected by React DnD,
  // as defined by your `collect` function above:
  const { content, isDragging, connectDragSource } = props;
  const opacity = isDragging ? 0 : 1;

  return connectDragSource(
    <div className="tile" style={{ opacity }}>
      <img src={content} />
    </div>
  );
};

const Types = {
  CARD: "card",
};

const spec = {
  canDrag(props) {
    // You can disallow drag based on props
    return true;
  },

  isDragging(props, monitor) {
    // If your component gets unmounted while dragged
    // (like a card in Kanban board dragged between lists)
    // you can implement something like this to keep its
    // appearance dragged:
    return monitor.getItem()._id === props._id;
  },

  beginDrag(props, monitor, component) {
    // Return the data describing the dragged item
    const item = props;
    return item;
  },

  endDrag(props, monitor, component) {
    if (!monitor.didDrop()) {
      // You can check whether the drop was successful
      // or if the drag ended but nobody handled the drop
      return;
    }
    // When dropped on a compatible target, do something.
    // Read the original dragged item from getItem():
    const item = monitor.getItem();

    // You may also read the drop result from the drop target
    // that handled the drop, if it returned an object from
    // its drop() method.
    const dropResult = monitor.getDropResult();

    // This is a good place to call some Flux action
    //CardActions.moveCardToList(item.id, dropResult.listId)
    //props.onDropped(item);
  },
};

/**
 * Specifies which props to inject into your component.
 */
function collect(connect, monitor) {
  return {
    // Call this function inside render()
    // to let React DnD handle the drag events:
    connectDragSource: connect.dragSource(),
    // You can ask the monitor about the current drag state:
    isDragging: monitor.isDragging(),
  };
}

export default DragSource(Types.CARD, spec, collect)(BoardTile);
