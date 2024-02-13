import * as React from "react";

const data = [
  { id: 1, title: "ร้านอาหารทั่วไป, อาหารตามสั่ง, ข้าวแกง" },
  { id: 2, title: "ร้านสะดวกซื้อ, อาหารกล่อง, อาหารสำเร็จรูป" },
  { id: 3, title: "ประกอบอาหารทานเอง" },
];

export default function FoodSource({ handleNext }) {
  return (
    <div>
      <h3>2. อาหารประจำวันของคุณมาจากแหล่งใด เป็นส่วนใหญ่</h3>
      {data.map((item, i) => (
        <div
          key={i}
          style={{
            border: "1px solid #EF60A3",
            borderRadius: ".5rem",
            padding: "20px",
            background: "#FCDEEC",
            marginBottom: "20px",
          }}
        >
          <h5>{item.title}</h5>
        </div>
      ))}
      <button className="btn_pink w-100" onClick={handleNext}>
        ถัดไป
      </button>
    </div>
  );
}
