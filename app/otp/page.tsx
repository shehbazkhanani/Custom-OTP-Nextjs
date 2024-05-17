"use client";
import React, { useEffect } from "react";

const Otp = () => {
  useEffect(() => {
    const otpInputs =
      document.querySelectorAll<HTMLInputElement>(".otp__digit");

    const handleInput = (event: KeyboardEvent) => {
      const current = event.target as HTMLInputElement;
      const index = parseInt(current.classList[1]?.split("__")[2] || "1") - 1;
      const next = otpInputs[index + 1] as HTMLInputElement;
      const prev = otpInputs[index - 1] as HTMLInputElement;

      if (event.key >= "0" && event.key <= "9") {
        current.value = event.key;
        if (next) {
          next.focus();
        }
      } else if (event.key === "Backspace") {
        current.value = "";
        if (prev) {
          prev.focus();
        }
      }

      // Collect final OTP
      let finalKey = "";
      otpInputs.forEach((input) => {
        finalKey += input.value;
      });

      // Update OTP display element
      const otpElement = document.querySelector("#_otp") as HTMLElement | null;
      if (otpElement) {
        otpElement.textContent = finalKey;
        if (finalKey.length === 6) {
          otpElement.classList.replace("_notok", "_ok");
        } else {
          otpElement.classList.replace("_ok", "_notok");
        }
      }
    };

    otpInputs.forEach((input) => {
      input.addEventListener("keydown", handleInput);
    });

    // Cleanup event listeners on unmount
    return () => {
      otpInputs.forEach((input) => {
        input.removeEventListener("keydown", handleInput);
      });
    };
  }, []);

  const loading = false;

  if (loading) {
    return <p>Loading...</p>;
  } else {
    return (
      <div className="flex flex-col items-center m-auto h-full lg:h-[100vh]">
        <div className="absolute top-[50%] left-[50%] -translate-x-2/4 -translate-y-2/4 flex flex-col items-center">
          <div className="rounded-xl w-[500px] flex flex-col items-center m-8 p-4 space-y-6 bg-transparent">
            <div className="rounded-xl w-[500px] flex flex-col items-center m-8 p-4 space-y-6 bg-transparent">
              <span className="text-black text-center text-3xl font-bold m-0 p-0 gap-0">
                OTP VERIFICATION
              </span>
              <span className="text-slate-700 text-center text-base leading-none">
                An OTP has been sent to shehbazkhanani@gmail.com
              </span>
              <div className="otp-input-fields w-full">
                {[...Array(6)].map((_, i) => (
                  <input
                    key={i}
                    type="text"
                    maxLength={1}
                    className={`otp__digit otp__field__${i + 1}`}
                  />
                ))}
              </div>
              <div id="_otp" className="_notok"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Otp;
