-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('Member', 'Admin', 'Nurse');

-- CreateEnum
CREATE TYPE "TrailName" AS ENUM ('Preventivo', 'BaixoRisco', 'DoencaCronica');

-- CreateEnum
CREATE TYPE "StatusEvent" AS ENUM ('Agendado', 'Previsto');

-- CreateEnum
CREATE TYPE "CarePlanType" AS ENUM ('Recurring', 'Program');

-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "emailVerified" TIMESTAMP(3),
    "password" TEXT NOT NULL,
    "role" "UserRole" NOT NULL,
    "phone" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Trail" (
    "id" UUID NOT NULL,
    "name" "TrailName" NOT NULL,
    "description" TEXT,
    "screenName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Trail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TypeEvent" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TypeEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CarePlan" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "screenName" TEXT NOT NULL,
    "memberId" UUID NOT NULL,
    "nurseId" UUID NOT NULL,
    "trailId" UUID,
    "type" "CarePlanType" NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CarePlan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" UUID NOT NULL,
    "carePlanId" UUID NOT NULL,
    "expectedDate" TIMESTAMP(3) NOT NULL,
    "status" "StatusEvent" NOT NULL,
    "specification" TEXT NOT NULL,
    "typeEventId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CarePlanHistory" (
    "id" UUID NOT NULL,
    "carePlanId" UUID NOT NULL,
    "occurrence" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CarePlanHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HasConflicts" (
    "firstEventId" UUID NOT NULL,
    "secondEventId" UUID NOT NULL,
    "dateConflict" TIMESTAMP(3) NOT NULL,
    "specificationConflict" TEXT,
    "resolved" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "HasConflicts_pkey" PRIMARY KEY ("firstEventId","secondEventId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "CarePlan" ADD CONSTRAINT "CarePlan_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CarePlan" ADD CONSTRAINT "CarePlan_nurseId_fkey" FOREIGN KEY ("nurseId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CarePlan" ADD CONSTRAINT "CarePlan_trailId_fkey" FOREIGN KEY ("trailId") REFERENCES "Trail"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_carePlanId_fkey" FOREIGN KEY ("carePlanId") REFERENCES "CarePlan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_typeEventId_fkey" FOREIGN KEY ("typeEventId") REFERENCES "TypeEvent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CarePlanHistory" ADD CONSTRAINT "CarePlanHistory_carePlanId_fkey" FOREIGN KEY ("carePlanId") REFERENCES "CarePlan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HasConflicts" ADD CONSTRAINT "HasConflicts_firstEventId_fkey" FOREIGN KEY ("firstEventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HasConflicts" ADD CONSTRAINT "HasConflicts_secondEventId_fkey" FOREIGN KEY ("secondEventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
