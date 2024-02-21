import React, { useEffect, useState, useMemo } from "react";
import "./nutrition.scss";
import WeightChoice from "./weight";
import ArrowBack from "../../assets/img/arrow_back.png";
import FoodSource from "./foodSource";
import ControlProblem from "./control_problem";
import TableNutritionService from "../../components/service_ui/tableNutrition";
import IconNutrition from "../../assets/img/icon_Nutrition.png";
import IconCarb from "../../assets/img/icon_Carb.png";
import IconProtein from "../../assets/img/icon_protein.png";
import IconFat from "../../assets/img/icon_fat.png";
import IconSuggest from "../../assets/img/icon_suggest.png";
import { useDispatch, useSelector } from "react-redux";
import {
  getNutritionFood,
  createNutritionFood,
  clearNutritionFood,
} from "../../redux/nutrition";

const steps = [
  "Select campaign settings",
  "Create an ad group",
  "Create an ad",
];

const columnsNutrients = [
  { id: 1, title: "สารอาหาร" },
  { id: 2, title: "ปริมาณ" },
  { id: 3, title: "หน่วย" },
];

const rowsNutrients = [
  { id: 1, title: "คาร์โบไฮเดรต", amount: "4 - 5", unit: "(ส่วน) /ต่อวัน" },
  { id: 2, title: "โปรตีน", amount: "8 - 11", unit: "(ส่วน) /ต่อวัน" },
  { id: 3, title: "ไขมันไม่เกิน", amount: "6", unit: "(ส่วน) /ต่อวัน" },
];

const columnsCarb = [
  { id: 1, title: "ประเภทอาหาร" },
  { id: 2, title: "ชื่ออาหาร" },
  { id: 3, title: "ปริมาณชั่งตวง" },
];

const rowsCarb = [
  {
    id: 1,
    title: "คาร์โบไฮเดรต",
    amount: "ข้าวสวย /ข้าวไม่ขัดสี",
    unit: "1 ทัพพี (5 ช้อนกินข้าว)",
  },
  {
    id: 2,
    title: "คาร์โบไฮเดรต",
    amount: "เส้นพาสต้า มักกะโรนี สปาเเกตตี้ ลวก",
    unit: "1  ทัพพี",
  },
];

const columnsProtein = [
  { id: 1, title: "ประเภทอาหาร" },
  { id: 2, title: "ชื่ออาหาร" },
  { id: 3, title: "ปริมาณชั่งตวง" },
];

const rowsProtein = [
  {
    id: 1,
    title: "โปรตีน",
    amount: "เนื้อไก่สุก",
    unit: "2 ช้อนกินข้าว",
  },
  {
    id: 2,
    title: "โปรตีน",
    amount: "เนื้อปลาสุก",
    unit: "2 ช้อนกินข้าว",
  },
];

const columnsFat = [
  { id: 1, title: "ประเภทอาหาร" },
  { id: 2, title: "ชื่ออาหาร" },
  { id: 3, title: "ปริมาณชั่งตวง" },
];

const rowsFat = [
  {
    id: 1,
    title: "ไขมัน",
    amount: "น้ำมันหมู/พืช",
    unit: "1 ช้อนชา",
  },
  {
    id: 2,
    title: "ไขมัน",
    amount: "เบคอน",
    unit: "1 ชิ้น",
  },
];

