import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const FormInput = ({
  label,
  name,
  type,
  value,
  onChange,
  onBlur,
  error,
  size,
  dis,
  readOnly,
  placeholder,
  inputMode,
  pattern,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="form-control mb-2">
      <div className="flex justify-between items-center mb-1">
        <label htmlFor={name} className="label font-semibold">
          <span className="label-text text-[#666666]">{label}</span>
        </label>
        {type === 'password' && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="flex items-center gap-1 text-sm leading-5 text-[#666666CC]"
          >
            {showPassword ? <FaEye /> : <FaEyeSlash />}{' '}
            {showPassword ? 'Hide' : 'Show'}
          </button>
        )}
      </div>

      <div className="relative">
        <input
          type={type === 'password' && showPassword ? 'text' : type}
          name={name}
          value={value}
          onChange={onChange}
          id={name}
          onBlur={onBlur}
          readOnly={readOnly}
          disabled={dis}
          placeholder={placeholder}
          inputMode={inputMode}
          pattern={pattern}
          className={`input border-[2px] w-full input-bordered focus:ring-0 focus:outline-none ${size} placeholder-custom  !text-[#333333]   ${
            type === 'number' ? 'no-spinner' : ''
          }`}
          style={{
            borderColor: error ? 'red' : value ? '#1140E7' : '',
          }}
        />
        {error && <div className="text-red-500 text-xs mt-1">{error}</div>}
      </div>
    </div>
  );
};

export default FormInput;
