function minus(a1, a2) {
  let carry = 0;
  let i = a1.length - 1;
  let j = a2.length - 1;
  let arr = [];
  while (a1[i]) {
    let x = Number(a1[i]);
    let y = 0;
    if (a2[j]) {
      y = Number(a2[j]);
    }
    let temp;
    if (x - y + carry < 0) {
      temp = x + 10;
    } else {
      temp = x;
    }
    let res = temp - y + carry;
    if (x - y + carry < 0) {
      carry = -1;
    } else {
      carry = 0;
    }
    arr.unshift(res);
    i--;
    j--;
  }
  while (arr[0] === 0 && arr.length > 1) {
    arr.shift();
  }
  return arr.join("");
}

/**
 *
 * @param {string} a1
 * @param {string} a2
 * @returns {number}
 */
// 正负数，比较大数大小
function compare(a1, a2) {
  if (a1.startsWith("-") && !a2.startsWith("-")) {
    return -1;
  } else if (!a1.startsWith("-") && a2.startsWith("-")) {
    return 1;
  } else if (a1.startsWith("-") && a2.startsWith("-")) {
    return compareNegative(a1, a2);
  } else if (!a1.startsWith("-") && !a2.startsWith("-")) {
    return comparePositive(a1, a2);
  }
  return 0;
}

function compareNegative(a1, a2) {
  // 谁位数多谁小
  if (a1.length > a2.length) {
    return -1;
  } else if (a1.length < a2.length) {
    return 1;
  } else {
    let i = 0;
    while (a1[i] && a2[i]) {
      /// 123 789
      if (a1[i] > a2[i]) {
        return -1;
      } else if (a1[i] < a2[i]) {
        return 1;
      } else {
        i++;
      }
    }
  }
  return 0;
}

function comparePositive(a1, a2) {
  if (a1.length > a2.length) {
    return 1;
  } else if (a1.length < a2.length) {
    return -1;
  } else {
    let i = 0;
    while (a1[i] && a2[i]) {
      if (a1[i] > a2[i]) {
        return 1;
      } else if (a1[i] < a2[i]) {
        return -1;
      } else {
        i++;
      }
    }
  }
  return 0;
}

/**
 * 大数加法
 * @param {number} a1 加数 1
 * @param {number} a2 加数 2
 * @returns {number} 加法结果
 */
function bigAdd(a1, a2) {
  let carry = 0;
  let i = a1.length - 1;
  let j = a2.length - 1;
  let arr = [];
  while (a1[i] || a2[j]) {
    let x = 0;
    if (a1[i]) {
      x = Number(a1[i]);
    }
    let y = 0;
    if (a2[j]) {
      y = Number(a2[j]);
    }
    let res = (x + y + carry) % 10;
    arr.unshift(res);
    carry = Math.floor((x + y + carry) / 10);
    i--;
    j--;
  }
  if (carry) {
    arr.unshift(carry);
  }
  return arr.join("");
}

/**
 * 大数减法，包含正负数
 * @param {number} a1 被减数
 * @param {number} a2 减数
 * @returns {number} 减法结果
 */
function bigMin(a1, a2) {
  // 负数减负数（去掉符号，大减小）（如果 a2 > a1，正号；如果 a1 > a2，负号）
  // 正数减负数（去掉符号，加起来）（正号）
  // 正数减正数（去掉符号，大减小）（如果 a2 > a1，负号；如果 a1 > a2，正号）
  // 负数减正数（去掉符号，加起来）（负号）
  let s = "";

  if (
    // 小减大，负数
    (a1[0] === "-" && a2[0] === "-") ||
    // 小减大，负数
    (!a1[0] === "-" && !a2[0] === "-")
  ) {
    if (compare(a1, a2) < 0) {
      // -123 - -12
      s = "-";
    }
  } else if (a1[0] === "-" && a2[0] !== "-") {
    // -123 - 789
    s = "-";
  }

  let res = "";
  if (
    // 正 - 负
    (a1[0] !== "-" && a2[0] === "-") ||
    // 负 - 正
    (a1[0] === "-" && a2[0] !== "-")
  ) {
    if (a1[0].startsWith("-")) {
      a1 = a1.slice(1);
    }
    if (a2[0].startsWith("-")) {
      a2 = a2.slice(1);
    }
    res = bigAdd(a1, a2);
  } else if (
    // 正 - 正
    (a1[0] !== "-" && a2[0] !== "-") ||
    // 负 - 负
    (a1[0] === "-" && a2[0] === "-")
  ) {
    if (a1[0].startsWith("-")) {
      a1 = a1.slice(1);
    }
    if (a2[0].startsWith("-")) {
      a2 = a2.slice(1);
    }
    if (compare(a1, a2) > 0) {
      res = minus(a1, a2);
    } else {
      a1 = a2;
      a2 = a1;
      res = minus(a1, a2);
    }
  }

  return `${s}${res}`;
}

module.exports = {
  bigAdd,
  bigMin,
};
