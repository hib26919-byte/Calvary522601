import React from "react";
export default function ContentTable({ rows = [] }) {
  return <table className="content-table"><tbody>{rows.map((row, i) => <tr key={i}>{Object.values(row).map((cell, j) => <td key={j}>{cell}</td>)}</tr>)}</tbody></table>;
}
