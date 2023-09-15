"use client";

import { deleteProject, fetchToken } from "@/lib/actions";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function ProjectActions({ projectId }: { projectId: string }) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeletingProject = async () => {
    setIsDeleting(true);
    const { token } = await fetchToken();
    try {
      await deleteProject(projectId, token);
      router.push("/");
    } catch (error) {
      console.log(error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <Link
        href={`/edit-project/${projectId}`}
        className="flexCenter edit-action_btn"
      >
        <Image src="/pencil.svg" width={15} height={15} alt="edit" />
      </Link>
      <button
        onClick={handleDeletingProject}
        type="button"
        className={`flexCenter delete-action_btn ${
          isDeleting ? "bg-gray" : "bg-primary-purple"
        }`}
      >
        <Image src="/trash.svg" width={15} height={15} alt="trash" />
      </button>
    </>
  );
}
