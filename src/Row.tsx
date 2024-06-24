import SheetCell from "./SheetCell";
import styles from "./sheet.module.css";
import React from "react";

const Row = ({
  row,
  columns,
  focusColumn,
  focusRow,
  setFocusColumn,
  setFocusRow,
}: {
  row: number;
  columns: string[];
  focusColumn: number;
  focusRow: number;
  setFocusColumn: React.Dispatch<React.SetStateAction<number>>;
  setFocusRow: React.Dispatch<React.SetStateAction<number>>;
}) => {
  return (
    <tr className={styles.tr}>
      {columns.map((_, index) => (
        <td className={styles.td} key={index}>
          <SheetCell
            key={index}
            focus={focusRow === row && focusColumn === index}
            row={row}
            column={index}
            setColumn={setFocusColumn}
            setRow={setFocusRow}
          />
        </td>
      ))}
    </tr>
  );
};

export default Row;
