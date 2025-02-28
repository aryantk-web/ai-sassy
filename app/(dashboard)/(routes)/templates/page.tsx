"use client"; 

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Edit, FileText, Code, Briefcase, User, Mail } from "lucide-react";

const templates = [
  {
    title: "Professional Email",
    description: "A template for crafting formal and professional emails.",
    icon: Briefcase,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
    content: `
      Subject: Professional Inquiry

      Dear [Recipient's Name],

      I hope this email finds you well. I am writing to discuss [topic or reason for writing]. Please let me know a convenient time for us to discuss this matter further.

      Best regards,
      [Your Name]
    `,
  },
  {
    title: "Project Update",
    description: "A template for providing updates on ongoing projects.",
    icon: FileText,
    color: "text-green-600",
    bgColor: "bg-green-100",
    content: `
      Subject: Project Update

      Hi [Recipient's Name],

      I wanted to give you an update on the current status of [project name]. We have made significant progress, including [brief summary of progress]. Please let me know if you have any questions.

      Best,
      [Your Name]
    `,
  },
  {
    title: "Meeting Request",
    description: "A template for requesting meetings with colleagues or clients.",
    icon: Edit,
    color: "text-yellow-600",
    bgColor: "bg-yellow-100",
    content: `
      Subject: Meeting Request

      Dear [Recipient's Name],

      I would like to schedule a meeting to discuss [topic]. Please let me know your availability over the next few days.

      Thank you,
      [Your Name]
    `,
  },
  {
    title: "Code Review",
    description: "A template for requesting or providing code reviews.",
    icon: Code,
    color: "text-purple-600",
    bgColor: "bg-purple-100",
    content: `
      Subject: Code Review Request

      Hi [Recipient's Name],

      I have completed the [feature/issue] implementation and would appreciate your feedback. Please review the following code: [link to code].

      Thanks,
      [Your Name]
    `,
  },
  {
    title: "User Onboarding",
    description: "A template for onboarding new users or clients.",
    icon: User,
    color: "text-teal-600",
    bgColor: "bg-teal-100",
    content: `
      Subject: Welcome to [Company Name]

      Dear [Recipient's Name],

      Welcome aboard! We are excited to have you join us. Here are the next steps to get started: [onboarding instructions].

      Looking forward to working with you,
      [Your Name]
    `,
  },
  {
    title: "Follow-Up Email",
    description: "A template for sending follow-up emails after meetings or discussions.",
    icon: Mail,
    color: "text-red-600",
    bgColor: "bg-red-100",
    content: `
      Subject: Follow-Up on Our Recent Meeting

      Hi [Recipient's Name],

      I wanted to follow up on our recent meeting regarding [topic]. It was great to discuss [specific points], and I look forward to our next steps.

      Best regards,
      [Your Name]
    `,
  },
];

const TemplatesPage = () => {
  const [expandedTemplate, setExpandedTemplate] = useState<string | null>(null); // Allow string or null
  const router = useRouter();

  const toggleExpand = (title: string) => {
    setExpandedTemplate(expandedTemplate === title ? null : title);
  };

  return (
    <div className="min-h-screen bg-[#1E293B] flex flex-col items-center py-12 px-4">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-extrabold text-white mb-4">
          Email Templates
        </h1>
        <p className="text-lg text-gray-300">
          Explore a variety of email templates designed for different purposes.
        </p>
      </div>

      {/* Templates Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-6xl">
        {templates.map((template) => (
          <React.Fragment key={template.title}>
            {expandedTemplate === template.title && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div className="fixed inset-0 bg-black/50" onClick={() => setExpandedTemplate(null)} />
                <div className="relative bg-[#111827] border-4 border-[#BD52C2] shadow-lg rounded-3xl p-6 sm:p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                  <button 
                    onClick={() => setExpandedTemplate(null)} 
                    className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                  <div className="mt-2">
                    <div className="flex items-center space-x-3 mb-6">
                      <div className={`p-2 rounded-full ${template.bgColor}`}>
                        <template.icon className={`w-6 h-6 ${template.color}`} />
                      </div>
                      <h3 className="text-2xl font-bold text-white">{template.title}</h3>
                    </div>
                    <div className="bg-[#1E293B] rounded-xl p-6">
                      <pre className="whitespace-pre-wrap text-gray-200 text-base font-mono leading-relaxed">{template.content}</pre>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <Card
              onClick={() => toggleExpand(template.title)}
              className="bg-white shadow-lg rounded-lg hover:shadow-xl transition-shadow cursor-pointer flex flex-col items-center p-6"
            >
              <div className={`p-4 mb-4 rounded-full ${template.bgColor}`}>
                <template.icon className={`w-12 h-12 ${template.color}`} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {template.title}
              </h3>
              <p className="text-gray-600 text-center mb-4">
                {template.description}
              </p>
            </Card>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default TemplatesPage;
