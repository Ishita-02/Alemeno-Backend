// binarySearch.js

const  binarySearchAll=(sortedArray, target)=> {
    
  let left = 0;
  let right = sortedArray.length - 1;
  const results = [];

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (sortedArray[mid].customer_id === target) {
      results.push(sortedArray[mid]);
      let i = mid - 1;
      while (i >= 0 && sortedArray[i].customer_id === target) {
        results.push(sortedArray[i]);
        i--;
      }
      i = mid + 1;
      while (i < sortedArray.length && sortedArray[i].customer_id === target) {
        results.push(sortedArray[i]);
        i++;
      }
      return results;
    } else if (sortedArray[mid].customer_id < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return results;
}

export { binarySearchAll };
