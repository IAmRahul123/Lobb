
//function to give todays date in format "MONDAY 12 FEBRUARY"
export const formatDate = () => {
    const days = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];
    const months = [
        "JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE",
        "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"
    ];

    const today = new Date();
    const dayName = days[today.getDay()];
    const day = today.getDate();
    const monthName = months[today.getMonth()];

    return `${dayName} ${day} ${monthName}`;
};

export const getInitials = (str: string) => {
    if (!str) return ""; // Handle empty strings
    const words = str.trim().split(/\s+/); // Split by spaces while handling extra spaces
    if (words.length === 1) return words[0][0].toUpperCase(); // If only one word, return first letter
    return (words[0][0] + words[words.length - 1][0]).toUpperCase(); // Get first and last initials
};