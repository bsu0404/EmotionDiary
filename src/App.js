import React, { useReducer, useRef, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";

import Home from "./pages/Home";
import Edit from "./pages/Edit";
import New from "./pages/New";
import Diary from "./pages/Diary";

const reducer = (state, action) => {
  let newState = [];
  switch (action.type) {
    case "INIT": {
      return action.data;
    }
    case "CREATE": {
      newState = [action.data, ...state];
      break;
    }
    case "REMOVE": {
      newState = state.filter(
        (it) => Number(it.id) !== Number(action.targetId)
      );
      console.log("id", action.targetId);
      break;
    }
    case "EDIT": {
      newState = state.map((it) =>
        String(it.id) === String(action.data.id) ? action.data : it
      );
      break;
    }
    default:
      return state;
  }
  localStorage.setItem("diary", JSON.stringify(newState));
  return newState;
};

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

function App() {
  const [data, dispatch] = useReducer(reducer, []);
  const [isLoading, setIsLoading] = useState(true);
  const dataId = useRef(0);

  useEffect(() => {
    const storedData = localStorage.getItem("diary");

    if (!storedData) {
      setIsLoading(false);
      return;
    }

    const parsedData = JSON.parse(storedData);
    if (!Array.isArray(parsedData)) {
      setIsLoading(false);
      return;
    }

    let maxId = 0;
    parsedData.forEach((item) => {
      if (Number(item.id) > maxId) {
        maxId = Number(item.id);
      }
    });

    dataId.current = maxId + 1;

    dispatch({
      type: "INIT",
      data: parsedData,
    });
    setIsLoading(false);
  }, []);

  const onCreate = (date, content, emotion) => {
    dispatch({
      type: "CREATE",
      data: {
        id: dataId.current++,
        date: new Date(date).getTime(),
        emotion,
        content,
      },
    });
  };
  const OnDelete = (targetId) => {
    dispatch({ type: "REMOVE", targetId });
  };
  const onUpdate = (targetId, date, content, emotion) => {
    dispatch({
      type: "EDIT",
      data: {
        id: targetId,
        date: new Date(date).getTime(),
        emotion,
        content,
      },
    });
  };

  if (isLoading) {
    return <div>로딩중...</div>;
  }
  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider
        value={{
          onCreate,
          onUpdate,
          OnDelete,
        }}
      >
        <BrowserRouter>
          <div className="App">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/new" element={<New />} />
              <Route path="/edit/:id" element={<Edit />} />
              <Route path="/diary/:id" element={<Diary />} />
            </Routes>
          </div>
        </BrowserRouter>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
