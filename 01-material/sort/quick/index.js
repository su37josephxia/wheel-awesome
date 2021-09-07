function swap(arr, i, j) {
  if (i === j || arr[i] === arr[j]) {
    return;
  }
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

function partition(A, p, r) {
  const pivot = A[r];
  let i = p;
  for (let j = p; j < r; j++) {
    if (A[j] <= pivot) {
      swap(A, i, j);
      i++;
    }
  }
  swap(A, i, r);
  return i;
}

// 快速排序递归函数，p,r为下标
function quick_sort_c(A, p, r) {
  if (p >= r) {
    return;
  }
  // 获取分区点
  q = partition(A, p, r);
  quick_sort_c(A, p, q - 1);
  quick_sort_c(A, q + 1, r);
}

module.exports = function quick(arr) {
  if (!Array.isArray(arr)) {
    throw new Error("参数错误");
  }
  quick_sort_c(arr, 0, arr.length - 1);
  return arr;
};
