import sendRequest from './send-request'

const BASE_URL = '/api/big-steps'

export async function createBigStep(bigStep) {
    return sendRequest(`${BASE_URL}/create`, 'POST', {bigStep})
}

export async function getBigSteps() {
    return sendRequest(`${BASE_URL}/index`)
}