interface IQueueNode {
    userId: string
    queueTime: number
    mmr: number
}

const enqueued: {[userId: string]: IQueueNode} = {}
const pendingMatches: {[userId: string]: string} = {}

export function isEnqueued(id: string): boolean {
    return !!enqueued[id]
}

export function enqueue(userId: string): void {
    enqueued[userId] = {
        userId,
        queueTime: Date.now(),
        mmr: 0
    }
}

export function dequeue(userId: string): void {
    delete enqueued[userId]
}

export function findMatchFor(userId: string): string | null {
    // Já foi encontrado pelo adversário
    if (pendingMatches[userId]) {
        const matchId = pendingMatches[userId]
        delete pendingMatches[userId]
        return matchId
    }

    const me = enqueued[userId]
    const maxGap = Infinity
    let matchId: string | null = null

    Object.keys(enqueued).every((oponentId) => {
        // Mesmo player
        if (oponentId === userId)
            return true

        const oponent = enqueued[oponentId]
        const oponentMaxGap = Infinity
        const gap = Math.abs(oponent.mmr - me.mmr)

        // Encontra um oponente dentro da margem de mmr esperada
        if (gap < maxGap && gap < oponentMaxGap) {
            dequeue(oponentId)
            dequeue(userId)
            pendingMatches[oponentId] = userId
            matchId = oponentId
            return false
        }

        return true
    })

    return matchId
}