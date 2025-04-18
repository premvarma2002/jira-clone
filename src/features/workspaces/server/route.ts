import { zValidator } from "@hono/zod-validator";
import { ID } from "node-appwrite";
import { Hono } from "hono";

import { DATABASE_ID, IMAGES_BUCKET_ID, WORKSPACES_ID } from "@/config";
import { sessionMiddleware } from "@/lib/session-middleware";

import { createWorkspaceSchema } from "../schemas";

const app = new Hono()
  .post(
    "/",
    zValidator("json",createWorkspaceSchema),
    sessionMiddleware,
    async (c) => {
      const databases = c.get("databases");
      const storage = c.get("storage");
      const user = c.get("user");
      
      const { name, image } = c.req.valid("json");

      let uploadedImageUrl: string | undefined;
      if (image instanceof File) {
       const file = await storage.createFile(
        IMAGES_BUCKET_ID,
        ID.unique(),
        image,
       );

       const arrayBuffer = await storage.getFilePreview(
        IMAGES_BUCKET_ID,
        file.$id,
       );

       uploadedImageUrl = `data:image/png;base64,${Buffer.from(arrayBuffer).toString("base64")}`;
      }

      const workspace = await databases.createDocument(
        DATABASE_ID,
        WORKSPACES_ID,
        ID.unique(),
        {
          name,
          userId: user.$id,
          imageUrl: uploadedImageUrl,
        },
      );

      return c.json({ data: workspace });
    }
  );

export default app;