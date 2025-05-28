"use client";

import { z } from "zod";
import { toast } from "sonner";
import { useState } from "react";
import { CopyIcon } from "lucide-react";
import { useForm } from "react-hook-form";

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
import { Input } from "@/components/ui/input";
import { TierEnum, VipTier } from "@/constants";
import { Button } from "@/components/ui/button";
import { calculateProgress } from "@/lib/calculate";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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

    setMessage(`I appreciate your patience.
        To reach the next VIP rank, you would have to wager an additional $${result?.remainingToNextTier.toLocaleString()}.`);

    setWagerResult(result);
  };

  const onCopy = () => {
    navigator.clipboard.writeText(message);
    toast.success("Message copied to clipboard.");
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
                    autoFocus
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

          <Button type="submit" size="lg" className="cursor-pointer">
            Calculate
          </Button>
        </form>
      </Form>

      {wagerResult && (
        <Card className="mt-10">
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
                  <Button className="w-full cursor-pointer" onClick={onCopy}>
                    Copy Message <CopyIcon />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>{message}</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};
