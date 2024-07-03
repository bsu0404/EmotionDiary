import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DiaryItem from "./DiaryItem";
import MyButton from "./MyButton";

const sortOptionList = [
  { value: "latest", name: "최신순" },
  { value: "oldest", name: "오래된순" },
];
const filterOptionList = [
  { value: "all", name: "전부 다" },
  { value: "good", name: "좋은 감정" },
  { value: "bad", name: "안좋은 감정" },
];
const ControlMenu = ({ value, onChange, optionList }) => {
  return (
    //props: sortType, setSortType,sortOptionList
    <select
      className="ControlMenu"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {optionList.map((it, idx) => (
        <option key={idx} value={it.value}>
          {it.name}
        </option>
        //optionList배열의 name
      ))}
    </select>
  );
};

const DiaryList = ({ diaryList }) => {
  //현재 월에 해당하는 일기를 받아옴
  const navigate = useNavigate();

  const [sortType, setSortType] = useState("latest");
  const [filter, setfilter] = useState("all");

  const getProcessDiaryList = () => {
    const filterCallback = (item) => {
      if (filter === "good") {
        return parseInt(item.emotion) <= 3;
      } else {
        return parseInt(item.emotion) > 3;
      }
    };
    const compare = (a, b) => {
      if (sortType === "latest") {
        return parseInt(b.date) - parseInt(a.date); //양수 반환
      } else {
        return parseInt(a.date) - parseInt(b.date); //음수 반환
      }
    };
    const copyList = JSON.parse(JSON.stringify(diaryList));
    //stringfy:배열을 json화 시켜 문자열로 바꿈->parse:다시 배열로 바꿈
    //diaryList.sort를 이용할 경우: 원본 배열이 바뀜
    const filteredList =
      filter === "all" ? copyList : copyList.filter((it) => filterCallback(it));
    const sortedList = filteredList.sort(compare);
    return sortedList;
  };

  return (
    <div className="DiaryList">
      <div className="menu_wrapper">
        <div className="left_col">
          <ControlMenu
            value={sortType}
            onChange={setSortType}
            optionList={sortOptionList}
          />
          <ControlMenu
            value={filter}
            onChange={setfilter}
            optionList={filterOptionList}
          />
        </div>
        <div className="right_col">
          <MyButton
            type={"positive"}
            text={"새 일기쓰기"}
            onClick={() => navigate("/new")}
          />
        </div>
      </div>

      {getProcessDiaryList().map((item) => (
        <DiaryItem key={item.id} {...item} />
      ))}
    </div>
  );
};

DiaryList.defaultProps = {
  diaryList: [],
};

export default DiaryList;

//현재 월에 맞는 다이어리 리스트를 props로 받아와 출력
