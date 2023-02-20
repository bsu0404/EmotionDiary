import { Navigate, useNavigate, useParams } from "react-router-dom";
import MyHeader from "../components/MyHeader";
import { useContext, useEffect, useState } from "react";
import { DiaryStateContext } from "../App";

import { getStringDate } from "../util/date";
import MyButton from "../components/MyButton";

const Diary = () => {
  const { id } = useParams();
  const diaryList = useContext(DiaryStateContext);
  const navigate = useNavigate();
  const [data, setData] = useState();
  useEffect(() => {
    if (diaryList.length >= 1) {
      const targetDiary = diaryList.find(
        (it) => parseInt(it.id) === parseInt(id)
      );
      if (targetDiary) {
        setData(targetDiary);
      } else {
        alert("없는 일기입니다.");
        navigate("/", { replace: true });
      }
      console.log(targetDiary);
    }
  }, [id, diaryList]);
  if (!data) {
    return <div className="DiaryPage">로딩중..</div>;
  } else {
    return (
      <div className="DiaryPage">
        <MyHeader
          leftChild={
            <MyButton text={"<뒤로가기"} onClick={() => navigate(-1)} />
          }
          headText={`${getStringDate(new Date(data.date))} 기록`}
          rightChild={
            <MyButton
              text={"수정하기"}
              onClick={() => navigate(`/edit/${data.id}`)}
            />
          }
        />
      </div>
    );
  }
};

export default Diary;
