export default function Input({children, type, value, min, onChange, isReadOnly}){

  return <>
    <label >{children}</label>
    <input min={min} type={type} value={value} onChange={onChange} readOnly={isReadOnly}/>
  </>
}