function spiralText(text) {
    const rows = 5; // 矩阵的行数
    const cols = 5; // 矩阵的列数
    const matrix = new Array(rows);
    for (let i = 0; i < rows; i++) {
        matrix[i] = new Array(cols).fill(' ');
    }
    let direction = 0; // 初始方向（0表示向右，1表示向下，2表示向左，3表示向上）
    let count = 0; // 用于记录已填写的字符数
    let row = 0;
    let col = 0;

    for (let i = 0; i < text.length; i++) {
        matrix[row][col] = text.charAt(i);
        count++;

        if (direction === 0) { // 向右移动
            if (col < cols - 1 && matrix[row][col + 1] === ' ') {
                col++;
            } else {
                direction = (direction + 1) % 4;
                row++;
            }
        } else if (direction === 1) { // 向下移动
            if (row < rows - 1 && matrix[row + 1][col] === ' ') {
                row++;
            } else {
                direction = (direction + 1) % 4;
                col--;
            }
        } else if (direction === 2) { // 向左移动
            if (col > 0 && matrix[row][col - 1] === ' ') {
                col--;
            } else {
                direction = (direction + 1) % 4;
                row--;
            }
        } else { // 向上移动
            if (row > 0 && matrix[row - 1][col] === ' ') {
                row--;
            } else {
                direction = (direction + 1) % 4;
                col++;
            }
        }
    }

    // 打印回型文字
    for (let i = 0; i < rows; i++) {
        console.log(matrix[i].join(' '));
    }
}

// 测试示例
const text = "12345678901234567890";
spiralText(text);
