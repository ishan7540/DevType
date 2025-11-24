/**
 * utils/typingWords.js
 * Helper to generate random words for the typing test.
 */

const WORDS = [
    "the", "be", "to", "of", "and", "a", "in", "that", "have", "it",
    "for", "not", "on", "with", "he", "as", "you", "do", "at", "this",
    "but", "his", "by", "from", "they", "we", "say", "her", "she", "or",
    "an", "will", "my", "one", "all", "would", "there", "their", "what",
    "so", "up", "out", "if", "about", "who", "get", "which", "go", "me",
    "when", "make", "can", "like", "time", "no", "just", "him", "know",
    "take", "people", "into", "year", "your", "good", "some", "could",
    "them", "see", "other", "than", "then", "now", "look", "only", "come",
    "its", "over", "think", "also", "back", "after", "use", "two", "how",
    "our", "work", "first", "well", "way", "even", "new", "want", "because",
    "any", "these", "give", "day", "most", "us", "is", "are", "was", "were",
    "been", "has", "had", "did", "does", "going", "went", "gone", "am",
    "very", "much", "many", "lot", "little", "few", "big", "small", "large",
    "long", "short", "high", "low", "same", "different", "old", "young",
    "right", "left", "up", "down", "here", "there", "where", "why", "how",
    "program", "code", "system", "data", "user", "computer", "internet",
    "web", "app", "site", "page", "text", "image", "video", "audio", "file",
    "folder", "drive", "disk", "memory", "screen", "keyboard", "mouse",
    "click", "type", "press", "enter", "space", "shift", "control", "alt",
    "delete", "backspace", "escape", "tab", "caps", "lock", "number",
    "letter", "symbol", "character", "string", "boolean", "integer", "float",
    "array", "object", "function", "class", "method", "variable", "constant",
    "loop", "condition", "statement", "expression", "operator", "value",
    "return", "import", "export", "default", "const", "let", "var", "if",
    "else", "switch", "case", "break", "continue", "try", "catch", "throw",
    "finally", "promise", "async", "await", "json", "xml", "html", "css",
    "javascript", "python", "java", "cpp", "csharp", "ruby", "php", "sql"
];

// Generates a random string of words
export const generateWords = (count = 30) => {
    // 1. Sort the array randomly (shuffle)
    // 2. Take the first 'count' elements
    // 3. Join them with spaces
    return WORDS.sort(() => 0.5 - Math.random()).slice(0, count).join(' ');
};
