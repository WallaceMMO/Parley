import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: row;
`

export const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  margin-top: 40px;
  width: 50%;
  border: 1px solid black;
  padding: 15px;
`

export const InputControl = styled.div`
  width: 85%;
  margin-top: 14px;
  display: flex;
  flex-direction: column;
`

export const Label = styled.b`
  margin-bottom: 3px;
`

export const TextInput = styled.input`  
  font-size: 16px;
  height: 25px;
  border-radius: 5px;
  padding-left: 5px;
  border: 1px solid #ccc;
`

export const Button = styled.button`  
  margin-top: 15px;
  width: 85%;
  height: 30px;
  cursor: pointer;
  border-radius: 5px;
  background-color: #5656ff;
  color: white;
`