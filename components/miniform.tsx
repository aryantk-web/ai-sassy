"use client";

import { useRouter } from 'next/navigation';
import { useForm, FormProvider, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormField, FormItem, FormControl } from "@/components/ui/form";
import { useEffect, useState } from 'react';
import { useAuth } from '@clerk/nextjs';
import { LoadingOverlay } from "@/components/ui/loading-overlay";

interface FormValues {
  sender: string;
  receiver: string;
  content: string;
  tone: string;
  length: string;
}

interface MiniFormProps {
  className?: string;
}

const MiniForm: React.FC<MiniFormProps> = ({ className }) => {
  const router = useRouter();
  const formMethods = useForm<FormValues>({
    defaultValues: {
      sender: "",
      receiver: "",
      content: "",
      tone: "Formal",
      length: "Short"
    }
  });
  const { control, getValues, reset } = formMethods;
  const { userId } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    try {
      setIsLoading(true);
      const formData = getValues();
      sessionStorage.setItem('formData', JSON.stringify(formData));

      // Redirect to conversation page
      await router.push(`/conversation?content=${encodeURIComponent(formData.content)}&tone=${encodeURIComponent(formData.tone)}&length=${encodeURIComponent(formData.length)}`);

    } catch (error) {
      console.error('Error:', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const savedFormData = sessionStorage.getItem('formData');
    if (savedFormData) {
      reset(JSON.parse(savedFormData));
    }
  }, [reset]);

  const inputClasses = "border-gray-600 bg-gray-800 rounded-md shadow-md text-white py-2 md:py-2 lg:py-3 px-2 md:px-3 lg:px-4 text-base md:text-lg w-full focus:ring-2 focus:ring-purple-500 focus:border-transparent";
  const selectClasses = "border-gray-600 bg-gray-800 rounded-md shadow-md text-white py-2 md:py-4 lg:py-5 px-3 md:px-4 lg:px-5 text-base md:text-lg w-full focus:ring-2 focus:ring-purple-500 focus:border-transparent";

  return (
    <div className={`gradient-border-wrapper ${className}`}>
      {isLoading && <LoadingOverlay message="Preparing your email generation..." />}
      <div className={`relative ${className} h-auto md:h-[800px] lg:h-[900px] xl:h-[1000px] w-full md:w-[80%] lg:w-[70%] xl:w-[60%]`}>        

        <FormProvider {...formMethods}>
          <div className="w-full h-full max-w-7xl mx-auto p-4 md:p-12 lg:p-16 bg-black text-white rounded-lg relative">
            {/* Inner gradient border */}
            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 opacity-20" />

            <form className="space-y-4 md:space-y-8 w-full h-full relative flex flex-col">
              {/* Email Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <FormField
                  name="sender"
                  control={control}
                  render={() => (
                    <FormItem>
                      <FormControl>
                        <Controller
                          name="sender"
                          control={control}
                          render={({ field }) => (
                            <Input
                              {...field}
                              placeholder="Sender's Email"
                              className={inputClasses}
                            />
                          )}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  name="receiver"
                  control={control}
                  render={() => (
                    <FormItem>
                      <FormControl>
                        <Controller
                          name="receiver"
                          control={control}
                          render={({ field }) => (
                            <Input
                              {...field}
                              placeholder="Receiver's Email"
                              className={inputClasses}
                            />
                          )}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              {/* Content Textarea */}
              <FormField
                name="content"
                control={control}
                render={() => (
                  <FormItem className="flex-grow">
                    <FormControl>
                      <Controller
                        name="content"
                        control={control}
                        render={({ field }) => (
                          <textarea
                            {...field}
                            placeholder="Email Content"
                            className={`${inputClasses} h-32 md:h-[400px] lg:h-[350px] xl:h-[400px] resize-none`}
                          />
                        )}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Tone and Length Selectors */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  name="tone"
                  control={control}
                  render={() => (
                    <FormItem>
                      <FormControl>
                        <Controller
                          name="tone"
                          control={control}
                          defaultValue="Formal"
                          render={({ field }) => (
                            <select {...field} className={selectClasses}>
                              <option value="Formal">Formal</option>
                              <option value="Informal">Informal</option>
                              <option value="Professional">Professional</option>
                              <option value="Casual">Casual</option>
                              <option value="Inspirational">Inspirational</option>
                            </select>
                          )}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  name="length"
                  control={control}
                  render={() => (
                    <FormItem>
                      <FormControl>
                        <Controller
                          name="length"
                          control={control}
                          defaultValue="Short"
                          render={({ field }) => (
                            <select {...field} className={selectClasses}>
                              <option value="Short">Short</option>
                              <option value="Medium">Medium</option>
                              <option value="Long">Long</option>
                            </select>
                          )}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              {/* Submit Button */}
              <Button
                type="button"
                onClick={handleClick}
                disabled={isLoading}
                className="w-full py-2 md:py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white text-base md:text-lg font-semibold rounded-md transition-all duration-200 transform hover:scale-[1.02]"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    <span className="text-sm md:text-base">Generating...</span>
                  </div>
                ) : (
                  "Generate Email"
                )}
              </Button>
            </form>
          </div>
        </FormProvider>
      </div>
    </div>
  );
};

export default MiniForm;