## 快排算法

是一个分块交换排序，在平均状况下，排序n个项目需要O(nlogn)次比较。最坏情况O(n^2) 次比较

### 排序基本步骤：

* 选一个基准值
* 排序数组，小于基准值放左边，大于放右边
* 最后递归，重复上述2步即可

```js
// 递归 & partition
function quick_sort(arr, l, r) {
    if(l >= r) return;
    let x = l, y = r, base = arr[l];
    while(x < y) {
        while(x < y && arr[y] >= base) y--;
        if(x < y) arr[x++] = arr[y];
        while(x < y && arr[x] < base) x++;
        if(x < y) arr[y--] = arr[x];
    }
    
    arr[x] = base;
    quick_sort(arr, l, x - 1);
    quick_sort(arr, x + 1, r);
    return;
}
```

