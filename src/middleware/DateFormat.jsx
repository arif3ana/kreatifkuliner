
export const DateFormat = (date) => {
    const dateObject = new Date(date);
    const options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    };
    const formattedDate = dateObject.toLocaleString('en-US', options);
    return formattedDate;
}