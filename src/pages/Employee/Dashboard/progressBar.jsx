import React from "react";

function ProgressBar({ stages, currentStage }) {
  return (
    <div className="w-full flex flex-col items-center ">
      <div className="bg-gray-50 border border-gray-200 shadow-md rounded-xl p-6 w-full mt-6">
        <h1 className="font-semibold text-center text-[18px] mb-4">
          Leave Status
        </h1>
        <div className="flex items-center justify-between w-full relative mb-2">
          <div className="absolute top-5 left-0 right-0 h-2 bg-gray-200 rounded-full"></div>
          <div
            className="absolute top-5 h-2 bg-green-500 rounded-full transition-all duration-500 ease-in-out"
            style={{
              width: `${((currentStage - 1) / (stages.length - 1)) * 100}%`,
              left: "0%",
            }}
          ></div>

          {stages.map((stage, index) => {
            const stageNumber = index + 1;
            const isCompleted = stageNumber < currentStage;
            const isCurrent = stageNumber === currentStage;

            return (
              <div
                key={index}
                className="flex-1 flex flex-col items-center relative z-10"
              >
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full font-semibold text-white transition-all duration-500 ${
                    isCompleted
                      ? "bg-green-500 shadow-lg shadow-green-200"
                      : isCurrent
                      ? "bg-yellow-500 ring-4 ring-yellow-200 scale-110"
                      : "bg-gray-300"
                  }`}
                >
                  {isCompleted ? (
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    stageNumber
                  )}
                </div>

                <div className="mt-3 text-center">
                  <p
                    className={`text-sm font-medium ${
                      isCompleted
                        ? "text-green-500"
                        : isCurrent
                        ? "text-yellow-600"
                        : "text-gray-400"
                    }`}
                  >
                    {stage}
                  </p>
                  <p
                    className={`text-xs mt-1 ${
                      isCompleted
                        ? "text-green-500"
                        : isCurrent
                        ? "text-yellow-600"
                        : "text-gray-400"
                    }`}
                  >
                    {isCompleted
                      ? "Completed"
                      : isCurrent
                      ? "Current"
                      : "Pending"}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ProgressBar;
