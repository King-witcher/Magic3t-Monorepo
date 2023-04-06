interface Player {
  id: string
  nickname: string
  cards: number[]
}

const initialSet = {
  1: true,
  2: true,
  3: true,
  4: true,
  5: true,
  6: true,
  7: true,
  8: true,
  9: true,
}

export enum Turn {
    attacker = 1,
    defender = -1
}

function isWinnerCardArray(cardArray: number[]): boolean {
  if (cardArray.length < 3)
    return false

  for (let i = 0; i < cardArray.length; i++) {
    for (let j = 1; j < cardArray.length; j++) {
      for (let k = 2; k < cardArray.length; k++) {
        if (cardArray[i] + cardArray[j] + cardArray[k] === 15) {
          return true
        }
      }
    }
  }

  return false
}

export default class Game {
  public players: { [key: number]: Player }
  public turn: Turn = Turn.attacker
  public freeCards: {[key: number]: boolean} = { ...initialSet }

  constructor (attackerId: string, defenderId: string) {
    this.players = {
      '1': {
        id: attackerId,
        nickname: 'Attacker',
        cards: []
      },
      '-1': {
        id: defenderId,
        nickname: 'Defender',
        cards: []
      },
    }
  }

  public pickCard(card: number): boolean {
    if (!this.freeCards[card])
      return false
    else {
      this.freeCards[card] = false
      this.players[this.turn].cards.push(card)
      this.turn = -this.turn
      return true
    }
  }

  public getWinner(): Turn | null {
    if (isWinnerCardArray(this.players[Turn.attacker].cards))
      return Turn.attacker
    else if (isWinnerCardArray(this.players[Turn.defender].cards))
      return Turn.defender
    return null
  }
}