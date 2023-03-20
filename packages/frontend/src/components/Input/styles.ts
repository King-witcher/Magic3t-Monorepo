import styled from 'styled-components'

export const Container = styled.div`
  position: relative;
  width: 100%;
  height: fit-content;
  margin: 0.3rem 0;
`

interface LabelProps {
  enabled: boolean
}

export const TopFieldLabel = styled.span<LabelProps>`
  pointer-events: none;
  user-select: none;
  position: absolute;
  font-family: sans-serif;
  color: #666;
  font-size: 0.9rem;
  top: 6px;
  left: 50%;
  transform: translateX(-50%);
  transition: 200ms ease-in-out;
  opacity: ${({enabled}) => (enabled ? 1 : 0)};
`

export const MiddleFieldLabel = styled.span<LabelProps>`
  pointer-events: none;
  user-select: none;
  position: absolute;
  font-family: sans-serif;
  color: #666;
  font-size: 1.3rem;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  transition: 200ms ease-in-out;
  opacity: ${({enabled}) => (enabled ? 1 : 0)};
`

export const InputBox = styled.input`
  box-sizing: border-box;
  display: block;
  width: 100%;
  height: 4.0625rem;
  outline: none;
  transition: 200ms ease-in-out;

  text-align: center;
  font-size: 1.4rem;
  font-weight: 100;
  padding-top: 15px;

  border: solid 2px #999;
  border-radius: 7px;

  &:focus-visible {
    border-color: #000;
  }

  &:disabled {
    color: #999;
    background-color: #eee;
  }
`