import type { MetaFunction } from "@remix-run/node";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useEffect } from "react";
import { useNavigate } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/movies/1");
  }, []);
  return (
    <div className="flex items-center justify-center h-screen">
      <h1 className="text-6xl font-bold">Movie Time</h1>
    </div>
  );
}
