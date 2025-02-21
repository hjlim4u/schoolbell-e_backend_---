function countIslands(grid: number[][]): number {
    if (!grid || grid.length === 0) return 0;
    
    const rows = grid.length;
    const cols = grid[0].length;
    let islandCount = 0;
    
    const directions = [
        [-1, -1], [-1, 0], [-1, 1],
        [0, -1], [0, 1],
        [1, -1],  [1, 0],  [1, 1]
    ];
    
    function dfs(row: number, col: number): void {
        
        if (row < 0 || row >= rows || col < 0 || col >= cols || grid[row][col] === 0) {
            return;
        }
        
        grid[row][col] = 0;
        
        for (const [dx, dy] of directions) {
            dfs(row + dx, col + dy);
        }
    }   
    
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (grid[i][j] === 1) {
                
                dfs(i, j);
                islandCount++;
            }
        }
    }
    
    return islandCount;
}

const grid = [
    [1, 0, 1, 0, 0],
    [1, 0, 0, 0, 0],
    [1, 0, 1, 0, 1],
    [1, 0, 0, 1, 0]
];

console.log(`result: ${countIslands(grid)}`);