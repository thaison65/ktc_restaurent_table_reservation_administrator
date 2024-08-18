import './InputField.scss';

function InputField({ ...props }) {
  const { id, name, type = 'text', placeholder = '', value, onChange, label, error = '', required = false, readOnly = false } = props;

  return (
    <div className={`input-container ${error ? 'has-error' : ''}`}>
      {label && (
        <label htmlFor={id} className='input-label'>
          {label} {required && <span className='required'>*</span>}
        </label>
      )}
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className='input'
        readOnly={readOnly}
        required={required}
      />
      {error && <span className='input-error'>{error}</span>}
    </div>
  );
}

export default InputField;
