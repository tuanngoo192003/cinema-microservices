const separateSeatCode = (seatCode: string) => {
    const match = seatCode.match(/^([A-Z]+)(\d+)$/);
    if (!match) return { row: "", col: 0 };

    return {
        row: match[1], // Extracts the letter(s)
        col: parseInt(match[2], 10), // Extracts and converts the number
    };
};

export default separateSeatCode