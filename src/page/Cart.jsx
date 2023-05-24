import React, { useContext, useEffect, useState } from "react";
import "./cart.css";
import { Link } from "react-router-dom";
import Itemdesktop from "./Cartcompoennt/Itemdesktop";
import Itemmobile from "./Cartcompoennt/Itemmobile";
import Totalprice from "./Cartcompoennt/Totalprice";
import { ProviderShow } from "../component/Layout";

export default function Cart() {
  const [data, setData] = useState([]);
  const [isload, setIsload] = useState([false]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);
  useEffect(() => {
    setData(dataparent.data);
  }, []);

  useEffect(() => {
    const newa = data.filter((data) => data.value);
    if (newa.length) setIsload(true);
    else setIsload(false);
    dataparent.handleTwoway(data);
  }, [data]);

  const dataparent = useContext(ProviderShow);

  const formattedNumber = (number) => {
    let value = new Intl.NumberFormat("vi-VN", {
      style: "decimal",
      minimumFractionDigits: 3,
    }).format(number / 1000);
    return value;
  };

  const handleChange = (id, value) => {
    const cleanedInput = value.replace(/[^0-9/]/g, "");
    setData((prev) =>
      prev.map((data) =>
        data.id == id ? { ...data, value: cleanedInput } : data
      )
    );
  };

  const handleAdd = (id, value) => {
    console.log(id, value);
    setData((prev) =>
      prev.map((data) => (data.id == id ? { ...data, value: value++ } : data))
    );
  };

  const handleSub = (id, value) => {
    console.log(id, value);
    setData((prev) =>
      prev.map((data) => (data.id == id ? { ...data, value: value-- } : data))
    );
  };

  const handleClose = (id) => {
    const newdata = data.map((data) =>
      data.id == id ? { ...data, value: 0 } : data
    );
    setData(newdata);
  };

  const totalMoney = data
    .map((data) =>
      data.value
        ? ((data.price * (100 - data.discount)) / 100) * data.value
        : ""
    )
    .reduce((a, b) => Number(a) + Number(b), 0);
  return (
    <div className="container-cart">
      <h2>GIỎ HÀNG</h2>
      {!isload ? (
        <div className="text-center">
          <h5>Không có sản phẩm nào trong giỏ</h5>
        </div>
      ) : (
        <div className="container">
          <div className="row">
            {/* cart desktop */}
            <div className="col-lg-8 d-sm-block d-none">
              <table className="table text-center">
                <thead className="table-primary">
                  <tr>
                    <th scope="col">Sản phẩm</th>
                    <th scope="col">Giá</th>
                    <th scope="col">Số lượng</th>
                    <th scope="col">Tổng tiền</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {data.map((data) =>
                    data.value ? (
                      <Itemdesktop
                        price={data.price}
                        image={data.image}
                        value={data.value}
                        title={data.name}
                        onChange={handleChange}
                        onClick={handleClose}
                        onAdd={handleAdd}
                        onSub={handleSub}
                        id={data.id}
                        key={data.id}
                        discount={data.discount}
                      />
                    ) : (
                      ""
                    )
                  )}
                </tbody>
              </table>
            </div>
            {/* cart mobile */}
            <div className="col-12 d-block d-sm-none">
              <div className="container-item-2 mb-2">
                {/**Đây là chỗ để item mobile */}
                {data.map((data) =>
                  data.value ? (
                    <Itemmobile
                      price={data.price}
                      image={data.image}
                      value={data.value}
                      title={data.name}
                      onChange={handleChange}
                      onClick={handleClose}
                      id={data.id}
                      key={data.id}
                      discount={data.discount}
                    />
                  ) : (
                    ""
                  )
                )}
              </div>
            </div>
            <div className="col-lg-4 col-12">
              {/* total price */}
              <div className="total_price">
                <h3>Tổng tiền</h3>
                <div className="box-total-price">
                  <div className="box-item-money">
                    {data.map((data) =>
                      data.value ? (
                        <Totalprice
                          name={data.name}
                          price={data.price}
                          value={data.value}
                          key={data.name}
                          discount={data.discount}
                        />
                      ) : (
                        ""
                      )
                    )}
                  </div>
                  <div className="total_money">
                    <p>Tổng</p>
                    <div className="total-check">
                      {formattedNumber(totalMoney)} VNĐ
                    </div>
                  </div>
                </div>
                <div className="button-oder text-center mb-2">
                  <Link to="/cart/checkout">
                    <button>Tiến hành thanh toán</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
