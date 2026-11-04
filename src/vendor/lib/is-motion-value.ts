// Published as JavaScript, without types: what it exports is typed `any`.
"use client";

import { MotionValue } from "@/deframer";

export const isMotionValue: any = (v?) => v instanceof MotionValue;
