import { useContext, useState, useEffect } from "react";
import { DiaryStateContext } from "../App";
import { useNavigate } from "react-router-dom";

const useDiary = (id) => {
  const data = useContext(DiaryStateContext);
  const [currentData, setCurrentData] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const currentDiaryItem = data.find(
      (item) => String(item.id) === String(id)
    );
    console.log("currentData1", currentData);
    if (!currentDiaryItem) {
      window.alert("존재하지 않는 일기입니다.");
      navigate("/", { replace: true });
    }
    setCurrentData(currentDiaryItem);
  }, [id, data]);
  console.log("currentData", currentData);

  return currentData;
};

export default useDiary;
