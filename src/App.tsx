import { useState, useEffect } from "react";
import SheetCell from "./SheetCell";
import arrowKeysControl from "./arrowKeysControl";
import Modal from "./Modal";
import styles from "./App.module.css";

const ROWS_KEY = "rows";
const COLUMNS_KEY = "columns";

function App() {
  const [showModal, setShowModal] = useState(false);
  const [resultFromModal, setResultFromModal] = useState(false);
  const [contentToRemove, setContentToRemove] = useState<string[]>([]);

  const [columnAmount, setColumnAmount] = useState<number>(
    localStorage.getItem(COLUMNS_KEY)
      ? parseInt(localStorage.getItem(COLUMNS_KEY) ?? "0")
      : 4
  );

  const [rows, setRows] = useState<string[][]>(
    new Array(
      localStorage.getItem(ROWS_KEY)
        ? parseInt(localStorage.getItem(ROWS_KEY) ?? "0")
        : 4
    )
      .fill(null)
      .map(() => new Array(columnAmount).fill(""))
  );

  const [focusRow, focusColumn, setFocusRow, setFocusColumn] = arrowKeysControl(
    columnAmount,
    rows.length
  );

  useEffect(() => {
    localStorage.setItem(ROWS_KEY, rows.length.toString());
    localStorage.setItem(COLUMNS_KEY, columnAmount.toString());
  }, [rows, columnAmount]);

  useEffect(() => {
    if (resultFromModal && columnAmount > 1) {
      if (contentToRemove[0] === COLUMNS_KEY) {
        setColumnAmount((prev) => prev - 1);
        setRows((prev) => prev.map((row) => row.slice(0, -1)));
        contentToRemove.forEach((key) => {
          localStorage.removeItem(key);
        });
      } else if (rows.length > 1) {
        setRows((prev) => prev.slice(0, -1));
        contentToRemove.forEach((key) => {
          localStorage.removeItem(key);
        });
      }
    }
    setContentToRemove([]);
    setResultFromModal(false);
  }, [resultFromModal]);

  const handleAddRow = () => {
    setRows((prev) => [...prev, new Array(columnAmount).fill("")]);
  };

  const handleAddColumn = () => {
    setColumnAmount((prev) => prev + 1);
    setRows((prev) => prev.map((row) => [...row, ""]));
  };

  const handleRemoveColumn = () => {
    let content: string[] = [COLUMNS_KEY];
    rows.forEach((_, index) => {
      let key =
        (rows[rows.length - 1].length - 1).toString() + index.toString();
      if (localStorage.getItem(key) !== null) {
        content.push(key);
      }
    });
    if (content.length > 1) {
      setContentToRemove((prev) => [...prev, ...content]);
      setShowModal(true);
      return;
    }
    if (columnAmount > 1) {
      setColumnAmount((prev) => prev - 1);
      setRows((prev) => prev.map((row) => row.slice(0, -1)));
    }
  };

  const handleRemoveRow = () => {
    let content: string[] = [ROWS_KEY];
    for (let i = 0; i <= rows.length; i++) {
      let key = i.toString() + (rows.length - 1).toString();
      if (localStorage.getItem(key) !== null) {
        content.push(key);
      }
    }
    if (content.length > 1) {
      setContentToRemove((prev) => [...prev, ...content]);
      setShowModal(true);
      return;
    }
    if (rows.length > 1) {
      setRows((prev) => prev.slice(0, -1));
    }
  };

  return (
    <>
      {showModal && (
        <Modal
          onButtonClick={setResultFromModal}
          onClose={() => setShowModal(false)}
        />
      )}
      <button onClick={handleAddColumn}>Add empty column</button>
      <button onClick={handleRemoveColumn}>Remove column</button>
      <button onClick={handleAddRow}>Add empty row</button>
      <button onClick={handleRemoveRow}>Remove row</button>
      <table className={styles.table}>
        {rows.map((row, rowIndex) => (
          <tr className={styles.tr} key={rowIndex}>
            {row.map((_, cellIndex) => (
              <td className={styles.td} key={cellIndex}>
                <SheetCell
                  defaultValue={
                    localStorage.getItem(
                      cellIndex.toString() + rowIndex.toString()
                    ) || ""
                  }
                  setColumn={setFocusColumn}
                  setRow={setFocusRow}
                  focus={focusRow === rowIndex && focusColumn === cellIndex}
                  row={rowIndex}
                  column={cellIndex}
                />
              </td>
            ))}
          </tr>
        ))}
      </table>
    </>
  );
}

export default App;
