import React ,{ useState }from 'react'
import '../Auth/formInput.css';

const FormInput = (props) => {
  const [focused, setFocused] = useState(false);
    const {label,errorMessage, onChange,id, ...inputprops } = props;

    const handleFocus = (e) => {
      setFocused(true);
    }
    
  return (
    <div className = "formInput">
      
        <label>{label} </label>
        <input {...inputprops} onChange={onChange} onBlur={handleFocus} focused={focused.toString()}/>
        <span className='errors'>{errorMessage}</span>
    </div>
  )
}

export default FormInput;