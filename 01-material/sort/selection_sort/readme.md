## 选择排序算法

原地排序的不稳定算法，在平均/最好/最坏状况下，时间复杂度都是 O(n^2)

### 排序基本步骤：

- 遍历数组中未排序的部分，找出最小值
- 将最小值放到未排序部分的最左侧
- 依次递进

```js
function selection_sort(arr) {
  for (let i = 0; i < arr.length; i++) {
    let minIndex = i;
    for (let j = i + 1; j < arr.length; j++) {
      const item = arr[j];
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    if (minIndex !== i) {
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
    }
  }
  return arr;
}
```
