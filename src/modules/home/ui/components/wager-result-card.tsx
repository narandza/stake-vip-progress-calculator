import { CopyCheckIcon, CopyIcon } from "lucide-react";

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { stripHtml } from "@/lib/utils";
import { useCopy } from "@/hooks/useCopy";
import { Button } from "@/components/ui/button";
import { LanguageType } from "@/modules/constants/language";
import { logEvent } from "@/lib/logEvent";

interface WagerResultCardProps {
  remainingToNextTier: number;
  message: string;
  language: LanguageType;
}

export const WagerResultCard = ({
  message,
  remainingToNextTier,
  language,
}: WagerResultCardProps) => {
  const { copied, copy } = useCopy();

  return (
    <Card className="mt-10 pt-6 border-t animate-in fade-in duration-300 text-center">
      <CardHeader>
        <CardTitle className="text-xl font-bold">
          ${remainingToNextTier.toLocaleString()}
        </CardTitle>
        <CardDescription className="text-xs text-muted-foreground">
          Remaining wager amount to next VIP rank
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                className="w-full flex justify-center items-center text-center"
                onClick={() => {
                  copy(message);
                  if (!copied) logEvent("copy", language);
                }}
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
  );
};
