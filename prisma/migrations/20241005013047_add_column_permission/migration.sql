/*
  Warnings:

  - Added the required column `resource` to the `Permission` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Permission" ADD COLUMN     "resource" VARCHAR(100) NOT NULL;
