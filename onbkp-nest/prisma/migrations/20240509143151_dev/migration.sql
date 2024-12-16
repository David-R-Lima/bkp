/*
  Warnings:

  - Made the column `TX_SCP` on table `BANCO_DADOS` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "BANCO_DADOS" ALTER COLUMN "TX_SCP" SET NOT NULL;

-- CreateTable
CREATE TABLE "project" (
    "CD_PRO" TEXT NOT NULL,
    "CD_USU" TEXT NOT NULL,
    "TX_PRO" TEXT NOT NULL,

    CONSTRAINT "project_pkey" PRIMARY KEY ("CD_PRO")
);

-- AddForeignKey
ALTER TABLE "BANCO_DADOS" ADD CONSTRAINT "BANCO_DADOS_TX_SCP_fkey" FOREIGN KEY ("TX_SCP") REFERENCES "project"("CD_PRO") ON DELETE RESTRICT ON UPDATE CASCADE;
