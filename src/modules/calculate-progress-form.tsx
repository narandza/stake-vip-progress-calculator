"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";

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
import { Input } from "@/components/ui/input";
import { TierEnum, VipTier } from "@/constants";
import { Button } from "@/components/ui/button";
import { calculateProgress } from "@/lib/calculate";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { CopyIcon } from "lucide-react";

interface CalculateProgressFormProps {
  tiers: VipTier[];
}

export const CalculateProgressForm = ({
  tiers,
}: CalculateProgressFormProps) => {
  const [wagerResult, setWagerResult] = useState<ReturnType<
    typeof calculateProgress
  > | null>(null);

  const formSchema = z.object({
    currentPercentage: z.coerce
      .number()
      .min(0, { message: "The minimum amount is 0" })
      .max(100, { message: "The maximum amount is 100" }),
    tier: TierEnum,
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currentPercentage: 0,
      tier: "None",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const { currentPercentage, tier } = values;

    const result = calculateProgress({
      percentage: currentPercentage,
      tierName: tier,
    });

    setWagerResult(result);
  };

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
                    type="number"
                    placeholder="Enter current VIP progress percentage"
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
                <FormLabel>Current VIP Tier:</FormLabel>
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

          <Button type="submit" size="lg">
            Calculate
          </Button>
        </form>
      </Form>

      {wagerResult && (
        <div className="flex items-center justify-center gap-x-1  mt-10">
          <Input
            readOnly
            className="cursor-default"
            value={wagerResult.remainingToNextTier.toLocaleString()}
          />
          <CopyIcon className="size-5 cursor-pointer" />
        </div>
      )}
    </div>
  );
};
