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

export async function createBigStep(bigStep) {
    const boardName = bigStep.board
    return sendRequest(`${BASE_URL}/${boardName}/big-steps/add`, 'POST', {bigStep})
}

export async function getBoardBigSteps(boardNameActual) {
    const boardName = boardNameActual
    return sendRequest(`${BASE_URL}/${boardName}/big-steps`)
}

export async function getBigStep(boardNameActual, bigStepNameActual) {
    const bigStepName = bigStepNameActual
    const boardName = boardNameActual
    return sendRequest(`${BASE_URL}/${boardName}/${bigStepName}`)
}

export async function deleteBigStep(boardName, bigStepName) {
    console.log("bigStepName", bigStepName)
    console.log("boardName", boardName)
    return sendRequest(`${BASE_URL}/${boardName}/${bigStepName}/delete`, 'DELETE')
}

export async function updateBigStep(bigStepUpdate) {
    console.log(bigStepUpdate)
    const boardId = bigStepUpdate.board
    const bigStepId = bigStepUpdate._id
    return sendRequest(`${BASE_URL}/${boardId}/${bigStepId}/update`, 'PUT', {bigStepUpdate})
}