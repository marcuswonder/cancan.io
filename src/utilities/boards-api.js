import sendRequest from './send-request';

const BASE_URL = '/api/boards';

export async function getUserBoards() {
    return sendRequest(`${BASE_URL}`);
}

export async function createBoard(board) {
    return sendRequest(`${BASE_URL}`, 'POST', {board});
}
