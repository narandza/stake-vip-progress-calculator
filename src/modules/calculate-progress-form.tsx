"use client";

import { z } from "zod";
import { toast } from "sonner";
import { useState } from "react";
import { CopyCheckIcon, CopyIcon } from "lucide-react";
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

const formSchema = z.object({
  currentPercentage: z.coerce
    .number()
    .min(0, { message: "The minimum amount is 0" })
    .max(100, { message: "The maximum amount is 100" }),
  tier: TierEnum,
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
  const [copied, setCopied] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currentPercentage: 0,
      tier: "None",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setCopied(false);
    const { currentPercentage, tier } = values;

    const result = calculateProgress({
      percentage: currentPercentage,
      tierName: tier,
    });

    if (!result) {
      toast.error("Something went wrong.");
      return;
    }

    setMessage(
      `Thank you for your patience.\n\nFrom what I can see you are ${currentPercentage}% towards your ${
        result.nextTier
      } VIP level, and you need to wager a total of $${result.tierGap.toLocaleString()} to get from ${tier} to ${
        result.nextTier
      } VIP, that means that you have to wager $${result.remainingToNextTier.toLocaleString()} more to get to the next VIP level.\n\nPlease keep in mind that sports bets count 3x more toward your wagering requirements.\n\nTo estimate how many sports bets you'd need to place to reach the next level, simply divide the required wagering amount by 3.\n\nIf you're placing a mix of sports and casino bets, the best way to track your total wagered amount is by checking your transaction history.\n\nYou can see how to calculate that by yourself so that you can keep track of your progress:\n\nADD_ARTICLE\n\nLet us know if there is anything else that we can assist you with, we are here for you 24/7.\n\nWish you a lovely day!​`
    );

    setWagerResult(result);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(message);
    setCopied(true);
    toast.success("Message copied to clipboard.");
    setTimeout(() => setCopied(false), 2000);
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
                    step="any"
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
        <Card className="mt-10 flex justify-center">
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
                    className="max-w-xs whitespace-pre-wrap break-words"
                    onClick={handleCopy}
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
                  {message}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};
