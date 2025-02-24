/*
  Warnings:

  - The primary key for the `AVISOS_ENVIADOS` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `BANCO_DADOS` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `BANCO_DADOS_AVISOS` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `BANCO_DADOS_ROTINAS` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `NR_TAM_ARQ` on the `ROTINAS_EXECUTADAS` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `TX_OBS` on the `ROTINAS_EXECUTADAS` table. The data in that column could be lost. The data in that column will be cast from `ByteA` to `VarChar(1000)`.

*/
-- DropForeignKey
ALTER TABLE "AVISOS_ENVIADOS" DROP CONSTRAINT "AVISOS_ENVIADOS_CD_EML_fkey";

-- DropForeignKey
ALTER TABLE "BANCO_DADOS_AVISOS" DROP CONSTRAINT "BANCO_DADOS_AVISOS_CD_BAN_fkey";

-- DropForeignKey
ALTER TABLE "BANCO_DADOS_ROTINAS" DROP CONSTRAINT "BANCO_DADOS_ROTINAS_CD_BAN_fkey";

-- AlterTable
ALTER TABLE "AVISOS_ENVIADOS" DROP CONSTRAINT "AVISOS_ENVIADOS_pkey",
ALTER COLUMN "CD_EML" SET DATA TYPE TEXT,
ADD CONSTRAINT "AVISOS_ENVIADOS_pkey" PRIMARY KEY ("id_RTN", "CD_EML");

-- AlterTable
ALTER TABLE "BANCO_DADOS" DROP CONSTRAINT "BANCO_DADOS_pkey",
ALTER COLUMN "CD_BAN" DROP DEFAULT,
ALTER COLUMN "CD_BAN" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "NR_QTD_RTN" SET DATA TYPE INTEGER,
ALTER COLUMN "NR_QTD_RET" SET DATA TYPE INTEGER,
ADD CONSTRAINT "BANCO_DADOS_pkey" PRIMARY KEY ("CD_BAN");
DROP SEQUENCE "BANCO_DADOS_CD_BAN_seq";

-- AlterTable
ALTER TABLE "BANCO_DADOS_AVISOS" DROP CONSTRAINT "BANCO_DADOS_AVISOS_pkey",
ALTER COLUMN "CD_BAN" SET DATA TYPE TEXT,
ALTER COLUMN "CD_EML" DROP DEFAULT,
ALTER COLUMN "CD_EML" SET DATA TYPE TEXT,
ADD CONSTRAINT "BANCO_DADOS_AVISOS_pkey" PRIMARY KEY ("CD_BAN", "CD_EML");
DROP SEQUENCE "BANCO_DADOS_AVISOS_CD_EML_seq";

-- AlterTable
ALTER TABLE "BANCO_DADOS_ROTINAS" DROP CONSTRAINT "BANCO_DADOS_ROTINAS_pkey",
ALTER COLUMN "CD_BAN" SET DATA TYPE TEXT,
ADD CONSTRAINT "BANCO_DADOS_ROTINAS_pkey" PRIMARY KEY ("CD_BAN", "CD_RTN");

-- AlterTable
ALTER TABLE "ROTINAS_EXECUTADAS" ADD COLUMN     "DH_CAD" TIMESTAMP(3),
ALTER COLUMN "NR_TAM_ARQ" SET DATA TYPE INTEGER,
ALTER COLUMN "TX_OBS" SET DATA TYPE VARCHAR(1000);

-- AddForeignKey
ALTER TABLE "BANCO_DADOS_AVISOS" ADD CONSTRAINT "BANCO_DADOS_AVISOS_CD_BAN_fkey" FOREIGN KEY ("CD_BAN") REFERENCES "BANCO_DADOS"("CD_BAN") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BANCO_DADOS_ROTINAS" ADD CONSTRAINT "BANCO_DADOS_ROTINAS_CD_BAN_fkey" FOREIGN KEY ("CD_BAN") REFERENCES "BANCO_DADOS"("CD_BAN") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AVISOS_ENVIADOS" ADD CONSTRAINT "AVISOS_ENVIADOS_CD_EML_fkey" FOREIGN KEY ("CD_EML") REFERENCES "BANCO_DADOS_AVISOS"("CD_EML") ON DELETE RESTRICT ON UPDATE CASCADE;
