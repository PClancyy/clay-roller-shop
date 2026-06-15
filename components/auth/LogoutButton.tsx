"use client";

import { useRouter } from "next/navigation";

export function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/actionsauth/auth", {
      method: "POST",
    });

    router.push("/");
    router.refresh();
  }

  return (
    <button
      onClick={handleLogout}
      className="w-full md:w-auto"

    >
      Logout
    </button>
  );
}