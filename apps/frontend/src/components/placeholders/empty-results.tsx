"use client";

import Image from "next/image";
import { Spinner } from "../ui/spinner";
import { motion } from "motion/react";
import { Button } from "../ui/button";

interface IEmptyResultProps {
  imageUrl: any;
  message: string;
  isRefreshButtonEnabled?: boolean;
  extraInfo?: string;
  alt?: string;
  button?: { onClick: () => void; content?: string };
}

function EmptyResult({
  alt,
  message,
  imageUrl,
  extraInfo,
  button,
  isRefreshButtonEnabled = false,
}: IEmptyResultProps) {
  return (
    <motion.div
      initial={{ scaleX: 0, scaleY: 0 }}
      animate={{ scaleX: 1, scaleY: 1 }}
      transition={{ type: "spring" }}
      className="max-w-[200px] mx-auto"
    >
      <div className="flex flex-col items-center justify-center">
        <Image
          alt={alt ?? "image"}
          src={imageUrl}
          className="mx-auto mt-6 h-[180px] w-[180px]"
        />
        <p className="text-nowrap text-2xl">{message}</p>
        {extraInfo && (
          <p className="text-nowrap text-center text-lg">{`(${extraInfo})`}</p>
        )}
        {isRefreshButtonEnabled && (
          <Button className="rounded-full" onClick={button?.onClick}>
            {button?.content ?? "Refresh"}
          </Button>
        )}
      </div>
    </motion.div>
  );
}

export default EmptyResult;
