"use client";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { TierEnum, VipTier } from "@/vip-tiers";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface CalculateProgressFormProps {
  tiers: VipTier[];
}

export const CalculateProgressForm = ({
  tiers,
}: CalculateProgressFormProps) => {
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
      tier: "none",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
      </form>
    </Form>
  );
};
