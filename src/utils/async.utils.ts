export function wait(timeout: number) {
    return new Promise(resolve => {
        setTimeout(resolve, timeout)
    })
}

export async function timer100() {
    await wait(100)
}

export async function timer200() {
    await wait(200)
}

export async function timer400() {
    await wait(400)
}
export async function timer300() {
    await wait(300)
}
export async function timer500() {
    await wait(500)
}

export async function timer600() {
    await wait(600)
}

export async function waitError(timeout: number) {
    await wait(timeout)
    throw 'Error by timer'
}


