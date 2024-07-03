import { useContext, useEffect, useState } from "react";
import { DiaryStateContext } from "../App";

import MyHeader from "../components/MyHeader";
import MyButton from "../components/MyButton";
import DiaryList from "../components/DiaryList";

import usePageTitle from "../hooks/usePageTitle";

const Home = () => {
  const diaryList = useContext(DiaryStateContext);

  const [data, setData] = useState([]);
  const [pivotDate, setPivitDate] = useState(new Date());
  const headText = `${pivotDate.getFullYear()}년 ${pivotDate.getMonth() + 1}월`;

  usePageTitle("감정 일기장");

  useEffect(() => {
    if (diaryList.length >= 1) {
      const firstDay = new Date(
        pivotDate.getFullYear(),
        pivotDate.getMonth(),
        1
      ).getTime();
      //년 해당월 1일 의미함
      const lastDay = new Date(
        pivotDate.getFullYear(),
        pivotDate.getMonth() + 1,
        0
      ).getTime();
      //년 다음 월 1일 전

      setData(
        diaryList.filter((it) => firstDay <= it.date && it.date < lastDay)
      ); //useContext로 받아온 DiaryList에서 뽑아서 data에 저장
    }
  }, [diaryList, pivotDate]);

  //1. 수정 삭제 2. pivitDate가 변화하는 순간(월을 바꾼 경우)
  useEffect(() => {
    console.log(data);
  }, [data]); //

  const increaseMonth = () => {
    setPivitDate(
      new Date(
        pivotDate.getFullYear(),
        pivotDate.getMonth() + 1,
        pivotDate.getDate()
      )
    );
  };

  const decreaseMonth = () => {
    setPivitDate(
      new Date(
        pivotDate.getFullYear(),
        pivotDate.getMonth() - 1,
        pivotDate.getDate()
      )
    );
  };
  return (
    <div>
      <MyHeader
        headText={headText}
        leftChild={<MyButton text={"<"} onClick={decreaseMonth} />}
        rightChild={<MyButton text={">"} onClick={increaseMonth} />}
      />
      <DiaryList diaryList={data} />
    </div>
  );
};

export default Home;
