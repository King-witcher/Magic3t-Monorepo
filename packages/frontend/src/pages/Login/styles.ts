import styled from 'styled-components'

export const LoginContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 30rem;
  padding: 2rem 2rem;
  background-color: #fff;

  text-align: center;
  
  border-radius: 10px;
  border: solid 1px #ddd;
  box-shadow: 0 5px 20px 5px #ffffff20;
  box-sizing: border-box;


  input[type="submit"] {
    display: block;
    width: 100%;
    height: 4.0625rem;
    margin: 0.625rem 0;

    background-color: #eee;
    color: #000;
    border: solid 2px #999;
    border-radius: 7px;

    text-align: center;
    font-size: 1.4rem;
    font-weight: 100;

    cursor: pointer;

    transition: 200ms ease-in-out;

    &:hover {
      background-color: #fff;
    }

    &:active:not([disabled]) {
      background-color: #aaa;
      transform: scale(0.95);
    }
    
    &:disabled {
      background-color: #ddd;
      color: #888;
      cursor: progress;
    }

    &:focus-visible {
      outline: none;
    }
  }
`

export const Title = styled.div`
  font-size: 2rem;
  font-family: sans-serif;
  margin: 2rem;
  font-weight: 600;
`

export const ErrorLabel = styled.span`
  font-size: 0.8rem;
  color: #e01030;
`