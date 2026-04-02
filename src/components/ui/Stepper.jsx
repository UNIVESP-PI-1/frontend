import { CheckCircle2 } from 'lucide-react';

export default function Stepper({ steps, currentStep }) {
    return (
        <div className="mb-12 px-4">
            <div className="relative flex justify-between items-center max-w-4xl mx-auto">

                <div className="absolute top-5 left-0 w-full h-1 bg-gray-200 -z-10" />

                <div
                    className="absolute top-5 left-0 h-1 bg-dark-2 transition-all duration-500 -z-10"
                    style={{
                        width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`
                    }}
                />

                {steps.map((step) => {
                    const isActive = currentStep === step.id;
                    const isCompleted = currentStep > step.id;

                    return (
                        <div key={step.id} className="flex flex-col items-center relative">
                            <div
                                className={`w-10 h-10 flex items-center justify-center rounded-full border-2 z-10 transition-all duration-300 
                                    ${isCompleted
                                        ? "bg-dark-2 border-dark-2 text-white"
                                        : isActive
                                            ? "border-dark-2 bg-white text-dark-2 shadow-md"
                                            : "bg-white border-gray-300 text-gray-400"
                                    }`}
                            >
                                {isCompleted ? <CheckCircle2 size={20} /> : step.id}
                            </div>

                            <div className="absolute top-12 w-32 text-center">
                                <span className={`text-xs font-medium whitespace-nowrap ${isActive || isCompleted ? "text-gray-900" : "text-gray-400"}`}>
                                    {step.title}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
