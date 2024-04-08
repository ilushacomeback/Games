const setWinner = (round, player) => {
    if (round[0][0] === player && round[0][1] === player && round[0][2] === player) return true
    if (round[1][0] === player && round[1][1] === player && round[1][2] === player) return true
    if (round[2][0] === player && round[2][1] === player && round[2][2] === player) return true
    if (round[0][0] === player && round[1][1] === player && round[2][2] === player) return true
    if (round[0][2] === player && round[1][1] === player && round[2][0] === player) return true
    if (round[0][1] === player && round[1][1] === player && round[2][1] === player) return true
    if (round[0][2] === player && round[1][1] === player && round[2][0] === player) return true
    if (round[0][2] === player && round[1][2] === player && round[2][2] === player) return true
    if (round[0][0] === player && round[1][0] === player && round[2][0] === player) return true
    const isDraw = round.filter((line) => line.includes(''))
    if (isDraw.length !== 0) return false
    return 'ничья'
}
export default setWinner