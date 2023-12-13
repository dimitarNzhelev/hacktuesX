"use client";

import { useEffect, useState } from "react";
import { animated, useSpring } from "@react-spring/web";

import { useCountdown } from "./countdowns";

export const Hourglass = ({
  fillAmount,
  ...props
}: { fillAmount: number } & React.ComponentProps<"svg">) => {
  const { ellipseY, ellipseRX, ellipseRY } = useSpring({
    ellipseY: lerp(312, 740, fillAmount),
    ellipseRX: lerp(350, 311.99695, fillAmount),
    ellipseRY: lerpMid(252.12402, 410, 320, fillAmount, 0.9),
  });

  return (
    <svg
      xmlSpace="preserve"
      className="w-full max-w-2xl px-5 md:px-0"
      xmlns="http://www.w3.org/2000/svg"
      clipRule="evenodd"
      fillRule="evenodd"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={1.5}
      viewBox="0 0 715.52008 870"
      {...props}
    >
      <defs>
        <clipPath id="sandTopClip" clipPathUnits="userSpaceOnUse">
          <path d="M358.945 402.363c-3.388.09-1.958 22.797-6.59 19.367-2.564-1.897-6.34-27.94-12.289-34.188-10.135-10.644-247.382-263.01-333.42-354.525 227.044-41.855 462.893-46.805 696.825 1.92C577.012 176.462 369.34 384.925 367.307 411.174c-.218 2.786-6.736-8.854-8.362-8.811z" />
        </clipPath>
        <ellipse
          id="sandTopMotion"
          cx={-33}
          cy={lerpMid(0, 0, 5, fillAmount, 0.9)}
          rx={25}
          ry={lerp(15, 0.00001, fillAmount)}
          fill="none"
          stroke="none"
          display="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <animated.ellipse
          id="sandTop"
          cx={389.29218}
          cy={ellipseY}
          rx={ellipseRX}
          ry={ellipseRY}
          strokeWidth={2.57862}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <animateMotion
            dur="6s"
            repeatCount="indefinite"
            rotate="0"
            calcMode="linear"
          >
            <mpath href="#sandTopMotion" />
          </animateMotion>
        </animated.ellipse>
      </defs>

      <use
        clipPath="url(#sandTopClip)"
        href="#sandTop"
        fill="currentColor"
        className="text-sand"
      />
      <g>
        <path
          d="M710.614 735.481a4.46 4.46 0 014.792 4.096 4.46 4.46 0 01-4.095 4.792c-15.088 1.184-25.907-.978-50.417-22.009-23.047-19.776-59.11-56.986-125.325-125.635-79.48-82.404-113.332-118.485-127.813-138.209-10.524-14.328-11.504-20.804-11.711-28.988a4.463 4.463 0 014.347-4.568 4.46 4.46 0 014.568 4.347c.167 6.786 1.255 12.046 9.981 23.931 14.39 19.6 48.067 55.416 127.044 137.296 65.9 68.329 101.774 105.378 124.714 125.06 21.479 18.43 30.693 20.925 43.915 19.887zM634.324 124.942c-8.83-5.034-26.963-15.186-31.417-17.728-.852-.488-1.344-.8-1.415-.852-1.273-.928-1.52-1.928-1.609-2.199-.574-1.716-.103-3.032.62-4.028.575-.79 1.638-1.905 3.752-1.836 33.81 1.1 73.307 10.012 106.586 15.72a4.46 4.46 0 013.64 5.147 4.46 4.46 0 01-5.145 3.64c-26.664-4.573-57.356-11.263-85.828-14.214 8.192 4.61 16.775 9.453 19.42 11.02 1.078.638 1.638 1.133 1.734 1.228 1.412 1.445 1.312 2.877 1.259 3.51a4.343 4.343 0 01-1.273 2.754c-2.45 2.471-71.239 73.662-135.263 143.489-67.088 73.175-98.387 105.947-112.965 124.287-13.55 17.049-11.515 20.693-11.736 35.018a4.462 4.462 0 01-4.525 4.39 4.464 4.464 0 01-4.39-4.525c.257-16.558-1.986-20.73 13.672-40.429 14.632-18.411 46.034-51.318 113.375-124.764 56.008-61.09 115.66-123.217 131.508-139.628z"
          fill="#fff"
          strokeWidth={0.356603}
        />
        <path
          d="M711.41 114.51a4.46 4.46 0 014.096 4.794 4.46 4.46 0 01-4.793 4.095c-13.262-1.041-23.577.419-45.633 18.428-23.45 19.147-59.263 56.154-122.9 126.416-79.672 87.967-113.41 120.385-127.724 137.363-8.501 10.089-9.421 14.011-9.54 22.448a4.46 4.46 0 01-4.52 4.394 4.457 4.457 0 01-4.394-4.518c.146-10.513 1.045-15.502 11.64-28.069 14.335-17.006 48.123-49.489 127.93-137.602 64.118-70.793 100.242-108.045 123.87-127.338 25.022-20.43 36.922-21.591 51.969-20.41zM623.406 750.289c28.471-2.951 59.164-9.641 85.827-14.215a4.46 4.46 0 015.146 3.64 4.46 4.46 0 01-3.64 5.147c-33.279 5.709-72.776 14.621-106.586 15.72-2.635.087-3.702-1.508-4.2-2.61-.186-.407-1.498-3.311 1.436-5.452.072-.053.564-.365 1.416-.852 4.454-2.542 22.587-12.695 31.417-17.729-15.848-16.41-75.5-78.538-131.508-139.627-67.352-73.457-98.44-106.528-112.904-124.922-15.427-19.613-13.163-23.564-14.033-39.308a4.462 4.462 0 014.205-4.7 4.46 4.46 0 014.696 4.204c.76 13.726-1.305 17.199 12.139 34.295 14.407 18.318 45.385 51.243 112.465 124.408 64.025 69.826 132.814 141.017 135.263 143.488a4.347 4.347 0 011.274 2.754c.052.634.153 2.066-1.26 3.51-.095.096-.655.59-1.732 1.229-2.646 1.567-11.23 6.41-19.42 11.02zM4.211 744.341a4.46 4.46 0 01-4.095-4.793 4.46 4.46 0 014.793-4.095c13.221 1.038 22.436-1.458 43.914-19.887 22.94-19.683 58.814-56.731 124.715-125.06 78.977-81.88 112.654-117.697 127.043-137.296 8.726-11.885 9.814-17.145 9.981-23.932a4.46 4.46 0 014.569-4.347 4.463 4.463 0 014.347 4.568c-.207 8.185-1.188 14.66-11.711 28.989-14.482 19.724-48.334 55.805-127.814 138.208-66.214 68.65-102.277 105.86-125.325 125.636-24.51 21.03-35.329 23.193-50.417 22.01zM81.196 124.914c15.848 16.41 75.5 78.538 131.508 139.627 67.341 73.446 98.744 106.354 113.375 124.765 15.659 19.699 13.416 23.871 13.672 40.428a4.464 4.464 0 01-4.39 4.525 4.462 4.462 0 01-4.525-4.39c-.22-14.324 1.816-17.969-11.735-35.018-14.578-18.34-45.877-51.112-112.965-124.287C142.11 200.738 73.323 129.547 70.873 127.076a4.347 4.347 0 01-1.273-2.754c-.055-.634-.154-2.066 1.258-3.51.096-.096.657-.59 1.733-1.229 2.647-1.567 11.23-6.41 19.421-11.02-28.471 2.951-59.164 9.641-85.827 14.215a4.46 4.46 0 01-5.146-3.64 4.46 4.46 0 013.641-5.148c33.278-5.708 72.776-14.62 106.585-15.72 2.635-.086 3.702 1.51 4.201 2.611.185.407 1.498 3.311-1.437 5.452-.071.053-.564.365-1.416.852-4.454 2.542-22.587 12.695-31.417 17.729z"
          fill="#fff"
          strokeWidth={0.356603}
        />
        <path
          d="M4.807 123.37a4.46 4.46 0 01-4.793-4.095 4.46 4.46 0 014.095-4.793c15.047-1.18 26.947-.02 51.969 20.41 23.628 19.293 59.752 56.546 123.87 127.338 79.807 88.114 113.595 120.596 127.93 137.603 10.595 12.567 11.494 17.555 11.64 28.068a4.457 4.457 0 01-4.393 4.518 4.46 4.46 0 01-4.522-4.393c-.118-8.437-1.038-12.36-9.54-22.448C286.75 388.6 253.013 356.18 173.34 268.214c-63.635-70.261-99.45-107.268-122.9-126.416C28.386 123.79 18.07 122.33 4.808 123.37zM92.115 750.26c-8.19-4.61-16.774-9.452-19.42-11.02-1.077-.638-1.637-1.133-1.733-1.228-1.412-1.444-1.313-2.877-1.259-3.51a4.344 4.344 0 011.273-2.754c2.45-2.47 71.239-73.662 135.263-143.489 67.08-73.164 98.059-106.089 112.466-124.408 13.443-17.095 11.379-20.569 12.138-34.294a4.46 4.46 0 014.697-4.204 4.461 4.461 0 014.204 4.7c-.87 15.744 1.394 19.695-14.032 39.308-14.464 18.394-45.553 51.465-112.904 124.922C156.8 655.373 97.147 717.5 81.3 733.91c8.83 5.034 26.962 15.187 31.416 17.729.853.487 1.345.799 1.416.852 1.273.927 1.52 1.927 1.608 2.198.575 1.716.103 3.032-.62 4.028-.574.79-1.637 1.905-3.752 1.836-33.81-1.099-73.306-10.012-106.585-15.72a4.46 4.46 0 01-3.64-5.147 4.46 4.46 0 015.145-3.64c26.663 4.574 57.356 11.263 85.827 14.214z"
          fill="#fff"
          strokeWidth={0.356603}
        />
      </g>
    </svg>
  );
};

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function lerpMid(a: number, mid: number, b: number, t: number, tMid: number) {
  return t <= tMid
    ? lerp(a, mid, t / tMid)
    : lerp(mid, b, (t - tMid) / (1 - tMid));
}

export const CountdownHourglass = ({ from, to }: { from: Date; to: Date }) => {
  const fillAmount = useFillAmount(from, to);
  return <Hourglass fillAmount={fillAmount} />;
};

function useFillAmount(startDate: Date, endDate: Date) {
  const { diff: remaining } = useCountdown(endDate);
  const total = endDate.getTime() - startDate.getTime();
  const passed = total - remaining;
  const fillAmount = passed / total;
  return Math.max(0, Math.min(1, fillAmount));
}