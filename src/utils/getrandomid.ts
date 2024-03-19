export const generateRandomId = () => {
    const characters = 'a1bc2de3fg4hi5jk6lm7no8pq9rs0tu1vw2xy3z';
    const idLength = 8;
    let randomId = '';

    for (let i = 0; i < idLength; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomId += characters[randomIndex];
    }

    return randomId;
}