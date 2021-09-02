import { useForm } from "react-hook-form";

const Input = (props) => {
  const { register } = useForm();

  return (
    <div className='input-field'>
      <span className="material-icons-outlined prefix">
        {props.icon}
      </span>

      <input {...register(props.id)}
        {...props} />

      <label htmlFor={props.id}> 
        {props.label} 
      </label>
    </div>
  );
}

export default Input;