import Row from "./Row";
import styles from "./Sheet.module.css";
import arrowKeysControl from "./arrowKeysControl";

const Sheet = ({ x, y }: { x: number; y: number }) => {
  const rows = new Array(y).fill(null);

  const [focusRow, focusColumn, setFocusRow, setFocusColumn] = arrowKeysControl(
    x,
    y
  );

  return (
    <table className={styles.table}>
      {rows.map((_, index) => (
        <Row
          key={index}
          row={index}
          columns={new Array(x).fill("")}
          focusColumn={focusColumn}
          focusRow={focusRow}
          setFocusColumn={setFocusColumn}
          setFocusRow={setFocusRow}
        />
      ))}
    </table>
  );
};

export default Sheet;
