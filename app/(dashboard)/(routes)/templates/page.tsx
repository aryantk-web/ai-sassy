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
    <div className="min-h-screen bg-gradient-to-r from-gray-800 via-gray-900 to-black flex flex-col items-center py-12 px-4">
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
          <Card
            key={template.title}
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
            {expandedTemplate === template.title && (
              <div className="mt-4 text-left w-full text-gray-800">
                <pre className="whitespace-pre-wrap">{template.content}</pre>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TemplatesPage;
