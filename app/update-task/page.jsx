"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import Form from "@components/Form";

const UpdateTask = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const searhParams = useSearchParams();
  const taskID = searhParams.get("id");
  const [form, setForm] = useState({ title: "", tag: "", desc: "" });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const getTaskDetails = async () => {
      const res = await fetch(`/api/todos/${taskID}`);
      const data = await res.json();
      setForm({
        title: data.title,
        tag: data.tag,
        desc: data.desc,
      });
    };
    if (taskID) getTaskDetails();
  }, [taskID]);

  const updateNote = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    if (!taskID) return alert("Task ID is not found!");
    try {
      const response = await fetch(`api/todos/${taskID}`, {
        method: "PATCH",
        body: JSON.stringify({
          userId: session?.user.id,
          title: form.title,
          tag: form.tag,
          desc: form.desc,
        }),
      });
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
      type="Edit"
      submitting={submitting}
      setForm={setForm}
      form={form}
      handleSubmit={updateNote}
    />
  );
};

export default UpdateTask;
