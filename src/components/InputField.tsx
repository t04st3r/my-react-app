import './InputField.scss';
import { isValidUrl } from '../utils/helpers';

interface InputFieldProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  disabled: boolean;
}

function InputField({ value, onChange, onSubmit, disabled }: InputFieldProps) {

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !disabled) {
      onSubmit();
    }
  };

  const isValid = value === '' || isValidUrl(value);
  
  return (
    <div className="input-group">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder="Enter API endpoint (e.g., https://api.github.com/users/github)"
        className={`url-input ${!isValid ? 'invalid' : ''}`}
        disabled={disabled}
      />
      <button onClick={onSubmit} className="fetch-button" disabled={disabled || !isValid}>
        {disabled ? 'Loading...' : 'Fetch'}
      </button>
    </div>
  );
}

export default InputField;