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
    localStorage.setItem(column.toString() + row.toString(), value);
  };

  const handleClick = () => {
    setColumn(column);
    setRow(row);
    console.log(column, row);
  };

  return (
    <input
      onChange={handleCellChange}
      ref={inputRef}
      defaultValue={
        localStorage.getItem(column.toString() + row.toString()) || ""
      }
      onClick={handleClick}
    />
  );
};

export default SheetCell;
