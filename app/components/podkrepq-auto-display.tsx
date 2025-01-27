"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Globe } from "lucide-react";

import { getHackathonById } from "../_configs/archive";
import { Podkrepqsht } from "../_configs/podkrepq";
import { cn } from "../utils";
import { Button } from "./ui/button";
import { Card, CardContent, CardTitle } from "./ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Separator } from "./ui/separator";

const readMoreClasses =
  "rounded-sm font-bold text-white ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";
const readMoreText = "Покажи повече";

export default function PodkrepqAutoDisplay({
  podkrepqshti,
  imagePriority,
}: {
  podkrepqshti: Podkrepqsht[];
  imagePriority?: boolean;
}) {
  const [liveIndex, setLiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const nextIndex = liveIndex < podkrepqshti.length - 1 ? liveIndex + 1 : 0;
  const prevIndex = liveIndex === 0 ? podkrepqshti.length - 1 : liveIndex - 1;
  const prevPervIndex =
    prevIndex === 0 ? podkrepqshti.length - 1 : prevIndex - 1;
  const nextNextIndex = nextIndex < podkrepqshti.length - 1 ? nextIndex + 1 : 0;

  useEffect(() => {
    if (isPaused) return;
    const intervalId = setInterval(() => {
      setLiveIndex((prevIndex) =>
        prevIndex === podkrepqshti.length - 1 ? 0 : prevIndex + 1,
      );
    }, 5000);
    return () => clearInterval(intervalId);
  }, [liveIndex, podkrepqshti.length, isPaused]);

  return (
    <div className="flex flex-wrap items-center justify-center align-middle">
      <ul className="relative mx-auto mt-20 w-64 sm:w-72 md:w-80 lg:w-96">
        <div className="pb-[50%] pt-[20%]">
          {podkrepqshti.map((podkrepqsht, index) => (
            <PodkrepqLogo
              key={podkrepqsht.name}
              podkrepqsht={podkrepqsht}
              index={index}
              prevIndex={prevIndex}
              liveIndex={liveIndex}
              nextIndex={nextIndex}
              nextNextIndex={nextNextIndex}
              prevPrevIndex={prevPervIndex}
              onClick={() => setLiveIndex(index)}
              priority={
                [prevIndex, liveIndex, nextIndex].includes(index) &&
                imagePriority
              }
            />
          ))}
        </div>
      </ul>
      <div className="ml-10 hidden h-96 items-center md:mt-10 md:flex md:w-[400px] lg:mt-20 lg:w-[600px]">
        <Card className="flex w-full flex-col p-2">
          <CardTitle className="pt-5 text-center text-white">
            {podkrepqshti[liveIndex].name}
          </CardTitle>
          <CardContent className="h-full flex-shrink flex-grow p-5 text-white">
            <div className="h-full">
              {shouldShowDescription(podkrepqshti[liveIndex].description) ? (
                <>
                  <div className="flex h-24 flex-shrink flex-grow flex-col overflow-clip">
                    <div className="inline-flex h-full flex-1 flex-shrink flex-grow flex-col [mask-image:linear-gradient(to_bottom,white,calc(100%-20px),transparent)]">
                      {podkrepqshti[liveIndex].description
                        .split("\n")
                        .map((p, i) =>
                          isHorizontalRule(p) ? (
                            <Separator key={i} />
                          ) : (
                            <p key={i} className="text-white">
                              {p}
                            </p>
                          ),
                        )}
                    </div>
                  </div>
                  <PodkrepqReadMore
                    name={podkrepqshti[liveIndex].name}
                    url={podkrepqshti[liveIndex].url}
                    description={podkrepqshti[liveIndex].description}
                    onOpenChange={setIsPaused}
                  />
                </>
              ) : (
                <div className="flex h-[150px] flex-col items-center justify-center gap-1">
                  <p className="text-center text-xl font-bold">
                    Благодарим на {podkrepqshti[liveIndex].name} за подкрепата!
                  </p>
                  <p>
                    <Link
                      href={podkrepqshti[liveIndex].url}
                      className={readMoreClasses}
                      target="_blank"
                    >
                      {readMoreText}
                    </Link>
                  </p>
                </div>
              )}
            </div>
            <div
              className="flex flex-wrap justify-center align-middle"
              title={`Издания на Hack TUES, които ${podkrepqshti[liveIndex].name} подкрепи`}
            >
              {podkrepqshti[liveIndex].supportedEditions?.map((h) => {
                const hackathon = getHackathonById(h);
                if (hackathon)
                  return (
                    <div className="p-2" key={h}>
                      {hackathon.logo}
                    </div>
                  );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function shouldShowDescription(description?: string) {
  return description && !description.toLowerCase().includes("lorem ipsum");
}

function PodkrepqReadMore({
  name,
  description,
  url,
  onOpenChange,
}: {
  name: string;
  description: string;
  url: string;
  onOpenChange?: (open: boolean) => void;
}) {
  return (
    <Dialog onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <button className={readMoreClasses}>{readMoreText}</button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{name}</DialogTitle>
        </DialogHeader>
        {description
          ?.split("\n")
          .map((p, i) =>
            isHorizontalRule(p) ? <Separator key={i} /> : <p key={i}>{p}</p>,
          )}
        <DialogFooter>
          <Button asChild variant="outline">
            <Link href={url} target="_blank">
              <Globe className="mr-2 h-4 w-4" />
              Уебсайт на {name}
            </Link>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function PodkrepqLogo({
  podkrepqsht,
  index,
  prevIndex,
  liveIndex,
  nextIndex,
  nextNextIndex,
  prevPrevIndex,
  onClick,
  priority,
}: {
  podkrepqsht: Podkrepqsht;
  index: number;
  prevIndex: number;
  liveIndex: number;
  nextIndex: number;
  nextNextIndex: number;
  prevPrevIndex: number;
  onClick: () => void;
  priority?: boolean;
}) {
  return (
    <li
      className={cn(
        "absolute inset-0 my-4 [perspective:800px]",
        index === liveIndex && "z-10",
      )}
      title={podkrepqsht.name}
    >
      <Link
        href={podkrepqsht.url}
        onClick={
          [prevIndex, nextIndex].includes(index)
            ? (e) => {
                e.preventDefault();
                onClick();
              }
            : undefined
        }
        tabIndex={[prevIndex, liveIndex, nextIndex].includes(index) ? 0 : -1}
        className={cn(
          "group z-0 grid aspect-video place-content-center overflow-clip rounded-lg bg-white p-4 opacity-0 shadow-md transition-all duration-700",
          index === prevIndex &&
            "z-10 opacity-50 [transform:rotateX(45deg)_translateY(-130%)] hover:opacity-75",
          index === liveIndex && "z-50 opacity-100 hover:scale-[112.5%]",
          index === nextIndex &&
            "z-10 opacity-50 [transform:rotateX(-45deg)_translateY(130%)] hover:opacity-75",
          index === nextNextIndex &&
            "pointer-events-none opacity-0 [transform:translateY(110%)_rotateX(-90deg)_translateY(100%)]",
          index === prevPrevIndex &&
            "pointer-events-none opacity-0 [transform:translateY(-110%)_rotateX(90deg)_translateY(-100%)]",
          "customClass" in podkrepqsht && `${podkrepqsht.customClass}`,
        )}
        target="_blank"
      >
        <Image
          className={cn(
            "h-[8rem] max-w-[14.2rem] object-contain px-3 py-5 sm:h-[9rem] sm:max-w-[16rem] md:h-[10rem] md:max-w-[17.7rem] lg:h-[12rem] lg:max-w-[21.3rem]",
            index === prevIndex && "z-10",
            index === liveIndex && "z-50",
            index === nextIndex && "z-10 ",
            index === nextNextIndex && "z-0",
            index === prevPrevIndex && "z-0",
          )}
          src={podkrepqsht.logo}
          alt={podkrepqsht.name}
          priority={priority}
        />
      </Link>
    </li>
  );
}

function isHorizontalRule(p: string) {
  return p.startsWith("==");
}
