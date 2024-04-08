import FieldItem from "./FieldItem";

const FieldLine = ({ idLine, style, line, styleForItem, set }) => {
  return (
    <div className="line" style={style}>
      {line.map((item, idItem) => (
        <FieldItem
          key={idItem}
          value={item}
          className="line-item"
          set={() => set({ idLine, idItem })}
          style={styleForItem}
        />
      ))}
    </div>
  );
};

export default FieldLine