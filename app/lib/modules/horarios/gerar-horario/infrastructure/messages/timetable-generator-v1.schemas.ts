import * as z from "zod";


export const TimeSlotSchema = z.object({
    "end": z.string(),
    "start": z.string(),
});
export type TimeSlot = z.infer<typeof TimeSlotSchema>;

export const AvailabilityRuleUnavailabilitySchema = z.object({
    "date_end": z.union([z.null(), z.string()]),
    "date_start": z.string(),
    "r_rule": z.string(),
});
export type AvailabilityRuleUnavailability = z.infer<typeof AvailabilityRuleUnavailabilitySchema>;

export const RuleElementSchema = z.object({
    "date_end": z.union([z.null(), z.string()]),
    "date_start": z.string(),
    "r_rule": z.string(),
});
export type RuleElement = z.infer<typeof RuleElementSchema>;

export const DiarySchema = z.object({
    "group_id": z.string(),
    "id": z.string(),
    "remaining": z.number(),
    "subject_id": z.string(),
    "teacher_id": z.string(),
    "week_limit": z.number(),
});
export type Diary = z.infer<typeof DiarySchema>;

export const TimeSlotElementSchema = z.object({
    "end": z.string(),
    "start": z.string(),
});
export type TimeSlotElement = z.infer<typeof TimeSlotElementSchema>;

export const TimetableGridScheduleSchema = z.object({
    "date": z.string(),
    "diary_id": z.string(),
    "group_id": z.string(),
    "teacher_id": z.string(),
    "time_slot": TimeSlotElementSchema,
});
export type TimetableGridSchedule = z.infer<typeof TimetableGridScheduleSchema>;

export const AvailabilityClassSchema = z.object({
    "rules": z.array(RuleElementSchema),
});
export type AvailabilityClass = z.infer<typeof AvailabilityClassSchema>;

export const SubjectSchema = z.object({
    "id": z.string(),
    "name": z.string(),
});
export type Subject = z.infer<typeof SubjectSchema>;

export const TeacherSchema = z.object({
    "availability": AvailabilityClassSchema,
    "id": z.string(),
});
export type Teacher = z.infer<typeof TeacherSchema>;

export const DiaryElementSchema = z.object({
    "group_id": z.string(),
    "id": z.string(),
    "remaining": z.number(),
    "subject_id": z.string(),
    "teacher_id": z.string(),
    "week_limit": z.number(),
});
export type DiaryElement = z.infer<typeof DiaryElementSchema>;

export const GroupElementSchema = z.object({
    "availability": AvailabilityClassSchema,
    "id": z.string(),
});
export type GroupElement = z.infer<typeof GroupElementSchema>;

export const TeacherElementSchema = z.object({
    "availability": AvailabilityClassSchema,
    "id": z.string(),
});
export type TeacherElement = z.infer<typeof TeacherElementSchema>;

export const ServiceGenerateResponseResultErrorSchema = z.object({
    "additional_info": z.union([z.null(), z.string()]),
    "error_code": z.string(),
    "error_message": z.string(),
});
export type ServiceGenerateResponseResultError = z.infer<typeof ServiceGenerateResponseResultErrorSchema>;

export const AvailabilitySchema = z.object({
    "rules": z.array(RuleElementSchema),
});
export type Availability = z.infer<typeof AvailabilitySchema>;

export const ScheduleElementSchema = z.object({
    "date": z.string(),
    "diary_id": z.string(),
    "group_id": z.string(),
    "teacher_id": z.string(),
    "time_slot": TimeSlotElementSchema,
});
export type ScheduleElement = z.infer<typeof ScheduleElementSchema>;

export const TimetableGridSchema = z.object({
    "date_end": z.string(),
    "date_start": z.string(),
    "schedules": z.array(ScheduleElementSchema),
    "time_slots": z.array(TimeSlotElementSchema),
});
export type TimetableGrid = z.infer<typeof TimetableGridSchema>;

export const GroupSchema = z.object({
    "availability": AvailabilityClassSchema,
    "id": z.string(),
});
export type Group = z.infer<typeof GroupSchema>;

export const TimeTableSchema = z.object({
    "date_end": z.string(),
    "date_start": z.string(),
    "schedules": z.array(ScheduleElementSchema),
    "time_slots": z.array(TimeSlotElementSchema),
});
export type TimeTable = z.infer<typeof TimeTableSchema>;

export const GenerateRequestSchema = z.object({
    "date_end": z.string(),
    "date_start": z.string(),
    "diaries": z.array(DiaryElementSchema),
    "groups": z.array(GroupElementSchema),
    "previous_timetable_grid": z.union([TimeTableSchema, z.null()]),
    "request_id": z.string(),
    "teachers": z.array(TeacherElementSchema),
    "time_slots": z.array(TimeSlotElementSchema),
});
export type GenerateRequest = z.infer<typeof GenerateRequestSchema>;

export const GenerateRequestClassSchema = z.object({
    "date_end": z.string(),
    "date_start": z.string(),
    "diaries": z.array(DiaryElementSchema),
    "groups": z.array(GroupElementSchema),
    "previous_timetable_grid": z.union([TimeTableSchema, z.null()]),
    "request_id": z.string(),
    "teachers": z.array(TeacherElementSchema),
    "time_slots": z.array(TimeSlotElementSchema),
});
export type GenerateRequestClass = z.infer<typeof GenerateRequestClassSchema>;

export const GeneratedTimetableElementSchema = z.object({
    "score": z.number(),
    "time_table": TimeTableSchema,
});
export type GeneratedTimetableElement = z.infer<typeof GeneratedTimetableElementSchema>;

export const ResultSchema = z.object({
    "generate_request": GenerateRequestClassSchema.optional(),
    "generated_timetables": z.array(GeneratedTimetableElementSchema).optional(),
    "request_id": z.string().optional(),
    "additional_info": z.union([z.null(), z.string()]).optional(),
    "error_code": z.string().optional(),
    "error_message": z.string().optional(),
});
export type Result = z.infer<typeof ResultSchema>;

export const GeneratedTimetableSchema = z.object({
    "score": z.number(),
    "time_table": TimeTableSchema,
});
export type GeneratedTimetable = z.infer<typeof GeneratedTimetableSchema>;

export const ServiceGenerateResponseResultSuccessSchema = z.object({
    "generate_request": GenerateRequestClassSchema,
    "generated_timetables": z.array(GeneratedTimetableElementSchema),
    "request_id": z.string(),
});
export type ServiceGenerateResponseResultSuccess = z.infer<typeof ServiceGenerateResponseResultSuccessSchema>;

export const ServiceGenerateResponseSchema = z.object({
    "date_time_issued": z.coerce.date(),
    "request_id": z.string(),
    "result": ResultSchema,
});
export type ServiceGenerateResponse = z.infer<typeof ServiceGenerateResponseSchema>;
