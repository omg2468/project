import React, { useContext } from "react";
import parse from "html-react-parser";
import { Button } from "react-bootstrap";
import { ProviderShow } from "../../component/Layout";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Item({ name, price, image, star, discount, id }) {
  const formattedNumber = (number) => {
    let value = new Intl.NumberFormat("vi-VN", {
      style: "decimal",
      minimumFractionDigits: 3,
    }).format(number / 1000);
    return value;
  };

  const handleData = () => {
    alldata.notify();
    alldata.handleData(id);
  };

  const alldata = useContext(ProviderShow);

  const countStar = (star) => {
    let resultStart = "";
    let full;
    let half;
    let nostar;
    if (star % 1 == 0) {
      full = star;
      nostar = 5 - star;
      half = 0;
    } else {
      full = star - 0.5;
      nostar = 5 - star - 0.5;
      half = 1;
    }
    for (let i = 0; i < full; i++) {
      resultStart += `<i className="bi bi-star-fill"></i>`;
    }
    resultStart += half ? `<i className="bi bi-star-half"></i>` : "";
    for (let i = 0; i < nostar; i++) {
      resultStart += `<i className="bi bi-star"></i>`;
    }
    return parse(resultStart);
  };

  return (
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      layout
      className="box_items position-relative"
    >
      <div
        className="discount position-absolute"
        style={{ display: discount ? "" : "none" }}
      >
        {discount}%
      </div>
      <div className="img_item">
        <Link to={`/detail/${id}`}>
          <img src={image} alt={name} />
        </Link>
      </div>
      <div className="name_item">{name}</div>
      <div className="price_item d-flex justify-content-center">
        <del style={{ display: discount ? "block" : "none" }}>
          <i>{formattedNumber(price)} VNĐ</i>
        </del>
        <div className="real-price">
          {formattedNumber((price * (100 - discount)) / 100)}
          VNĐ
        </div>
      </div>
      <div className="star_item">{countStar(star)}</div>
      <div className="button_oder">
        <Button className="btn btn-danger" onClick={handleData}>
          Thêm vào giỏ hàng
        </Button>
      </div>
    </motion.div>
  );
}
