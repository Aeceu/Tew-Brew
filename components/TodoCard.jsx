"use client";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

const TodoCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {
  const { data: session } = useSession();
  const pathname = usePathname();
  const router = useRouter();
  return (
    <div className="flex flex-col gap-2 p-4 shadow-md rounded-md border border-gray-300 hover:scale-110 duration-200 cursor-pointer">
      <div className="flex gap-4 cursor-pointer">
        <Image
          src={post.creator.image}
          alt="user_logo"
          width={50}
          height={50}
          className="rounded-full object-cover"
        />
        <div className="flex flex-col">
          <h1 className="font-semibold">{post.creator.username}</h1>
          <h1>{post.creator.email}</h1>
        </div>
      </div>
      <div>
        <h1>{post.title}</h1>
        <p>{post.desc}</p>
      </div>
      <h3
        className="text-blue-700"
        onClick={() => handleTagClick && handleTagClick(post.tag)}
      >
        {post.tag}
      </h3>

      {session?.user.id === post.creator._id && pathname === "/profile" && (
        <div className="flex gap-2 justify-end">
          <p className="cursor-pointer text-green-600" onClick={handleEdit}>
            Edit
          </p>
          <p className="cursor-pointer text-red-500" onClick={handleDelete}>
            Delete
          </p>
        </div>
      )}
    </div>
  );
};

export default TodoCard;
