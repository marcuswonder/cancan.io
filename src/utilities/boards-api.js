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
    return sendRequest(`${BASE_URL}/${boardName}/${bigStepName}/delete`, 'DELETE')
}

export async function updateBigStep(bigStepUpdate) {
    const boardId = bigStepUpdate.board
    const bigStepId = bigStepUpdate._id
    return sendRequest(`${BASE_URL}/${boardId}/${bigStepId}/update`, 'PUT', {bigStepUpdate})
}

export async function changeBigStepStatusToPlanned(boardId, bigStepId) {
    return sendRequest(`${BASE_URL}/${boardId}/${bigStepId}/planned`, 'PUT')
}

export async function changeBigStepStatusToInProgress(boardId, bigStepId) {
    return sendRequest(`${BASE_URL}/${boardId}/${bigStepId}/in-progress`, 'PUT')
}

export async function changeBigStepStatusToComplete(boardId, bigStepId) {
    return sendRequest(`${BASE_URL}/${boardId}/${bigStepId}/complete`, 'PUT')
}









export async function createBabyStep(board, bigStep, newBabyStep) {
    // console.log("newBabyStep", newBabyStep)
    const boardId = board._id
    const bigStepId = bigStep._id
    return sendRequest(`${BASE_URL}/${boardId}/${bigStepId}/baby-steps/add`, 'POST', {newBabyStep})
}

export async function getBigStepsBabySteps(boardNameActual, bigStepNameNameActual) {
    const boardName = boardNameActual
    const bigStepName = bigStepNameNameActual
    return sendRequest(`${BASE_URL}/${boardName}/${bigStepName}/baby-steps`)
}

export async function getBabyStep(boardNameActual, babyStepNameActual) {
    const babyStepName = babyStepNameActual
    const boardName = boardNameActual
    return sendRequest(`${BASE_URL}/${boardName}/${babyStepName}`)
}

export async function deleteBabyStep(boardName, babyStepName) {
    return sendRequest(`${BASE_URL}/${boardName}/${babyStepName}/${babyStepName}/delete`, 'DELETE')
}

export async function updateBabyStep(babyStepUpdate) {
    console.log(babyStepUpdate)
    const boardId = babyStepUpdate.board
    const babyStepId = babyStepUpdate._id
    return sendRequest(`${BASE_URL}/${boardId}/${babyStepId}/update`, 'PUT', {babyStepUpdate})
}

export async function changeBabyStepStatusToPlanned(boardId, bigStepId, babyStepId) {
    return sendRequest(`${BASE_URL}/${boardId}/${bigStepId}/${babyStepId}/planned`, 'PUT')
}

export async function changeBabyStepStatusToInProgress(boardId, bigStepId, babyStepId) {
    return sendRequest(`${BASE_URL}/${boardId}/${bigStepId}/${babyStepId}/in-progress`, 'PUT')
}

export async function changeBabyStepStatusToComplete(boardId, bigStepId, babyStepId) {
    return sendRequest(`${BASE_URL}/${boardId}/${bigStepId}/${babyStepId}/complete`, 'PUT')
}