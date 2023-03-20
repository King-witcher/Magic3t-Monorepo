import { FunctionComponent } from 'react'
import { Container } from './styles'

interface CardProps {
  readonly number: number
  readonly owner: 'me' | 'enemy'
}
 
const Card: FunctionComponent<CardProps> = ({ number }: CardProps) => {
  return (
    <Container>
      {number}
    </Container>
  )
}
 
export default Card