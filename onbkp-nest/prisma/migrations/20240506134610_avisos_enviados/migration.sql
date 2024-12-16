/*
  Warnings:

  - You are about to drop the `notifications_sent` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "notifications_sent" DROP CONSTRAINT "notifications_sent_CD_EML_fkey";

-- DropForeignKey
ALTER TABLE "notifications_sent" DROP CONSTRAINT "notifications_sent_id_RTN_fkey";

-- DropTable
DROP TABLE "notifications_sent";

-- CreateTable
CREATE TABLE "AVISOS_ENVIADOS" (
    "id_RTN" VARCHAR(100) NOT NULL,
    "CD_EML" INTEGER NOT NULL,
    "TX_EML" VARCHAR(100),
    "DH_ENV" TIMESTAMP,

    CONSTRAINT "AVISOS_ENVIADOS_pkey" PRIMARY KEY ("id_RTN","CD_EML")
);

-- AddForeignKey
ALTER TABLE "AVISOS_ENVIADOS" ADD CONSTRAINT "AVISOS_ENVIADOS_id_RTN_fkey" FOREIGN KEY ("id_RTN") REFERENCES "ROTINAS_EXECUTADAS"("CD_EXE_RTN") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AVISOS_ENVIADOS" ADD CONSTRAINT "AVISOS_ENVIADOS_CD_EML_fkey" FOREIGN KEY ("CD_EML") REFERENCES "BANCO_DADOS_AVISOS"("CD_EML") ON DELETE RESTRICT ON UPDATE CASCADE;
