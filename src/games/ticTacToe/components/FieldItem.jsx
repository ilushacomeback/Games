const FieldItem = ({ value, set, style, className }) => {
  return (
    <div className={className} onClick={set} style={style}>
      <span>{value}</span>
    </div>
  );
};
export default FieldItem;
