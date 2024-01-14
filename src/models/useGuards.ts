import { offDuty, onDuty } from "@/services/monitor";
import { User } from "@/type";
import { useState } from "react";

export default function Guards() {
  const [currentGuards, setCurrentGuards] = useState<Partial<User>>({});
  const setGuards = async (guardId: number) => {
    const { data } = await onDuty(guardId);
    localStorage.setItem("guard", JSON.stringify(data));
    setCurrentGuards(data);
  };
  const unsetGuards = async (username: string, password: string) => {
    await offDuty(username, password);
    localStorage.removeItem("guard");
    setCurrentGuards({});
  };

  return {
    hasGuard: !!localStorage.getItem("guard"),
    currentGuards,
    setGuards,
    unsetGuards,
  };
}
