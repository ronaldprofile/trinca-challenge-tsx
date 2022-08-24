import { useState, FormEvent } from "react";
import { useAuth } from "../context/Auth/AuthContext";

import { Modal, ModalDescription, ModalProps, ModalTitle } from "./Modal";
import { Button } from "./Button";
import { Input } from "./Input";
import { toast } from "react-toastify";

interface ModalSignUpProps extends ModalProps {}

export function ModalSignUp({ isOpen, closeModal }: ModalSignUpProps) {
  const { signUp } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubscribe(event: FormEvent) {
    event.preventDefault();

    if (!email.trim() || !password.trim()) {
      toast.error("Preencha os campos", { theme: "colored" });
      return;
    }

    await signUp({ password, email });

    setEmail("");
    setPassword("");
    closeModal();
  }

  return (
    <Modal isOpen={isOpen} closeModal={closeModal}>
      <ModalTitle title="Criar conta" className="mb-6" />
      <ModalDescription
        description="Que legal que você quer se juntar a nós, para fazer isso preencha os campos abaixo"
        className="mb-6"
      />

      <form className="w-full" onSubmit={handleSubscribe}>
        <div className="mb-8 flex flex-col gap-3">
          <Input
            type="email"
            placeholder="Seu E-mail"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            shape="secondary"
            className="focus-effect"
          />

          <Input
            type="password"
            placeholder="Sua senha"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            shape="secondary"
            className="focus-effect"
          />
        </div>

        <footer className="w-full">
          <Button color="green" className="w-full focus-effect">
            salvar
          </Button>
        </footer>
      </form>
    </Modal>
  );
}
