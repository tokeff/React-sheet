import React, { useEffect, useRef } from "react";

const SheetCell = ({
  focus,
  column,
  row,
  setColumn,
  setRow,
}: {
  focus: boolean;
  column: number;
  row: number;
  setColumn: (column: number) => void;
  setRow: (row: number) => void;
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (focus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [focus]);

  const handleCellChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    localStorage.setItem(`${column}${row}`, value);
  };

  const handleClick = () => {
    setColumn(column);
    setRow(row);
  };

  return (
    <input
      onChange={handleCellChange}
      ref={inputRef}
      defaultValue={localStorage.getItem(`${column}${row}`) || ""}
      onClick={handleClick}
    />
  );
};

export default SheetCell;
