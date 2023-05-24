import React from "react";

export default function Itemmobile({
  price,
  image,
  value,
  title,
  onChange,
  onClick,
  id,
  discount,
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
    if (event.target.value < 1) {
      if (/^[1-9]\d*$/.test(check)) {
        onChange(id, event.target.value);
      } else return;
    } else onChange(id, event.target.value);
  };

  return (
    <div className="box-items-2">
      <div className="box-img">
        <img src={image} alt={title} />
      </div>
      <div className="description-item-2">
        <div className="name-item-2">
          <h5>{title}</h5>
        </div>
        <div className="price-item-2 d-flex">
          <p>{formattedNumber((price * (100 - discount)) / 100)} VNĐ x</p>
          <input
            type="tel"
            className={1}
            value={value}
            onChange={handleInputChange}
          />
        </div>
        <div className="total-price-item">
          <b>
            Tổng: {formattedNumber(((price * (100 - discount)) / 100) * value)}
            VNĐ
          </b>
        </div>
      </div>
      <div className="close_item cart-2" onClick={() => onClick(id)}>
        <i className="bi bi-x" />
      </div>
    </div>
  );
}
