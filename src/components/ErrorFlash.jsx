import { useState } from "react";

export default function ErrorFlash({ message, onClose }) {
  const [visible, setVisible] = useState(true);

  const handleOkClick = () => {
    setVisible(false);
    onClose();
  };

  const messageParts = message.split("\n");

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
      <div className="bg-white text-black px-10 py-5 rounded-lg max-w-md shadow-2xl min-w-[300px] min-h-[100px]">
        {messageParts.map((part, index) => (
          <p key={index} className="px-1 text-lg">
            {part}
          </p>
        ))}

        <div className="flex justify-center">
          <button
            className="mt-2 px-8 py-3 rounded-full bg-primary text-white font-semibold self-center"
            onClick={handleOkClick}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}
