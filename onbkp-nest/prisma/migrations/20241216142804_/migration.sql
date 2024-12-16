/*
  Warnings:

  - The primary key for the `BANCO_DADOS_AVISOS` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `CD_BAN` on the `BANCO_DADOS_AVISOS` table. All the data in the column will be lost.
  - You are about to drop the column `CD_EML` on the `BANCO_DADOS_AVISOS` table. All the data in the column will be lost.
  - The `TP_SIT_AVS` column on the `BANCO_DADOS_AVISOS` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[CD_NOT]` on the table `BANCO_DADOS_AVISOS` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `CD_NOT` to the `BANCO_DADOS_AVISOS` table without a default value. This is not possible if the table is not empty.
  - Made the column `CD_USU` on table `BANCO_DADOS_AVISOS` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "NotificationType" AS ENUM ('EB', 'ES', 'SB');

-- DropForeignKey
ALTER TABLE "AVISOS_ENVIADOS" DROP CONSTRAINT "AVISOS_ENVIADOS_CD_EML_fkey";

-- DropForeignKey
ALTER TABLE "BANCO_DADOS_AVISOS" DROP CONSTRAINT "BANCO_DADOS_AVISOS_CD_BAN_fkey";

-- DropForeignKey
ALTER TABLE "BANCO_DADOS_AVISOS" DROP CONSTRAINT "BANCO_DADOS_AVISOS_CD_USU_fkey";

-- DropIndex
DROP INDEX "BANCO_DADOS_AVISOS_CD_EML_key";

-- AlterTable
ALTER TABLE "BANCO_DADOS_AVISOS" DROP CONSTRAINT "BANCO_DADOS_AVISOS_pkey",
DROP COLUMN "CD_BAN",
DROP COLUMN "CD_EML",
ADD COLUMN     "CD_NOT" TEXT NOT NULL,
DROP COLUMN "TP_SIT_AVS",
ADD COLUMN     "TP_SIT_AVS" "NotificationType",
ALTER COLUMN "CD_USU" SET NOT NULL,
ADD CONSTRAINT "BANCO_DADOS_AVISOS_pkey" PRIMARY KEY ("CD_NOT", "CD_USU");

-- CreateIndex
CREATE UNIQUE INDEX "BANCO_DADOS_AVISOS_CD_NOT_key" ON "BANCO_DADOS_AVISOS"("CD_NOT");

-- AddForeignKey
ALTER TABLE "BANCO_DADOS_AVISOS" ADD CONSTRAINT "BANCO_DADOS_AVISOS_CD_USU_fkey" FOREIGN KEY ("CD_USU") REFERENCES "USUARIOS"("CD_USU") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AVISOS_ENVIADOS" ADD CONSTRAINT "AVISOS_ENVIADOS_CD_EML_fkey" FOREIGN KEY ("CD_EML") REFERENCES "BANCO_DADOS_AVISOS"("CD_NOT") ON DELETE RESTRICT ON UPDATE CASCADE;
