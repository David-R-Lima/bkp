/*
  Warnings:

  - The `TP_USU` column on the `USUARIOS` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('A', 'U');

-- AlterTable
ALTER TABLE "USUARIOS" DROP COLUMN "TP_USU",
ADD COLUMN     "TP_USU" "UserType";
