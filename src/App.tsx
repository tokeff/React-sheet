import { useState, useEffect } from "react";
import Modal from "./WarningModal";
import Sheet from "./Sheet";

const ROWS_KEY = "rows";
const COLUMNS_KEY = "columns";

function App() {
  const [showWarning, setShowWarning] = useState(false);
  const [resultFromModal, setResultFromModal] = useState(false);
  const [contentToRemove, setContentToRemove] = useState<string[]>([]);

  const [columnAmount, setColumnAmount] = useState<number>(
    localStorage.getItem(COLUMNS_KEY)
      ? parseInt(localStorage.getItem(COLUMNS_KEY) ?? "0")
      : 4
  );
  const [rowAmount, setRowAmount] = useState<number>(
    localStorage.getItem(ROWS_KEY)
      ? parseInt(localStorage.getItem(ROWS_KEY) ?? "0")
      : 4
  );

  useEffect(() => {
    localStorage.setItem(ROWS_KEY, `${rowAmount}`);
    localStorage.setItem(COLUMNS_KEY, `${columnAmount}`);
  }, [rowAmount, columnAmount]);

  useEffect(() => {
    if (resultFromModal && columnAmount > 1) {
      if (contentToRemove[0] === COLUMNS_KEY) {
        setColumnAmount((prev) => prev - 1);
        contentToRemove.forEach((key) => {
          localStorage.removeItem(key);
        });
      } else if (rowAmount > 1) {
        setRowAmount((prev) => prev - 1);
        contentToRemove.forEach((key) => {
          localStorage.removeItem(key);
        });
      }
    }
    setContentToRemove([]);
    setResultFromModal(false);
  }, [resultFromModal]);

  const handleAddRow = () => {
    setRowAmount((prev) => prev + 1);
  };

  const handleAddColumn = () => {
    setColumnAmount((prev) => prev + 1);
  };

  const handleRemove = (axis: "rows" | "columns") => {
    const contentKey = axis === "rows" ? ROWS_KEY : COLUMNS_KEY;
    const amount = axis === "rows" ? columnAmount : rowAmount;
    const setAmount = axis === "rows" ? setRowAmount : setColumnAmount;
    let content: string[] = [contentKey];

    for (let i = 0; i < amount; i++) {
      let key =
        axis === "rows" ? `${i}${rowAmount - 1}` : `${columnAmount - 1}${i}`;
      console.log(key);
      if (localStorage.getItem(key) !== null) {
        content.push(key);
      }
    }

    if (content.length > 1) {
      setContentToRemove(content);
      setShowWarning(true);
    } else if (amount > 1) {
      setAmount((prev) => prev - 1);
    }
  };

  return (
    <>
      {showWarning && (
        <Modal
          onButtonClick={setResultFromModal}
          onClose={() => setShowWarning(false)}
        />
      )}
      <button disabled={showWarning} onClick={handleAddColumn}>
        Add empty column
      </button>
      <button disabled={showWarning} onClick={() => handleRemove(COLUMNS_KEY)}>
        Remove column
      </button>
      <button disabled={showWarning} onClick={handleAddRow}>
        Add empty row
      </button>
      <button disabled={showWarning} onClick={() => handleRemove(ROWS_KEY)}>
        Remove row
      </button>
      <fieldset disabled={showWarning}>
        <Sheet x={columnAmount} y={rowAmount} />
      </fieldset>
    </>
  );
}

export default App;
