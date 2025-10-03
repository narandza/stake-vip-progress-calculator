"use client";

import { z } from "zod";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { CopyCheckIcon, CopyIcon } from "lucide-react";

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { stripHtml, writeMessage } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { useCopy } from "@/hooks/use-copy";
import { Button } from "@/components/ui/button";
import { calculateProgress } from "@/lib/calculate";
import {
  LanguageEnum,
  languageOptions,
  LanguageType,
} from "@/constants/language";
import { TierEnum, VipTier } from "@/constants/vip-tiers";
import Image from "next/image";
import { DEFAULT_ICON_HEIGHT, DEFAULT_ICON_WIDTH } from "@/constants/constants";

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
  const { copied, copy } = useCopy();

  const storedLanguage =
    (typeof window !== "undefined" &&
      (localStorage.getItem("preferredLanguage") as LanguageType)) ||
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

  useEffect(() => {
    const storedLanguage = localStorage.getItem("preferredLanguage");
    if (storedLanguage) {
      form.setValue("language", storedLanguage as LanguageType);
    }
  }, [form]);

  useEffect(() => {
    const subscription = form.watch((values) => {
      if (values.language) {
        localStorage.setItem("preferredLanguage", values.language);
      }
    });

    return () => subscription.unsubscribe();
  }, [form]);

  return (
    <div className="">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-10 flex flex-col mt-5 "
        >
          <FormField
            control={form.control}
            name="currentPercentage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Current VIP Progress Percentage:</FormLabel>
                <FormControl>
                  <Input
                    autoFocus
                    type="number"
                    step="any"
                    placeholder="Enter current VIP progress percentage"
                    className=" [appearance:textfield] 
    [&::-webkit-outer-spin-button]:appearance-none 
    [&::-webkit-inner-spin-button]:appearance-none"
                    {...field}
                  />
                </FormControl>
                <FormDescription>Your current VIP progress</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="tier"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Current VIP Rank:</FormLabel>
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
                          <Image
                            alt="icon"
                            src={`/icons/${tier.icon}`}
                            width={DEFAULT_ICON_WIDTH}
                            height={DEFAULT_ICON_HEIGHT}
                          />
                          {tier.name}
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
          <FormField
            control={form.control}
            name="language"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Language</FormLabel>
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
                          {language.label}
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

          <div className="flex flex-col gap-2">
            <Button
              type="submit"
              size="lg"
              className="cursor-pointer"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? "Calculating..." : "Calculate"}
            </Button>
            <Button variant="outline" onClick={() => form.reset()}>
              Reset
            </Button>
          </div>
        </form>
      </Form>

      {wagerResult && (
        <Card className="mt-10 flex justify-center text-center">
          <CardHeader>
            <CardTitle>
              ${wagerResult.remainingToNextTier.toLocaleString()}
            </CardTitle>
            <CardDescription>
              Remaining wager amount to next VIP rank
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    className="w-full flex justify-center items-center text-center"
                    onClick={() => copy(message)}
                  >
                    {copied ? (
                      <>
                        Copied <CopyCheckIcon />
                      </>
                    ) : (
                      <>
                        Copy Message <CopyIcon />
                      </>
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="max-w-xs break-words">
                  {stripHtml(message)}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};
