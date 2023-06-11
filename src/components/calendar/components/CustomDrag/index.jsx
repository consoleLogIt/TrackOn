import { useDragLayer } from "react-dnd";
import EventBlock from "../eventBlock";
import { getPostion } from "../CalendarDay";
// import { v4 as uuidv4 } from "uuid";

export function snapY(y) {
return Math.round(y / 10) * 10;
}

const DragPreview = ({ event, style }) => {
  // const event = {
  //   title: "somne",
  //   color: "blue",
  //   id: uuidv4(),
  //   timeRange: [`4:00`, `5:00`],
  //   date: "10_06_2023",
  // };

  console.log({ event });

  return <EventBlock {...event} style={style} />;
};

export const CustomDragLayer = (props) => {
  const { itemType, isDragging, item, initialOffset, currentOffset } =
    useDragLayer((monitor) => ({
      item: monitor.getItem(),
      itemType: monitor.getItemType(),
      initialOffset: monitor.getInitialSourceClientOffset(),
      currentOffset: monitor.getSourceClientOffset(),
      isDragging: monitor.isDragging(),
    }));

  if (!isDragging || !props.isOver) {
    return null;
  }

  let { x, y } = currentOffset;
  const parentY = props.getParentBoundingRect().top;
  const snappedY  = snapY(y);

  const position = getPostion(item.event.timeRange);

  console.log({ thisY: y, snappedY, x, parentY });

  const style = { top: (snappedY - parentY) / 10, height: position.height };

  return (
    <div style={{ pointerEvents: "none" }}>
      <DragPreview event={item.event} style={style} />
    </div>
  );
};
