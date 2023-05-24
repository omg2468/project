import React from "react";

export default function Itemdesktop({
  title,
  image,
  price,
  value,
  onChange,
  id,
  onClick,
  discount,
  onAdd,
  onSub,
}) {
  const formattedNumber = (number) => {
    let value = new Intl.NumberFormat("vi-VN", {
      style: "decimal",
      minimumFractionDigits: 3,
    }).format(number / 1000);
    return value;
  };

  const handleInputChange = (event) => {
    const check = event.nativeEvent.data;
    if (check === "/") return;
    if (event.target.value < 1) {
      if (/^[1-9]\d*$/.test(check)) {
        onChange(id, event.target.value);
      } else return;
    } else onChange(id, event.target.value);
  };

  const handleAdd = () => {
    onAdd(id, value);
  };

  const handleSub = () => {
    if (value <= 1) return;
    onSub(id, value);
  };

  return (
    <tr>
      <th scope="row">
        <div className="item">
          <div className="title_item">{title}</div>
          <div className="img_item">
            <img src={image} alt={title} />
          </div>
        </div>
      </th>
      <td>{formattedNumber((price * (100 - discount)) / 100)} VNĐ</td>
      <td className="number_items">
        <div className="box-number d-flex align-items-center">
          <span className="subtract" onClick={handleSub}>
            <i className="bi bi-dash-circle"></i>
          </span>
          <input type="tel" value={value} onChange={handleInputChange} />
          <span className="add" onClick={handleAdd}>
            <i className="bi bi-plus-circle"></i>
          </span>
        </div>
      </td>
      <td>{formattedNumber(((price * (100 - discount)) / 100) * value)}VNĐ</td>
      <td className="close_item" onClick={() => onClick(id)}>
        <i className="bi bi-x text-bg-danger1"></i>
      </td>
    </tr>
  );
}
