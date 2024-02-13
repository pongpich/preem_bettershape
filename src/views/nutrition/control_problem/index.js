import * as React from "react";
import "./control_problem.scss";

export default function ControlProblem({ handleNext }) {
  const [cSelected, setCSelected] = React.useState([]);

  const onCheckboxBtnClick = (selected) => {
    const index = cSelected.indexOf(selected);
    if (index < 0) {
      cSelected.push(selected);
    } else {
      cSelected.splice(index, 1);
    }
    setCSelected([...cSelected]);
  };
  const [checkBoxValue, setCheckBoxValue] = React.useState({
    eatOften: false,
    dessert: false,
    bekary: false,
    oilyFood: false,
    sugarDrinks: false,
  });
  const handleChangeCheckBoxValue = (checkboxName) => {
    setCheckBoxValue((prevState) => ({
      ...prevState,
      [checkboxName]: !prevState[checkboxName],
    }));
    console.log("checkboxName");
  };
  console.log("check", checkBoxValue);

  return (
    <div>
      <h3>
        3. คุณประสบปัญหาในการควบคุมอาหารใดบ้าง ต่อไปนี้ (เลือกได้มากกว่า 1 ข้อ)
      </h3>

      <div
        class="form-check d-flex align-items-center"
        style={{
          border: "1px solid #EF60A3",
          borderRadius: ".5rem",
          padding: "20px",
          background: checkBoxValue.eatOften ? "#FCDEEC" : "",
          marginBottom: "20px",
        }}
      >
        <input
          class="form-check-input"
          type="checkbox"
          className="big-checkbox"
          checked={checkBoxValue.eatOften}
          onChange={() => handleChangeCheckBoxValue("eatOften")}
        />
        <label class="form-check-label h5 ml-3" htmlFor="flexCheckDefault">
          ชอบทานจุบจิบ
        </label>
      </div>

      <div
        class="form-check d-flex align-items-center"
        style={{
          border: "1px solid #EF60A3",
          borderRadius: ".5rem",
          padding: "20px",
          background: checkBoxValue.dessert ? "#FCDEEC" : "",
          marginBottom: "20px",
        }}
      >
        <input
          class="form-check-input"
          type="checkbox"
          className="big-checkbox"
          checked={checkBoxValue.dessert}
          onChange={() => handleChangeCheckBoxValue("dessert")}
        />
        <label class="form-check-label h5 ml-3" htmlFor="flexCheckDefault">
          ชอบทานของหวาน, ขนมหวาน, ไอศกรีม
        </label>
      </div>

      <div
        class="form-check d-flex align-items-center"
        style={{
          border: "1px solid #EF60A3",
          borderRadius: ".5rem",
          padding: "20px",
          background: checkBoxValue.bekary ? "#FCDEEC" : "",
          marginBottom: "20px",
        }}
      >
        <input
          class="form-check-input"
          type="checkbox"
          className="big-checkbox"
          checked={checkBoxValue.bekary}
          onChange={() => handleChangeCheckBoxValue("bekary")}
        />
        <label class="form-check-label h5 ml-3" htmlFor="flexCheckDefault">
          ชอบทานเบเกอรี่, เค้ก, ขนมปังต่างๆ
        </label>
      </div>

      <div
        class="form-check d-flex align-items-center"
        style={{
          border: "1px solid #EF60A3",
          borderRadius: ".5rem",
          padding: "20px",
          background: checkBoxValue.oilyFood ? "#FCDEEC" : "",
          marginBottom: "20px",
        }}
      >
        <input
          class="form-check-input"
          type="checkbox"
          className="big-checkbox"
          checked={checkBoxValue.oilyFood}
          onChange={() => handleChangeCheckBoxValue("oilyFood")}
        />
        <label class="form-check-label h5 ml-3" htmlFor="flexCheckDefault">
          ชอบทานอาหารมัน, ของทอด, เนื้อติดมัน
        </label>
      </div>

      <div
        class="form-check d-flex align-items-center"
        style={{
          border: "1px solid #EF60A3",
          borderRadius: ".5rem",
          padding: "20px",
          background: checkBoxValue.sugarDrinks ? "#FCDEEC" : "",
          marginBottom: "20px",
        }}
      >
        <input
          class="form-check-input"
          type="checkbox"
          className="big-checkbox"
          checked={checkBoxValue.sugarDrinks}
          onChange={() => handleChangeCheckBoxValue("sugarDrinks")}
        />
        <label class="form-check-label h5 ml-3" htmlFor="flexCheckDefault">
          ชอบดื่มเครื่องดื่มที่มีน้ำตาล, น้ำหวาน, น้ำผลไม้
        </label>
      </div>
      {/* <button className="btn_pink w-100" onClick={handleNext}>
        ถัดไป
      </button> */}
    </div>
  );
}
