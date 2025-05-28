"use client";

import { Button } from "@/components/ui/button";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { TierEnum, VipTier } from "@/vip-tiers";
import { zodResolver } from "@hookform/resolvers/zod";
import { SelectValue } from "@radix-ui/react-select";
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
      tier: "None",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
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
  );
};
