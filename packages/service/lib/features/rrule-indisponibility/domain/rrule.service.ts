import { Injectable } from '@nestjs/common'
import { RRule, RRuleSet, Weekday } from 'rrule'

@Injectable()
export class RruleService {
  generateRRule(options: {
    startDate: Date,
    interval: number,
    daysOfWeek: Weekday[],
    count?: number,
    until?: Date
  }) {
    const { startDate, interval, daysOfWeek, count, until } = options;
  }
}
