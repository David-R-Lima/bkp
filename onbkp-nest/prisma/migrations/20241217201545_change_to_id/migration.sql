/*
  Warnings:

  - The primary key for the `OPCOES_UPLOAD` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropIndex
DROP INDEX "OPCOES_UPLOAD_id_key";

-- AlterTable
ALTER TABLE "OPCOES_UPLOAD" DROP CONSTRAINT "OPCOES_UPLOAD_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE VARCHAR(100),
ADD CONSTRAINT "OPCOES_UPLOAD_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "OPCOES_UPLOAD_id_seq";
