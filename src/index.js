module.exports = function check(str, bracketsConfig) {
  const stack = [];
  const openBr = {};
  const closeBr = {};
  const sameBr = {};

  bracketsConfig.forEach(([open, close]) => {
    openBr[open] = close;
    closeBr[close] = open;
    if (open === close) {
      sameBr[open] = true;
    }
  });

  for (let i = 0; i < str.length; i++) {
    const current = str[i];
    if (sameBr[current]) {
      if (stack.length > 0 && stack[stack.length - 1] === current) {
        stack.pop();
      } else {
        stack.push(current);
      }
    } else if (current in openBr) {
      stack.push(current);
    } else if (current in closeBr) {
      if (stack.length === 0 || stack[stack.length - 1] !== closeBr[current]) {
        return false;
      }
      stack.pop();
    }
  }
  return stack.length === 0;
};
