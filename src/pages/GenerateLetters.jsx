import { useState } from "react";
import GeneratorLayout from "../components/generator/GeneratorLayout";
import ProgressBar from "../components/generator/ProgressBar";
import RelationshipStep from "../components/generator/RelationshipStep";
import WizardNavigation from "../components/generator/WizardNavigation";
import OccasionStep from "../components/generator/OccasionStep";
import WritingStyleStep from "../components/generator/WritingStyleStep";
import LengthStep from "../components/generator/LengthStep";
import RecipientStep from "../components/generator/RecipientStep";
import SenderStep from "../components/generator/SenderStep";
import MemoriesStep from "../components/generator/MemoriesStep";
import HeartLoader from "../components/loading/HeartLoader";
import AnimatedBackground from "../components/common/AnimatedBackground";
import { generateLetter } from "../services/LetterService";
import { useNavigate } from "react-router-dom";

function GenerateLetters() {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [generatedLetter, setGeneratedLetter] = useState(null);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    relationship: "",
    occasion: "",
    tone: "",
    length: "",
    recipientName: "",
    recipientNickname: "",
    senderName: "",
    signatureStyle: "Forever Yours,",
    memories: "",
  });

  async function handleGenerate() {
    try {
      setLoading(true);
      setErrorMessage("");

      const request = {
        senderName: formData.senderName,
        receiverName: formData.recipientName,
        receiverNickname: formData.recipientNickname,
        relation: formData.relationship,
        occasion: formData.occasion,
        tone: formData.tone,
        length: formData.length,
        signatureStyle: formData.signatureStyle,
        memories: formData.memories,
      };

      const result = await generateLetter(request);
      setGeneratedLetter(result);

      navigate(`/letters/${result.id}`, {
        state: {
          letter: result,
        },
      });
    } catch (error) {
      console.error("Failed to generate letter:", error);
      setErrorMessage(
        error.response?.data?.message ||
          "Failed to craft letter. Please check your backend connection."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative min-h-screen">
      <AnimatedBackground />

      <GeneratorLayout>
        <ProgressBar currentStep={currentStep} />

        <div className="mt-12">
          {currentStep === 1 && (
            <RelationshipStep formData={formData} setFormData={setFormData} />
          )}

          {currentStep === 2 && (
            <OccasionStep formData={formData} setFormData={setFormData} />
          )}

          {currentStep === 3 && (
            <WritingStyleStep formData={formData} setFormData={setFormData} />
          )}

          {currentStep === 4 && (
            <LengthStep formData={formData} setFormData={setFormData} />
          )}

          {currentStep === 5 && (
            <RecipientStep formData={formData} setFormData={setFormData} />
          )}

          {currentStep === 6 && (
            <SenderStep formData={formData} setFormData={setFormData} />
          )}

          {currentStep === 7 && (
            <MemoriesStep formData={formData} setFormData={setFormData} />
          )}

          <WizardNavigation
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            formData={formData}
            onGenerate={handleGenerate}
          />

          {errorMessage && (
            <div className="mt-8 p-4 rounded-2xl bg-[#751015]/10 border border-[#751015]/30 text-[#4A0B0F] text-center text-sm font-serif italic backdrop-blur-md">
              ✦ {errorMessage}
            </div>
          )}
        </div>

        <HeartLoader loading={loading} />

        {generatedLetter && (
          <div className="mt-10 rounded-2xl bg-[#FAF4EE] border border-[#603820]/20 p-8 text-[#000000] shadow-lg">
            <h2 className="font-display text-2xl font-bold mb-4 text-[#000000]">
              {generatedLetter.title}
            </h2>
            <pre className="letter-font-garamond text-xl font-medium whitespace-pre-wrap leading-relaxed text-[#000000]">
              {generatedLetter.content}
            </pre>
          </div>
        )}
      </GeneratorLayout>
    </div>
  );
}

export default GenerateLetters;