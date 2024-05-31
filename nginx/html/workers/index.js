// worker.js
// http://localhost:5173/workers/index.js
onmessage = function (event) {
    const data = event.data;
    const result = performHeavyTask(data);
    postMessage(result);
  };
  
  function performHeavyTask(data) {
    // 模拟一个耗时的任务
    let sum = 1000;
    for (let i = 0; i < 100; i++) {
      console.log(i)
    }
    return sum;
  }
  