import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

function WizardNavigation({
    currentStep,
    setCurrentStep,
    formData,
    onGenerate
}) {
    const [error, setError] = useState("");

    const stepMessages = {
        1: "Please select who this special letter is for ✒️",
        2: "Choose an occasion to continue ✦",
        3: "Pick a writing style that reflects your sentiment 💌",
        4: "Choose how long you'd like your letter to be 📜",
        5: "Tell us who we're writing to ✒️",
        6: "We need your name for the signature ✍️",
        7: "Add a memory to make this letter truly unforgettable ✦"
    };

    const requiredFields = {
        1: formData.relationship,
        2: formData.occasion,
        3: formData.tone,
        4: formData.length,
        5: formData.recipientName,
        6: formData.senderName,
        7: formData.memories
    };

    const handleNext = () => {
        const currentValue = requiredFields[currentStep];

        if (!currentValue || !currentValue.trim()) {
            setError(stepMessages[currentStep]);
            return;
        }

        setError("");

        if (currentStep < 7) {
            setCurrentStep(currentStep + 1);
        } else {
            onGenerate();
        }
    };

    const handlePrevious = () => {
        setError("");
        setCurrentStep(currentStep - 1);
    };

    return (
        <div className="mt-12">
            {/* Validation message */}
            <AnimatePresence mode="wait">
                {error && (
                    <motion.div
                        key={error}
                        initial={{
                            opacity: 0,
                            y: 8,
                            scale: 0.97
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                            scale: 1
                        }}
                        exit={{
                            opacity: 0,
                            y: -5,
                            scale: 0.97
                        }}
                        transition={{
                            duration: 0.25
                        }}
                        className="
                            mb-6
                            flex
                            items-center
                            justify-center
                            gap-2
                            text-center
                            text-sm
                            font-serif
                            italic
                            text-[#751015]
                            bg-[#751015]/10
                            border
                            border-[#751015]/25
                            py-2
                            px-5
                            rounded-full
                            w-fit
                            mx-auto
                        "
                    >
                        <span>✦</span>
                        <span>{error}</span>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Navigation buttons */}
            <div className="flex justify-between items-center">
                <button
                    type="button"
                    disabled={currentStep === 1}
                    onClick={handlePrevious}
                    className="
                        px-6
                        py-3
                        rounded-full
                        bg-[#FAF4EE]
                        hover:bg-[#E8D9C9]
                        text-[#603820]
                        border
                        border-[#603820]/25
                        font-display
                        text-xs
                        md:text-sm
                        tracking-widest
                        uppercase
                        transition-all
                        duration-200
                        disabled:opacity-40
                        disabled:cursor-not-allowed
                        cursor-pointer
                        shadow-sm
                    "
                >
                    ← Previous
                </button>

                <motion.button
                    type="button"
                    onClick={handleNext}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="
                        px-8
                        py-3.5
                        rounded-full
                        bg-gradient-to-r
                        from-[#4A0B0F]
                        via-[#751015]
                        to-[#4A0B0F]
                        text-[#F0E0D0]
                        border
                        border-[#C5A059]/40
                        font-display
                        text-xs
                        md:text-sm
                        tracking-widest
                        uppercase
                        font-semibold
                        shadow-md
                        shadow-[#4A0B0F]/20
                        hover:shadow-lg
                        hover:shadow-[#4A0B0F]/30
                        transition-all
                        cursor-pointer
                    "
                >
                    {currentStep === 7
                        ? "Pen Letter ✒️"
                        : "Continue →"}
                </motion.button>
            </div>
        </div>
    );
}

export default WizardNavigation;