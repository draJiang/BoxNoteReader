const timeoutFetch = (url: string, ms: number) => new Promise<Response>((resolve, reject) => {
    fetch(url)
        .then(response => resolve(response))
        .catch(reject);

    setTimeout(() => reject(new Error(`Request to ${url} timed out`)), ms);
});

export const getStorage = async (args: string) => {
    try {
        const response = await timeoutFetch(`http://192.168.3.218:8085/api/storage?args=${args}`, 3000);
        const data = await response.json();
        localStorage.setItem(`storageData-${args}`, JSON.stringify(data));
        return data;
    } catch (error) {
        console.error('An error occurred: ', error);
        const data = localStorage.getItem(`storageData-${args}`);
        return data ? JSON.parse(data) : null;
    }
};

export const getFile = async (args: string) => {
    try {
        const response = await timeoutFetch(`http://192.168.3.218:8085/api/storage/file?args=${args}`, 3000);
        const data = await response.text();
        localStorage.setItem(`fileData-${args}`, data);
        return data;
    } catch (error) {
        console.error('An error occurred: ', error);
        return localStorage.getItem(`fileData-${args}`) || '';
    }
};
