function findMaxProduct(numbers: number[]): { num1: number; num2: number; product: number } {
    let maxProduct = 0;
    let resultNum1 = 0;
    let resultNum2 = 0;
    const n = numbers.length;
    
    for (let i = 1; i <= Math.floor(n/2); i++) {
        getCombinations(numbers, i, [], 0).forEach(combination => {
            const remainingNumbers = numbers.filter(num => !combination.includes(num));
            
            const num1 = parseInt(combination.sort((a, b) => b - a).join(''));
            
            const num2 = parseInt(remainingNumbers.sort((a, b) => b - a).join(''));
            
            const product = num1 * num2;
            if (product > maxProduct) {
                maxProduct = product;
                resultNum1 = num1;
                resultNum2 = num2;
            }
        });
    }
    
    return {
        num1: resultNum1,
        num2: resultNum2,
        product: maxProduct
    };
}

function getCombinations(
    numbers: number[],
    targetLength: number,
    current: number[],
    start: number
): number[][] {
    if (current.length === targetLength) {
        return [current];
    }
    
    const results: number[][] = [];
    for (let i = start; i < numbers.length; i++) {
        results.push(...getCombinations(
            numbers,
            targetLength,
            [...current, numbers[i]],
            i + 1
        ));
    }
    
    return results;
}

const numbers = [1, 3, 5, 7, 9];
const result = findMaxProduct(numbers);
console.log(`result: ${result.num1}, ${result.num2}`);