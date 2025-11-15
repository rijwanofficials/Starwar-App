import { useContext } from "react";
import { AppContext } from "../context/ApiContext";

export const useApp = () => {
    const ctx = useContext(AppContext);

    if (!ctx) {
        throw new Error("useApp must be used inside <AppProvider>");
    }

    return ctx;
};