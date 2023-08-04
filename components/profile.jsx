import TodoCard from "./TodoCard";

const profile = ({ name, desc, data, handleEdit, handleDelete }) => {
  return (
    <section className="w-full px-8">
      <h1 className="font-bold text-6xl text-white mb-4 ">{name} Profile</h1>
      <p className="text-white mb-16">{desc}</p>
      <div className="flex max-lg:flex-col flex-row flex-wrap justify-center items-center gap-4  w-full mt-16">
        {data.map((post) => (
          <TodoCard
            key={post._id}
            post={post}
            handleEdit={() => handleEdit && handleEdit(post)}
            handleDelete={() => handleDelete && handleDelete(post)}
          />
        ))}
      </div>
    </section>
  );
};

export default profile;
