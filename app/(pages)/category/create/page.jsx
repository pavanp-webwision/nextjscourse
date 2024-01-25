"use client";
import React, { useState } from "react";
import { Input, Button, Label, TextInput } from "@mantine/core";
import { createQuery } from "@/services/api";
import { useRouter } from "next/navigation";

export default function CategoryCreate() {
  const router = useRouter();
  const [value, setValue] = useState("");

  const handleInputChange = (e) => {
    setValue(e.target.value);
  };

  const handleClick = async () => {
    console.log("create", value);
    const response = await createQuery("categories", { name: value });
    console.log("create response", response);
    if (response.status === 200) {
      router.push("/category");
    }
  };

  return (
    <div>
      <div>
        <TextInput
          label="Enter Name"
          description="Category Name"
          onChange={(e) => handleInputChange(e)}
        />
      </div>
      <Button mt={20} onClick={handleClick}>
        Submit
      </Button>
    </div>
  );
}
