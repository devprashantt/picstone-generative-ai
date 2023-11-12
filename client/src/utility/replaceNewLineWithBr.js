function replaceNewlinesWithBr(text) {
  // Use a regular expression to replace '\n\n' after the first two occurrences.
  return text?.replace(
    /^(.*?\n.*?\n)([\s\S]*)$/g,
    function (match, firstTwoNewlines, rest) {
      return firstTwoNewlines + rest.replace(/\n\n/g, "<br/><br>");
    }
  );
}

export default replaceNewlinesWithBr;
