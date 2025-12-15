import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { writeFile } from "fs/promises";
import cloudinary from "@/utils/cloudinary";

export const POST = async (req: Request) => {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Створюємо папку uploads у корені проєкту
    const uploadDir = path.join(process.cwd(), "uploads");
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

    // Зберігаємо файл тимчасово
    const tempPath = path.join(uploadDir, file.name);
    const bytes = await file.arrayBuffer();
    await writeFile(tempPath, Buffer.from(bytes));

    const result = await cloudinary.uploader.upload(tempPath, {
      folder: "gallery",
    });

    // Видаляємо тимчасовий файл
    fs.unlinkSync(tempPath);

    return NextResponse.json({ url: result.secure_url });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("Upload error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
};
