import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input";

export default function Home() {
  return (
   <div className="flex gap-4">
    <Input/>
     <Button size="xs">Primary123</Button>
     <Button variant="destructive">Secondary</Button>
     <Button variant="secondary">Secondary</Button>
     <Button variant="ghost">Secondary</Button>
     <Button variant="muted">Secondary</Button>
     <Button variant="tertiary">Secondary</Button>
     <Button variant="outline">Secondary</Button>
   </div>
  );
}
