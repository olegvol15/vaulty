"use client";

import { useId } from "react";
import { motion, useReducedMotion, type SVGMotionProps } from "motion/react";

type VaultyLogoProps = SVGMotionProps<SVGSVGElement> & {
  showWordmark?: boolean;
};

export default function VaultyLogo({
  showWordmark = true,
  ...props
}: VaultyLogoProps) {
  const id = useId();
  const shouldReduceMotion = useReducedMotion();
  const height = showWordmark ? 248 : 168;
  const shellGradientId = `${id}-shell`;
  const doorGradientId = `${id}-door`;
  const wordmarkGradientId = `${id}-wordmark`;
  const sheenGradientId = `${id}-sheen`;
  const shadowId = `${id}-shadow`;

  return (
    <motion.svg
      width="220"
      height={height}
      viewBox={`0 0 220 ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Vaulty logo"
      initial={shouldReduceMotion ? false : "hidden"}
      animate="visible"
      whileHover={shouldReduceMotion ? undefined : "hover"}
      whileTap={shouldReduceMotion ? undefined : { scale: 0.985 }}
      variants={{
        hidden: { opacity: 0, y: 12, scale: 0.94 },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: {
            type: "spring",
            stiffness: 85,
            damping: 24,
            staggerChildren: 0.2,
          },
        },
        hover: {
          scale: 1.06,
          transition: { type: "spring", stiffness: 135, damping: 22 },
        },
      }}
      {...props}
    >
      <defs>
        <linearGradient id={shellGradientId} x1="44" y1="20" x2="175" y2="168">
          <stop stopColor="#38BDF8" />
          <stop offset="0.48" stopColor="#2563EB" />
          <stop offset="1" stopColor="#312E81" />
        </linearGradient>
        <linearGradient id={doorGradientId} x1="68" y1="53" x2="160" y2="155">
          <stop stopColor="#172554" />
          <stop offset="1" stopColor="#020617" />
        </linearGradient>
        <linearGradient id={wordmarkGradientId} x1="38" y1="220" x2="182" y2="220">
          <stop stopColor="#0EA5E9" />
          <stop offset="1" stopColor="#4338CA" />
        </linearGradient>
        <linearGradient id={sheenGradientId} x1="53" y1="52" x2="161" y2="144">
          <stop stopColor="#FFFFFF" stopOpacity="0" />
          <stop offset="0.52" stopColor="#FFFFFF" stopOpacity="0.62" />
          <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>
        <filter
          id={shadowId}
          x="28"
          y="18"
          width="164"
          height="164"
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feDropShadow
            dx="0"
            dy="14"
            stdDeviation="14"
            floodColor="#0F172A"
            floodOpacity="0.18"
          />
        </filter>
      </defs>

      <motion.g
        filter={`url(#${shadowId})`}
        variants={{
          hidden: { rotate: -5 },
          visible: {
            rotate: 0,
            transition: { type: "spring", stiffness: 70, damping: 20 },
          },
        }}
        style={{ originX: "110px", originY: "100px" }}
      >
        <motion.path
          d="M110 22L176 53V105C176 141 149 166 110 176C71 166 44 141 44 105V53L110 22Z"
          fill={`url(#${shellGradientId})`}
          variants={{
            hidden: { pathLength: 0, opacity: 0 },
            visible: {
              pathLength: 1,
              opacity: 1,
              transition: { duration: 1.7, ease: "easeInOut" },
            },
          }}
        />
        <motion.path
          d="M110 38L160 61V103C160 132 139 151 110 160C81 151 60 132 60 103V61L110 38Z"
          fill="#DBEAFE"
          initial={shouldReduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 0.24 }}
          transition={{ delay: 0.65, duration: 1.05, ease: "easeOut" }}
        />
        <motion.rect
          x="70"
          y="70"
          width="80"
          height="68"
          rx="18"
          fill={`url(#${doorGradientId})`}
          variants={{
            hidden: { opacity: 0, scale: 0.86 },
            visible: {
              opacity: 1,
              scale: 1,
              transition: { type: "spring", stiffness: 95, damping: 22 },
            },
          }}
          style={{ originX: "110px", originY: "104px" }}
        />
        <motion.circle
          cx="110"
          cy="104"
          r="25"
          stroke="#7DD3FC"
          strokeWidth="8"
          variants={{
            hidden: { pathLength: 0, rotate: -150 },
            visible: {
              pathLength: 1,
              rotate: 0,
              transition: {
                pathLength: { duration: 1.55, ease: "easeInOut" },
                rotate: { type: "spring", stiffness: 65, damping: 20 },
              },
            },
          }}
          style={{ originX: "110px", originY: "104px" }}
        />
        <motion.circle
          cx="110"
          cy="104"
          r="8"
          fill="#BAE6FD"
          variants={{
            hidden: { scale: 0 },
            visible: {
              scale: 1,
              transition: { type: "spring", stiffness: 135, damping: 20 },
            },
          }}
          style={{ originX: "110px", originY: "104px" }}
        />
        <motion.path
          d="M110 79V94M110 114V129M85 104H100M120 104H135M92.5 86.5L103 97M117 111L127.5 121.5M127.5 86.5L117 97M103 111L92.5 121.5"
          stroke="#BAE6FD"
          strokeLinecap="round"
          strokeWidth="5"
          variants={{
            hidden: { opacity: 0, rotate: -150 },
            visible: {
              opacity: 1,
              rotate: 0,
              transition: { type: "spring", stiffness: 65, damping: 20 },
            },
          }}
          style={{ originX: "110px", originY: "104px" }}
        />
        <motion.path
          d="M82 61H138"
          stroke="#EFF6FF"
          strokeLinecap="round"
          strokeOpacity="0.78"
          strokeWidth="7"
          variants={{
            hidden: { pathLength: 0, opacity: 0 },
            visible: {
              pathLength: 1,
              opacity: 1,
              transition: { duration: 1.25, ease: "easeInOut" },
            },
          }}
        />
        <motion.path
          d="M71 53L156 138"
          stroke={`url(#${sheenGradientId})`}
          strokeLinecap="round"
          strokeWidth="16"
          initial={shouldReduceMotion ? false : { pathLength: 0, opacity: 0 }}
          animate={
            shouldReduceMotion
              ? { opacity: 0 }
              : { pathLength: [0, 1, 1], opacity: [0, 0.55, 0] }
          }
          transition={{
            delay: 1.55,
            duration: 2.1,
            ease: "easeInOut",
            times: [0, 0.5, 1],
          }}
        />
      </motion.g>
    </motion.svg>
  );
}
