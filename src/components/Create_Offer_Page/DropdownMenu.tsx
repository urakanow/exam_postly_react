import React, { useState, useRef, useEffect } from "react";
import { useFloating, autoUpdate, offset, shift, useClick, useDismiss, useInteractions, useRole } from "@floating-ui/react";

interface DropdownMenuProps {
  items: string[],
  onSelect: (index: number) => void,
  initialText: string
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({
  items,
  onSelect,
  initialText = ""
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: "bottom-start",
    middleware: [offset(4), shift()],
    whileElementsMounted: autoUpdate,
  });

  const click = useClick(context);
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: "listbox" });

  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions([
    click,
    dismiss,
    role,
  ]);

  const handleSelect = (index: number) => {
    setActiveIndex(index);
    onSelect(index);
    setIsOpen(false);
  };

  return (
    <div className="dropdown-container">
      <button
        ref={refs.setReference}
        className={`dropdown-button dropdown-item  ${activeIndex === null ? "dropdown-item-unselected" : ""}`}
        {...getReferenceProps()}
      >
        {activeIndex !== null ? items[activeIndex] : initialText}
      </button>

      {isOpen && (
        <div
          ref={refs.setFloating}
          style={floatingStyles}
          className="dropdown-menu vertical_container"
          {...getFloatingProps()}
        >
          {items.map((item, index) => (
            <button
              key={index}
              className={`dropdown-item ${
                index === activeIndex ? "dropdown-item-selected" : ""
              }`}
              {...getItemProps({
                onClick: () => handleSelect(index),
              })}
              disabled={ index === activeIndex ? true : undefined}
            >
              {item}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};