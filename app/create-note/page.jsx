"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Form from "@components/Form";

const CreateNote = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [form, setForm] = useState({ title: "", tag: "", desc: "" });
  const [submitting, setSubmitting] = useState(false);

  const createNote = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const response = await fetch("api/todos/new", {
        method: "POST",
        body: JSON.stringify({
          userId: session?.user.id,
          title: form.title,
          tag: form.tag,
          desc: form.desc,
        }),
      });
      console.log(form);
      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form
      type="Create"
      submitting={submitting}
      setForm={setForm}
      form={form}
      handleSubmit={createNote}
    />
  );
};

export default CreateNote;
