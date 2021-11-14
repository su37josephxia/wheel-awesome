// 归并排序
function mergeSort(nums) {
  if (nums.length <= 1) return nums;
  const pivot = nums.length >> 1;
  return merge(mergeSort(nums.slice(0, pivot)), mergeSort(nums.slice(pivot)));
}

function merge(left, right) {
  const maxLeftLength = left.length;
  const maxRightLength = right.length;
  let i = 0;
  let j = 0;
  const newArr = [];
  while (i < maxLeftLength && j < maxRightLength) {
    if (left[i] <= right[j]) {
      newArr.push(left[i]);
      i++;
    } else {
      newArr.push(right[j]);
      j++;
    }
  }

  while (j < maxRightLength) {
    newArr.push(right[j]);
    j++;
  }

  while (i < maxLeftLength) {
    newArr.push(left[i]);
    i++;
  }

  return newArr;
}

module.exports = mergeSort;
