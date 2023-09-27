import React, { useEffect, useState } from 'react';
import '../styles.css';

const ExcelSheet = () => {
  const [loading, setLoading] = useState(false);
  const [coluum, setColumn] = useState([]);
  const [mark, setMark] = useState([]);

  const url = 'https://docs.google.com/spreadsheets/d/1ehq3HdmLc3pYj4HF0W5rQh8UafY1_AbMxHmt_HxVXcE/gviz/tq?';

  useEffect(() => {
         let rows, cols;
    setLoading(true);
    fetch(url)
      .then((response) => response.text())
      .then((data) => {
        const hold = data.substring(47).slice(0, -2);
        const jsonFormat = JSON.parse(hold);
        cols = jsonFormat.table.cols;
        setColumn(cols);
        rows = jsonFormat.table.rows;
        setMark(rows);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className='my-container'>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className='table my-table'>
          <thead>
            <tr className='my-row'>
              {coluum &&
                coluum.map((c, index) => (
                  <th scope='col' key={index}>{c.label}</th>
                ))}
            </tr>
            </thead>
            <tbody>
            {mark &&
              mark.map((m, index) => (
                <tr className='my-row' key={index}>
                  {m.c.map((i, subIndex) => (
                    <td key={subIndex}>{i.v}</td>
                  ))}
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ExcelSheet;
