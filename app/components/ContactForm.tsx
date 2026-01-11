"use client";

import { useEffect, useRef, useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import { Loader, Mail } from "lucide-react";
import Image from "next/image";
import { formSubmission } from "@/actions/formAction";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="btn btn-dark-submit"
      disabled={pending}
    >
      {pending ? (
        <>
          <Loader className="spinner-border spinner-border-sm" />
          <span>Sending...</span>
        </>
      ) : (
        <>
          <Mail size={20} />
          <span>Send</span>
        </>
      )}
    </button>
  );
}

export default function ContactForm() {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);
  const lastStatusRef = useRef<"idle" | "success" | "error">("idle");
  const hideTimerRef = useRef<number | null>(null);
  const [showMessage, setShowMessage] = useState(false);

  const [state, formAction] = useActionState(formSubmission, {
    errors: {
      name: false,
      email: false,
      subject: false,
      message: false,
    },
    status: "idle",
    message: null,
  });

  const { errors, status, message } = state;

  useEffect(() => {
    if (status === "success" && lastStatusRef.current !== "success") {
      formRef.current?.reset();
    }
    lastStatusRef.current = status;
  }, [status]);

  return (
    <div ref={wrapperRef} className="container contact-form" id="contact">
      <div className="row">
        <div className="contact-heading text-center">
          <Image
            width={100}
            height={100}
            src="/images/sunglass.svg"
            alt="Contact"
          />
          <h1 className="contact-title">Say Hello</h1>
          <p className="contact-subtitle">
            Questions<span>, thoughts, collaborations, </span> or professional connections —
            feel free to get in touch.
          </p>
        </div>

        <div className="contact-content">
          <div className="contact-side">
            <img className="image-left-1" src="/images/come-in.svg" alt="Image" />
            <img className="image-left-2" src="/images/crayon.svg" alt="Image" />
            <img className="image-left-3" src="/images/crayon.svg" alt="Image" />
            <img className="image-left-4" src="/images/headset.svg" alt="Image" />
            <img className="image-left-5" src="/images/donut.svg" alt="Image" />
            <img className="image-left-6" src="/images/computer-crash.svg" alt="Image" />
          </div>
          <div className="contact-section">
            <form
              ref={formRef}
              action={async (formData) => {
                await formAction(formData);
                setShowMessage(true);
                if (hideTimerRef.current) {
                  window.clearTimeout(hideTimerRef.current);
                }
                hideTimerRef.current = window.setTimeout(() => {
                  setShowMessage(false);
                }, 3000);
              }}
              className="row list-form"
            >
                
              <div className="col-12 form-group">
                <label className="form-label">Name *</label>
                <input
                  type="text"
                  name="name"
                  className={`form-input ${
                    errors.name ? "is-invalid" : ""
                  }`}
                  placeholder="Your name"
                  autoComplete="off"
                />
                {errors.name && (
                  <div className="invalid-feedback">
                    Please enter a valid name
                  </div>
                )}
              </div>

              <div className="col-12 form-group">
                <label className="form-label">Email *</label>
                <input
                  type="email"
                  name="email"
                  className={`form-input ${
                    errors.email ? "is-invalid" : ""
                  }`}
                  placeholder="Your email"
                  autoComplete="off"
                />
                {errors.email && (
                  <div className="invalid-feedback">
                    Please enter a valid email address
                  </div>
                )}
              </div>

              <div className="col-12 form-group">
                <label className="form-label">Subject *</label>
                <input
                  type="text"
                  name="subject"
                  className={`form-input ${
                    errors.subject ? "is-invalid" : ""
                  }`}
                  placeholder="Subject"
                  autoComplete="off"
                />
                {errors.subject && (
                  <div className="invalid-feedback">
                    Please enter a valid subject
                  </div>
                )}
              </div>

              <div className="col-12 form-group">
                <label className="form-label">Message *</label>
                <textarea
                  name="message"
                  rows={5}
                  className={`form-input ${
                    errors.message ? "is-invalid" : ""
                  }`}
                  placeholder="Your message"
                />
                {errors.message && (
                  <div className="invalid-feedback">
                    Please enter a message at least 3 characters long
                  </div>
                )}
              </div>

              {/* SUBMIT */}
              <div className="col-12">
                <SubmitButton />
              </div>

            </form>
          </div>
          <div className="contact-side">
            <img className="image-right-1" src="/images/baloon.svg" alt="Image" />
            <img className="image-right-2" src="/images/testing.svg" alt="Image" />
            <img className="image-right-3" src="/images/drum.svg" alt="Image" />
            <img className="image-right-4" src="/images/music.svg" alt="Image" />
            <img className="image-right-5" src="/images/caution.svg" alt="Image" />
          </div>
        </div>
      </div>
    </div>
  );
}
