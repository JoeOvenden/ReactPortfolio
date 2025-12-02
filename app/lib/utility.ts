export async function Wait(waitTimeMs: number) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(true);
        }, waitTimeMs);
    });
} 