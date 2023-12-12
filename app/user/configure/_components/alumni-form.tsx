"use client";

import { useEffect, useReducer, useState } from "react";

import { Separator } from "~/app/components/ui/separator";
import { AlumniRegistrationSchema } from "../schemas";
import { AlumniStep1 } from "./steps/step1";
import { AlumniStep2 } from "./steps/step2";
import { EveryoneStep3 } from "./steps/step3";
import { EveryoneStep4 } from "./steps/step4";
import { AlumniStep5 } from "./steps/step5";

export const AlumniForm = ({ email }: { email: string }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, updateData] = useReducer(
    (
      state: AlumniRegistrationSchema,
      update: Partial<AlumniRegistrationSchema>,
    ) => ({
      ...state,
      ...update,
    }),
    {
      firstName: "",
      secondName: "",
      lastName: "",
      phoneNumber: "",
      isAlumni: false,
      regulationAgreement: false,
      class: {
        grade: "" as any, // zod does validation on this
        parallel: "" as any, // ...and this
      },
      allergies: "",
      tShirtId: -10,
      technologies: "",
      isLookingForTeam: true,
      question1: "",
      question2: "",
    } satisfies AlumniRegistrationSchema,
  );

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  function handleNext(stepData: Partial<AlumniRegistrationSchema>) {
    updateData(stepData);
    setCurrentStep((prev) => prev + 1);
  }

  function handlePrev() {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  }

  return (
    <div className="space-y-1">
      <AlumniStep1
        className={currentStep === 1 ? "" : "hidden"}
        email={email}
        initialData={formData}
        onPrev={handlePrev}
        onNext={handleNext}
      />
      <AlumniStep2
        className={currentStep === 2 ? "" : "hidden"}
        email={email}
        initialData={formData}
        onPrev={handlePrev}
        onNext={handleNext}
      />
      <EveryoneStep3
        className={currentStep === 3 ? "" : "hidden"}
        email={email}
        initialData={formData}
        onPrev={handlePrev}
        onNext={handleNext}
      />
      <EveryoneStep4
        className={currentStep === 4 ? "" : "hidden"}
        email={email}
        isAlumni={true}
        initialData={formData}
        onPrev={handlePrev}
        onNext={handleNext}
      />
      <AlumniStep5
        className={currentStep >= 5 ? "" : "hidden"}
        email={email}
        isAlumni={true}
        initialData={formData}
        onPrev={handlePrev}
        onNext={handleNext}
      />
      <div className="py-5">
        <Separator />
      </div>
      {/* FIXME: hardcoded count */}
      <p className="text-center text-sm text-muted-foreground">
        Стъпка {currentStep}/5
      </p>
      <p className="text-center text-sm text-muted-foreground">
        При проблеми с регистрацията се свържете с нас на адрес{" "}
        <a
          href="mailto:hacktues@elsys-bg.org"
          className="font-medium underline underline-offset-4"
        >
          hacktues@elsys-bg.org
        </a>
      </p>
    </div>
  );
};
