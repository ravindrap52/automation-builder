import "@/app/components/styles.css";

import { useDnD } from "@/app/contexts/DnDContext";

import { sidebarNavItems } from "@/app/Constants";

const Sidebar = () => {
  const { setType } = useDnD();

  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    setType(nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <aside className="sidebar">
      <div className="description">You can drag these nodes.</div>
      {sidebarNavItems.map((item) => (
        <div
          className={`dndnode p-4 ${item.className}`}
          onDragStart={(event) => onDragStart(event, `${item.nodeType}`)}
          draggable
          key={item.id}
        >
          {item.name}
        </div>
      ))}
    </aside>
  );
};
export default Sidebar;
