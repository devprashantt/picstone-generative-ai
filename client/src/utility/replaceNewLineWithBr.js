function replaceNewlinesWithBr(text) {
    // Use a regular expression with the global flag to replace all occurrences
    // of '\n' with '<br>' tags.
    return text.replace(/\n/g, "<br>");
}

export default replaceNewlinesWithBr;