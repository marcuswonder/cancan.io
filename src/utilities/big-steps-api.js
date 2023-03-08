import sendRequest from './send-request'

const BASE_URL = '/api/big-steps'

export async function createBigStep(bigStep) {
    return sendRequest(`${BASE_URL}/create`, 'POST', {bigStep})
}

export async function deleteBigStep(bigStep) {
    console.log("deleteBigStep in API hit")
    const bigStepId = bigStep
    console.log("bigStep._id", bigStep._id)
    console.log("bigStepId", bigStepId)
    return sendRequest(`${BASE_URL}/${bigStepId}`, 'DELETE')
}