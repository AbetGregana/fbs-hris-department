import { useField } from "formik";
export const InputText = ({
  label = "",
  required = true,
  className = "",
  onChange = null,
  refVal = null,
  ...props
}) => {
  const [field, meta] = useField(props);
  return (
    <>
      {label !== "" && (
        <label
          htmlFor={props.id || props.name}
          className={meta.touched && meta.error ? `error-show` : ""}
        >
          {label}
        </label>
      )}
      <input
        {...field}
        {...props}
        className={
          meta.touched && meta.error ? `error-show ${className}` : className
        }
        onChange={(e) => {
          onChange !== null && onChange(e);
          field.onChange(e);
        }}
        autoComplete="off"
        ref={refVal}
      />

      {meta.touched && meta.error ? (
        <span className="error-show">{meta.error}</span>
      ) : null}
    </>
  );
};
