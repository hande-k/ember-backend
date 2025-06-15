import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { login } from "@/api/auth";

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
}

export default function LoginModal({ open, onClose }: LoginModalProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();


  const handleLogin = async () => {
    setLoading(true);
    try {
      // Versuch zuerst Login
      await login({ username, password });
      toast({ title: "Login erfolgreich" });
      onClose();
    } catch (loginError: any) {
      console.log("Login fehlgeschlagen, versuche Registrierung...");

      try {
        // Falls Login fehlschlägt, versuche Registrierung
        await register({ username, password });
        toast({ title: "Registrierung erfolgreich, automatisch eingeloggt" });
        onClose();
      } catch (registerError: any) {
        toast({
          title: "Registrierung und Login fehlgeschlagen",
          description: "Bitte überprüfe deine Daten.",
          variant: "destructive"
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Login</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} disabled={loading} />
          <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} disabled={loading} />
        </div>
        <DialogFooter className="mt-4">
          <Button onClick={handleLogin} disabled={loading || !username || !password} className="btn-primary w-full">
            {loading ? "Einloggen..." : "Login"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
