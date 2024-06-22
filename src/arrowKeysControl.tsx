import { useMemo, useState } from "react";

import { useKeyPressEvent } from "react-use";

const arrowKeysControl = (sheetLength: number, sheetHeight: number) => {
  const [currentRow, setCurrentRow] = useState(0);
  const [currentColumn, setCurrentColumn] = useState(0);

  useKeyPressEvent("ArrowDown", () =>
    setCurrentRow(currentRow === sheetHeight - 1 ? 0 : currentRow + 1)
  );
  useKeyPressEvent("ArrowUp", () =>
    setCurrentRow(currentRow === 0 ? sheetHeight - 1 : currentRow - 1)
  );

  useKeyPressEvent("ArrowLeft", () =>
    setCurrentColumn(currentColumn === 0 ? sheetLength - 1 : currentColumn - 1)
  );
  useKeyPressEvent("ArrowRight", () =>
    setCurrentColumn(currentColumn === sheetLength - 1 ? 0 : currentColumn + 1)
  );

  return useMemo(
    () => [currentRow, currentColumn, setCurrentRow, setCurrentColumn] as const,
    [currentColumn, currentRow]
  );
};

export default arrowKeysControl;
