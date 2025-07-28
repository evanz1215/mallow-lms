import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Github } from "lucide-react";

export default function LoginPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Welcome back!</CardTitle>
        <CardDescription>Login with Github Email</CardDescription>
      </CardHeader>

      <CardContent>
        <Button className="w-full" variant="outline">
          <Github className="size-4" />
          Sign in with Github
        </Button>
      </CardContent>
    </Card>
  );
}
