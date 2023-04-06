import Game, { Turn } from '../lib/game'

const currentGames: { [playerId: string]: Game } = {}

export function createGame(attackerId: string, defenderId: string): boolean {
  if (currentGames[attackerId] || currentGames[defenderId])
    return false

  const game = new Game(attackerId, defenderId)
  currentGames[attackerId] = game
  currentGames[defenderId] = game
  return true
}

export function existsGame(playerId: string) {
  return !!currentGames[playerId]
}

function deleteGame(game: Game) {
  delete currentGames[game.players[Turn.attacker].id]
  delete currentGames[game.players[Turn.defender].id]
}

