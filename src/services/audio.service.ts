import { createServerFn } from "@tanstack/react-start";

export const audioService = createServerFn({ method: "GET" }).handler(
  async (ctx: { data: string }) => {
    const url = ctx.data;
    const fileId =
      url.match(/\/d\/(.+?)\//)?.[1] || url.match(/id=(.+?)(&|$)/)?.[1];
    const audioUrl = `https://docs.google.com/uc?export=download&id=${fileId}`;
    const response = await fetch(audioUrl);

    if (!response.ok) return null;

    const arrayBuffer = await response.arrayBuffer();

    return Buffer.from(arrayBuffer).toString("base64");
  },
);
