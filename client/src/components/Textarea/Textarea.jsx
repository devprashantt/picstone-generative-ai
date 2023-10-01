import styles from "./Textarea.module.scss";

// PROP VALIDATION
import PropTypes from "prop-types";

const Textarea = ({
  label,
  name,
  id,
  cols,
  rows,
  onChange,
  placeholder,
  value,
}) => {
  return (
    <div className={styles.textarea}>
      {label && <p className={styles.label}>{label}</p>}
      <textarea
        placeholder={placeholder}
        name={name}
        id={id}
        cols={cols}
        rows={rows}
        onChange={onChange}
        value={value}
        className={styles.textarea_field}
      />
    </div>
  );
};

Textarea.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.number,
  cols: PropTypes.number,
  rows: PropTypes.number,
  onChange: PropTypes.func,
  value: PropTypes.string,
};

export default Textarea;
