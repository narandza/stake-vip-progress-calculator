"use client";

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
    currentPercentage: z.number(),
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
    <div className="">
      {tiers.map((tier) => (
        <div key={tier.name} className="">
          {tier.name} Tier - Requirement: {tier.requirement}$
        </div>
      ))}
    </div>
  );
};