function Nutrition() {
  const user = useSelector(({ authUser }) => (authUser ? authUser.user : ""));
  const { nutritionFoods, statusPostNutritionFood, statusGetNutritionFood } =
    useSelector(({ nutrition }) => (nutrition ? nutrition : []));
  const dispatch = useDispatch();

  const [activeStep, setActiveStep] = useState(0);
  const [isStartStep, setIsStartStep] = useState(false);
  const [progress, setProgress] = useState(33.33);
  const [activeColorWeight, setActiveColorWeight] = useState("");
  const [activeColorFood, setActiveColorFood] = useState("");
  const [cSelected, setCSelected] = useState([]);
  const [dataNutritionWeight, setdataNutritionWeight] = useState(
    nutritionFoods && JSON.parse(nutritionFoods[0].current_weight)
  );

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setProgress((prev) => (activeStep == 2 ? 100 : prev + 33.33));
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    setProgress((prev) => prev - 33.33);
  };

  const handleCreateNutrition = () => {
    if (activeStep === 3) {
      dispatch(
        createNutritionFood(
          user && user.user_id,
          activeColorWeight.toString(),
          activeColorFood,
          cSelected
        )
      );
    }
  };

  const tableNutrition = () => {
    return (
      dataNutritionWeight &&
      dataNutritionWeight.map((item) => <h1>Card{item.carb}</h1>)
    );
  };

  useEffect(() => {
    dispatch(getNutritionFood(user && user.user_id));
  }, []);

  useEffect(() => {
    if (statusPostNutritionFood === "success") {
      dispatch(getNutritionFood(user && user.user_id));
    }
    if (statusGetNutritionFood === "success") {
      dispatch(clearNutritionFood());
    }
  }, [statusPostNutritionFood, statusGetNutritionFood]);

  useMemo(() => {
    handleCreateNutrition();
  }, [activeStep]);

  useMemo(() => {
    console.log("nutritionFoods", dataNutritionWeight);
    setdataNutritionWeight(
      nutritionFoods && JSON.parse(nutritionFoods[0].current_weight)
    );
  }, [nutritionFoods]);

  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      {!isStartStep ? (
        <div className="card_calculate">
          <h3 className="title">เริ่มโปรแกรมคำนวณอาหาร</h3>
          <button className="btn_pink" onClick={() => setIsStartStep(true)}>
            คำนวณ
          </button>
        </div>
      ) : null}

      {tableNutrition()}
      <h1>Demo</h1>

      {isStartStep && activeStep !== 3 ? (
        <div className="container-sm">
          <br />
          <div className="mb-5">
            <div
              className="progress2"
              role="progressbar"
              aria-label="Basic example"
            >
              <div
                className={`progress-bar`}
                style={{ width: `${progress}%` }}
              />
            </div>
            <div
              className="d-flex align-items-center justify-content-between"
              style={{ margin: "0 60px" }}
            >
              <img
                src={ArrowBack}
                style={{
                  width: "10px",
                  height: "10px",
                  cursor: activeStep === 0 ? "not-allowed" : "pointer",
                }}
                alt="arrow"
                onClick={activeStep === 0 ? () => {} : handleBack}
              />

              {activeStep !== 3 ? (
                <h6 style={{ color: "#7A7A7A" }}>
                  {activeStep + 1} / {steps.length}
                </h6>
              ) : null}
            </div>
          </div>
          {activeStep === 0 && (
            <WeightChoice
              handleNext={handleNext}
              activeColorWeight={activeColorWeight}
              setActiveColorWeight={setActiveColorWeight}
            />
          )}
          {activeStep === 1 && (
            <FoodSource
              handleNext={handleNext}
              activeColorFood={activeColorFood}
              setActiveColorFood={setActiveColorFood}
            />
          )}
          {activeStep === 2 && (
            <ControlProblem
              handleNext={handleNext}
              setCSelected={setCSelected}
              cSelected={cSelected}
            />
          )}
        </div>
      ) : null}

      {activeStep == 3 ? (
        <div className="container-sm">
          <div>
            <div className="d-flex align-items-center gap-4 mb-3">
              <img
                src={IconNutrition}
                alt="demo"
                style={{ width: 40, height: 40, marginRight: "20px" }}
              />
              <h3 className="mt-2">สารอาหารที่แนะนำ</h3>
            </div>
            <div style={{ maxHeight: "600px", overflowY: "auto" }}>
              <TableNutritionService
                columns={columnsNutrients}
                rows={rowsNutrients}
              />
            </div>
          </div>

          <div className="mt-5">
            <div className="d-flex align-items-center gap-4 mb-3">
              <img
                src={IconCarb}
                alt="demo"
                style={{ width: 50, height: 50, marginRight: "20px" }}
              />
              <h3 className="mt-3">ประเภทอาหารที่แนะนำ (คาร์โบไฮเดรต)</h3>
            </div>
            <div style={{ maxHeight: "600px", overflowY: "auto" }}>
              <TableNutritionService columns={columnsCarb} rows={rowsCarb} />
            </div>
          </div>

          <div className="mt-5">
            <div className="d-flex align-items-center gap-4 mb-3">
              <img
                src={IconProtein}
                alt="demo"
                style={{ width: 40, height: 40, marginRight: "20px" }}
              />
              <h3 className="mt-2">ประเภทอาหารที่แนะนำ (โปรตีน)</h3>
            </div>
            <div style={{ maxHeight: "600px", overflowY: "auto" }}>
              <TableNutritionService
                columns={columnsProtein}
                rows={rowsProtein}
              />
            </div>
          </div>

          <div className="mt-5">
            <div className="d-flex align-items-center gap-4 mb-3">
              <img
                src={IconFat}
                alt="demo"
                style={{ width: 40, height: 40, marginRight: "20px" }}
              />
              <h3 className="mt-2">ประเภทอาหารที่แนะนำ (ไขมัน)</h3>
            </div>
            <div style={{ maxHeight: "600px", overflowY: "auto" }}>
              <TableNutritionService columns={columnsFat} rows={rowsFat} />
            </div>
          </div>

          <div className="mt-5">
            <div className="d-flex align-items-center gap-4">
              <img
                src={IconSuggest}
                alt="demo"
                style={{ width: 40, height: 40, marginRight: "20px" }}
              />
              <h3 className="mt-2">คำแนะนำ</h3>
            </div>
            <div
              style={{
                background: "#FFF8FB",
                padding: "50px",
                marginTop: "20px",
                borderRadius: "1rem",
              }}
            >
              <h5>
                อย่าปล่อยให้หิว พยายามอย่าเก็บอาหารติดตู้เย็น,
                ทานผลไม้แทนได้บ้าง, หลีกเลี่ยงน้ำตาลอย่าปล่อยให้หิว
              </h5>
            </div>

            <div className="d-flex align-items-center justify-content-center mt-3">
              <button
                className="btn_pink"
                onClick={() => {
                  setIsStartStep(true);
                  setActiveStep(0);
                  setProgress(33.33);
                }}
              >
                คำนวณใหม่
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Nutrition;
