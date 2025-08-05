import { createContext, useContext, useState, type ReactNode } from "react";

type trainerType = {
  trainer: "male" | "female" | null;
  getTrainer: (trainer: "male" | "female") => void;
  cleanTrainer: () => void;
};

const trainerContext = createContext<trainerType>({
  trainer: null,
  getTrainer: () => {},
  cleanTrainer: () => {},
});

// Verificar localStorage
const savedTrainer = ((): "male" | "female" | null => {
  const value = localStorage.getItem("trainer");
  if (value === "male" || value === "female") return value;
  return null;
})();

function TrainerProvider({ children }: { children: ReactNode }) {
  const [trainer, setTrainer] = useState<"male" | "female" | null>(savedTrainer);

  const getTrainer = (trainer: "male" | "female") => {
    setTrainer(trainer);
    window.localStorage.setItem("trainer", trainer);
  };
  const cleanTrainer = () => {
    window.localStorage.removeItem("trainer");
    setTrainer(null);
  };

  return (
    <trainerContext.Provider value={{ trainer, getTrainer, cleanTrainer }}>
      {children}
    </trainerContext.Provider>
  );
}

const useTrainer = () => useContext(trainerContext);

export { useTrainer, TrainerProvider };
