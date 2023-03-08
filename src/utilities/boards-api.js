import sendRequest from './send-request'

const BASE_URL = '/api/boards'

export async function getAuthorBoards() {
    return sendRequest(`${BASE_URL}/author`)
}

export async function getUserBoards() {
    return sendRequest(`${BASE_URL}/user`)
}

export async function getUserBoard(boardNameActual) {
    const boardName = boardNameActual
    return sendRequest(`${BASE_URL}/${boardName}`)
}

export async function createBoard(board) {
    return sendRequest(`${BASE_URL}/new`, 'POST', {board})
}

export async function deleteUserBoard(boardNameActual) {
    const boardName = boardNameActual
    return sendRequest(`${BASE_URL}/${boardName}`, 'DELETE')
}

export async function updateBoard(boardUpdate) {
    return sendRequest(`${BASE_URL}/update`, 'PUT', {boardUpdate})
}

export async function getBoardBigSteps(boardNameActual) {
    const boardName = boardNameActual
    return sendRequest(`${BASE_URL}/${boardName}/big-steps`)
}