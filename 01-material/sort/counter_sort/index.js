function counterSort(arr) {
  let min = arr[0]
  let max = arr[0]
  for (let i = 1; i < arr.length; i++) {
    if (min > arr[i]) {
      min = arr[i]
    }
    if (max < arr[i]) {
      max = arr[i]
    }
  }

  const counter = Array.from({ length: max - min + 1 }).fill(0)

  for (let i = 0; i < arr.length; i++) {
    const counterIndex = arr[i] - min
    counter[counterIndex]++
  }

  let arrIndex = 0

  for (let j = 0; j < counter.length; j++) {
    while (counter[j] > 0) {
      arr[arrIndex++] = j + min
      counter[j]--
    }
  }

  return arr
}

module.exports = counterSort
