import { FunctionComponent, useEffect, useState } from 'react'
import { Container, InputBox, MiddleFieldLabel, TopFieldLabel } from './styles'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value?: string
  label?: string
  password?: boolean
}
 
const Input: FunctionComponent<InputProps> = ({ value, onChange, label, password, ...rest }) => {
  const [typing, setTyping] = useState(false)
  const [inputValue, setInputValue] = useState(value || '')

  useEffect(() => {
    setInputValue(value || '')
    if (value?.length)
      setTyping(true)
  }, [value])

  function onFocusHandler() {
    setTyping(true)
  }

  function onBlurHandler() {
    if (!inputValue.length)
      setTyping(false)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function onChangeHandler(e: any) {
    setInputValue(e.target.value)
    if(onChange)
      onChange(e)
  }

  return ( 
    <Container>
      <InputBox {...rest} type={password ? 'password' : 'text'} onFocus={onFocusHandler} onBlur={onBlurHandler} value={inputValue} onChange={onChangeHandler} />
      <TopFieldLabel enabled={typing}>{ label }</TopFieldLabel>
      <MiddleFieldLabel enabled={!typing}>{ label }</MiddleFieldLabel>
    </Container>
  )
}
 
export default Input