import React, { useState } from "react";

const App = () => {
  const [sum, setSum] = useState(0);
  const [fileContent, setFileContent] = useState(null);
  const [count, setCount] = useState(0);
  const [values, setValues] = useState([]);
  const [dict, setDict] = useState({
    min: 0,
    max: 0,
    median: 0,
    average: 0,
    ascend: [],
    descend: [],
  });

  console.log(values)
  console.log(dict)
  console.log(sum);
  console.log(count)

  const handleFileRead = (e) => {
    const content = e.target.result;
    setFileContent(content);
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target.result;
        console.log(content, "content");

        const lines = content.split("\n");

        lines.forEach((line) => {
          const number = Number(line.trim());
          if (!isNaN(number)) {
            // Update min and max
            if (!dict.min) {
              setDict((prev) => ({ ...prev, min: number }));
            }
            if (!dict.max) {
              setDict((prev) => ({ ...prev, max: number }));
            }
            if (number < dict.min) {
              setDict((prev) => ({ ...prev, min: number }));
            }
            if (number > dict.max) {
              setDict((prev) => ({ ...prev, max: number }));
            }
            // Calculate sum and count for average
            setSum((prevSum) => prevSum + number);
            setCount((prevCount) => prevCount + 1);
            // Store the value for median calculation
            setValues((prevValues) => [...prevValues, number]);
          }
          // Calculate the median // Create a copy of the values array
        });
        console.log('derive', values)
        const arr = [...values].sort((a, b) => b - a);

        console.log('basic', arr);

        setDict((prev) => ({
          ...prev,
          median:count % 2 === 0
              ? (arr[count / 2 - 1] + arr[count / 2]) / 2
              : arr[(count - 1) / 2],
        }));

        // Calculate the average
        setDict((prev) => ({
          ...prev,
          average: Number((sum / count).toFixed(2)),
        }));

        setDict((prev) => ({
          ...prev,
          average: Number((sum / count).toFixed(2)),
        }));
        setDict((prev) => ({
          ...prev,
          ascend: [...values].sort((a, b) => a - b),
        }));
        setDict((prev) => ({
          ...prev,
          descend: [...values].sort((a, b) => b - a),
        }));
        // Output the results
        console.log("Result:", dict);
      };

      reader.readAsText(file);

      
    }
  };

  return (
    <div>
      <label>Convert any numbers!</label>
      <input type="file" name="number" onChange={handleFile} />
      {dict.ascend.length !== 0 && (
        <article>
          <ul>
            <li key={dict.max}>
              <p>Max: {dict.max}</p>
            </li>
            <li key={dict.min}>
              <p>Min: {dict.min}</p>
            </li>
            <li key={dict.median}>
              <p>Median: {dict.median}</p>
            </li>
            <li key={dict.average}>
              <p>Average: {dict.average}</p>
            </li>
            <li key={dict.ascend.length}>
              <p>Ascend: {dict.ascend}</p>
            </li>
            <li key={dict.descend.length}>
              <p>Descend: {dict.descend}</p>
            </li>
          </ul>
        </article>
      )}
    </div>
  );
};

export default App;
