import { FaSpinner } from "react-icons/fa";
import Card from "./Card";
import { PopupContainer } from "./popup";

export default function OverlaySpinner() {
  return (
    <PopupContainer>
      <Card
        className="shadow-none"
        style={{ marginTop: window.scrollY + window.innerHeight / 2.5 }}
      >
        <FaSpinner className="text-black w-52 h-52 animate-spin" />
      </Card>
    </PopupContainer>
  );
}
