import React, { useEffect, useRef } from "react";

const SheetCell = ({
  focus,
  row,
  column,
  defaultValue,
  setColumn,
  setRow,
}: {
  focus: boolean;
  row: number;
  column: number;
  defaultValue: string;
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
  };

  return (
    <input
      onChange={handleCellChange}
      ref={inputRef}
      defaultValue={defaultValue}
      onClick={handleClick}
    />
  );
};

export default SheetCell;
