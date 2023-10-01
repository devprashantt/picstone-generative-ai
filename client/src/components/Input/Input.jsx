import PropTypes from "prop-types";

import styles from "./Input.module.scss";

const Input = ({ label, type, placeholder, value, onChange, name }) => {
  return (
    <div className={styles.input}>
      {label && <p className={styles.label}>{label}</p>}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name}
        className={styles.input_field}
      />
    </div>
  );
};

Input.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  name: PropTypes.string,
};

export default Input;
