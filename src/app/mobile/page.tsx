"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

import io from "socket.io-client";

const socket = io("https://mosaic-api.gokapturehub.com", {
  transports: ["websocket"],
});

interface FormDataTypes {
  name: string;
  feedback: string;
}

export default function Mobile() {
  const [formData, setFormData] = useState<FormDataTypes>({
    name: "",
    feedback: "",
  });
  let maxLength = {
    name:10,
    feedback:20,
  }

  function handleOnChange(key: string, value:string) {
    if(value.length > maxLength.feedback && key == "feedback"){
      return;
    }
    if(value.length > maxLength.name && key == "name"){
      return;
    }
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  const handleSubmit = async () => {
    if (formData.name.length === 0 && formData.feedback.length === 0) {
      toast.warning("All fields are required");
      return;
    }

    socket.emit("wall", formData);
    toast.success("form submited");
    setFormData({
      name: "",
      feedback: "",
    });
  };
  return (
    <main className="w-screen h-screen flex relative">
      <img
        src="./assets/bg.png"
        alt=""
        className="fixed top-0 right-0 w-screen h-screen z-[-1] object-cover"
      />
      <Card className="w-[90%] max-w-[25rem] m-auto z-10">
        <CardContent className="">
          <CardHeader>
            <CardTitle></CardTitle>
          </CardHeader>
          {/* content goes here */}
          <section className="space-y-2 p-1 py-2 overflow-auto">
            <div>
              <Label>
                Name <span className="text-red-500">*</span>
              </Label>
              <Input
                placeholder="name"
                value={formData.name}
                onChange={(e) => handleOnChange("name", e.target.value)}
              />
              <span className="text-xs text-end w-full block m-1 ml-0">{formData.name.length}/{maxLength.name}</span>
            </div>
            <div>
              <Label>
                Feedback <span className="text-red-500">*</span>
              </Label>
              <Textarea
                placeholder="Feedback . . ."
                value={formData.feedback}
                onChange={(e) => handleOnChange("feedback", e.target.value)}
              />
                <span className="text-xs text-end w-full block m-1 ml-0">{formData.feedback.length}/{maxLength.feedback}</span>
            </div>
          </section>
          {/* content goes here */}
          <CardFooter className="flex flex-row items-center justify-end gap-2 py-2">
            <Button onClick={handleSubmit}>Send feedback</Button>
          </CardFooter>
        </CardContent>
      </Card>
    </main>
  );
}
