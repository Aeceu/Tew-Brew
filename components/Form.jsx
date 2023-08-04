import Link from "next/link";
const Form = ({ type, setForm, form, handleSubmit, submitting }) => {
  return (
    <div className="flex flex-col p-8 ">
      <h1 className="text-6xl text-white font-semibold">{type} Brew Note</h1>
      <p className="text-white text-[1.2rem] my-5">
        Craft your perfect brew and unleash your creativity - rely on our
        comprehensive note app to be your companion through every brewing
        endeavor, ensuring no detail is overlooked and your results are
        consistently exceptional.
      </p>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 p-4  max-lg:w-full w-1/2 glassmorphism"
      >
        <label htmlFor="title" className="text-white text-[1.1rem]">
          Title:
        </label>
        <input
          name="title"
          className="rounded-md outline-none px-2 py-4"
          type="text"
          placeholder="write your title here...."
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <label htmlFor="tag" className="text-white text-[1.1rem]">
          Tag:
        </label>
        <input
          name="tag"
          className="rounded-md outline-none px-2 py-4"
          type="text"
          placeholder="write your tag here (#tea, #coffee, #drinks)"
          value={form.tag}
          onChange={(e) => setForm({ ...form, tag: e.target.value })}
        />
        <label htmlFor="desc" className="text-white">
          Description
        </label>
        <textarea
          rows={20}
          value={form.desc}
          onChange={(e) => setForm({ ...form, desc: e.target.value })}
          placeholder="write your brewing description here...."
          className="rounded-md px-2 py-4 outline-none"
        />
        <div className="flex gap-2 justify-end items-center py-2">
          <Link href="/">Cancel</Link>
          <button
            type="submit"
            disabled={submitting}
            className=" bg-orange-500 text-white rounded-full px-4 py-2"
          >
            {submitting ? "loading..." : type}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
