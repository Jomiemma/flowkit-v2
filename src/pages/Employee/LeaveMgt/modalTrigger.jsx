import React from "react";

function ModalTrigger({ onOpen }) {
  return (
    <button
      onClick={onOpen}
      className="px-3 py-1.5 bg-blue-600 text-white font-semibold rounded-lg text-[15px] hover:bg-blue-700"
    >
      Apply for Leave
    </button>
  );
}

export default ModalTrigger;
