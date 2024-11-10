import { Seance } from "./Seance";

export class Schedule {
  id!: number;
  seances!: Seance[];
  parentScheduleId?: number; // ID du planning parent
}
