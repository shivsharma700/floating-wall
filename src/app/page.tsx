import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col gap-2">
      <Card>
        <CardContent>
          <Link href={"/mobile"}>
          <Button>mobile link</Button>
          </Link>
        </CardContent>
      </Card>
    </main>
  );
}
