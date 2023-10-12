const arr = new Array(5).fill().map(() => new Array(5).fill(' '));

const str = '1234567890123456789012345'
let direction = 0;  // 0: right, 1: down, 2: left, 3: up
let row = 0;
let col = 0;

for (i = 0; i < str.length; i++) {
    arr[row][col] = str[i];
    if (direction === 0) {
        if (col < 4 && arr[row][col + 1] === ' ') {
            col++;
        }
        else {
            direction = (direction + 1) % 4;
            row++;
        }
    } else if (direction === 1) {
        if (row < 4 && arr[row + 1][col] === ' ') {
            row++;
        }
        else {
            direction = (direction + 1) % 4;
            col--;
        }
    } else if (direction === 2) {
        if (col > 0 && arr[row][col - 1] === ' ') {
            col--;
        }
        else {
            direction = (direction + 1) % 4;
            row--;
        }
    } else {
        if (row > 0 && arr[row - 1][col] === ' ') {
            row--;
        }
        else {
            direction = (direction + 1) % 4;
            col++;
        }
    }


}


arr.map(v => {
    console.log(v.join(' '));
})