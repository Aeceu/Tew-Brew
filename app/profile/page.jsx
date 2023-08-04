"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Profile from "@components/profile";

const MyProfile = () => {
  const { data: session } = useSession();
  const [myPosts, setMyPosts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await res.json();

      setMyPosts(data);
    };
    if (session?.user.id) fetchData();
  }, [session?.user.id]);

  const handleEdit = (post) => {
    try {
      router.push(`/update-task?id=${post._id}`);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (post) => {
    const hasConfirmed = confirm("Are you sure you want to delete this task?");

    if (hasConfirmed) {
      try {
        await fetch(`/api/todos/${post._id.toString()}`, {
          method: "DELETE",
        });

        const filteredPosts = myPosts.filter((item) => item._id !== post._id);

        setMyPosts(filteredPosts);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <Profile
      name="My"
      desc="Welcome"
      data={myPosts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
