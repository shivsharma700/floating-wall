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

  function handleOnChange(key: string, value: string | boolean | string[]) {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  const handleSubmit = async () => {
    if (formData.name.length === 0) {
      toast.warning("name is  required");
      console.log("error");
      return;
    }

    if (formData.feedback.length > 15) {
      toast.warning("Feedback is too long");
      return;
    }

    if (formData.name.length > 10) {
      toast.warning("Name is required");
      console.log("error");
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
            </div>
          </section>
          {/* content goes here */}
          <CardFooter className="flex flex-row items-center justify-end gap-2 pt-2">
            <Button onClick={handleSubmit}>Send Message</Button>
          </CardFooter>
        </CardContent>
      </Card>
    </main>
  );
}
