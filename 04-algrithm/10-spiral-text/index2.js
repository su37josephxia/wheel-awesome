const len = 5
const arr = new Array(5).fill().map(() => new Array(5).fill(' '));


const str = '123456789012345'
let direction = 0;  // 0: right, 1: down, 2: left, 3: up
let row = 0;
let col = 0;
for (let i = 0; i < str.length; i++) {
    arr[row][col] = str.charAt(i);
    if (direction === 0) {
        if (col < len - 1 && arr[row][col + 1] === ' ') {
            col++;
        } else {
            direction = (direction + 1) % 4;
            row++;
        }
    } else if (direction === 1) {
        if (row < len - 1 && arr[row + 1][col] === ' ') {
            row++;
        } else {
            direction = (direction + 1) % 4;
            col--;
        }

    } else if (direction === 2) {
        if (col > 0 && arr[row][col - 1] === ' ') {
            col--;
        } else {
            direction = (direction + 1) % 4;
            row--;
        }
    } else {
        if (row > 0 && arr[row - 1][col] === ' ') {
            row--;
        } else {
            direction = (direction + 1) % 4;
            col++;
        }
    }
}

arr.forEach(item => {
    console.log(item);
})


// console.log(JSON.stringify(arr, null, 2));