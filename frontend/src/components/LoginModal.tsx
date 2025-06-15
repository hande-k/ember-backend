import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { login, register } from "@/api/auth";

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
}

export default function LoginModal({ open, onClose }: LoginModalProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [age, setAge] = useState<number | undefined>(undefined);
  const [city, setCity] = useState("");
  const [genresLikeToRead, setGenresLikeToRead] = useState("");
  const [genresLikeToListen, setGenresLikeToListen] = useState("");
  const [genresLikeToWrite, setGenresLikeToWrite] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const resetForm = () => {
    setUsername("");
    setPassword1("");
    setPassword2("");
    setName("");
    setSurname("");
    setAge(undefined);
    setCity("");
    setGenresLikeToRead("");
    setGenresLikeToListen("");
    setGenresLikeToWrite("");
  };

  const handleLogin = async () => {
    setLoading(true);
    try {
      const loginResponse = await login({ username, password: password1 });
      localStorage.setItem("token", loginResponse.token);
      toast({ title: "Login erfolgreich" });
      resetForm();
      onClose();
    } catch (error: any) {
      toast({ title: "Login fehlgeschlagen", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    if (password1 !== password2) {
      toast({ title: "Passwörter stimmen nicht überein", variant: "destructive" });
      return;
    }

    setLoading(true);
    try {
      const registerResponse = await register({
        username,
        password: password1,
        name,
        surname,
        age,
        city,
        genresLikeToRead,
        genresLikeToListen,
        genresLikeToWrite
      });
      localStorage.setItem("token", registerResponse.token);
      toast({ title: "Registrierung erfolgreich" });
      resetForm();
      onClose();
    } catch (error: any) {
      toast({ title: "Registrierung fehlgeschlagen", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isLogin ? "Sign In" : "Sign Up"}</DialogTitle>
        </DialogHeader>

        <div className="flex mb-4">
          <Button variant={isLogin ? "default" : "outline"} onClick={() => setIsLogin(true)} className="flex-1">
            Sign In
          </Button>
          <Button variant={!isLogin ? "default" : "outline"} onClick={() => setIsLogin(false)} className="flex-1">
            Sign Up
          </Button>
        </div>

        <div className="space-y-4">
          <Input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} disabled={loading} />
          <Input type="password" placeholder="Password" value={password1} onChange={(e) => setPassword1(e.target.value)} disabled={loading} />
          {!isLogin && (
            <>
              <Input type="password" placeholder="Repeat Password" value={password2} onChange={(e) => setPassword2(e.target.value)} disabled={loading} />
              <Input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} disabled={loading} />
              <Input placeholder="Surname" value={surname} onChange={(e) => setSurname(e.target.value)} disabled={loading} />
              <Input placeholder="Age" type="number" value={age ?? ""} onChange={(e) => setAge(Number(e.target.value))} disabled={loading} />
              <Input placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} disabled={loading} />
              <Input placeholder="Genres Like To Read" value={genresLikeToRead} onChange={(e) => setGenresLikeToRead(e.target.value)} disabled={loading} />
              <Input placeholder="Genres Like To Listen" value={genresLikeToListen} onChange={(e) => setGenresLikeToListen(e.target.value)} disabled={loading} />
              <Input placeholder="Genres Like To Write" value={genresLikeToWrite} onChange={(e) => setGenresLikeToWrite(e.target.value)} disabled={loading} />
            </>
          )}
        </div>

        <DialogFooter className="mt-4">
          <Button
            onClick={isLogin ? handleLogin : handleRegister}
            disabled={loading || !username || !password1 || (!isLogin && !password2)}
            className="btn-primary w-full"
          >
            {loading ? "Working..." : isLogin ? "Sign In" : "Sign Up"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
