"use client";
import { useState, useEffect } from "react";
import TodoCard from "@components/TodoCard";

const TodoCardList = ({ data }) => {
  return (
    <div className="w-full flex max-xl:flex-col justify-center items-center flex-row gap-4  mt-16">
      {data.map((post) => (
        <TodoCard key={post._id} post={post} />
      ))}
    </div>
  );
};

const Feed = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const res = await fetch("/api/todos");
    const data = await res.json();

    setData(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="w-full">
      <TodoCardList data={data} />
    </div>
  );
};

export default Feed;
