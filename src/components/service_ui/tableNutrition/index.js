import React from "react";
import { Table } from "reactstrap";

export default function TableNutritionService({ rows, columns }) {
  return (
    <Table striped>
      <thead>
        <tr style={{ background: "#EF60A3", color: "white" }}>
          {columns.map((item) => (
            <th className="text-center" key={item.id}>
              {item.title}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((item, i) => (
          <tr
            key={item.id}
            className="text-center"
            style={{ background: i === 0 ? "#E8E8E8" : "" }}
          >
            <td>{item.title}</td>
            <td>{item.amount}</td>
            <td>{item.unit}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
