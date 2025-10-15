"use client";

import { z } from "zod";
import Image from "next/image";
import { toast } from "sonner";
import twemoji from "twemoji";
import { useForm } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  LanguageEnum,
  languageOptions,
  LanguageType,
} from "@/modules/constants/language";
import {
  DEFAULT_ICON_HEIGHT,
  DEFAULT_ICON_WIDTH,
  STORAGE_KEYS,
} from "@/modules/constants/constants";
import { writeMessage } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { calculateProgress } from "@/lib/calculate";
import { TierEnum, VipTier } from "@/modules/constants/vip-tiers";

import { WagerResultCard } from "./wager-result-card";
import { logEvent } from "@/lib/logEvent";

const formSchema = z.object({
  currentPercentage: z.coerce
    .number()
    .min(0, { message: "The minimum amount is 0" })
    .max(100, { message: "The maximum amount is 100" }),
  tier: TierEnum,
  language: LanguageEnum,
});

interface CalculateProgressFormProps {
  tiers: VipTier[];
}

export const CalculateProgressForm = ({
  tiers,
}: CalculateProgressFormProps) => {
  const [wagerResult, setWagerResult] = useState<ReturnType<
    typeof calculateProgress
  > | null>(null);
  const [message, setMessage] = useState("");

  const storedLanguage =
    (typeof window !== "undefined" &&
      (localStorage.getItem(STORAGE_KEYS.preferredLanguage) as LanguageType)) ||
    "en";

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currentPercentage: 0,
      tier: "None",
      language: storedLanguage,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const { currentPercentage, tier, language } = values;

    const result = calculateProgress({
      percentage: currentPercentage,
      tierName: tier,
    });

    if (!result) {
      toast.error("Something went wrong.");
      return;
    }

    logEvent("calculate", language);

    setMessage(
      writeMessage({
        tier,
        language,
        currentPercentage,
        tierGap: result.tierGap,
        nextTier: result.nextTier,
        remainingToNextTier: result.remainingToNextTier,
      })
    );

    setWagerResult(result);
  };

  const handleReset = () => {
    const currentLanguage = form.getValues("language");

    form.reset({
      currentPercentage: 0,
      tier: "None",
      language: currentLanguage,
    });

    localStorage.setItem(STORAGE_KEYS.preferredLanguage, currentLanguage);
  };

  useEffect(() => {
    const storedLanguage = localStorage.getItem(STORAGE_KEYS.preferredLanguage);
    if (storedLanguage) {
      form.setValue("language", storedLanguage as LanguageType);
    }
  }, [form]);

  useEffect(() => {
    const subscription = form.watch((values) => {
      if (values.language) {
        localStorage.setItem(STORAGE_KEYS.preferredLanguage, values.language);
      }
    });

    return () => subscription.unsubscribe();
  }, [form]);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, []);

  useEffect(() => {
    const lang = localStorage.getItem(STORAGE_KEYS.preferredLanguage) || "en";
    logEvent("visit", lang as LanguageType);
  }, []);

  return (
    <div className="flex flex-col gap-y-10">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 flex flex-col mt-5 "
        >
          {/* Current Percentage form field */}
          <FormField
            control={form.control}
            name="currentPercentage"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-medium">
                  Current VIP Progress Percentage:
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    ref={(e) => {
                      field.ref(e);
                      inputRef.current = e;
                    }}
                    type="number"
                    step="any"
                    autoFocus
                    placeholder="Enter current VIP progress percentage"
                    onFocus={(e: React.FocusEvent<HTMLInputElement>) => {
                      e.target.select();
                    }}
                    className=" [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                </FormControl>
                <FormDescription>Your current VIP progress</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* VIP rank select form field */}
          <FormField
            control={form.control}
            name="tier"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-medium">
                  Current VIP Rank:
                </FormLabel>
                <FormControl className="w-full ">
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                    name={field.name}
                  >
                    <SelectTrigger
                      onBlur={field.onBlur}
                      ref={field.ref}
                      className="w-full"
                    >
                      <SelectValue placeholder="Select your current VIP rank" />
                    </SelectTrigger>
                    <SelectContent>
                      {tiers.map((tier) => (
                        <SelectItem
                          key={tier.name}
                          value={tier.name}
                          className="capitalize"
                        >
                          <div className="flex items-center justify-center gap-x-2 text-md">
                            <Image
                              alt="icon"
                              src={`/icons/${tier.icon}`}
                              width={DEFAULT_ICON_WIDTH}
                              height={DEFAULT_ICON_HEIGHT}
                              className="size-4"
                            />
                            {tier.name}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormDescription>Your current VIP rank</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Language Select Form Field */}
          <FormField
            control={form.control}
            name="language"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-medium">Language</FormLabel>
                <FormControl>
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                    name={field.name}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      {languageOptions.map((language, index) => (
                        <SelectItem key={index} value={language.value}>
                          <div className="flex items-center justify-center gap-x-2 text-lg">
                            <span
                              className="size-5"
                              dangerouslySetInnerHTML={{
                                __html: twemoji.parse(language.icon),
                              }}
                            />
                            {`${language.label}`}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormDescription>
                  Choose your preferred language
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Form Buttons */}
          <div className="flex flex-col gap-2">
            <Button
              type="submit"
              size="lg"
              className="cursor-pointer"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? "Calculating..." : "Calculate"}
            </Button>
            <Button
              variant="secondary"
              size="sm"
              className=" cursor-pointer"
              onClick={handleReset}
            >
              Reset
            </Button>
          </div>
        </form>
      </Form>

      {wagerResult && (
        <WagerResultCard
          message={message}
          language={form.getValues("language")}
          remainingToNextTier={wagerResult.remainingToNextTier}
        />
      )}
    </div>
  );
};
